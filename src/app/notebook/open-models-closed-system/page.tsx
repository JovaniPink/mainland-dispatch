import { PromiseLedgerFigure } from "@/components/notebook/promise-ledger-figure";
import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { NotebookAudioFacade } from "@/components/notebook/notebook-audio-facade";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  NotebookReaderShell,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { WhatToWatch } from "@/components/notebook/what-to-watch";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { openModelsClosedSystem as entry } from "@/content/notebook/open-models-closed-system";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["promise-ledger", "Promises and evidence"],
  ["why", "Why this stayed with me"],
  ["proposal", "What Xi proposed"],
  ["strongest", "Where Yu is strongest"],
  ["overreach", "Where it overreaches"],
  ["noul", "Noul as a test"],
  ["talent", "Wang and Deng"],
  ["claim-audit", "Ten claim checks"],
  ["what-to-watch", "What to watch"],
  ["sources", "Thirteen source stops"],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const;

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function OpenModelsClosedSystemPage() {
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
        readingRule="Useful public goods and strategic influence can be true at the same time."
        readingRuleLabel="Editorial posture"
        contentClassName="lg:max-w-[46rem]"
      >
        <section id="promise-ledger" className="scroll-mt-32">
          <PromiseLedgerFigure entry={entry} />
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="why" eyebrow="The starting point">
            Why this stayed with me
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.why} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="formats"
            eyebrow="One conversation · primary records"
          >
            Listen, read, or watch
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookFormats formats={entry.formats} />
          </div>
          <div className="mt-4">
            <NotebookAudioFacade
              title={entry.formats[0].title}
              audio={entry.audio}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="turning-points"
            eyebrow="Reviewed listening map"
          >
            Three useful turning points
          </NotebookSectionHeading>
          <div className="mt-6 grid gap-4">
            {entry.turningPoints.map((point, index) => (
              <article
                key={point.id}
                className="border border-rule bg-paper-warm/25 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-signal">
                    {String(index + 1).padStart(2, "0")} · {point.timecode}–
                    {point.endTimecode}
                  </span>
                  <NotebookStatus status={point.status} />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-7">
                  <strong className="font-semibold">Episode argument:</strong>{" "}
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

        <section className="mt-12">
          <NotebookSectionHeading id="proposal" eyebrow="The official record">
            What Xi actually proposed
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.proposal} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="strongest"
            eyebrow="The strongest criticism"
          >
            Where Miles Yu’s criticism is strongest
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.strongest} />
          </div>
          <aside className="mt-6 border-l-2 border-jade bg-jade-soft/25 p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Institutional context
            </p>
            <p className="mt-2 text-sm leading-7">
              Yu directs Hudson’s China Center, teaches at the US Naval Academy,
              and previously advised Secretary of State Mike Pompeo. Hudson
              describes the center as developing American responses to the
              “China challenge.” That supplies relevant expertise and an
              explicitly strategic lens.
            </p>
            <a
              href="https://www.hudson.org/experts/1356-miles-yu"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
            >
              Inspect the source context ↗
            </a>
          </aside>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="overreach" eyebrow="Claim discipline">
            Where the episode overreaches
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.overreach} />
          </div>
        </section>

        <NotebookSecondarySection
          id="claim-audit"
          eyebrow="Ten claim checks"
          title="What survives the source audit"
          summary="Each check records the claim's evidence status, editorial decision, assessment, and displayed source count."
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
          <NotebookSectionHeading id="noul" eyebrow="Evidence test one">
            Noul as a state-capacity and information-quality test
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.noul} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="talent" eyebrow="Evidence test two">
            Wang and Deng as a transnational research pipeline
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.talent} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="what-to-watch"
            eyebrow="Remember the baseline"
          >
            What to watch
          </NotebookSectionHeading>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            These are not six interchangeable promises or a truth score. Each
            record names its claim type, responsible actor, baseline, delivery
            window, current evidence, unknowns, and the observations that would
            strengthen or weaken the assessment. Dated updates cite their own
            records; where the reviewed trail establishes no later change, the
            register says so explicitly without rewriting the original inquiry.
          </p>
          <div className="mt-6">
            <WhatToWatch entry={entry} />
          </div>
        </section>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail", "source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and review boundary"
          summary="Official records, independent reporting, benchmarks, and interpretations remain labeled by the distinct work each can support."
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
