import { FigureSources } from "./figure-sources";
import type { NotebookEntry } from "@/content/notebook/schema";
import type {
  NotebookDistributionCase,
  NotebookMechanismStep,
  NotebookPolicyOption,
  NotebookShockComparison,
} from "@/content/notebook/schema";
import { NotebookStatus } from "@/components/notebook/notebook-status";

export function AdjustmentChainFigure({
  steps,
  sources,
}: {
  steps: NotebookMechanismStep[];
  sources: NotebookEntry["sourceTrail"];
}) {
  return (
    <figure
      aria-labelledby="adjustment-chain-title"
      className="border-y border-rule bg-paper-warm/25 py-6"
    >
      <figcaption id="adjustment-chain-title" className="px-5">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Five-stage adjustment chain
        </span>
        <span className="mt-2 block max-w-3xl text-sm leading-6 text-ink-muted">
          Read in numbered order. The connectors show transmission, not proof
          that any one stage causes the next by itself.
        </span>
      </figcaption>
      <ol className="mt-6 grid gap-3 px-5 xl:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="relative flex min-w-0 flex-col border border-rule bg-paper p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-signal">
                {String(step.order).padStart(2, "0")}
              </span>
              <NotebookStatus status={step.status} />
            </div>
            <h3 className="mt-4 font-serif text-xl leading-tight">
              {step.label}
            </h3>
            <p className="mt-3 text-sm leading-6">{step.definition}</p>
            <dl className="mt-4 space-y-4 border-t border-rule pt-4 text-sm leading-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Measured here
                </dt>
                <dd className="mt-1 text-ink-muted">{step.measuredHere}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Not established
                </dt>
                <dd className="mt-1 text-ink-muted">{step.notEstablished}</dd>
              </div>
            </dl>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-4 font-mono text-lg text-signal xl:absolute xl:-right-3 xl:top-1/2 xl:z-10 xl:mt-0 xl:-translate-y-1/2 xl:bg-paper xl:px-1"
              >
                -&gt;
              </span>
            )}
          </li>
        ))}
      </ol>
      <FigureSources
        ids={[...new Set(steps.flatMap((item) => item.sourceIds))]}
        sources={sources}
      />
    </figure>
  );
}

export function ShockComparisonFigure({
  comparisons,
}: {
  comparisons: NotebookShockComparison[];
}) {
  return (
    <figure aria-labelledby="shock-comparison-title">
      <figcaption id="shock-comparison-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          First-shock and second-shock evidence comparison
        </span>
        <span className="mt-2 block text-sm leading-6 text-ink-muted">
          Paired rows preserve periods and scope. They do not produce a
          similarity score.
        </span>
      </figcaption>
      <div className="mt-5 overflow-x-auto border border-rule">
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm leading-6">
          <thead className="bg-ink text-paper">
            <tr>
              <th className="p-3 font-mono text-xs uppercase tracking-widest">
                Dimension
              </th>
              <th className="p-3 font-mono text-xs uppercase tracking-widest">
                First shock
              </th>
              <th className="p-3 font-mono text-xs uppercase tracking-widest">
                Renewed adjustment
              </th>
              <th className="p-3 font-mono text-xs uppercase tracking-widest">
                Boundary
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item) => (
              <tr key={item.id} className="border-t border-rule align-top">
                <th className="p-3 font-serif text-base">{item.dimension}</th>
                <td className="p-3">{item.firstShock}</td>
                <td className="p-3">{item.secondShock}</td>
                <td className="p-3 text-ink-muted">{item.boundary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function DistributionCasesFigure({
  cases,
}: {
  cases: NotebookDistributionCase[];
}) {
  return (
    <figure aria-labelledby="distribution-cases-title">
      <figcaption id="distribution-cases-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Distribution ledger
        </span>
        <span className="mt-2 block text-sm leading-6 text-ink-muted">
          Benefits and costs can reach the same group at different times.
        </span>
      </figcaption>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {cases.map((item) => (
          <article key={item.id} className="border border-rule p-5">
            <h3 className="font-serif text-xl leading-tight">{item.group}</h3>
            <dl className="mt-4 grid gap-4 text-sm leading-6 sm:grid-cols-2">
              <div className="border-l-2 border-jade pl-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Potential benefit
                </dt>
                <dd className="mt-2">{item.benefit}</dd>
              </div>
              <div className="border-l-2 border-signal pl-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Potential cost
                </dt>
                <dd className="mt-2">{item.cost}</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Scope:</strong> {item.scope}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Limit:</strong> {item.caveat}
            </p>
          </article>
        ))}
      </div>
    </figure>
  );
}

export function PolicyMatrixFigure({
  options,
}: {
  options: NotebookPolicyOption[];
}) {
  return (
    <figure aria-labelledby="policy-matrix-title">
      <figcaption id="policy-matrix-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Policy target matrix
        </span>
        <span className="mt-2 block text-sm leading-6 text-ink-muted">
          These instruments target different problems. Their order is not a
          ranking or recommendation.
        </span>
      </figcaption>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {options.map((option) => (
          <article
            key={option.id}
            className="flex min-w-0 flex-col border border-rule p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="max-w-md font-serif text-xl leading-tight">
                {option.label}
              </h3>
              <NotebookStatus status={option.status} />
            </div>
            <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Target problem
                </dt>
                <dd className="mt-1">{option.targetProblem}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Mechanism
                </dt>
                <dd className="mt-1">{option.mechanism}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Who pays or bears risk
                </dt>
                <dd className="mt-1">{option.payer}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Time horizon
                </dt>
                <dd className="mt-1">{option.timeHorizon}</dd>
              </div>
            </dl>
            <p className="mt-5 border-t border-rule pt-4 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Tradeoff:</strong> {option.tradeoff}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Uncertainty:</strong>{" "}
              {option.uncertainty}
            </p>
          </article>
        ))}
      </div>
    </figure>
  );
}
