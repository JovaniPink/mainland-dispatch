"use client";

import { useMachine } from "@xstate/react";
import type { NotebookAudio } from "@/content/notebook/schema";
import { notebookAudioMachine } from "@/machines/notebook-audio-machine";

const audioStatus = {
  poster: "Audio not loaded",
  loading: "Loading audio",
  ready: "Ready to play",
  playing: "Playing",
  paused: "Paused",
  buffering: "Buffering",
  ended: "Playback complete",
  failure: "Audio unavailable",
};

export function NotebookAudioFacade({
  title,
  audio,
}: {
  title: string;
  audio: NotebookAudio;
}) {
  const [state, send] = useMachine(notebookAudioMachine);
  const loadAudio = !state.matches("poster") && !state.matches("failure");

  return (
    <section aria-labelledby="notebook-audio-title">
      <div className="overflow-hidden border border-rule bg-[#17201d] text-[#f3f0e8] [--focus:#f19589]">
        {loadAudio ? (
          <div className="grid min-h-64 content-center gap-5 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#9ab9af]">
                {state.matches("loading") ? "Loading audio" : "Now available"}
              </p>
              <h3
                id="notebook-audio-title"
                className="mt-2 max-w-2xl font-serif text-2xl leading-tight"
              >
                {title}
              </h3>
            </div>
            <audio
              controls
              preload="metadata"
              className="w-full"
              onCanPlay={() => send({ type: "CAN_PLAY" })}
              onLoadedMetadata={() => send({ type: "METADATA_LOADED" })}
              onPlaying={() => send({ type: "PLAYING" })}
              onPause={() => send({ type: "PAUSE" })}
              onWaiting={() => send({ type: "WAITING" })}
              onEnded={() => send({ type: "ENDED" })}
              onError={() => send({ type: "ERROR" })}
            >
              <source
                src={audio.mediaUrl}
                type="audio/mpeg"
                onError={() => send({ type: "ERROR" })}
              />
            </audio>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => send({ type: "RESET" })}
                className="border border-[#f3f0e8]/40 px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-[#bd382d]"
              >
                Unload audio
              </button>
              <a
                href={audio.canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-[#d8aaa5] hover:text-[#f3f0e8]"
              >
                Open canonical episode
              </a>
            </div>
          </div>
        ) : state.matches("failure") ? (
          <div className="grid min-h-64 content-center justify-items-start gap-4 p-6 sm:p-8">
            <p
              id="notebook-audio-title"
              className="font-mono text-xs uppercase tracking-widest text-[#d8aaa5]"
            >
              Audio could not be loaded
            </p>
            <p className="max-w-xl text-sm leading-6 text-[#c9cec9]">
              The source page and the full written evidence trail remain
              available. Retrying will make another request to {audio.publisher}
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => send({ type: "RETRY" })}
                className="border border-[#f3f0e8]/50 px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-[#bd382d]"
              >
                Retry audio
              </button>
              <button
                type="button"
                onClick={() => send({ type: "RESET" })}
                className="font-mono text-xs uppercase tracking-widest text-[#c9cec9] hover:text-[#f3f0e8]"
              >
                Return to poster
              </button>
            </div>
          </div>
        ) : (
          <div className="grid min-h-64 w-full content-center justify-items-start gap-4 p-6 text-left sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9ab9af]">
              Listen at source - consent required
            </span>
            <span
              id="notebook-audio-title"
              className="max-w-2xl font-serif text-2xl leading-tight group-hover:text-[#d8aaa5]"
            >
              {title}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#c9cec9]">
              {audio.publisher} - {audio.duration} -{" "}
              {audio.transcriptAvailable
                ? "Publisher transcript available"
                : `No publisher transcript available when reviewed ${audio.reviewedAt}`}
            </span>
            <button
              type="button"
              onClick={() => send({ type: "CONSENT" })}
              aria-label={`Load external audio: ${title}`}
              className="border border-[#f3f0e8]/40 px-3 py-2 font-mono text-xs uppercase tracking-widest"
            >
              Load external audio
            </button>
            <span className="max-w-xl text-sm leading-6 text-[#c9cec9]">
              No {audio.publisher} audio request is made until you choose to
              load it.
            </span>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-muted" aria-live="polite">
        {audioStatus[state.value]}
      </p>
    </section>
  );
}
