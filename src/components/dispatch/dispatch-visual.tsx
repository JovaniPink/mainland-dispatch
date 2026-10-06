import type { PublicDispatch } from "@/content/schema";
import { kindLabels, formatDate } from "@/content/site";
import { cn } from "@/lib/utils";

const bars = [42, 76, 58, 88, 64, 93];
const waves = [30, 58, 82, 44, 92, 68, 36, 74, 52, 86, 46, 62];

export function DispatchVisual({
  dispatch,
  compact = false,
}: {
  dispatch: PublicDispatch;
  compact?: boolean;
}) {
  const label = kindLabels[dispatch.kind];
  if (dispatch.kind === "article")
    return (
      <div
        aria-label={`${label} preview`}
        className="border-b border-rule bg-jade-soft/25 px-4 py-5"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          {label} · {formatDate(dispatch.canonicalSource.publishedAt)}
        </p>
        <p className="mt-2 font-serif text-lg">
          {dispatch.canonicalSource.publisher}
        </p>
      </div>
    );

  return (
    <div
      className={cn(
        "dispatch-visual relative overflow-hidden border-b border-rule bg-jade-soft/55",
        compact ? "h-28" : "h-40"
      )}
      aria-label={`${label} preview`}
    >
      <span className="absolute left-3 top-3 z-10 font-mono text-xs uppercase tracking-[0.18em] text-jade">
        {label} ·{" "}
        {dispatch.provenance === "verified" ? "source record" : "review draft"}
      </span>

      {dispatch.kind === "video" && (
        <div className="media-visual flex h-full items-center justify-center bg-[radial-gradient(circle_at_70%_30%,var(--jade)_0,transparent_42%),linear-gradient(135deg,#17201d,#25322d)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/70 bg-ink/25 text-xl text-paper shadow-lg">
            ▶
          </span>
          <span className="absolute bottom-3 right-3 font-mono text-xs text-paper">
            {dispatch.duration}
          </span>
        </div>
      )}

      {dispatch.kind === "audio" && (
        <div className="flex h-full items-end justify-center gap-1.5 px-6 pb-8">
          {waves.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-1.5 rounded-full bg-signal-fill"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      )}

      {dispatch.kind === "document" && (
        <div className="absolute inset-x-10 bottom-[-1rem] top-8 rotate-[-2deg] border border-rule bg-paper p-4 shadow-sm sm:inset-x-14">
          <div className="h-1 w-2/5 bg-signal-fill" />
          <div className="mt-4 space-y-2">
            {[88, 100, 76, 92, 64].map((width) => (
              <div
                key={width}
                className="h-px bg-ink-muted/40"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <span className="absolute bottom-5 right-5 font-mono text-3xl text-rule">
            {dispatch.pageCount}
          </span>
        </div>
      )}

      {dispatch.kind === "gallery" && (
        <div className="grid h-full grid-cols-3 gap-1 p-1 pt-8">
          {[
            "bg-jade",
            "bg-signal-soft",
            "bg-paper-warm",
            "bg-night",
            "bg-jade-soft",
            "bg-signal-fill",
          ].map((tone, index) => (
            <span
              key={`${tone}-${index}`}
              className={cn(tone, index === 0 && "col-span-2")}
            />
          ))}
        </div>
      )}

      {dispatch.kind === "data" && (
        <div className="flex h-full items-end gap-2 px-6 pb-6 pt-10">
          {bars.map((height, index) => (
            <div key={height} className="flex flex-1 flex-col justify-end">
              <span
                className={
                  index === bars.length - 1 ? "bg-signal-fill" : "bg-jade"
                }
                style={{ height: `${height}px` }}
              />
              <span className="mt-1 h-px bg-rule" />
            </div>
          ))}
        </div>
      )}

      {dispatch.kind === "social" && (
        <div className="flex h-full items-center px-7 pt-5">
          <span className="font-serif text-5xl leading-none text-signal">
            “
          </span>
          <p className="max-w-[28ch] font-serif text-base italic leading-snug text-ink-muted">
            A captured public conversation, preserved with source context.
          </p>
        </div>
      )}

      {dispatch.kind === "original" && (
        <div className="absolute inset-0 flex items-end justify-between bg-[repeating-linear-gradient(0deg,transparent,transparent_23px,var(--rule)_24px)] px-5 pb-4 pt-10">
          <span className="font-serif text-5xl italic text-signal">MD</span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Editorial notebook
          </span>
        </div>
      )}
    </div>
  );
}
