import type { EvidenceWatchNotebookEntry } from "@/content/notebook/schema";
import { evidenceStatusLabels } from "@/content/dossiers";
import { FigureSources } from "./figure-sources";

export function PromiseLedgerFigure({
  entry,
}: {
  entry: EvidenceWatchNotebookEntry;
}) {
  return (
    <figure
      aria-labelledby="promise-ledger-title"
      className="border-y border-rule py-6"
    >
      <figcaption id="promise-ledger-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Public promise ledger
        </span>
        <span className="mt-3 block font-serif text-2xl">
          An offer, its observed record, and the question still open
        </span>
      </figcaption>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Commitments, policy principles, institutional facts, and reported
        proposals require different tests. These rows preserve the dated
        assessment; they are not completion scores.
      </p>
      <ol className="mt-6 divide-y divide-rule">
        {entry.watchItems.map((item) => (
          <li key={item.id} className="grid gap-4 py-5 lg:grid-cols-3">
            <div>
              <p className="font-mono text-xs text-jade">
                {item.claimType.replaceAll("_", " ")} · {item.baselineDate}
              </p>
              <h3 className="mt-2 font-serif text-xl">
                <a
                  className="text-signal underline underline-offset-4"
                  href={`?promise=${item.id}#what-to-watch`}
                >
                  {item.label}
                </a>
              </h3>
              <p className="mt-3 text-sm leading-6">{item.baseline}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-jade">
                Reviewed {item.updateState.reviewedAt} ·{" "}
                {evidenceStatusLabels[item.assessmentStatus]}
              </p>
              <p className="mt-3 text-sm leading-6">{item.whatHasHappened}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-jade">
                Unresolved verification
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6">
                {item.whatRemainsUnknown.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <FigureSources ids={item.sourceIds} sources={entry.sourceTrail} />
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
