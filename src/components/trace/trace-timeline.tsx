"use client";

import { useMachine } from "@xstate/react";
import Link from "next/link";
import type { Trace } from "@/content/schema";
import { phaseLabels } from "@/content/traces";
import { formatDate } from "@/content/site";
import { cn } from "@/lib/utils";
import { traceMachine } from "@/machines/explorer-machines";
import { StateLab } from "@/components/state-lab/state-lab";

/**
 * Chronological story record with a clickable entry list and a
 * "critical moments" sidebar (the chess-lab review-panel pattern).
 */
export function TraceTimeline({
  trace,
  dispatchSlugs,
}: {
  trace: Trace;
  /** Entry id → Dispatch slug, resolved on the server so no catalog ships here. */
  dispatchSlugs: Record<string, string>;
}) {
  const [state, send] = useMachine(traceMachine, {
    input: {
      initialId: trace.entries[0]?.id ?? "",
      entryIds: trace.entries.map((entry) => entry.id),
    },
  });
  const selectedId = state.context.selectedId;
  const critical = trace.entries.filter((e) => e.critical);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_16rem]">
      <ol className="relative border-l border-rule pl-6">
        {trace.entries.map((entry) => {
          const selected = entry.id === selectedId;
          const dispatchSlug = dispatchSlugs[entry.id];
          return (
            <li
              key={entry.id}
              id={entry.id}
              className="relative pb-8 last:pb-0"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border",
                  entry.critical
                    ? "border-signal bg-signal-fill"
                    : "border-ink-muted bg-paper"
                )}
              />
              <button
                onClick={() => send({ type: "SELECT_ENTRY", id: entry.id })}
                aria-expanded={selected}
                className="block w-full text-left"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-jade">
                  {formatDate(entry.date)} · {phaseLabels[entry.phase]}
                </p>
                <h3
                  className={cn(
                    "mt-1 font-serif text-xl leading-snug",
                    selected && "text-signal"
                  )}
                >
                  {entry.title}
                </h3>
              </button>
              {selected && (
                <div className="rise-in mt-2 border border-rule bg-paper-warm/40 p-4">
                  <p className="text-sm leading-relaxed">{entry.detail}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {entry.sourceUrl && (
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
                      >
                        {entry.sourceLabel ?? "Source"} ↗
                      </a>
                    )}
                    {dispatchSlug && (
                      <Link
                        href={`/dispatch/${dispatchSlug}`}
                        className="font-mono text-xs uppercase tracking-widest text-jade hover:text-signal"
                      >
                        Read dispatch →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <aside className="self-start border border-rule bg-paper-warm/40 p-4 lg:sticky lg:top-4">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Critical moments
        </p>
        <ul className="mt-3 space-y-3">
          {critical.map((entry) => (
            <li key={entry.id}>
              <button
                onClick={() => {
                  send({ type: "SELECT_ENTRY", id: entry.id });
                  document
                    .getElementById(entry.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="text-left"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {formatDate(entry.date)}
                </p>
                <p className="font-serif text-sm leading-snug hover:text-signal">
                  {entry.title}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="lg:col-span-2">
        <StateLab
          title="Trace selector"
          state={state.value}
          lastEvent={null}
          nextEvents={["SELECT_ENTRY"]}
        />
      </div>
    </div>
  );
}
