import Link from "next/link";
import { SaveButton } from "@/components/dispatch/save-button";
import { evidenceStatusLabels } from "@/content/dossiers";
import type { EvidenceStatus, PublicDispatch } from "@/content/schema";
import { formatDateShort } from "@/content/site";

function uniqueStatuses(dispatch: PublicDispatch): EvidenceStatus[] {
  return [...new Set(dispatch.claims.map((claim) => claim.status))];
}

export function ArchiveRecordCard({ record }: { record: PublicDispatch }) {
  const statuses = uniqueStatuses(record);

  return (
    <article className="rise-in flex min-w-0 flex-col border border-rule bg-paper-warm/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <a
          href={record.canonicalSource.url}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-jade hover:text-signal"
        >
          {record.canonicalSource.publisher} ↗
        </a>
        <time
          dateTime={record.canonicalSource.publishedAt}
          className="font-mono text-xs uppercase tracking-widest text-ink-muted"
        >
          {formatDateShort(record.canonicalSource.publishedAt)}
        </time>
      </div>

      <h3 className="mt-3 font-serif text-xl leading-snug">
        <Link href={`/dispatch/${record.slug}`} className="hover:text-signal">
          {record.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-ink-muted">{record.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Evidence status">
        {statuses.map((status) => (
          <li
            key={status}
            className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted"
          >
            {evidenceStatusLabels[status]}
          </li>
        ))}
      </ul>

      <details
        aria-label="Editorial note"
        className="mt-4 border-y border-rule"
      >
        <summary className="cursor-pointer py-3 font-mono text-xs uppercase tracking-widest text-signal">
          Editorial note
        </summary>
        <div className="space-y-3 pb-4 text-sm leading-6 text-ink-muted">
          <p>{record.commentary}</p>
          <p>
            <strong className="font-semibold text-ink">Why it matters:</strong>{" "}
            {record.whyItMatters}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            {[...record.tags, ...record.places].join(" · ")}
          </p>
        </div>
      </details>

      <div className="mt-auto flex items-center justify-end pt-4">
        <SaveButton id={record.id} />
      </div>
    </article>
  );
}
