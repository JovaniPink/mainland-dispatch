import type { ArgumentNotebookEntry } from "@/content/notebook/schema";
import { NotebookStatus } from "./notebook-status";
import { FigureSources } from "./figure-sources";

export function AttributedArgumentFigure({
  entry,
}: {
  entry: ArgumentNotebookEntry;
}) {
  return (
    <figure
      aria-labelledby="attributed-argument-title"
      className="border-y border-rule py-6"
    >
      <figcaption id="attributed-argument-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Rudd&apos;s argument · editorial reconstruction
        </span>
        <span className="mt-3 block font-serif text-2xl">
          A model of political priorities, with its evidentiary limits attached
        </span>
      </figcaption>
      <ol className="mt-6 grid gap-6">
        {entry.turningPoints.map((point) => (
          <li
            key={point.id}
            className="grid gap-4 border-t border-rule pt-4 md:grid-cols-[1fr_auto_1fr]"
          >
            <div>
              <NotebookStatus status={point.status} />
              {point.seconds !== undefined && (
                <a
                  href={`https://www.youtube.com/watch?v=DprKDXRlubw&t=${point.seconds}s`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-3 text-sm text-signal underline underline-offset-4"
                >
                  {point.timecode}
                </a>
              )}
              <h3 className="mt-2 font-serif text-xl">{point.title}</h3>
              <p className="mt-3 text-sm leading-6">
                <strong>Rudd&apos;s premise:</strong> {point.argument}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="w-fit rotate-90 self-center text-2xl text-jade md:rotate-0"
            >
              →
            </span>
            <p className="self-center text-sm leading-6 text-ink-muted">
              <strong>Editorial reading and limit:</strong> {point.reading}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm text-ink-muted">
        Arrows connect an attributed argument to its interpretation. They do not
        establish a causal chain or a forecast.
      </p>
      <FigureSources
        ids={[
          ...new Set(entry.turningPoints.flatMap((point) => point.sourceIds)),
        ]}
        sources={entry.sourceTrail}
      />
    </figure>
  );
}
