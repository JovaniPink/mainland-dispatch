import { FigureSources } from "./figure-sources";
import type { NotebookEntry } from "@/content/notebook/schema";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import type {
  NotebookTradeFrame,
  NotebookTradePressure,
  NotebookTradeProof,
} from "@/content/notebook/schema";
import { formatDate } from "@/content/site";

const verdictLabels: Record<NotebookTradeProof["verdict"], string> = {
  documented: "Documented",
  "not-publicly-established": "Not publicly established",
};

type TransshipmentEvidenceFigureProps = Readonly<{
  sources: NotebookEntry["sourceTrail"];
  proofs: readonly NotebookTradeProof[];
  pressure: readonly NotebookTradePressure[];
  frames: readonly NotebookTradeFrame[];
}>;

export function TransshipmentEvidenceFigure({
  proofs,
  sources,
  pressure,
  frames,
}: TransshipmentEvidenceFigureProps) {
  return (
    <figure
      aria-labelledby="transshipment-proof-title"
      aria-describedby="transshipment-proof-note"
      className="border-y border-rule bg-paper-warm/20 px-4 py-7 sm:px-6"
    >
      <figcaption id="transshipment-proof-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          The proof path
        </span>
        <span className="mt-2 block max-w-3xl font-serif text-2xl leading-tight sm:text-3xl">
          A route is not a ruling
        </span>
        <span className="mt-3 block max-w-3xl text-sm leading-7 text-ink-muted">
          Each border or production step answers a different question. Evidence
          at one step cannot be carried forward as proof of the next.
        </span>
      </figcaption>

      <ol className="mt-7 grid gap-3 xl:grid-cols-4">
        {proofs.map((proof, index) => (
          <li
            key={proof.id}
            className="relative flex min-w-0 flex-col border border-rule bg-paper p-4"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="absolute -left-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border border-rule bg-paper font-mono text-sm text-signal xl:flex"
              >
                &gt;
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-signal">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={
                  proof.verdict === "documented"
                    ? "border border-jade bg-jade-soft/40 px-2 py-1 font-mono text-xs uppercase tracking-widest text-jade"
                    : "border border-signal bg-signal-soft/30 px-2 py-1 font-mono text-xs uppercase tracking-widest text-signal"
                }
              >
                {verdictLabels[proof.verdict]}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-xl leading-snug">
              {proof.label}
            </h3>
            <dl className="mt-4 space-y-4 text-sm leading-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                  Current record
                </dt>
                <dd className="mt-1 text-ink-muted">{proof.currentRecord}</dd>
              </div>
              <div className="mt-auto border-t border-rule pt-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-signal">
                  Evidence needed
                </dt>
                <dd className="mt-1 text-ink-muted">{proof.proofNeeded}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <FigureSources
        ids={[...new Set(proofs.flatMap((item) => item.sourceIds))]}
        sources={sources}
      />
      <div className="mt-10 border-t border-rule pt-7">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          The pressure sequence
        </p>
        <h3 className="mt-2 max-w-3xl font-serif text-2xl leading-tight">
          Chronology does not prove one hidden cause
        </h3>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pressure.map((event) => (
            <li
              key={event.id}
              className="flex min-w-0 flex-col border-t-2 border-signal bg-paper px-3 pb-4 pt-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <time
                  dateTime={event.date}
                  className="font-mono text-xs uppercase tracking-widest text-signal"
                >
                  {formatDate(event.date)}
                </time>
                <NotebookStatus status={event.status} />
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-jade">
                {event.actor}
              </p>
              <p className="mt-2 font-serif text-lg leading-snug">
                {event.action}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                <strong className="font-semibold text-ink">Limit:</strong>{" "}
                {event.interpretationLimit}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 border-t border-rule pt-7">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          The source-position matrix
        </p>
        <h3 className="mt-2 max-w-3xl font-serif text-2xl leading-tight">
          Five records are answering five different questions
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
          Agreement that China matters does not mean agreement about what has
          happened. Each row keeps the source&apos;s claim beside the boundary
          it cannot cross.
        </p>
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {frames.map((frame, index) => (
            <li
              key={frame.id}
              className="grid gap-4 py-5 lg:grid-cols-[0.7fr_1.15fr_1.15fr] lg:gap-6"
            >
              <div className="min-w-0">
                <span className="font-mono text-xs uppercase tracking-widest text-signal">
                  Record {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-serif text-xl leading-snug">
                  {frame.record}
                </h4>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-jade">
                  {frame.sourceClass}
                </p>
              </div>
              <div className="min-w-0 border-l-2 border-jade pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-jade">
                  What this record establishes
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  <strong className="font-semibold text-ink">It says:</strong>{" "}
                  {frame.says}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {frame.establishes}
                </p>
              </div>
              <div className="min-w-0 border-l-2 border-signal pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-signal">
                  What remains open
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {frame.leavesOpen}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {frame.sourceIds.length} displayed{" "}
                  {frame.sourceIds.length === 1 ? "source" : "sources"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p
        id="transshipment-proof-note"
        className="mt-6 max-w-4xl border-l-2 border-jade pl-4 font-serif text-base italic leading-7 text-ink-muted"
      >
        The record supports a pressure cycle and a stronger US demand for origin
        enforcement. It does not convert sequence into motive, or concern into a
        Canada-specific customs finding.
      </p>
    </figure>
  );
}
