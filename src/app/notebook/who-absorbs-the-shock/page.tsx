import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { NotebookAudioFacade } from "@/components/notebook/notebook-audio-facade";
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
import {
  AdjustmentChainFigure,
  DistributionCasesFigure,
  PolicyMatrixFigure,
  ShockComparisonFigure,
} from "@/components/notebook/trade-adjustment-graphics";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { whoAbsorbsTheShock as entry } from "@/content/notebook/who-absorbs-the-shock";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["mechanism", "Five-stage adjustment"],
  ["why", "Why call it a shock?"],
  ["comparison", "First and second shocks"],
  ["distribution", "Who receives what"],
  ["policy", "Policy targets"],
  ["scenario", "AI scenario"],
  ["claim-audit", "Fourteen claim checks"],
  ["sources", "Twenty-four source stops"],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function WhoAbsorbsTheShockPage() {
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
        readingRule="Keep the unit visible: household, firm, worker, place, product, and national balance can move in different directions."
        contentClassName="lg:max-w-[68rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="mechanism"
            eyebrow="A factory system has a balance of payments"
          >
            Five stages, not one cause
          </NotebookSectionHeading>

          <div className="mt-8">
            <AdjustmentChainFigure
              steps={entry.mechanismSteps}
              sources={entry.sourceTrail}
            />
          </div>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.mechanism} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="why" eyebrow="A definition with limits">
            Why call it a shock?
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.why} />
          </div>

          <div className="mt-8 border-l-4 border-signal bg-signal-soft/25 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Working verdict
            </p>
            <div className="mt-4">
              <NotebookProse paragraphs={entry.sections.verdict} />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-2xl leading-tight">
              Listen at the publisher
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              The publisher transcript could not be accessed in this review. The
              six passage locators below were checked against the official
              audio, and the public copy uses attributed paraphrase rather than
              quotation. Loading is optional; no Simplecast media request occurs
              before consent.
            </p>
            <div className="mt-5">
              <NotebookFormats formats={entry.formats} />
            </div>
            <div className="mt-4">
              <NotebookAudioFacade
                title={entry.formats[0].title}
                audio={entry.audio}
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-2xl leading-tight">
              Six audited turns in the full episode
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              The locators identify the reviewed spans. Each card preserves a
              speaker, paraphrase, and claim boundary; none is a substitute
              transcript.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {entry.passageAudit.map((passage, index) => (
                <li key={passage.id} className="border border-rule p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-signal">
                      {String(index + 1).padStart(2, "0")} -{" "}
                      {passage.spans
                        .map((span) => `${span.start}-${span.end}`)
                        .join(", ")}
                    </span>
                    <span className="border border-jade px-2 py-1 font-mono text-xs uppercase tracking-widest text-jade">
                      Audited
                    </span>
                  </div>
                  <h4 className="mt-4 font-serif text-xl leading-snug">
                    {passage.speaker}
                  </h4>
                  <p className="mt-3 text-sm leading-7">{passage.paraphrase}</p>
                  <p className="mt-3 border-l-2 border-signal pl-3 text-xs leading-6 text-ink-muted">
                    <strong className="text-ink">Boundary:</strong>{" "}
                    {passage.boundary}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="comparison"
            eyebrow="Keep every denominator"
          >
            What changed between the first and second shocks?
          </NotebookSectionHeading>
          <div className="mt-8">
            <ShockComparisonFigure comparisons={entry.shockComparisons} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="distribution"
            eyebrow="Benefits and costs can coexist"
          >
            Who receives what?
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.distribution} />
          </div>
          <div className="mt-8">
            <DistributionCasesFigure cases={entry.distributionCases} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="policy"
            eyebrow="Instrument follows diagnosis"
          >
            Which tool targets which problem?
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.policy} />
          </div>
          <div className="mt-8">
            <PolicyMatrixFigure options={entry.policyOptions} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="scenario"
            eyebrow="A scenario, not an observation"
          >
            What would an AI and software shock require?
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.scenario} />
          </div>
          <nav
            aria-label="Related AI inquiries"
            className="mt-7 grid gap-3 sm:grid-cols-2"
          >
            <Link
              href="/notebook/open-models-closed-system"
              className="border border-rule px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-jade hover:text-ink"
            >
              Open Models, Closed System?
            </Link>
            <Link
              href="/notebook/dominance-is-a-dashboard"
              className="border border-rule px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-jade hover:text-ink"
            >
              Dominance Is a Dashboard, Not a Crown
            </Link>
          </nav>
        </section>

        <NotebookSecondarySection
          id="claim-audit"
          eyebrow="Claim discipline"
          title="What survives the source audit"
          summary="Excluded claims remain visible as rejected formulations. They do not enter the thesis, the adjustment chain, or the policy matrix as facts."
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

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail", "source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and review boundary"
          summary="The episode supplies attributed argument. Statistical agencies, research, regulatory records, institutional assessments, and official positions retain their own authority, dates, methods, and limits."
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
