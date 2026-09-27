import { NotebookDraftSchema, unverifiedTargetText } from "./draft-schema";
import {
  whoControlsTheModel as draft,
  whoControlsTheModelWordCount,
} from "./who-controls-the-model";
import {
  notebookEntries,
  publicNotebookEntries,
  getPublicNotebookEntry,
} from "./index";
import { mainlandKnowledgeIndex } from "../knowledge-index";
import sitemap from "@/app/sitemap";

describe("Inquiry 11 draft boundary", () => {
  it("reserves a substantial six-section draft without publishing it", () => {
    expect(draft.ordinal).toBe(11);
    expect(draft.editorialStatus).toBe("draft");
    expect(draft.sections).toHaveLength(6);
    expect(whoControlsTheModelWordCount).toBeGreaterThanOrEqual(2500);
    expect(whoControlsTheModelWordCount).toBeLessThanOrEqual(3500);
    expect(draft).not.toHaveProperty("publishedAt");
    expect(notebookEntries.some((entry) => entry.ordinal === 11)).toBe(false);
    expect(publicNotebookEntries).toHaveLength(10);
    expect(getPublicNotebookEntry(draft.slug)).toBeUndefined();
    expect(JSON.stringify(mainlandKnowledgeIndex)).not.toContain(draft.slug);
    expect(sitemap().some((entry) => entry.url.includes(draft.slug))).toBe(
      false
    );
  });
  it("rejects publication dates and invalid source, claim, and date references", () => {
    expect(
      NotebookDraftSchema.safeParse({ ...draft, publishedAt: "2026-09-15" })
        .success
    ).toBe(false);
    const unknownSource = NotebookDraftSchema.parse(draft);
    unknownSource.sections[0].paragraphs[0].sourceIds = [
      "notebook-source-missing",
    ];
    expect(NotebookDraftSchema.safeParse(unknownSource).success).toBe(false);
    const unknownClaim = NotebookDraftSchema.parse(draft);
    unknownClaim.cases[0].claimIds = ["audit-missing"];
    expect(NotebookDraftSchema.safeParse(unknownClaim).success).toBe(false);
    expect(
      NotebookDraftSchema.safeParse({ ...draft, draftUpdatedAt: "2026-09-14" })
        .success
    ).toBe(false);
    const duplicate = {
      ...draft,
      sourceTrail: [...draft.sourceTrail, draft.sourceTrail[0]],
    };
    expect(NotebookDraftSchema.safeParse(duplicate).success).toBe(false);
  });
  it("keeps every unsourced detail in place and marked as needing a primary source", () => {
    expect(draft.unverified.map((item) => item.phrase)).toEqual([
      "late 2024",
      "tokens",
      "senior officials",
      "access to the hardware",
      "Chinese-speaking",
      "could not reliably verify nationality",
      "GTG-17003",
      "Chinese-speaking",
      "Compromises reported by provider",
    ]);
    for (const item of draft.unverified) {
      expect(item.status).toBe("needs-primary-source");
      expect(unverifiedTargetText(draft, item)).toContain(item.phrase);
    }
  });
  it("rejects unverified entries whose phrase is missing from their location", () => {
    const moved = NotebookDraftSchema.parse(draft);
    moved.unverified[0].location = {
      kind: "paragraph",
      sectionId: "access-and-rerouting",
      paragraph: 0,
    };
    expect(NotebookDraftSchema.safeParse(moved).success).toBe(false);
    const missingCase = NotebookDraftSchema.parse(draft);
    missingCase.unverified[6].location = {
      kind: "case",
      caseId: "case-missing",
      field: "label",
    };
    expect(NotebookDraftSchema.safeParse(missingCase).success).toBe(false);
    const overlapping = NotebookDraftSchema.parse(draft);
    overlapping.unverified.push({
      ...overlapping.unverified[3],
      id: "unverified-hardware-access-overlap",
      phrase: "hardware they were discussing",
    });
    expect(
      NotebookDraftSchema.safeParse(overlapping).error?.issues.map(
        (issue) => issue.message
      )
    ).toEqual([
      "Unverified phrases must not overlap at one location: unverified-hardware-access-overlap",
    ]);
    const wrongStatus = {
      ...draft,
      unverified: [{ ...draft.unverified[0], status: "reported" }],
    };
    expect(NotebookDraftSchema.safeParse(wrongStatus).success).toBe(false);
  });
  it("uses the source record's title and the ledger's official-record status", () => {
    expect(
      draft.sourceTrail.find(
        (source) => source.id === "notebook-source-anthropic-september"
      )?.title
    ).toBe("Countering misuse of AI: September 2026");
    expect(
      draft.claimAudit.find((claim) => claim.id === "audit-response")?.status
    ).toBe("officiallyAnnounced");
    expect(
      draft.claimAudit
        .filter((claim) => claim.id !== "audit-response")
        .every((claim) => claim.status === "reported")
    ).toBe(true);
  });
});
