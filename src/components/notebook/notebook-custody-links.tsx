import Link from "next/link";
import type {
  NotebookLegacyFragment,
  NotebookRelatedNotebook,
} from "@/content/notebook/schema";

export function NotebookCompanionLinks({
  relationships,
}: {
  relationships: readonly NotebookRelatedNotebook[];
}) {
  if (relationships.length === 0) return null;
  return (
    <aside
      aria-labelledby="companion-inquiries-title"
      className="mt-10 border-y border-rule bg-jade-soft/20 px-4 py-5"
    >
      <h2
        id="companion-inquiries-title"
        className="font-mono text-xs uppercase tracking-widest text-jade"
      >
        Companion inquiry
      </h2>
      <ul className="mt-3 grid gap-2">
        {relationships.map((relationship) => (
          <li key={relationship.slug}>
            <Link
              href={`/notebook/${relationship.slug}`}
              className="font-serif text-lg text-signal underline decoration-rule underline-offset-4 hover:text-ink"
            >
              {relationship.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function NotebookLegacyFragmentNotices({
  fragments,
}: {
  fragments: readonly NotebookLegacyFragment[];
}) {
  if (fragments.length === 0) return null;
  return (
    <div className="mt-6 grid gap-3" aria-label="Preserved legacy fragments">
      {fragments.map((fragment) => (
        <aside
          key={fragment.id}
          id={fragment.id}
          className="scroll-mt-32 border-l-2 border-signal bg-signal-soft/20 px-4 py-3"
        >
          <p className="text-sm leading-6 text-ink-muted">{fragment.notice}</p>
          <Link
            href={`/notebook/${fragment.successorSlug}#${fragment.successorFragment}`}
            className="mt-2 inline-block font-mono text-xs uppercase tracking-widest text-signal underline underline-offset-4 hover:text-ink"
          >
            Open the preserved evidence
          </Link>
        </aside>
      ))}
    </div>
  );
}
