import { FigureSources } from "./figure-sources";
import type { NotebookEntry } from "@/content/notebook/schema";
import type { NotebookCirculationGate } from "@/content/notebook/schema";
import { NotebookStatus } from "@/components/notebook/notebook-status";

const gateLabels: Record<NotebookCirculationGate["domain"], string> = {
  trade: "Trade",
  culture: "Culture",
  memory: "Memory",
};

const movementLabels: Record<NotebookCirculationGate["domain"], string> = {
  trade: "Goods",
  culture: "Attention",
  memory: "Public memory",
};

export function CirculationGatesFigure({
  gates,
  sources,
}: {
  gates: readonly NotebookCirculationGate[];
  sources: NotebookEntry["sourceTrail"];
}) {
  return (
    <figure
      aria-labelledby="circulation-gates-title"
      aria-describedby="circulation-gates-note"
      className="border-y border-rule bg-paper-warm/20 px-4 py-7 sm:px-6"
    >
      <figcaption id="circulation-gates-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Two gates that shape circulation
        </span>
        <span className="mt-2 block max-w-3xl font-serif text-2xl leading-tight">
          The same four questions expose two different mechanisms
        </span>
      </figcaption>

      <ol className="mt-7 grid gap-4 lg:grid-cols-2">
        {gates.map((gate, index) => (
          <li
            key={gate.id}
            className="grid min-w-0 grid-rows-[auto_auto_1fr] border-t-2 border-jade py-5 lg:pr-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-signal">
                  Gate {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-serif text-2xl">
                  {gateLabels[gate.domain]}
                </h3>
              </div>
              <div className="grid justify-items-end gap-2">
                <span className="border border-jade px-2 py-1 text-right font-mono text-xs uppercase tracking-widest text-jade">
                  {movementLabels[gate.domain]}
                </span>
                <NotebookStatus status={gate.status} />
              </div>
            </div>

            <p className="mt-4 border-l-2 border-signal pl-3 text-sm leading-6">
              <strong className="font-semibold">Admission rule:</strong>{" "}
              {gate.admissionRule}
            </p>

            <dl className="mt-5 grid content-start gap-4 border-l-2 border-rule pl-4 text-sm leading-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Subject
                </dt>
                <dd className="mt-1">{gate.subject}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Gatekeeper
                </dt>
                <dd className="mt-1">{gate.gatekeeper}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Observed movement
                </dt>
                <dd className="mt-1">{gate.observedMovement}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Outcome
                </dt>
                <dd className="mt-1">{gate.outcome}</dd>
              </div>
              <div className="border-t border-rule pt-4 text-sm leading-6 text-ink-muted">
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Do not overread
                </dt>
                <dd className="mt-1">{gate.caveat}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <p
        id="circulation-gates-note"
        className="mt-6 max-w-4xl border-l-2 border-jade pl-4 font-serif text-base italic leading-7 text-ink-muted"
      >
        These cases are not morally equivalent. The figure compares the
        structure of gatekeeping - subject, gatekeeper, rule, movement, and
        outcome - while preserving the different authority and human stakes of
        each gate.
      </p>
      <FigureSources
        ids={[...new Set(gates.flatMap((item) => item.sourceIds))]}
        sources={sources}
      />
    </figure>
  );
}
