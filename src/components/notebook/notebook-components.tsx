import type { NotebookEntry } from "@/content/notebook/schema";

type NotebookFormat = NotebookEntry["formats"][number];
type NotebookSource = NotebookEntry["sourceTrail"][number];

export function NotebookProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-[70ch] space-y-5 text-lg leading-[1.65] text-ink">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function NotebookSectionHeading({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <header id={id} className="scroll-mt-32 border-t border-rule pt-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-jade">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
        {children}
      </h2>
    </header>
  );
}

export function NotebookFormats({ formats }: { formats: NotebookFormat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {formats.map((format) => (
        <a
          key={format.id}
          href={format.url}
          target="_blank"
          rel="noreferrer"
          className="group flex min-w-0 flex-col border border-rule bg-paper-warm/35 p-4 hover:border-signal"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            {format.label}
          </span>
          <strong className="mt-3 font-serif text-lg leading-snug group-hover:text-signal">
            {format.title}
          </strong>
          <span className="mt-2 text-xs leading-relaxed text-ink-muted">
            {format.publisher}
          </span>
          {format.duration && (
            <span className="mt-1 font-mono text-xs text-jade">
              {format.duration}
            </span>
          )}
          <span className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-muted">
            Retrieved {format.retrievedAt}
          </span>
          <span className="mt-4 text-sm leading-relaxed text-ink-muted">
            {format.note}
          </span>
        </a>
      ))}
    </div>
  );
}

export function NotebookSourceTrail({
  sources,
  headingId = "source-trail",
}: {
  sources: NotebookSource[];
  headingId?: string;
}) {
  return (
    <div id={headingId} className="scroll-mt-32 grid gap-3">
      {sources.map((source, index) => (
        <article
          key={source.id}
          id={source.id}
          className="scroll-mt-32 border border-rule bg-paper-warm/20 p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              {String(index + 1).padStart(2, "0")} - {source.role}
            </p>
            <div className="flex flex-wrap gap-x-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
              {source.publishedAt && <span>{source.publishedAt}</span>}
              {source.retrievedAt && (
                <span>Retrieved {source.retrievedAt}</span>
              )}
            </div>
          </div>
          <h3 className="mt-2 font-serif text-lg leading-snug">
            {source.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            {[source.author, source.publisher].filter(Boolean).join(" - ")}
          </p>
          <p className="mt-3 text-sm leading-6">{source.context}</p>
          {source.limitation && (
            <p className="mt-3 border-l-2 border-signal pl-3 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Limit:</strong> {source.limitation}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {source.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
