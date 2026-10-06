import type { MaritimeRiskNotebookEntry } from "@/content/notebook/schema";

export function MaritimeScaleCards({
  metrics,
}: {
  metrics: MaritimeRiskNotebookEntry["scaleMetrics"];
}) {
  return (
    <figure
      aria-labelledby="maritime-scale-title"
      className="border-y border-rule bg-paper-warm/20 px-4 py-7 sm:px-6"
    >
      <figcaption id="maritime-scale-title" className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          A scale comparison without a false conversion
        </p>
        <p className="mt-3 text-sm leading-7 text-ink-muted">
          Each card preserves its source unit and date. The cards sit together
          to expose orders of magnitude and functions, not to imply that a
          barrel, tonne, container share, stock, and sailing can be added.
        </p>
      </figcaption>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <article
            key={metric.id}
            className="flex min-w-0 flex-col border border-rule bg-paper p-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-jade">
                {String(index + 1).padStart(2, "0")}
              </span>
              <time className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                {metric.asOf}
              </time>
            </div>
            <h3 className="mt-4 font-serif text-lg leading-snug">
              {metric.label}
            </h3>
            <p className="mt-4 font-serif text-3xl leading-none text-signal">
              {metric.display}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-jade">
              {metric.unit}
            </p>
            <p className="mt-4 text-sm leading-6">{metric.reading}</p>
            <p className="mt-auto border-t border-rule pt-4 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Do not overread:</strong>{" "}
              {metric.caveat}
            </p>
          </article>
        ))}
      </div>
    </figure>
  );
}

export function PortfolioLogic() {
  const layers = [
    ["1", "Stocks", "Buy time on land"],
    ["2", "Pipelines", "Move some Gulf barrels"],
    ["3", "Handoffs", "Relocate vessel exposure"],
    ["4", "Passage", "Negotiate selective access"],
    ["5", "Suppliers", "Distribute counterparty exposure"],
  ] as const;

  return (
    <figure aria-labelledby="portfolio-logic-title" className="mt-8">
      <figcaption id="portfolio-logic-title" className="sr-only">
        Five non-Arctic layers of China&apos;s chokepoint risk portfolio
      </figcaption>
      <div className="grid gap-2 sm:grid-cols-5">
        {layers.map(([number, title, functionLabel], index) => (
          <div
            key={title}
            className="relative border border-rule bg-paper-warm/25 p-4"
          >
            <span className="font-mono text-xs text-signal">{number}</span>
            <strong className="mt-3 block font-serif text-lg">{title}</strong>
            <span className="mt-2 block text-sm leading-6 text-ink-muted">
              {functionLabel}
            </span>
            {index < layers.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-2 top-1/2 z-10 hidden h-px w-2 bg-rule sm:block"
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Failure in one layer increases the burden on the others. None of these
        instruments independently reproduces the capacity or function of the
        original chokepoint.
      </p>
    </figure>
  );
}
