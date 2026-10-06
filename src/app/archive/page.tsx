import type { Metadata } from "next";
import { ArchiveExplorer } from "@/components/archive/archive-explorer";
import { corpusTransparency } from "@/content/corpus-transparency";
import { publishedDispatches } from "@/content/dispatches";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Source Archive",
  description:
    "Reviewed source records on contemporary China, everyday life, technology, culture, labor, and the U.S.–China relationship.",
  path: "/archive",
});

export default function ArchivePage() {
  const counts = corpusTransparency;

  return (
    <div className="pb-8">
      <header className="border-b border-rule px-4 py-8 sm:px-6 sm:py-10">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Evidence behind the Notebook
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl">Source Archive</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">
          Search public inquiries, admitted sources, and Dispatches. Follow each
          source back to the publication that uses it, with its context and
          limitations.
        </p>
      </header>

      <ArchiveExplorer />

      <section
        aria-labelledby="corpus-status-title"
        className="border-t border-rule px-4 py-8 sm:px-6"
      >
        <details>
          <summary className="cursor-pointer border-y border-rule py-4">
            <span
              id="corpus-status-title"
              className="block font-serif text-2xl"
            >
              Corpus transparency
            </span>
            <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
              Published, reviewed, withheld, and rejected material · Audited{" "}
              {counts.auditedAt}
            </span>
          </summary>

          <div className="pt-5">
            <p className="max-w-3xl text-sm leading-6 text-ink-muted">
              Collected does not mean endorsed. Withheld and rejected candidates
              remain private editorial memory and are not rendered as public
              recommendations or evidence.
            </p>
            <dl className="mt-5 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: counts.collectedLeads,
                  label: "Collected leads",
                  note: "Private research memory",
                },
                {
                  value: counts.evidenceReviewedMappings,
                  label: "Evidence-reviewed",
                  note: "Mapped to a Dispatch record",
                },
                {
                  value: publishedDispatches.length,
                  label: "Published records",
                  note: "Visible in this Archive",
                },
                {
                  value: counts.sourceReviewRecords,
                  label: "Still in source review",
                  note: "Not available on public routes",
                },
              ].map((item) => (
                <div key={item.label} className="bg-paper p-4">
                  <dd className="font-serif text-3xl text-signal">
                    {item.value}
                  </dd>
                  <dt className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-xs leading-5 text-ink-muted">
                    {item.note}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  term: "Published",
                  detail:
                    "Canonical source read, claims classified, limitations recorded, and public validation passed.",
                },
                {
                  term: "Source review",
                  detail:
                    "A Dispatch exists, but unresolved evidence or editorial checks keep it outside public routes.",
                },
                {
                  term: "Withheld",
                  detail: `${counts.generalChinaWithheld} general-China candidates await access, corroboration, or a complete source review.`,
                },
                {
                  term: "Rejected",
                  detail: `${counts.generalChinaRejected} general-China candidates remain privately recorded as duplicates, misleading frames, or unsuitable sources.`,
                },
              ].map((item) => (
                <article
                  key={item.term}
                  className="border-l-2 border-rule pl-3"
                >
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                    {item.term}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-ink-muted">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </details>
      </section>
    </div>
  );
}
