import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { EconomicSignalsFigure } from "@/components/notebook/economic-signals-figure";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  NotebookReaderShell,
  type NotebookSectionLink,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { JsonLd } from "@/components/seo/json-ld";
import { julyIsNotOneNumber as entry } from "@/content/notebook/july-is-not-one-number";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["signals", "Six signals"],
  ["frame", "The reading frame"],
  ["production", "Production clocks"],
  ["demand", "Retail and demand"],
  ["investment", "Uneven investment"],
  ["property", "Property drag"],
  ["readings", "Alternative readings"],
  ["limits", "What remains bounded"],
  ["sources", "Eleven source stops"],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function JulyIsNotOneNumberPage() {
  requirePublicNotebookEntry(entry);
  return (
    <article>
      <JsonLd data={notebookArticleJsonLd(entry)} />

      <NotebookReaderShell
        ordinal={entry.ordinal}
        title={entry.title}
        subtitle={entry.subtitle}
        thesis={entry.thesis}
        publishedAt={entry.publishedAt}
        updatedAt={entry.updatedAt}
        presentationUpdatedAt={entry.presentationUpdatedAt}
        readTime={entry.readTime}
        tags={entry.tags}
        editorialLabel="Source-audited data interpretation"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="Keep the subject, period, unit, comparison, and coverage attached to every number. None of the six measures is the economy by itself."
        contentClassName="lg:max-w-[62rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="signals"
            eyebrow="Observed - definitions stay attached"
          >
            The July panel
          </NotebookSectionHeading>
          <div className="mt-6">
            <EconomicSignalsFigure
              indicators={entry.indicators}
              sources={entry.sourceTrail}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="frame"
            eyebrow="Bounded frame - July and January-July 2026"
          >
            Six releases, six statistical objects
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.frame} />
          </div>

          <aside className="mt-7 border-l-2 border-signal bg-signal-soft/25 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Editorial boundary
            </p>
            <p className="mt-3 text-sm leading-7">
              This Notebook is not verified Mainland Dispatch reporting. It
              audits what the cited institutions published, how they defined the
              measures, and where alternative interpretations remain.
            </p>
          </aside>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="production"
            eyebrow="Output level and survey direction"
          >
            Production runs on two clocks
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.production} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="demand"
            eyebrow="Nominal transactions - bounded coverage"
          >
            Retail sales are not total consumption
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.demand} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="investment"
            eyebrow="Cumulative flows - unequal weights"
          >
            A falling total can contain growing categories
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.investment} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="property"
            eyebrow="Investment, area, value, and financing"
          >
            Property is a cluster, not one index
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.property} />
          </div>
        </section>

        <section data-testid="alternative-readings" className="mt-12">
          <NotebookSectionHeading
            id="readings"
            eyebrow="Interpretation - competing scopes"
          >
            Five readings the same panel can support
          </NotebookSectionHeading>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {entry.alternativeReadings.map((item, index) => (
              <li key={item.id} className="border border-rule p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-jade">
                    Reading {String(index + 1).padStart(2, "0")}
                  </p>
                  <NotebookStatus status={item.status} />
                </div>
                <h3 className="mt-3 font-serif text-xl leading-tight">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-7">{item.reading}</p>
                <p className="mt-4 border-l-2 border-signal pl-3 text-xs leading-6 text-ink-muted">
                  <strong className="text-ink">Boundary:</strong>{" "}
                  {item.boundary}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <NotebookProse paragraphs={entry.sections.synthesis} />
          </div>
          <aside className="mt-10 border-t border-rule pt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Institutional context - not July observations
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">
              Three frames outside the primary releases
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              These sources add an official synthesis, independent analysis, and
              an alternative outlook. Their characterizations and forecasts
              remain separate from the six observed measures.
            </p>
            <div className="mt-5">
              <NotebookFormats formats={entry.formats} />
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="limits"
            eyebrow="Limitations - no composite score"
          >
            What these releases do not settle
          </NotebookSectionHeading>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {entry.limitations.map((limitation) => (
              <li
                key={limitation}
                className="border-l-2 border-signal bg-signal-soft/20 p-4 text-sm leading-7"
              >
                {limitation}
              </li>
            ))}
          </ul>
        </section>

        <NotebookSecondarySection
          id="sources"
          eyebrow="Source trail - roles and dates preserved"
          title="Eleven source stops"
          summary="Six NBS observations, one official synthesis, three independent institutional frames, and one technical paper."
          actionLabel="Open the source trail"
        >
          <NotebookSourceTrail sources={entry.sourceTrail} />
        </NotebookSecondarySection>

        <NotebookSecondarySection
          id="changed"
          eyebrow="Review record - August 29, 2026"
          title="What changed after the August 27 candidate ledger"
          summary="The live-source refresh added an English profit release and preserved one publisher-date discrepancy."
          actionLabel="Read the review record"
        >
          <NotebookProse paragraphs={entry.sections.changed} />
        </NotebookSecondarySection>

        <section className="mt-12 border-y border-rule py-8">
          <NotebookSectionHeading
            id="question"
            eyebrow="Open - next comparable release"
          >
            What would change the reading?
          </NotebookSectionHeading>
          <p className="mt-5 max-w-3xl font-serif text-xl italic leading-8">
            {entry.unresolvedQuestion}
          </p>
        </section>

        <NotebookEndNavigation slug={entry.slug} />
      </NotebookReaderShell>
    </article>
  );
}
