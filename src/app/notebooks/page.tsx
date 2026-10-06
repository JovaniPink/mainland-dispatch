import type { Metadata } from "next";
import Link from "next/link";
import { SaveButton } from "@/components/dispatch/save-button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  latestNotebookEntry,
  newestNotebookRevision,
  publicNotebookEntries,
} from "@/content/notebook";
import { formatDate } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const title = "Notebooks";
const description =
  "Every published Mainland Dispatch inquiry, ordered from the latest research dossier to the founding Notebook.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/notebooks",
});

export default function NotebooksPage() {
  const entries = [...publicNotebookEntries].reverse();

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: absoluteUrl("/notebooks"),
          dateModified: newestNotebookRevision,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: entries.map((entry, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: entry.title,
              url: absoluteUrl(`/notebook/${entry.slug}`),
            })),
          },
        }}
      />
      <header className="max-w-3xl border-b border-rule pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Correspondent&apos;s Notebook
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl">Notebooks</h1>
        <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
          Long-form inquiries that state the argument, preserve the source
          trail, and keep uncertainty visible.
        </p>
      </header>

      <section
        data-testid="notebook-index-latest"
        className="mt-8 grid gap-5 border-l-2 border-signal bg-signal-soft/25 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Latest · Inquiry{" "}
            {String(latestNotebookEntry.ordinal).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">
            <Link
              href={`/notebook/${latestNotebookEntry.slug}`}
              className="hover:text-signal"
            >
              {latestNotebookEntry.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            {latestNotebookEntry.subtitle}
          </p>
        </div>
        <p className="font-mono text-xs text-ink-muted">
          {formatDate(latestNotebookEntry.publishedAt)} ·{" "}
          {latestNotebookEntry.readTime} ·{" "}
          {latestNotebookEntry.sourceTrail.length} sources
        </p>
        <SaveButton
          target={{ kind: "notebook", id: latestNotebookEntry.slug }}
          title={latestNotebookEntry.title}
        />
        <Link
          href={`/notebook/${latestNotebookEntry.slug}`}
          className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
        >
          Read the latest inquiry ↗
        </Link>
      </section>

      <section aria-labelledby="all-notebooks" className="mt-10">
        <h2
          id="all-notebooks"
          className="font-mono text-xs uppercase tracking-widest text-jade"
        >
          Earlier inquiries
        </h2>
        <div className="mt-4 divide-y divide-rule border-y border-rule">
          {entries.slice(1).map((entry) => (
            <article
              key={entry.slug}
              data-testid="notebook-index-entry"
              className="grid gap-4 py-6 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-start"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-jade">
                Inquiry {String(entry.ordinal).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-serif text-2xl leading-tight">
                  <Link
                    href={`/notebook/${entry.slug}`}
                    className="hover:text-signal"
                  >
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
                  {entry.subtitle}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted sm:text-right">
                {formatDate(entry.publishedAt)}
                <br />
                {entry.readTime} · {entry.sourceTrail.length} sources
              </p>
              <SaveButton
                target={{ kind: "notebook", id: entry.slug }}
                title={entry.title}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
