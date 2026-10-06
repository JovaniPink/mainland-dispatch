import Link from "next/link";
import type { PublicDispatch } from "@/content/schema";
import { formatDateShort, verticals } from "@/content/site";
import { MetaLine } from "./meta-line";
import { SaveButton } from "./save-button";
import { DispatchVisual } from "./dispatch-visual";
import { cn } from "@/lib/utils";

export function DispatchCard({
  dispatch: d,
  featured = false,
}: {
  dispatch: PublicDispatch;
  featured?: boolean;
}) {
  const verticalLabels: string[] = [
    ...d.verticals.map((v) => verticals.find((x) => x.id === v)?.label ?? v),
    ...d.tags.slice(0, 2),
  ];

  return (
    <article
      className={cn(
        "dispatch-card rise-in flex flex-col overflow-hidden border border-rule bg-paper-warm/25 transition-colors hover:bg-paper-warm/55",
        featured && "sm:col-span-2 lg:grid lg:grid-cols-[1.05fr_1fr]"
      )}
    >
      <DispatchVisual dispatch={d} compact={!featured} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <MetaLine dispatch={d} />
        <h3
          className={cn(
            "font-serif leading-snug",
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          )}
        >
          <Link href={`/dispatch/${d.slug}`} className="hover:text-signal">
            {d.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{d.summary}</p>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Editorial note
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed">
            {d.commentary}
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {verticalLabels.join(" · ")}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Published {formatDateShort(d.canonicalSource.publishedAt)} · Curated{" "}
            {formatDateShort(d.curatedAt)}
          </p>
          <SaveButton id={d.id} />
        </div>
      </div>
    </article>
  );
}
