"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { EvidenceWatchNotebookEntry } from "@/content/notebook/schema";
import { evidenceStatusLabels } from "@/content/dossiers";
import {
  notifyPromiseSelection,
  resolvePromiseSelection,
  setPromiseSelection,
  subscribeToPromiseState,
} from "@/lib/notebook-promise";
import { cn } from "@/lib/utils";

const claimTypeLabels = {
  commitment: "Future commitment",
  institutional_fact: "Institutional fact",
  policy_principle: "Policy principle",
  observed_condition: "Observed condition",
  reported_proposal: "Reported proposal",
} as const;

export function WhatToWatch({ entry }: { entry: EvidenceWatchNotebookEntry }) {
  const defaultId = entry.watchItems[0].id;
  const validIds = useMemo(
    () => new Set(entry.watchItems.map((item) => item.id)),
    [entry.watchItems]
  );
  const search = useSyncExternalStore(
    subscribeToPromiseState,
    () => window.location.search,
    () => ""
  );
  const selection = resolvePromiseSelection({
    search,
    validIds,
    fallbackId: defaultId,
  });

  useEffect(() => {
    if (!selection.invalidValue) return;
    window.history.replaceState(
      {},
      "",
      setPromiseSelection({ href: window.location.href, promiseId: null })
    );
    notifyPromiseSelection();
  }, [selection.invalidValue]);

  const selected =
    entry.watchItems.find((item) => item.id === selection.selectedId) ??
    entry.watchItems[0];
  const sources = selected.sourceIds.map((sourceId) => {
    const source = entry.sourceTrail.find((item) => item.id === sourceId);
    if (!source) throw new Error(`Unresolved watch source: ${sourceId}`);
    return source;
  });
  const updateSources = (sourceIds: string[]) =>
    sourceIds.map((sourceId) => {
      const source = entry.sourceTrail.find((item) => item.id === sourceId);
      if (!source)
        throw new Error(`Unresolved watch update source: ${sourceId}`);
      return source;
    });

  function select(promiseId: string) {
    if (!validIds.has(promiseId)) return;
    window.history.replaceState(
      {},
      "",
      setPromiseSelection({ href: window.location.href, promiseId })
    );
    notifyPromiseSelection();
  }

  return (
    <div>
      <ul className="grid gap-2 sm:grid-cols-2" aria-label="What to watch">
        {entry.watchItems.map((item, index) => {
          const active = selected.id === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => select(item.id)}
                className={cn(
                  "grid h-full w-full min-w-0 gap-2 border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                  active
                    ? "border-signal bg-signal-soft/30"
                    : "border-rule hover:border-jade"
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-jade">
                    Watch {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-right font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {claimTypeLabels[item.claimType]}
                  </span>
                </span>
                <strong className="font-serif text-lg leading-snug">
                  {item.label}
                </strong>
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {evidenceStatusLabels[item.assessmentStatus]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <article
        className="mt-4 border-l-2 border-signal bg-paper-warm/35 p-5 sm:p-6"
        aria-live="polite"
        aria-labelledby="selected-watch-title"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              {claimTypeLabels[selected.claimType]}
            </p>
            <h3
              id="selected-watch-title"
              className="mt-2 font-serif text-2xl leading-tight"
            >
              {selected.label}
            </h3>
          </div>
          <span className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted">
            {evidenceStatusLabels[selected.assessmentStatus]}
          </span>
        </div>

        <dl className="mt-5 grid gap-5">
          <div>
            <dt className="sr-only">Baseline details</dt>
            <dd>
              <dl className="grid gap-4 border-b border-rule pb-5 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                    Responsible actor
                  </dt>
                  <dd className="mt-2 text-sm leading-6">
                    {selected.responsibleActor}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                    Baseline date
                  </dt>
                  <dd className="mt-2 font-mono text-xs">
                    {selected.baselineDate}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-jade">
                    Delivery window
                  </dt>
                  <dd className="mt-2 text-sm leading-6">
                    {selected.deliveryWindow}
                  </dd>
                </div>
              </dl>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-jade">
              Exact baseline
            </dt>
            <dd className="mt-2 text-sm leading-7">{selected.baseline}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-jade">
              What has happened
            </dt>
            <dd className="mt-2 text-sm leading-7">
              {selected.whatHasHappened}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-jade">
              Update record
            </dt>
            <dd className="mt-2">
              {selected.updateState.state === "no-verified-change" ? (
                <div className="border border-rule bg-paper/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="font-serif text-lg">
                      No verified change
                    </strong>
                    <time
                      dateTime={selected.updateState.reviewedAt}
                      className="font-mono text-xs uppercase tracking-widest text-ink-muted"
                    >
                      Reviewed {selected.updateState.reviewedAt}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    No later evidence in the reviewed source trail changes this
                    record’s assessment. The original baseline remains intact.
                  </p>
                </div>
              ) : (
                <ol className="grid gap-3" aria-label="Dated verified updates">
                  {selected.updateState.updates.map((update) => {
                    const sourcesForUpdate = updateSources(update.sourceIds);
                    return (
                      <li
                        key={update.id}
                        className="border border-rule bg-paper/70 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <time
                            dateTime={update.date}
                            className="font-mono text-xs uppercase tracking-widest text-signal"
                          >
                            {update.date}
                          </time>
                          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                            {evidenceStatusLabels[update.status]}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6">
                          {update.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {sourcesForUpdate.flatMap((source) =>
                            source.links.slice(0, 1).map((link) => (
                              <a
                                key={source.id}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                              >
                                Update source: {source.publisher} ↗
                              </a>
                            ))
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </dd>
          </div>
          <WatchList
            label="What remains unknown"
            items={selected.whatRemainsUnknown}
          />
          <div>
            <dt className="sr-only">Assessment tests</dt>
            <dd>
              <dl className="grid gap-5 sm:grid-cols-2">
                <WatchList
                  label="Would strengthen the assessment"
                  items={selected.wouldStrengthen}
                />
                <WatchList
                  label="Would weaken the assessment"
                  items={selected.wouldWeaken}
                />
              </dl>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-jade">
              Baseline supporting records
            </dt>
            <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {sources.flatMap((source) =>
                source.links.slice(0, 1).map((link) => (
                  <a
                    key={source.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                  >
                    {source.publisher} ↗
                  </a>
                ))
              )}
            </dd>
          </div>
        </dl>
      </article>
    </div>
  );
}

function WatchList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest text-jade">
        {label}
      </dt>
      <dd>
        <ul className="mt-2 grid gap-2 text-sm leading-6 text-ink-muted">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-signal" aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
