import { FigureSources } from "@/components/notebook/figure-sources";
import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { ChokepointPortfolioMap } from "@/components/notebook/chokepoint-portfolio-map";
import { NotebookLegacyFragmentNotices } from "@/components/notebook/notebook-custody-links";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  MaritimeScaleCards,
  PortfolioLogic,
} from "@/components/notebook/maritime-risk-graphics";
import {
  NotebookReaderShell,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { routingAroundRisk as entry } from "@/content/notebook/routing-around-risk";
import { nonArcticPortfolioSubset } from "@/content/notebook/inquiry-04-10-authority";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["map", "Interactive corridor map"],
  ["why", "Why this question matters"],
  ["verdict", "The short answer"],
  ["scale", "Three scale checks"],
  ["chokepoints", "Hormuz and Suez"],
  ["portfolio", "The five-part portfolio"],
  ["governance", "Passage dependencies"],
  ["timeline", "A longer history"],
  ["claim-audit", "Seven claim checks"],
  ["formats", "Two context formats"],
  ["sources", "Fifteen source stops"],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const;

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function RoutingAroundRiskPage() {
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
        readingRule="Routing around one hazard relocates exposure. It does not erase the underlying dependency."
        contentClassName="lg:max-w-[62rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="map"
            eyebrow="Click-to-load · OpenFreeMap basemap"
          >
            Explore where the risk moves
          </NotebookSectionHeading>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-ink-muted">
            The map combines source-backed places with schematic corridor lines.
            It does not display live shipping, AIS evidence, security
            conditions, or navigation advice. All evidence remains readable if
            the basemap is never loaded.
          </p>
          <figure aria-labelledby="portfolio-map-title" className="mt-7">
            <figcaption
              id="portfolio-map-title"
              className="mb-5 font-serif text-xl"
            >
              Interpretation: each workaround has a function and a displaced
              risk
            </figcaption>
            <ChokepointPortfolioMap subset={nonArcticPortfolioSubset} />
            <FigureSources
              ids={[
                ...new Set(entry.routes.flatMap((route) => route.sourceIds)),
              ]}
              sources={entry.sourceTrail}
            />
          </figure>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="why" eyebrow="The initiating claim">
            Why this question matters
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.why} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="verdict" eyebrow="The short answer">
            A portfolio can absorb a shock; it cannot repeal geography
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.verdict} />
          </div>
          <PortfolioLogic />
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="scale" eyebrow="No common denominator">
            Three numbers that should not become one score
          </NotebookSectionHeading>
          <div className="mt-7">
            <MaritimeScaleCards metrics={entry.scaleMetrics} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="chokepoints"
            eyebrow="Energy artery · container artery"
          >
            Hormuz and Suez constrain different systems
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.chokepoints} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="portfolio"
            eyebrow="Stocks · pipelines · handoffs"
          >
            The portfolio begins with buffers and bypasses
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.portfolio} />
          </div>
        </section>

        <NotebookLegacyFragmentNotices
          fragments={(entry.legacyFragments ?? []).filter(
            (fragment) => fragment.id === "arctic"
          )}
        />

        <section className="mt-12">
          <NotebookSectionHeading
            id="governance"
            eyebrow="Sanctions · counterparties · intelligence"
          >
            Passage creates new dependencies
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.governance} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="timeline" eyebrow="1869–2026">
            Chokepoints endure because adaptation is costly
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.history} />
          </div>
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
          title="What survives the source audit"
          summary="Corrections are part of the conclusion. Excluded claims do not appear as published findings or graphic labels; reported claims retain the name and limits of the reporting organization."
          actionLabel={`Examine ${entry.claimAudit.length} claim checks`}
        >
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {entry.claimAudit.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 flex-col border border-rule p-4"
              >
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
                <p className="mt-auto pt-4 font-mono text-xs uppercase tracking-widest text-jade">
                  {item.sourceIds.length} displayed{" "}
                  {item.sourceIds.length === 1 ? "source" : "sources"}
                </p>
              </article>
            ))}
          </div>
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading
            id="formats"
            eyebrow="Institutional audio and video"
          >
            Two strong ways into the argument
          </NotebookSectionHeading>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            These are interpretation sources with identified speakers and
            institutional provenance. They are not substitutes for the numerical
            and regulatory records below.
          </p>
          <div className="mt-6">
            <NotebookFormats formats={entry.formats} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="turning-points"
            eyebrow="Three analytical turns"
          >
            Arguments worth separating
          </NotebookSectionHeading>
          <div className="mt-6 grid gap-4">
            {entry.turningPoints.map((point, index) => (
              <article
                key={point.id}
                className="border border-rule bg-paper-warm/25 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-signal">
                    {String(index + 1).padStart(2, "0")} · {point.timecode}
                  </span>
                  <NotebookStatus status={point.status} />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-7">
                  <strong className="font-semibold">Source argument:</strong>{" "}
                  {point.argument}
                </p>
                <p className="mt-3 border-l-2 border-jade pl-3 text-sm leading-7 text-ink-muted">
                  <strong className="font-semibold text-ink">
                    Editorial reading:
                  </strong>{" "}
                  {point.reading}
                </p>
              </article>
            ))}
          </div>
        </section>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and review boundary"
          summary="Every displayed source names its role, retrieval or publication date where available, and the limit on what it can support."
          actionLabel={`Examine ${entry.sourceTrail.length} sources`}
        >
          <NotebookLegacyFragmentNotices
            fragments={(entry.legacyFragments ?? []).filter((fragment) =>
              fragment.id.startsWith("notebook-source-")
            )}
          />
          <div className="mt-6">
            <NotebookSourceTrail sources={entry.sourceTrail} />
          </div>
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading id="changed" eyebrow="Synthesis">
            What I understand differently now
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
            <span className="editorial-underline">
              {entry.unresolvedQuestion}
            </span>
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
                  •
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
