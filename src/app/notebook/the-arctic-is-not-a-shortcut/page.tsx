import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { ChokepointPortfolioMap } from "@/components/notebook/chokepoint-portfolio-map";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import { ArcticCorridorFigure } from "@/components/notebook/arctic-corridor-figure";
import {
  NotebookReaderShell,
  type NotebookSectionLink,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { arcticRouteSubset } from "@/content/notebook/inquiry-04-10-authority";
import { theArcticIsNotAShortcut as entry } from "@/content/notebook/the-arctic-is-not-a-shortcut";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["scale", "Corridor and three measures"],
  ["frame", "A corridor, not a substitute"],
  ["map", "The schematic route"],
  ["season", "Ice and schedule"],
  ["governance", "Russian administration"],
  ["environment", "Environmental constraints"],
  ["timeline", "Six boundary events"],
  ["claim-audit", "Five claim checks"],
  ["formats", "One expert discussion"],
  ["sources", "Thirteen source stops"],
  ["limits", "What remains unproved"],
  ["changed", "What moved"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function TheArcticIsNotAShortcutPage() {
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
        editorialLabel="Source-backed interpretation"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="A planned or departed voyage is not a completed, repeatable, safe, or lower-impact corridor. Preserve season, unit, and authority at every step."
        contentClassName="lg:max-w-[62rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading id="scale" eyebrow="No common denominator">
            Three measures that cannot become one score
          </NotebookSectionHeading>
          <div className="mt-7">
            <ArcticCorridorFigure entry={entry} />
          </div>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.scale} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="frame" eyebrow="The evidentiary frame">
            A shorter line is not a substitute system
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.frame} />
          </div>
        </section>

        <section id="arctic" className="mt-12 scroll-mt-24">
          <NotebookSectionHeading
            id="map"
            eyebrow="Click-to-load · OpenFreeMap basemap"
          >
            One bounded Arctic corridor
          </NotebookSectionHeading>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-ink-muted">
            The line and three places are source-backed schematic geometry. The
            map is not an AIS track, live ice feed, security condition, voyage
            monitor, ice certificate, or navigation recommendation. All evidence
            remains readable without loading the third-party basemap.
          </p>
          <div className="mt-7">
            <ChokepointPortfolioMap subset={arcticRouteSubset} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="season" eyebrow="Ice · weather · vessel">
            A schedule sits inside a season
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.season} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="governance"
            eyebrow="Permits · rescue · insurance"
          >
            The corridor depends on Russian administration
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.governance} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="environment"
            eyebrow="Rules · spill response · lifecycle"
          >
            Less distance does not prove lower impact
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.environment} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="timeline" eyebrow="2013–2026">
            Six events bound the public claim
          </NotebookSectionHeading>
          <ol className="mt-8 grid gap-0 border-l-2 border-jade pl-5">
            {entry.timeline.map((item) => (
              <li key={`${item.date}-${item.label}`} className="relative pb-7">
                <span
                  className="absolute -left-[1.62rem] top-1 h-3 w-3 rounded-full border-2 border-jade bg-paper"
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-3">
                  <time className="font-mono text-xs uppercase tracking-widest text-signal">
                    {item.date}
                  </time>
                  <NotebookStatus status={item.status} />
                </div>
                <h3 className="mt-2 font-serif text-xl leading-snug">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-muted">
                  {item.explanation}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <NotebookSecondarySection
          id="claim-audit"
          eyebrow="Claim discipline"
          title="What survives the Arctic source audit"
          summary="Schedule, departure, transit cargo, total cargo, and vessel counts retain their own scopes. No claim becomes proof of completed repeatable service, safe passage, equivalent scale, or lower lifecycle impact."
          actionLabel={`Examine ${entry.claimAudit.length} claim checks`}
        >
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {entry.claimAudit.map((item) => (
              <article key={item.id} className="border border-rule p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-jade">
                    {evidenceStatusLabels[item.status]}
                  </span>
                  <span className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {item.decision}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg leading-snug">
                  {item.decision === "exclude"
                    ? "Excluded overstatement"
                    : item.claim}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  {item.assessment}
                </p>
              </article>
            ))}
          </div>
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading
            id="formats"
            eyebrow="Identified expert discussion"
          >
            One strong way into the operating constraints
          </NotebookSectionHeading>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            This is an interpretation source, not a publisher audio player and
            not voyage-level proof. Opening it is an ordinary outbound link.
          </p>
          <div className="mt-6">
            <NotebookFormats formats={entry.formats} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="turning-points"
            eyebrow="One analytical turn"
          >
            Distance is not the same as reliability
          </NotebookSectionHeading>
          {entry.turningPoints.map((point) => (
            <article
              key={point.id}
              className="mt-6 border border-rule bg-paper-warm/25 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-signal">
                  {point.timecode}
                </span>
                <NotebookStatus status={point.status} />
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-7">{point.argument}</p>
              <p className="mt-3 border-l-2 border-jade pl-3 text-sm leading-7 text-ink-muted">
                {point.reading}
              </p>
            </article>
          ))}
        </section>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail", "source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and voyage boundary"
          summary="Each source keeps its date, role, and limitation. Sources shared with another inquiry retain the same identity, with context specific to the Arctic argument."
          actionLabel={`Examine ${entry.sourceTrail.length} sources`}
        >
          <div className="mt-6">
            <NotebookSourceTrail
              headingId="source-ledger"
              sources={entry.sourceTrail}
            />
          </div>
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading id="limits" eyebrow="The stopping point">
            What the reviewed record cannot establish
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.limits} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="changed" eyebrow="Custody and correction">
            What moved into this inquiry
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.changed} />
          </div>
        </section>

        <section
          id="question"
          className="mt-12 scroll-mt-32 border-y border-rule bg-jade-soft/35 px-5 py-8"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            One unresolved question
          </p>
          <p className="mt-4 font-serif text-2xl italic leading-relaxed">
            {entry.unresolvedQuestion}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-jade">
            Review limitations
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
            {entry.limitations.map((limitation) => (
              <li key={limitation} className="flex gap-3">
                <span className="text-signal" aria-hidden>
                  -
                </span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </section>

        <NotebookEndNavigation slug={entry.slug} />
      </NotebookReaderShell>
    </article>
  );
}
