"use client";

import { useCallback, useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { mediaMachine } from "@/machines/media-machine";
import type { Dispatch } from "@/content/schema";
import { StateLab } from "@/components/state-lab/state-lab";

function embedUrl(d: Extract<Dispatch, { kind: "video" }>): string {
  switch (d.provider) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${d.embedId}?autoplay=1`;
    case "vimeo":
      return `https://player.vimeo.com/video/${d.embedId}?autoplay=1`;
    case "bilibili":
      return `https://player.bilibili.com/player.html?bvid=${d.embedId}`;
  }
}

/**
 * Click-to-load facade: poster and metadata only, until the reader consents.
 * The third-party iframe is created after CONSENT, never before.
 */
export function MediaFacade({ dispatch: d }: { dispatch: Dispatch }) {
  const [state, send] = useMachine(mediaMachine);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const isMedia = d.kind === "video" || d.kind === "audio";
  const prototypeMedia = d.provenance === "prototype";

  const dispatch = useCallback(
    (event: Parameters<typeof send>[0]) => {
      send(event);
      setLastEvent(event.type);
      setHistory((items) => [...items.slice(-7), event.type]);
    },
    [send]
  );

  useEffect(() => {
    if (
      !isMedia ||
      !state.matches("loading") ||
      (!prototypeMedia && d.kind === "video")
    ) {
      return;
    }
    const timeout = window.setTimeout(() => dispatch({ type: "LOADED" }), 500);
    return () => window.clearTimeout(timeout);
  }, [d.kind, dispatch, isMedia, prototypeMedia, state]);

  if (!isMedia) return null;

  const meta =
    d.kind === "video"
      ? [
          d.provider.toUpperCase(),
          d.duration,
          d.language.toUpperCase(),
          d.captions.length > 0
            ? `CC ${d.captions.join("/").toUpperCase()}`
            : "NO CAPTIONS",
        ]
      : [
          d.showName.toUpperCase(),
          d.duration,
          d.language.toUpperCase(),
          d.transcriptAvailable ? "TRANSCRIPT AVAILABLE" : "NO TRANSCRIPT",
        ];

  return (
    <div>
      <div className="media-stage relative aspect-video overflow-hidden border border-rule bg-ink text-paper">
        {(state.matches("loading") || state.matches("playing")) &&
        d.kind === "video" &&
        !prototypeMedia ? (
          <iframe
            src={embedUrl(d)}
            title={d.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => dispatch({ type: "LOADED" })}
            onError={() => dispatch({ type: "ERROR" })}
          />
        ) : state.matches("playing") && prototypeMedia ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_25%_25%,var(--jade)_0,transparent_38%),linear-gradient(135deg,#17201d,#25322d)] p-6 text-center text-[#f3f0e8]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d8aaa5]">
              Prototype media surface
            </span>
            <p className="max-w-lg font-serif text-xl leading-snug">
              {d.title}
            </p>
            <p className="max-w-md text-sm text-[#c1c8c3]">
              A verified embed or audio player will appear here when this sample
              is replaced with published source material.
            </p>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="border border-[#f3f0e8]/40 px-3 py-1 font-mono text-xs uppercase tracking-widest"
            >
              Return to poster
            </button>
          </div>
        ) : state.matches("playing") && d.kind === "audio" ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="font-serif text-lg">{d.title}</p>
            <a
              href={d.canonicalSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-signal px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal"
            >
              Listen at source ↗
            </a>
          </div>
        ) : state.matches("unavailable") ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest">
              Media unavailable
            </p>
            <button
              onClick={() => dispatch({ type: "RETRY" })}
              className="border border-paper/40 px-3 py-1 font-mono text-xs uppercase tracking-widest"
            >
              Retry
            </button>
          </div>
        ) : state.matches("loading") ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <span className="loading-mark h-8 w-8 rounded-full border-2 border-paper/30 border-t-signal" />
            <p className="font-mono text-xs uppercase tracking-widest text-paper/70">
              Preparing media
            </p>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: "CONSENT" })}
            className="group flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
            aria-label={`Load external media: ${d.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper text-paper transition-colors group-hover:border-signal group-hover:text-signal">
              {d.kind === "video" ? "▶" : "♪"}
            </span>
            <span className="font-serif text-base text-paper">
              {d.canonicalSource.publisher}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-paper/70">
              {meta.join(" · ")}
            </span>
            <span className="border border-paper/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-paper/70">
              {prototypeMedia
                ? "Demo interaction. No third party loads."
                : "External source. Loads on play."}
            </span>
          </button>
        )}
      </div>
      <StateLab
        title="Media actor"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={["CONSENT", "LOADED", "ERROR", "RETRY", "RESET"]}
        history={history}
      />
    </div>
  );
}
