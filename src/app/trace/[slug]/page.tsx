import { formatDate } from "@/content/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDispatchById, isPublicDispatch } from "@/content/dispatches";
import { traces, getTrace } from "@/content/traces";
import { evidenceStatusLabels } from "@/content/dossiers";
import { TraceTimeline } from "@/components/trace/trace-timeline";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return traces.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trace = getTrace(slug);
  return trace
    ? pageMetadata({
        title: trace.title,
        description: trace.intro,
        path: `/trace/${trace.slug}`,
      })
    : { title: "Trace not found" };
}

export default async function TracePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTrace(slug);
  if (!t) notFound();

  const dispatchSlugs: Record<string, string> = {};
  for (const entry of t.entries) {
    const dispatch = entry.dispatchId
      ? getDispatchById(entry.dispatchId)
      : undefined;
    // Link only public records; review-stage Dispatches have no public page.
    if (dispatch && isPublicDispatch(dispatch)) {
      dispatchSlugs[entry.id] = dispatch.slug;
    }
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="rise-in max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Mainland Pulse · Trace
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {t.intro}
        </p>
      </header>

      <div className="mt-10">
        <TraceTimeline trace={t} dispatchSlugs={dispatchSlugs} />
      </div>

      <section className="mt-10 max-w-2xl border-t border-rule pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          Assessment as of {formatDate(t.assessmentAsOf)} ·{" "}
          <span className="text-signal">
            {evidenceStatusLabels[t.assessmentStatus]}
          </span>
        </p>
        <p className="mt-3 font-serif text-lg leading-relaxed">
          <span className="editorial-underline">{t.currentAssessment}</span>
        </p>
      </section>
    </div>
  );
}
