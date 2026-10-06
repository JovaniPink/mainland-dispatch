import { NotebookStatus } from "@/components/notebook/notebook-status";
import type {
  EconomicSignalsNotebookEntry,
  NotebookEconomicIndicator,
  NotebookEconomicSourceRolePrefix,
} from "@/content/notebook/schema";

type NotebookSource = EconomicSignalsNotebookEntry["sourceTrail"][number];
type EconomicSignalsFigureProps = Readonly<{
  indicators: readonly NotebookEconomicIndicator[];
  sources: readonly NotebookSource[];
}>;
type SourceRoleSummary = Readonly<{ label: string; note: string }>;

function sourceRoleCount(
  sources: readonly NotebookSource[],
  prefix: NotebookEconomicSourceRolePrefix
): number {
  return sources.filter((source) => source.role.startsWith(prefix)).length;
}

export function EconomicSignalsFigure({
  indicators,
  sources,
}: EconomicSignalsFigureProps) {
  const sourcesById = new Map<string, NotebookSource>(
    sources.map((source) => [source.id, source])
  );
  const requireSource = (sourceId: string): NotebookSource => {
    const source = sourcesById.get(sourceId);
    if (!source) {
      throw new Error(`economic signal missing source ${sourceId}`);
    }
    return source;
  };
  const sourceRoles = [
    {
      label: `${sourceRoleCount(sources, "Primary")} primary observations`,
      note: "The six NBS releases define the observed measures.",
    },
    {
      label: `${sourceRoleCount(sources, "Official")} official synthesis`,
      note: "The government's characterization remains separately labeled.",
    },
    {
      label: `${sourceRoleCount(
        sources,
        "Independent"
      )} independent institutional analyses`,
      note: "Forecasts and structural context are not July measurements.",
    },
    {
      label: `${sourceRoleCount(sources, "Technical")} technical study`,
      note: "Earlier research supplies a mechanism, not a July estimate.",
    },
  ] satisfies readonly SourceRoleSummary[];

  return (
    <figure aria-labelledby="economic-signals-title" className="py-2">
      <figcaption id="economic-signals-title" className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Six July economic signals with separate definitions
        </span>
        <span className="mt-2 block font-serif text-2xl leading-tight">
          Read across the measures; do not add them into a score.
        </span>
        <span className="mt-3 block text-sm leading-6 text-ink-muted">
          Each strip preserves the observation period, comparison, basis,
          coverage, alternative reading, and source limit.
        </span>
      </figcaption>

      <ol className="mt-6 grid gap-6">
        {indicators.map((indicator, index) => (
          <li
            key={indicator.id}
            className="flex min-w-0 flex-col border-t border-rule py-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-jade">
                  Signal {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-tight">
                  {indicator.label}
                </h3>
              </div>
              <NotebookStatus status={indicator.status} />
            </div>

            <p className="mt-5 font-serif text-4xl leading-none text-signal">
              {indicator.display}
            </p>

            <svg
              viewBox="0 0 600 55"
              aria-hidden="true"
              className="mt-5 h-14 w-full text-jade"
            >
              <line x1="20" x2="580" y1="20" y2="20" stroke="currentColor" />
              <line x1="300" x2="300" y1="9" y2="31" stroke="currentColor" />
              <circle
                cx={
                  300 +
                  ((indicator.value -
                    (indicator.comparison === "50-point threshold" ? 50 : 0)) /
                    (indicator.comparison === "50-point threshold"
                      ? 5
                      : Math.max(
                          5,
                          Math.ceil(Math.abs(indicator.value) / 5) * 5
                        ))) *
                    280
                }
                cy="20"
                r="6"
                fill="currentColor"
              />
              <text
                x="300"
                y="50"
                textAnchor="middle"
                fill="currentColor"
                fontSize="14"
              >
                {indicator.comparison === "50-point threshold"
                  ? "50 · expansion threshold"
                  : "0% · no change"}
              </text>
              <text x="20" y="50" fill="currentColor" fontSize="14">
                {indicator.comparison === "50-point threshold"
                  ? "45"
                  : `-${Math.max(5, Math.ceil(Math.abs(indicator.value) / 5) * 5)}%`}
              </text>
              <text
                x="580"
                y="50"
                textAnchor="end"
                fill="currentColor"
                fontSize="14"
              >
                {indicator.comparison === "50-point threshold"
                  ? "55"
                  : `+${Math.max(5, Math.ceil(Math.abs(indicator.value) / 5) * 5)}%`}
              </text>
            </svg>
            <p className="text-sm text-ink-muted">
              {indicator.comparison === "50-point threshold"
                ? "Index shown from 45 to 55; 50 separates expansion from contraction."
                : "Independent strip centered on zero change. Position shows direction; lengths cannot be compared across indicators."}
            </p>
            <dl className="mt-4 grid gap-3 border-y border-rule py-3 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Period
                </dt>
                <dd className="mt-1 text-sm leading-6">{indicator.period}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Comparison
                </dt>
                <dd className="mt-1 text-sm leading-6">
                  {indicator.comparison}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Basis
                </dt>
                <dd className="mt-1 text-sm leading-6">{indicator.basis}</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-6">
              <strong className="text-ink">Observed reading:</strong>{" "}
              {indicator.reading}
            </p>
            <p className="mt-4 border-l-2 border-jade pl-3 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Alternative reading:</strong>{" "}
              {indicator.counterReading}
            </p>

            <p className="mt-3 border-t border-rule pt-3 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Limit:</strong> {indicator.caveat}
            </p>

            <nav
              aria-label={`${indicator.label} references`}
              className="mt-4 flex flex-wrap gap-3"
            >
              {indicator.sourceIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm text-signal underline underline-offset-4"
                >
                  {requireSource(id).publisher}
                </a>
              ))}
            </nav>
            <details className="economic-signal-details mt-4 border-t border-rule">
              <summary className="cursor-pointer py-3 font-mono text-xs uppercase tracking-widest text-signal">
                Method, contrasts, and source
              </summary>
              <div className="pb-1">
                <dl className="grid gap-2 border-t border-rule pt-4">
                  {indicator.contrasts.map((contrast) => (
                    <div
                      key={`${indicator.id}-${contrast.label}`}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm leading-6"
                    >
                      <dt className="text-ink-muted">{contrast.label}</dt>
                      <dd className="text-right font-mono text-ink">
                        {contrast.display}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-sm leading-6 text-ink-muted">
                  <strong className="text-ink">Coverage:</strong>{" "}
                  {indicator.coverage}
                </p>

                <nav
                  aria-label={`${indicator.label} sources`}
                  className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-3"
                >
                  {indicator.sourceIds.map((sourceId) => {
                    const source = requireSource(sourceId);
                    return (
                      <a
                        key={sourceId}
                        href={`#${sourceId}`}
                        aria-label={`Open ${source.role} source record`}
                        className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                      >
                        {source.role}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </details>
          </li>
        ))}
      </ol>
      <section
        aria-labelledby="economic-signals-source-roles"
        className="mt-6 border-y border-rule py-4"
      >
        <h3
          id="economic-signals-source-roles"
          className="font-mono text-xs uppercase tracking-widest text-jade"
        >
          Source roles
        </h3>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {sourceRoles.map((role) => (
            <div key={role.label} className="min-w-0">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink">
                {role.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">
                {role.note}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </figure>
  );
}
