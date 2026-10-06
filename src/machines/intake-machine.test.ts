import { createActor } from "xstate";
import { intakeMachine } from "./intake-machine";
import { dispatches } from "@/content/dispatches";

const knownSources = dispatches.map((d) => ({
  id: d.id,
  url: d.canonicalSource.url,
}));

const validDraft = {
  kind: "article",
  id: "d-new",
  slug: "new-dispatch",
  title: "A new dispatch",
  summary: "Summary.",
  commentary: "Commentary.",
  whyItMatters: "It matters.",
  sourceLeadId: "lead-test-wire",
  canonicalSource: {
    id: "source-canonical",
    title: "A new dispatch",
    publisher: "Test Wire",
    url: "https://example.com/new-story",
    publishedAt: "2026-07-01",
    retrievedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    limitations: ["Test limitation."],
  },
  supportingSources: [],
  claims: [
    {
      id: "claim-test",
      statement: "A test claim.",
      status: "reported",
      sourceIds: ["source-canonical"],
      limitations: [],
    },
  ],
  excerpts: [],
  curatedAt: "2026-07-21",
  updatedAt: "2026-07-21",
  language: "en",
  translationStatus: "original-english",
  verticals: ["bilateral"],
  tags: [],
  people: [],
  organizations: [],
  places: [],
  relatedDispatchIds: [],
  editorialStatus: "draft",
  provenance: "prototype",
};

describe("intakeMachine", () => {
  it("routes a valid, non-duplicate draft to editing", () => {
    const actor = createActor(intakeMachine, {
      input: { knownSources },
    }).start();
    actor.send({ type: "SUBMIT_URL", url: "https://example.com/new-story" });
    actor.send({ type: "RESOLVED", draft: validDraft });
    expect(actor.getSnapshot().value).toBe("editing");
  });

  it("routes an invalid draft to invalid with recorded issues", () => {
    const actor = createActor(intakeMachine, {
      input: { knownSources },
    }).start();
    actor.send({ type: "SUBMIT_URL", url: "https://example.com/x" });
    actor.send({
      type: "RESOLVED",
      draft: {
        ...validDraft,
        canonicalSource: { ...validDraft.canonicalSource, url: "not-a-url" },
      },
    });
    const snap = actor.getSnapshot();
    expect(snap.value).toBe("invalid");
    expect(snap.context.validationErrors.length).toBeGreaterThan(0);
  });

  it("flags a draft whose sourceUrl matches an existing dispatch", () => {
    const existing = dispatches[0];
    const actor = createActor(intakeMachine, {
      input: { knownSources },
    }).start();
    actor.send({ type: "SUBMIT_URL", url: existing.canonicalSource.url });
    actor.send({
      type: "RESOLVED",
      draft: {
        ...validDraft,
        canonicalSource: {
          ...validDraft.canonicalSource,
          url: existing.canonicalSource.url,
        },
      },
    });
    const snap = actor.getSnapshot();
    expect(snap.value).toBe("possibleDuplicate");
    expect(snap.context.duplicateOf).toBe(existing.id);
  });

  it("falls back to manualEntry when resolution fails", () => {
    const actor = createActor(intakeMachine, {
      input: { knownSources },
    }).start();
    actor.send({ type: "SUBMIT_URL", url: "garbage" });
    actor.send({ type: "RESOLVE_FAILED" });
    expect(actor.getSnapshot().value).toBe("manualEntry");
  });

  it("refuses to save an invalid edit and saves a valid one as JSON", () => {
    const actor = createActor(intakeMachine, {
      input: { knownSources },
    }).start();
    actor.send({ type: "SUBMIT_URL", url: "https://example.com/new-story" });
    actor.send({ type: "RESOLVED", draft: validDraft });
    actor.send({ type: "EDIT", draft: { ...validDraft, title: "" } });
    actor.send({ type: "SAVE" });
    expect(actor.getSnapshot().value).toBe("editing");

    actor.send({ type: "EDIT", draft: validDraft });
    actor.send({ type: "SAVE" });
    const snap = actor.getSnapshot();
    expect(snap.value).toBe("saved");
    expect(JSON.parse(snap.context.savedJson ?? "{}").slug).toBe(
      "new-dispatch"
    );
  });
});
