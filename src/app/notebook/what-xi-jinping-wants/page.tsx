import { AttributedArgumentFigure } from "@/components/notebook/attributed-argument-figure";
import { NotebookEndNavigation } from "@/components/notebook/notebook-end-navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { NotebookStatus } from "@/components/notebook/notebook-status";
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
import { whatXiJinpingWants as entry } from "@/content/notebook/what-xi-jinping-wants";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["turning-points", "Rudd’s argument"],
  ["why", "Why this stayed with me"],
  ["model", "Rudd’s model"],
  ["explains", "What it explains"],
  ["pushback", "Where I push back"],
  ["context", "Who Rudd is"],
  ["sources", "A short source trail"],
  ["changed", "What changed"],
  ["question", "An open question"],
] as const;

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function WhatXiJinpingWantsPage() {
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
        editorialLabel="Public research notebook"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="A persuasive model is not the same thing as a settled fact."
        contentClassName="lg:max-w-[44rem]"
      >
        <section id="turning-points" className="scroll-mt-32">
          <AttributedArgumentFigure entry={entry} />
        </section>

        <section>
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
            eyebrow="One conversation · three formats"
          >
            Listen, watch, or read
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookFormats formats={entry.formats} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="model" eyebrow="Reconstruction">
            Rudd’s model of Xi
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.model} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="explains" eyebrow="Explanatory value">
            What the model explains well
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.explains} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="pushback" eyebrow="Friction">
            Where I would push back
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.pushback} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="dates"
            eyebrow="Do not collapse these dates"
          >
            2027, 2028, and 2049 are different claims
          </NotebookSectionHeading>
          <div className="mt-6 grid gap-3">
            {entry.timeline.map((item) => (
              <article
                key={item.year}
                className="grid gap-3 border border-rule p-4 sm:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <div>
                  <p className="font-serif text-3xl text-signal">{item.year}</p>
                  <div className="mt-2">
                    <NotebookStatus status={item.status} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {item.explanation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="context" eyebrow="Source provenance">
            Who Rudd is, and why that context matters
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.context} />
          </div>
        </section>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail"]}
          eyebrow={`${entry.sourceTrail.length} reviewed source stops`}
          title="A short, real source trail"
          summary="The source trail preserves the supporting record, context, and limits behind this inquiry."
          actionLabel="Examine sources"
        >
          <NotebookSourceTrail
            headingId="source-ledger"
            sources={entry.sourceTrail}
          />
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
