import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { EnergySystemFigure } from "@/components/notebook/energy-system-figure";
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
import { belowHalfIsNotGone as entry } from "@/content/notebook/below-half-is-not-gone";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["system", "Eight measures"],
  ["frame", "The four-layer frame"],
  ["mix", "Generation mix"],
  ["output", "Generation volume"],
  ["capacity", "Installed capacity"],
  ["constraints", "System use"],
  ["readings", "Alternative readings"],
  ["limits", "What remains bounded"],
  ["sources", "Eight source records"],
  ["changed", "Publication refresh"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function BelowHalfIsNotGonePage() {
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
        editorialLabel="Source-audited energy-system interpretation"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="Keep share, output, capacity, utilization, period, unit, and evidence kind attached. The four layers cannot be added into one verdict."
        contentClassName="lg:max-w-[62rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="system"
            eyebrow="Non-additive figure - four units of analysis"
          >
            One system, four different questions
          </NotebookSectionHeading>
          <div className="mt-6">
            <EnergySystemFigure
              layers={entry.energyLayers}
              sources={entry.sourceTrail}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="frame"
            eyebrow="Bounded frame - January through June 2026"
          >
            Below half is one layer, not the whole system
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.frame} />
          </div>
          <aside className="mt-7 border-l-2 border-signal bg-signal-soft/25 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Editorial boundary
            </p>
            <p className="mt-3 text-sm leading-7">
              This is source-reviewed interpretation, not verified original
              reporting. Official measurement, independent analysis, modeled
              estimates, and forecasts remain separately labeled.
            </p>
          </aside>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="mix"
            eyebrow="Share - official first-half measurement"
          >
            Coal lost majority share
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.mix} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="output"
            eyebrow="Kilowatt-hours - level and change"
          >
            Coal generation still increased
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.output} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="capacity"
            eyebrow="Fleet - renewable and coal additions"
          >
            Capacity expanded on both sides
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.capacity} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="constraints"
            eyebrow="Use - utilization and modeled curtailment"
          >
            Integration became the binding question
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.constraints} />
          </div>
        </section>

        <section data-testid="alternative-readings" className="mt-12">
          <NotebookSectionHeading
            id="readings"
            eyebrow="Interpretation - four compatible lenses"
          >
            Four readings the same system can support
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
              Three controlling formats
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">
              Official record, complete report, and forecast context
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              The exact NEA item controls the official H1 figures; the complete
              CREA/GEM report controls its analysis and model; the IEA update
              supplies forecast context only.
            </p>
            <div className="mt-5">
              <NotebookFormats formats={entry.formats} />
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="limits"
            eyebrow="Limitations - no transition score"
          >
            What these measures do not settle
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
          eyebrow="Source trail - roles and evidence kinds preserved"
          title="Eight source records, ten direct URLs"
          summary="The publication refresh adds the exact NEA item while preserving its hub and both CREA/GEM report URLs."
          actionLabel="Open the source trail"
        >
          <NotebookSourceTrail sources={entry.sourceTrail} />
        </NotebookSecondarySection>

        <NotebookSecondarySection
          id="changed"
          eyebrow="Publication refresh - September 1, 2026"
          title="What changed after the August 30 ledger"
          summary="The source set was refreshed without rewriting the dated research snapshot or changing evidence labels."
          actionLabel="Read the publication refresh"
        >
          <NotebookProse paragraphs={entry.sections.changed} />
        </NotebookSecondarySection>

        <section className="mt-12 border-y border-rule py-8">
          <NotebookSectionHeading
            id="question"
            eyebrow="Open - comparable full-year series"
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
