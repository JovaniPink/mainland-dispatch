import { createActor, SimulatedClock } from "xstate";
import { notebookAudioMachine } from "./notebook-audio-machine";

it("offers failure recovery when a blocked request never loads metadata", () => {
  const clock = new SimulatedClock();
  const actor = createActor(notebookAudioMachine, { clock }).start();
  actor.send({ type: "CONSENT" });
  clock.increment(30_000);
  expect(actor.getSnapshot().value).toBe("failure");
  actor.send({ type: "RETRY" });
  actor.send({ type: "CAN_PLAY" });
  expect(actor.getSnapshot().value).toBe("ready");
  actor.stop();
});

it("requires native playback evidence and ignores repeated readiness", () => {
  const actor = createActor(notebookAudioMachine).start();
  actor.send({ type: "PLAYING" });
  expect(actor.getSnapshot().value).toBe("poster");
  const journey = [
    ["CONSENT", "loading"],
    ["CAN_PLAY", "ready"],
    ["CAN_PLAY", "ready"],
    ["PLAYING", "playing"],
    ["CAN_PLAY", "playing"],
    ["PAUSE", "paused"],
    ["CAN_PLAY", "paused"],
    ["PLAYING", "playing"],
    ["WAITING", "buffering"],
    ["CAN_PLAY", "buffering"],
    ["PLAYING", "playing"],
    ["ENDED", "ended"],
    ["CAN_PLAY", "ended"],
    ["PLAYING", "playing"],
    ["ERROR", "failure"],
    ["RETRY", "loading"],
    ["RESET", "poster"],
  ] as const;
  for (const [type, expected] of journey) {
    actor.send({ type });
    expect(actor.getSnapshot().value).toBe(expected);
  }
});

it("does not time out a metadata-loaded player waiting for native Play", () => {
  const clock = new SimulatedClock();
  const actor = createActor(notebookAudioMachine, { clock }).start();
  actor.send({ type: "CONSENT" });
  actor.send({ type: "METADATA_LOADED" });
  clock.increment(60_000);
  expect(actor.getSnapshot().value).toBe("loading");
  actor.send({ type: "CAN_PLAY" });
  actor.send({ type: "PLAYING" });
  expect(actor.getSnapshot().value).toBe("playing");
  actor.send({ type: "RESET" });
  actor.send({ type: "CONSENT" });
  clock.increment(30_000);
  expect(actor.getSnapshot().value).toBe("failure");
  actor.stop();
});

it("bounds a native playback stall after cached metadata, but cancels on pause or playback", () => {
  const clock = new SimulatedClock();
  const actor = createActor(notebookAudioMachine, { clock }).start();
  actor.send({ type: "CONSENT" });
  actor.send({ type: "METADATA_LOADED" });
  actor.send({ type: "WAITING" });
  expect(actor.getSnapshot().value).toBe("buffering");
  clock.increment(30_000);
  expect(actor.getSnapshot().value).toBe("failure");
  actor.send({ type: "RETRY" });
  actor.send({ type: "CAN_PLAY" });
  actor.send({ type: "WAITING" });
  actor.send({ type: "PAUSE" });
  clock.increment(30_000);
  expect(actor.getSnapshot().value).toBe("paused");
  actor.send({ type: "WAITING" });
  actor.send({ type: "PLAYING" });
  clock.increment(30_000);
  expect(actor.getSnapshot().value).toBe("playing");
  actor.stop();
});
