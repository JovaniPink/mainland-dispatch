import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import {
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  NotebookReaderShell,
  type NotebookSectionLink,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { TransshipmentEvidenceFigure } from "@/components/notebook/transshipment-evidence-figure";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { whereDoesOriginChange as entry } from "@/content/notebook/where-does-origin-change";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["trade", "The four proof gates"],
  ["frame", "Origin is a sequence"],
  ["admission", "Canadian admission"],
  ["production", "Production evidence"],
  ["qualification", "USMCA qualification"],
  ["entry", "US entry"],
  ["pressure", "Policy pressure"],
  ["limits", "What remains unproved"],
  ["claim-audit", `${entry.claimAudit.length} claim checks`],
  ["sources", `${entry.sourceTrail.length} source stops`],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function WhereDoesOriginChangePage() {
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
        readingRule="Admission, production, qualification, certification, and entry are separate proof gates. Never carry evidence through an unproved step."
        contentClassName="lg:max-w-[62rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading id="trade" eyebrow="Four separate records">
            Crossing one gate does not complete the next
          </NotebookSectionHeading>
          <div className="mt-8">
            <TransshipmentEvidenceFigure
              sources={entry.sourceTrail}
              proofs={entry.tradeProofs}
              pressure={entry.tradePressure}
              frames={entry.tradeFrames}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="frame" eyebrow="The evidentiary frame">
            Origin is a sequence, not a direction of travel
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.frame} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="admission"
            eyebrow="Observed quota activity"
          >
            Canadian admission is now documented in aggregate
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.admission} />
          </div>
          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="border border-jade bg-jade-soft/25 p-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                First-period uses
              </dt>
              <dd className="mt-3 font-serif text-4xl">15,603</dd>
            </div>
            <div className="border border-rule bg-paper-warm/25 p-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                First-period remainder
              </dt>
              <dd className="mt-3 font-serif text-4xl">8,897</dd>
            </div>
            <div className="border border-signal bg-signal-soft/25 p-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                Derived second-period capacity
              </dt>
              <dd className="mt-3 font-serif text-4xl">33,397</dd>
            </div>
          </dl>
        </section>

        {(
          [
            [
              "production",
              "Manufacturing evidence",
              "Admission is not production",
              entry.sections.production,
            ],
            [
              "qualification",
              "Product-specific calculation",
              "Production is not automatic USMCA qualification",
              entry.sections.qualification,
            ],
            [
              "entry",
              "A later border event",
              "Qualification is not proof of US entry",
              entry.sections.entry,
            ],
            [
              "pressure",
              "Chronology with limits",
              "Policy pressure is not a customs finding",
              entry.sections.pressure,
            ],
            [
              "limits",
              "The stopping point",
              "What the reviewed record cannot establish",
              entry.sections.limits,
            ],
          ] as const
        ).map(([id, eyebrow, title, paragraphs]) => (
          <section key={id} className="mt-12">
            <NotebookSectionHeading id={id} eyebrow={eyebrow}>
              {title}
            </NotebookSectionHeading>
            <div className="mt-6">
              <NotebookProse paragraphs={paragraphs} />
            </div>
          </section>
        ))}

        <NotebookSecondarySection
          id="claim-audit"
          eyebrow="Claim discipline"
          title="What survives the source audit"
          summary="Each disposition stops at the strongest public record. Aggregate admission is retained; production, qualification, entry, and fraud remain separate unresolved claims."
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

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail", "source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and proof boundary"
          summary="Official rules, official actions, analysis, and trade-flow estimates answer different questions. Every source keeps its own scope and limitation."
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
          <NotebookSectionHeading id="changed" eyebrow="Custody and admission">
            What changed in this publication
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
