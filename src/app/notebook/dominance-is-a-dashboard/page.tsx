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
  ChinaConcentrationBars,
  DemographicProfiles,
  PairedPowerMetrics,
} from "@/components/notebook/power-balance-graphics";
import {
  NotebookReaderShell,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { dominanceIsADashboard as entry } from "@/content/notebook/dominance-is-a-dashboard";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["dashboard", "Eight paired indicators"],
  ["why", "Why this question matters"],
  ["verdict", "The short answer"],
  ["industry", "Industrial power"],
  ["science", "Science and technology"],
  ["leverage", "Military and money"],
  ["demography", "Demographic constraints"],
  ["timeline", "History of the balance"],
  ["claim-audit", "Eight claim checks"],
  ["sources", "Twenty-three source stops"],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const;

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function DominanceIsADashboardPage() {
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
        readingRule="Compare like with like. Do not add unlike forms of power into one score."
        contentClassName="lg:max-w-[52rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="dashboard"
            eyebrow="Scale, frontier capacity, force, and finance"
          >
            The power dashboard
          </NotebookSectionHeading>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Each card preserves one unit, one year, and one methodological
            warning. Longer bars indicate only the larger value inside that
            card. There is no weighting system and no overall score.
          </p>
          <div className="mt-7">
            <PairedPowerMetrics
              metrics={entry.comparisons}
              sources={entry.sourceTrail}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="why" eyebrow="The initiating question">
            Why this question matters
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.why} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="formats"
            eyebrow="One interview · one feature · primary records"
          >
            Listen and read at the source
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
            eyebrow="Publisher transcript map"
          >
            Four turns worth separating
          </NotebookSectionHeading>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            NPR’s transcript does not publish chapter timecodes. These are
            section locators, not invented timestamps; the audio remains the
            controlling record.
          </p>
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
                  <strong className="font-semibold">Interview argument:</strong>{" "}
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
          <NotebookSectionHeading id="verdict" eyebrow="The short answer">
            No single handoff, and no room for complacency
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.verdict} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="industry" eyebrow="Material power">
            The factory system is the strongest case
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.industry} />
          </div>
          <div className="mt-8 border-y border-rule bg-paper-warm/20 px-4 py-7 sm:px-6">
            <ChinaConcentrationBars concentrations={entry.concentrations} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="science" eyebrow="Frontier capacity">
            Science is becoming plural, not uniform
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.science} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="leverage" eyebrow="Other forms of reach">
            Military resources and monetary power
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.leverage} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="demography"
            eyebrow="Constraint, response, and time"
          >
            Demography changes the problem; it does not solve it
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.demography} />
          </div>
          <div className="mt-8">
            <DemographicProfiles profiles={entry.demographicProfiles} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="timeline"
            eyebrow="1971–2026 · institutional history"
          >
            The balance was built, not inherited
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
          summary="A correction can preserve the direction of an argument while rejecting its denominator, scope, or implied certainty. Excluded claims do not enter the published conclusion or graphics."
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
          summary="Every displayed source preserves its denominator, date, and authority boundary instead of becoming a generic citation count."
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
