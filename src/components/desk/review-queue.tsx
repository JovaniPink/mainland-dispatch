"use client";

import { useState } from "react";
import { formatDate } from "@/content/site";
import type { Dispatch, EditorialStatus, SourceLead } from "@/content/schema";
import { MetaLine, metaParts } from "@/components/dispatch/meta-line";
import { cn } from "@/lib/utils";

const stages: { id: EditorialStatus; label: string }[] = [
  { id: "draft", label: "Draft" },
  { id: "metadataCheck", label: "Metadata check" },
  { id: "editorialReview", label: "Editorial review" },
  { id: "sourceReview", label: "Source review" },
  { id: "ready", label: "Ready" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
  { id: "corrected", label: "Corrected" },
  { id: "archived", label: "Archived" },
];

/** ADP-style queue/detail split: the selected entry opens its evidence beside the queue. */
export function ReviewQueue({
  queue,
  sourceLeads,
}: {
  /** Review-stage Dispatches, selected on the server. */
  queue: Dispatch[];
  /** Only the source leads that the queued Dispatches reference. */
  sourceLeads: SourceLead[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    queue[0]?.id ?? null
  );
  const selected = queue.find((d) => d.id === selectedId) ?? null;
  const selectedLead = selected
    ? sourceLeads.find((lead) => lead.id === selected.sourceLeadId)
    : undefined;

  const activeStages = stages.filter((s) =>
    queue.some((d) => d.editorialStatus === s.id)
  );

  return (
    <section className="border border-rule p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Review queue
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {activeStages.map((stage) => {
            const items = queue.filter((d) => d.editorialStatus === stage.id);
            return (
              <div key={stage.id}>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  {stage.label} · {items.length}
                </p>
                <ul className="mt-1 divide-y divide-rule border border-rule">
                  {items.map((d) => (
                    <li key={d.id}>
                      <button
                        onClick={() => setSelectedId(d.id)}
                        className={cn(
                          "block w-full px-3 py-2 text-left font-serif text-sm leading-snug",
                          selectedId === d.id
                            ? "bg-signal-soft text-signal"
                            : "hover:bg-paper-warm"
                        )}
                      >
                        {d.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <aside className="self-start border border-rule bg-paper-warm/40 p-4 lg:sticky lg:top-4">
          {selected ? (
            <div className="space-y-3">
              <MetaLine dispatch={selected} />
              <h3 className="font-serif text-xl leading-snug">
                {selected.title}
              </h3>
              <dl className="space-y-2 font-mono text-xs">
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Status
                  </dt>
                  <dd className="text-signal uppercase tracking-widest">
                    {selected.editorialStatus}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Metadata
                  </dt>
                  <dd>{metaParts(selected).join(" · ")}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Dates
                  </dt>
                  <dd>
                    Published {formatDate(selected.canonicalSource.publishedAt)}{" "}
                    · Curated {formatDate(selected.curatedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Source URL
                  </dt>
                  <dd className="break-all">{selected.canonicalSource.url}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Canonical record
                  </dt>
                  <dd>
                    {selected.canonicalSource.publisher} ·{" "}
                    {selected.canonicalSource.title} · retrieved{" "}
                    {formatDate(selected.canonicalSource.retrievedAt)} ·{" "}
                    {selected.canonicalSource.language} ·{" "}
                    {selected.canonicalSource.translationStatus}
                  </dd>
                </div>
              </dl>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  Commentary
                </p>
                <p className="mt-1 font-serif text-sm leading-relaxed">
                  {selected.commentary}
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  Evidence ledger
                </p>
                <ul className="mt-2 space-y-2 text-xs leading-relaxed text-ink-muted">
                  {selected.claims.map((claim) => (
                    <li key={claim.id} className="border-l-2 border-rule pl-2">
                      <span className="font-mono uppercase tracking-widest text-signal">
                        {claim.status}
                      </span>{" "}
                      · {claim.statement}
                      <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-widest">
                        Sources: {claim.sourceIds.join(" · ")}
                      </span>
                      {claim.limitations.length > 0 && (
                        <span className="mt-1 block">
                          Limits: {claim.limitations.join(" ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  Sources and unresolved limitations
                </p>
                <ul className="mt-2 space-y-2 text-xs leading-relaxed text-ink-muted">
                  {[
                    {
                      ...selected.canonicalSource,
                      roleLabel: "canonical source",
                    },
                    ...selected.supportingSources.map((source) => ({
                      ...source,
                      roleLabel: source.role,
                    })),
                  ].map((source) => (
                    <li key={source.id} className="border-l-2 border-rule pl-2">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-sm text-ink hover:text-signal"
                      >
                        {source.publisher} · {source.title} ↗
                      </a>
                      <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-widest">
                        {source.roleLabel}
                      </span>
                      {source.limitations.length > 0 && (
                        <span className="mt-1 block">
                          {source.limitations.join(" ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-signal pl-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
                  Publication blockers
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-ink-muted">
                  <li>Editorial status is {selected.editorialStatus}.</li>
                  <li>
                    Lead review is {selectedLead?.reviewState ?? "missing"};
                    disposition is {selectedLead?.disposition ?? "missing"}; URL
                    status is {selectedLead?.urlStatus ?? "missing"}.
                  </li>
                  {selectedLead?.decisionReason && (
                    <li>{selectedLead.decisionReason}</li>
                  )}
                  {selected.canonicalSource.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
              <p className="border-l-2 border-jade pl-3 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                Public route remains closed until this entry reaches Published
                or Corrected.
              </p>
            </div>
          ) : (
            <p className="font-serif italic text-ink-muted">
              Select an entry to inspect its metadata and evidence.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
