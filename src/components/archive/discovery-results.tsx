import Link from "next/link";
import type {
  DiscoveryKind,
  PublicDiscoveryResult,
  SourceResult,
} from "@/content/public-discovery";
import type { DiscoveryInquiry } from "@/content/public-discovery";
import { formatDate } from "@/content/site";
import { ArchiveRecordCard } from "./archive-record-card";
import { SaveButton } from "@/components/dispatch/save-button";

export const discoveryLabels: Record<DiscoveryKind, string> = {
  inquiry: "Inquiries",
  source: "Sources",
  dispatch: "Dispatches",
};

export function DiscoveryCard({ result }: { result: PublicDiscoveryResult }) {
  if (result.kind === "dispatch")
    return <ArchiveRecordCard record={result.record} />;
  return (
    <article className="min-w-0 border-t border-rule py-5">
      <p className="font-mono text-xs uppercase tracking-widest text-jade">
        {result.kind === "inquiry" ? "Inquiry" : "Source"} · {result.publisher}
      </p>
      <h3 className="mt-2 font-serif text-2xl leading-tight">
        <Link href={result.href} className="hover:text-signal">
          {result.title}
        </Link>
      </h3>
      <p className="mt-2 text-xs text-ink-muted">
        {result.publishedAt
          ? `Published ${formatDate(result.publishedAt)}`
          : "Publication date not stated"}
        {result.reviewedAt && ` · Reviewed ${formatDate(result.reviewedAt)}`}
        {result.kind === "source" &&
          ` · Retrieved ${formatDate(result.retrievedAt)}`}
      </p>
      {result.kind === "inquiry" ? (
        <>
          <p className="mt-3 max-w-[70ch] text-sm leading-6">
            {result.summary}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Link
              href={result.href}
              className="inline-flex min-h-11 items-center text-sm text-signal"
            >
              Read inquiry · {result.readTime}
            </Link>
            <SaveButton
              target={{ kind: "notebook", id: result.slug }}
              title={result.title}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {result.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm text-signal"
              >
                {link.label}
              </a>
            ))}
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer py-2 text-sm text-jade">
              Used in {result.uses.length}{" "}
              {result.uses.length === 1 ? "publication" : "publications"}:
              context and limits
            </summary>
            <ul className="space-y-4">
              {result.uses.map((use) => (
                <li
                  key={`${use.kind}:${use.id}`}
                  className="border-l-2 border-rule pl-3 text-sm leading-6"
                >
                  <Link href={use.href} className="text-signal">
                    Read in context: {use.title}
                  </Link>
                  <p className="text-xs text-ink-muted">
                    {use.publishedAt
                      ? `Published ${formatDate(use.publishedAt)}`
                      : "Publication date not stated"}{" "}
                    · Retrieved {formatDate(use.retrievedAt)}
                  </p>
                  <p>{use.context}</p>
                  {use.limitations.map((limit, i) => (
                    <p key={i} className="text-ink-muted">
                      <strong>Limit: </strong>
                      {limit}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </article>
  );
}

export function DiscoveryResults({
  results,
  kind,
  timeline,
}: {
  results: PublicDiscoveryResult[];
  kind: DiscoveryKind | "all";
  timeline: boolean;
}) {
  const shown = results.filter(
    (result) => kind === "all" || result.kind === kind
  );
  const groups = timeline
    ? [
        ...new Set(
          shown.map(
            (result) => result.publishedAt?.slice(0, 4) ?? "Undated sources"
          )
        ),
      ].sort((a, b) =>
        a === "Undated sources"
          ? 1
          : b === "Undated sources"
            ? -1
            : b.localeCompare(a)
      )
    : ["inquiry", "source", "dispatch"].filter(
        (type) => kind === "all" || kind === type
      );
  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const items = shown.filter((result) =>
          timeline
            ? (result.publishedAt?.slice(0, 4) ?? "Undated sources") === group
            : result.kind === group
        );
        return (
          <section
            key={group}
            aria-label={
              timeline ? group : discoveryLabels[group as DiscoveryKind]
            }
          >
            <h2 className="mb-4 font-serif text-2xl">
              {timeline ? group : discoveryLabels[group as DiscoveryKind]}{" "}
              <span className="font-mono text-sm text-ink-muted">
                ({items.length})
              </span>
            </h2>
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              {items.map((result) => (
                <DiscoveryCard key={result.id} result={result} />
              ))}
            </div>
            {items.length === 0 && (
              <p className="text-sm text-ink-muted">
                No matches in this group.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function InquirySources({
  entry,
  data,
}: {
  entry: DiscoveryInquiry;
  data: PublicDiscoveryResult[];
}) {
  const ids = new Set(entry.sourceIds);
  const sources = data.filter(
    (result): result is SourceResult =>
      result.kind === "source" && ids.has(result.id)
  );
  const otherUses = new Map(
    sources.flatMap((source) =>
      source.uses
        .filter((use) => use.kind === "notebook" && use.id !== entry.slug)
        .map((use) => [use.id, use] as const)
    )
  );
  return (
    <section aria-label="Inquiry and its sources">
      <p className="font-mono text-xs uppercase tracking-widest text-jade">
        Inquiry and its sources · {sources.length} admitted sources
      </p>
      <h3 className="mt-3 font-serif text-3xl">
        <Link href={`/notebook/${entry.slug}`} className="hover:text-signal">
          {entry.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-[70ch] text-base leading-7">
        {entry.description}
      </p>
      {otherUses.size > 0 && (
        <div className="mt-5 border-l-2 border-jade pl-4">
          <h4 className="font-serif text-xl">
            Other inquiries using these same sources
          </h4>
          <ul>
            {[...otherUses.values()].map((use) => (
              <li key={use.id}>
                <Link
                  href={use.href}
                  className="inline-flex min-h-11 items-center text-sm text-signal"
                >
                  {use.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-muted">
            A shared source identifies a common reference, not agreement between
            the inquiries.
          </p>
        </div>
      )}
      <div className="mt-6 grid gap-x-8 md:grid-cols-2">
        {sources.map((source) => (
          <DiscoveryCard key={source.id} result={source} />
        ))}
      </div>
    </section>
  );
}
