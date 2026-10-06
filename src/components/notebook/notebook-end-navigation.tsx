import Link from "next/link";
import { publicNotebookEntries } from "@/content/notebook";
import { NotebookCompanionLinks } from "./notebook-custody-links";

export function NotebookEndNavigation({ slug }: { slug: string }) {
  const index = publicNotebookEntries.findIndex((entry) => entry.slug === slug);
  const entry = publicNotebookEntries[index];
  if (!entry) return null;
  return (
    <>
      <NotebookCompanionLinks relationships={entry.relatedNotebooks ?? []} />
      <nav
        aria-label="Continue reading"
        className="mt-10 border-t border-rule pt-6"
      >
        <Link
          href={`/archive?view=relationships&inquiry=${entry.slug}`}
          className="text-sm text-signal underline underline-offset-4"
        >
          Explore its source relationships
        </Link>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {(
            [
              [-1, "Previous inquiry"],
              [1, "Next inquiry"],
            ] as const
          ).map(([offset, label]) => {
            const adjacent = publicNotebookEntries[index + offset];
            return adjacent ? (
              <Link
                key={label}
                href={`/notebook/${adjacent.slug}`}
                className="group border-t border-rule py-4"
              >
                <span className="block font-mono text-xs uppercase tracking-widest text-jade">
                  {label} - {String(adjacent.ordinal).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-serif text-xl group-hover:text-signal">
                  {adjacent.title}
                </span>
              </Link>
            ) : null;
          })}
        </div>
      </nav>
    </>
  );
}
