import { createActor } from "xstate";
import { archiveMachine } from "./archive-machine";

describe("archiveMachine", () => {
  it("owns view and evidence-filter transitions", () => {
    const actor = createActor(archiveMachine, {
      input: { latestInquirySlug: "the-arctic-is-not-a-shortcut" },
    }).start();

    actor.send({ type: "SET_VIEW", view: "timeline" });
    actor.send({ type: "FILTER_EVIDENCE", evidence: "contested" });

    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "timeline",
        evidence: "contested",
      })
    );
  });

  it("hydrates shareable filters and resets to the public default", () => {
    const actor = createActor(archiveMachine, {
      input: { latestInquirySlug: "the-arctic-is-not-a-shortcut" },
    }).start();

    actor.send({
      type: "HYDRATE",
      filters: {
        view: "relationships",
        publisher: "ChinaFile",
        year: "2016",
        inquirySlug: "what-xi-jinping-wants",
      },
    });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "relationships",
        publisher: "ChinaFile",
        year: "2016",
        inquirySlug: "what-xi-jinping-wants",
      })
    );

    actor.send({ type: "RESET" });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "cards",
        publisher: "all",
        year: "all",
        inquirySlug: "the-arctic-is-not-a-shortcut",
      })
    );
  });

  it("owns Notebook inquiry selection", () => {
    const actor = createActor(archiveMachine, {
      input: { latestInquirySlug: "the-arctic-is-not-a-shortcut" },
    }).start();

    actor.send({
      type: "SELECT_INQUIRY",
      inquirySlug: "what-xi-jinping-wants",
    });

    expect(actor.getSnapshot().context.inquirySlug).toBe(
      "what-xi-jinping-wants"
    );
  });

  it("owns filter-panel visibility without changing shareable filters", () => {
    const actor = createActor(archiveMachine, {
      input: { latestInquirySlug: "the-arctic-is-not-a-shortcut" },
    }).start();

    expect(actor.getSnapshot().context.filterPanelOpen).toBe(false);
    actor.send({ type: "TOGGLE_FILTER_PANEL" });
    expect(actor.getSnapshot().context.filterPanelOpen).toBe(true);
    actor.send({ type: "CLOSE_FILTER_PANEL" });
    expect(actor.getSnapshot().context.filterPanelOpen).toBe(false);
    actor.send({ type: "OPEN_FILTER_PANEL" });
    expect(actor.getSnapshot().context.filterPanelOpen).toBe(true);
  });

  it("clears one or all filters without resetting the selected view", () => {
    const actor = createActor(archiveMachine, {
      input: { latestInquirySlug: "the-arctic-is-not-a-shortcut" },
    }).start();

    actor.send({ type: "SET_VIEW", view: "timeline" });
    actor.send({ type: "FILTER_EVIDENCE", evidence: "contested" });
    actor.send({ type: "FILTER_YEAR", year: "2026" });
    actor.send({ type: "SEARCH", query: "industrial policy" });

    actor.send({ type: "CLEAR_FILTER", filter: "year" });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "timeline",
        evidence: "contested",
        year: "all",
        query: "industrial policy",
      })
    );

    actor.send({ type: "CLEAR_ALL_FILTERS" });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "timeline",
        evidence: "all",
        year: "all",
        query: "",
      })
    );
  });
});
