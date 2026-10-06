import { assign, setup } from "xstate";
import { DispatchSchema } from "@/content/schema";

/** Existing canonical source URLs, supplied by the server for duplicate checks. */
export type KnownSource = { id: string; url: string };

export type IntakeInput = { knownSources?: KnownSource[] };

export type IntakeContext = {
  knownSources: KnownSource[];
  url: string;
  draft: Record<string, unknown>;
  validationErrors: string[];
  duplicateOf: string | null;
  savedJson: string | null;
};

export type IntakeEvent =
  | { type: "SUBMIT_URL"; url: string }
  | { type: "RESOLVED"; draft: Record<string, unknown> }
  | { type: "RESOLVE_FAILED" }
  | { type: "EDIT"; draft: Record<string, unknown> }
  | { type: "VALIDATE" }
  | { type: "CONFIRM_NOT_DUPLICATE" }
  | { type: "SAVE" }
  | { type: "RESET" };

function validateDraft(draft: Record<string, unknown>): string[] {
  const result = DispatchSchema.safeParse(draft);
  if (result.success) return [];
  return result.error.issues.map(
    (i) => `${i.path.join(".") || "(root)"}: ${i.message}`
  );
}

function findDuplicate(
  draft: Record<string, unknown>,
  knownSources: KnownSource[]
): string | null {
  const canonicalSource = draft.canonicalSource;
  const url =
    canonicalSource &&
    typeof canonicalSource === "object" &&
    "url" in canonicalSource &&
    typeof canonicalSource.url === "string"
      ? canonicalSource.url
      : "";
  const hit = knownSources.find((source) => source.url === url);
  return hit ? hit.id : null;
}

/** Link intake: resolve → validate → duplicate-check → edit → save. */
export const intakeMachine = setup({
  types: {
    context: {} as IntakeContext,
    events: {} as IntakeEvent,
    input: {} as IntakeInput,
  },
}).createMachine({
  id: "intake",
  initial: "idle",
  context: ({ input }) => ({
    knownSources: input?.knownSources ?? [],
    url: "",
    draft: {},
    validationErrors: [],
    duplicateOf: null,
    savedJson: null,
  }),
  states: {
    idle: {
      on: {
        SUBMIT_URL: {
          target: "resolving",
          actions: assign({ url: ({ event }) => event.url }),
        },
      },
    },
    resolving: {
      on: {
        RESOLVED: {
          target: "resolved",
          actions: assign({ draft: ({ event }) => event.draft }),
        },
        RESOLVE_FAILED: "manualEntry",
      },
    },
    manualEntry: {
      on: {
        EDIT: {
          target: "editing",
          actions: assign({ draft: ({ event }) => event.draft }),
        },
      },
    },
    resolved: {
      always: "validating",
    },
    validating: {
      always: [
        {
          guard: ({ context }) => validateDraft(context.draft).length > 0,
          target: "invalid",
          actions: assign({
            validationErrors: ({ context }) => validateDraft(context.draft),
          }),
        },
        { target: "duplicateCheck" },
      ],
    },
    invalid: {
      on: {
        EDIT: {
          target: "editing",
          actions: assign({ draft: ({ event }) => event.draft }),
        },
      },
    },
    duplicateCheck: {
      always: [
        {
          guard: ({ context }) =>
            findDuplicate(context.draft, context.knownSources) !== null,
          target: "possibleDuplicate",
          actions: assign({
            duplicateOf: ({ context }) =>
              findDuplicate(context.draft, context.knownSources),
          }),
        },
        { target: "editing" },
      ],
    },
    possibleDuplicate: {
      on: {
        CONFIRM_NOT_DUPLICATE: {
          target: "editing",
          actions: assign({ duplicateOf: null }),
        },
        RESET: "idle",
      },
    },
    editing: {
      on: {
        EDIT: {
          actions: assign({
            draft: ({ event }) => event.draft,
            validationErrors: ({ event }) => validateDraft(event.draft),
          }),
        },
        VALIDATE: "validating",
        SAVE: {
          guard: ({ context }) => validateDraft(context.draft).length === 0,
          target: "saved",
          actions: assign({
            savedJson: ({ context }) => JSON.stringify(context.draft, null, 2),
          }),
        },
      },
    },
    saved: {
      on: { RESET: "idle" },
    },
  },
});
