import { assign, setup } from "xstate";

export const notebookAudioMachine = setup({
  types: {
    context: {} as { hasMetadata: boolean },
    events: {} as {
      type:
        | "CONSENT"
        | "CAN_PLAY"
        | "METADATA_LOADED"
        | "PLAYING"
        | "PAUSE"
        | "WAITING"
        | "ENDED"
        | "ERROR"
        | "RETRY"
        | "RESET";
    },
  },
}).createMachine({
  id: "notebook-audio",
  context: { hasMetadata: false },
  initial: "poster",
  on: { RESET: ".poster" },
  states: {
    poster: { on: { CONSENT: "loading" } },
    loading: {
      entry: assign({ hasMetadata: false }),
      on: {
        METADATA_LOADED: { actions: assign({ hasMetadata: true }) },
        CAN_PLAY: "ready",
        WAITING: "buffering",
        ERROR: "failure",
      },
      after: {
        30_000: {
          guard: ({ context }) => !context.hasMetadata,
          target: "failure",
        },
      },
    },
    ready: {
      on: { PLAYING: "playing", WAITING: "buffering", ERROR: "failure" },
    },
    playing: {
      on: {
        PAUSE: "paused",
        WAITING: "buffering",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    paused: {
      on: {
        PLAYING: "playing",
        WAITING: "buffering",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    buffering: {
      after: { 30_000: "failure" },
      on: {
        PLAYING: "playing",
        PAUSE: "paused",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    ended: {
      on: { PLAYING: "playing", WAITING: "buffering", ERROR: "failure" },
    },
    failure: { on: { RETRY: "loading" } },
  },
});
