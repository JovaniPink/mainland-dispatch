import { assign, setup } from "xstate";
import type { DispatchKind, EvidenceStatus, Vertical } from "@/content/schema";

export type ArchiveView = "cards" | "timeline" | "relationships";
export type ArchiveFilterKey =
  "vertical" | "kind" | "evidence" | "publisher" | "place" | "year" | "query";

export type ArchiveContext = {
  resultType: "all" | "inquiry" | "source" | "dispatch";
  relationshipMode: "inquiry" | "dispatch";
  defaultInquirySlug: string;
  view: ArchiveView;
  vertical: Vertical | "all";
  kind: DispatchKind | "all";
  evidence: EvidenceStatus | "all";
  publisher: string;
  place: string;
  year: string;
  query: string;
  focusId: string;
  inquirySlug: string;
  filterPanelOpen: boolean;
};

export type ArchiveEvent =
  | { type: "SET_VIEW"; view: ArchiveView }
  | { type: "SET_RESULT_TYPE"; resultType: ArchiveContext["resultType"] }
  | {
      type: "SET_RELATIONSHIP_MODE";
      relationshipMode: ArchiveContext["relationshipMode"];
    }
  | { type: "FILTER_VERTICAL"; vertical: Vertical | "all" }
  | { type: "FILTER_KIND"; kind: DispatchKind | "all" }
  | { type: "FILTER_EVIDENCE"; evidence: EvidenceStatus | "all" }
  | { type: "FILTER_PUBLISHER"; publisher: string }
  | { type: "FILTER_PLACE"; place: string }
  | { type: "FILTER_YEAR"; year: string }
  | { type: "SEARCH"; query: string }
  | { type: "SELECT_FOCUS"; focusId: string }
  | { type: "SELECT_INQUIRY"; inquirySlug: string }
  | { type: "OPEN_FILTER_PANEL" }
  | { type: "CLOSE_FILTER_PANEL" }
  | { type: "TOGGLE_FILTER_PANEL" }
  | { type: "CLEAR_FILTER"; filter: ArchiveFilterKey }
  | { type: "CLEAR_ALL_FILTERS" }
  | { type: "RESET" }
  | {
      type: "HYDRATE";
      filters: Partial<Omit<ArchiveContext, "filterPanelOpen">>;
    };

export const initialArchiveContext: ArchiveContext = {
  resultType: "all",
  relationshipMode: "inquiry",
  defaultInquirySlug: "",
  view: "cards",
  vertical: "all",
  kind: "all",
  evidence: "all",
  publisher: "all",
  place: "all",
  year: "all",
  query: "",
  focusId: "",
  inquirySlug: "",
  filterPanelOpen: false,
};

const archiveFilterDefaults: Pick<ArchiveContext, ArchiveFilterKey> = {
  vertical: "all",
  kind: "all",
  evidence: "all",
  publisher: "all",
  place: "all",
  year: "all",
  query: "",
};

export const archiveMachine = setup({
  types: {
    context: {} as ArchiveContext,
    input: {} as { latestInquirySlug: string } | undefined,
    events: {} as ArchiveEvent,
  },
}).createMachine({
  id: "archive",
  initial: "ready",
  context: ({ input }) => ({
    ...initialArchiveContext,
    inquirySlug: input?.latestInquirySlug ?? "",
    defaultInquirySlug: input?.latestInquirySlug ?? "",
  }),
  states: {
    ready: {
      on: {
        SET_RESULT_TYPE: {
          actions: assign({ resultType: ({ event }) => event.resultType }),
        },
        SET_RELATIONSHIP_MODE: {
          actions: assign({
            relationshipMode: ({ event }) => event.relationshipMode,
          }),
        },
        SET_VIEW: {
          actions: assign({ view: ({ event }) => event.view }),
        },
        FILTER_VERTICAL: {
          actions: assign({ vertical: ({ event }) => event.vertical }),
        },
        FILTER_KIND: {
          actions: assign({ kind: ({ event }) => event.kind }),
        },
        FILTER_EVIDENCE: {
          actions: assign({ evidence: ({ event }) => event.evidence }),
        },
        FILTER_PUBLISHER: {
          actions: assign({ publisher: ({ event }) => event.publisher }),
        },
        FILTER_PLACE: {
          actions: assign({ place: ({ event }) => event.place }),
        },
        FILTER_YEAR: {
          actions: assign({ year: ({ event }) => event.year }),
        },
        SEARCH: {
          actions: assign({ query: ({ event }) => event.query }),
        },
        SELECT_FOCUS: {
          actions: assign({ focusId: ({ event }) => event.focusId }),
        },
        SELECT_INQUIRY: {
          actions: assign({ inquirySlug: ({ event }) => event.inquirySlug }),
        },
        OPEN_FILTER_PANEL: {
          actions: assign({ filterPanelOpen: true }),
        },
        CLOSE_FILTER_PANEL: {
          actions: assign({ filterPanelOpen: false }),
        },
        TOGGLE_FILTER_PANEL: {
          actions: assign({
            filterPanelOpen: ({ context }) => !context.filterPanelOpen,
          }),
        },
        CLEAR_FILTER: {
          actions: assign(({ context, event }) => ({
            ...context,
            [event.filter]: archiveFilterDefaults[event.filter],
          })),
        },
        CLEAR_ALL_FILTERS: {
          actions: assign(({ context }) => ({
            ...context,
            ...archiveFilterDefaults,
            resultType: "all" as const,
          })),
        },
        HYDRATE: {
          actions: assign(({ context, event }) => ({
            ...context,
            ...event.filters,
          })),
        },
        RESET: {
          actions: assign(({ context }) => ({
            ...initialArchiveContext,
            defaultInquirySlug: context.defaultInquirySlug,
            inquirySlug: context.defaultInquirySlug,
          })),
        },
      },
    },
  },
});
