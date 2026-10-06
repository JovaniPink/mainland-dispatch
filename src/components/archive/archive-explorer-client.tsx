"use client";

import Link from "next/link";
import { parseArchiveUrl, serializeArchiveUrl } from "@/lib/archive-url";
import { useEffect, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import { evidenceStatusLabels } from "@/content/dossiers";
import type { PublicDiscoveryResult } from "@/content/public-discovery";
import type { DiscoveryInquiry } from "@/content/public-discovery";
import type { ArchiveUrlCatalog } from "@/lib/archive-url";
import { searchDiscovery } from "@/lib/discovery-search";
import {
  DiscoveryResults,
  InquirySources,
  discoveryLabels,
} from "./discovery-results";
import {
  type PublicDispatch,
  type DispatchKind,
  type EvidenceStatus,
  type Vertical,
} from "@/content/schema";
import { kindLabels, verticals } from "@/content/site";
import {
  archiveMachine,
  type ArchiveEvent,
  type ArchiveFilterKey,
  type ArchiveView,
} from "@/machines/archive-machine";
import { cn } from "@/lib/utils";

import { StateLab } from "@/components/state-lab/state-lab";

const views: { id: ArchiveView; label: string; note: string }[] = [
  {
    id: "cards",
    label: "Results",
    note: "Search public inquiries, sources, and Dispatches",
  },
  { id: "timeline", label: "Time", note: "See coverage accumulate" },
  {
    id: "relationships",
    label: "Relationships",
    note: "Follow claims and connected records",
  },
];

const evidenceStatuses = Object.keys(evidenceStatusLabels) as EvidenceStatus[];

function unique(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap border px-3 py-2 font-mono text-xs uppercase tracking-widest",
        active
          ? "border-signal bg-signal-soft/60 text-signal"
          : "border-rule text-ink-muted hover:border-jade hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid gap-1">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 border border-rule bg-paper px-3 py-2 text-xs text-ink focus:border-jade focus:outline-none"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PublishedRelationshipMap({
  records,
  focusId,
  onSelect,
}: {
  records: PublicDispatch[];
  focusId: string;
  onSelect: (id: string) => void;
}) {
  const focus =
    records.find((record) => record.id === focusId) ??
    records.find((record) =>
      record.relatedDispatchIds.some((id) =>
        records.some((candidate) => candidate.id === id)
      )
    ) ??
    records[0];

  if (!focus) {
    return (
      <p className="border border-rule px-4 py-12 text-center font-serif italic text-ink-muted">
        No reviewed records match these relationship filters.
      </p>
    );
  }

  const related = focus.relatedDispatchIds
    .map((id) => records.find((record) => record.id === id))
    .filter((record): record is PublicDispatch => Boolean(record));

  return (
    <section className="mt-6 border border-rule p-4 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-end">
        <label
          htmlFor="archive-focus"
          className="font-mono text-xs uppercase tracking-widest text-ink-muted"
        >
          Focus record
        </label>
        <select
          id="archive-focus"
          value={focus.id}
          onChange={(event) => onSelect(event.target.value)}
          className="min-w-0 border border-rule bg-paper px-3 py-2 text-sm focus:border-jade focus:outline-none"
        >
          {records.map((record) => (
            <option key={record.id} value={record.id}>
              {record.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1.2fr)] lg:items-center">
        <article className="border-2 border-signal bg-signal-soft/25 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Selected record
          </p>
          <h3 className="mt-2 font-serif text-xl leading-snug">
            <Link
              href={`/dispatch/${focus.slug}`}
              className="hover:text-signal"
            >
              {focus.title}
            </Link>
          </h3>
          <p className="mt-3 text-xs leading-5 text-ink-muted">
            {focus.claims.length} classified{" "}
            {focus.claims.length === 1 ? "claim" : "claims"} -{" "}
            {focus.supportingSources.length + 1} cited{" "}
            {focus.supportingSources.length === 0 ? "source" : "sources"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {unique(focus.claims.map((claim) => claim.status)).map((status) => (
              <span
                key={status}
                className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted"
              >
                {evidenceStatusLabels[status]}
              </span>
            ))}
          </div>
        </article>
        <div
          className="hidden text-center font-mono text-xl text-jade lg:block"
          aria-hidden
        >
          &lt;-&gt;
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Explicit public relationships
          </p>
          {related.length > 0 ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((record) => (
                <button
                  type="button"
                  key={record.id}
                  onClick={() => onSelect(record.id)}
                  className="border border-rule p-3 text-left hover:border-jade"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-jade">
                    {record.canonicalSource.publisher}
                  </span>
                  <span className="mt-2 block font-serif leading-snug">
                    {record.title}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 border-l-2 border-rule pl-3 text-sm leading-6 text-ink-muted">
              No related reviewed record is currently public. The absence is
              visible rather than filled with an inferred connection.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ArchiveExplorerClient({
  records: publishedDispatches,
  entries: publicNotebookEntries,
  data,
  catalog,
}: {
  records: PublicDispatch[];
  entries: DiscoveryInquiry[];
  data: PublicDiscoveryResult[];
  catalog: ArchiveUrlCatalog;
}) {
  const latestNotebookEntry = publicNotebookEntries.find(
    (entry) => entry.slug === catalog.latestInquirySlug
  )!;
  const publishers = catalog.publishers;
  const places = catalog.places;
  const years = catalog.years;
  const kinds = catalog.kinds as DispatchKind[];
  const [state, send, actor] = useMachine(archiveMachine, {
    input: { latestInquirySlug: latestNotebookEntry.slug },
  });
  const [notice, setNotice] = useState("");

  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const pendingEvent = useRef<string | null>(null);
  const hasHydrated = useRef(false);

  function dispatch(event: ArchiveEvent) {
    if (!hasHydrated.current) {
      const parsed = parseArchiveUrl(new URL(window.location.href), catalog);
      send({ type: "HYDRATE", filters: parsed.context });
      setNotice(parsed.notice);
      hasHydrated.current = true;
    }
    send(event);
    setLastEvent(event.type);
    pendingEvent.current = event.type;
    if (
      [
        "OPEN_FILTER_PANEL",
        "CLOSE_FILTER_PANEL",
        "TOGGLE_FILTER_PANEL",
        "HYDRATE",
      ].includes(event.type)
    )
      return;
    const next = serializeArchiveUrl(
      new URL(window.location.href),
      actor.getSnapshot().context,
      catalog
    );
    if (
      next !==
      `${window.location.pathname}${window.location.search}${window.location.hash}`
    ) {
      if (event.type === "SEARCH")
        window.history.replaceState(window.history.state, "", next);
      else window.history.pushState(window.history.state, "", next);
    }
  }

  useEffect(() => {
    function restore() {
      hasHydrated.current = true;
      const parsed = parseArchiveUrl(new URL(window.location.href), catalog);
      send({ type: "HYDRATE", filters: parsed.context });
      setNotice(parsed.notice);
      const canonical = serializeArchiveUrl(
        new URL(window.location.href),
        parsed.context,
        catalog
      );
      if (
        canonical !==
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      ) {
        window.history.replaceState(window.history.state, "", canonical);
      }
    }
    const timeout = window.setTimeout(() => {
      if (!hasHydrated.current) restore();
    }, 0);
    window.addEventListener("popstate", restore);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("popstate", restore);
    };
  }, [send, catalog]);

  const context = state.context;

  useEffect(() => {
    if (!pendingEvent.current) return;
    const event = pendingEvent.current;
    pendingEvent.current = null;
    setHistory((items) => [...items.slice(-7), event]);
  }, [context]);

  useEffect(() => {
    const closeFiltersOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && context.filterPanelOpen) {
        dispatch({ type: "CLOSE_FILTER_PANEL" });
      }
    };
    window.addEventListener("keydown", closeFiltersOnEscape);
    return () => window.removeEventListener("keydown", closeFiltersOnEscape);
    // The machine context is the authority for the panel's visible state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.filterPanelOpen]);

  const results = searchDiscovery(context, data);
  const counts = {
    inquiry: results.filter((result) => result.kind === "inquiry").length,
    source: results.filter((result) => result.kind === "source").length,
    dispatch: results.filter((result) => result.kind === "dispatch").length,
  };
  const filtersActive =
    [
      context.vertical,
      context.kind,
      context.evidence,
      context.publisher,
      context.place,
      context.year,
    ].some((value) => value !== "all") || Boolean(context.query);
  const appliedFilters: Array<{
    filter: ArchiveFilterKey;
    label: string;
  }> = [
    ...(context.query
      ? [{ filter: "query" as const, label: `Search: ${context.query}` }]
      : []),
    ...(context.evidence !== "all"
      ? [
          {
            filter: "evidence" as const,
            label: `Evidence: ${evidenceStatusLabels[context.evidence]}`,
          },
        ]
      : []),
    ...(context.year !== "all"
      ? [{ filter: "year" as const, label: `Year: ${context.year}` }]
      : []),
    ...(context.vertical !== "all"
      ? [
          {
            filter: "vertical" as const,
            label: `Topic: ${
              verticals.find((item) => item.id === context.vertical)?.label ??
              context.vertical
            }`,
          },
        ]
      : []),
    ...(context.kind !== "all"
      ? [
          {
            filter: "kind" as const,
            label: `Format: ${kindLabels[context.kind]}`,
          },
        ]
      : []),
    ...(context.publisher !== "all"
      ? [
          {
            filter: "publisher" as const,
            label: `Publisher: ${context.publisher}`,
          },
        ]
      : []),
    ...(context.place !== "all"
      ? [{ filter: "place" as const, label: `Place: ${context.place}` }]
      : []),
  ];
  const selectedInquiry =
    publicNotebookEntries.find((entry) => entry.slug === context.inquirySlug) ??
    latestNotebookEntry;

  return (
    <section aria-labelledby="archive-explorer-title">
      {notice && (
        <p role="status" className="px-4 py-3 text-sm text-signal">
          {notice}
        </p>
      )}
      <div className="border-y border-rule bg-paper-warm/20 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Interactive evidence archive
            </p>
            <h2
              id="archive-explorer-title"
              className="mt-2 font-serif text-2xl sm:text-3xl"
            >
              Explore reviewed records
            </h2>
          </div>
          <p
            className="font-mono text-xs uppercase tracking-widest text-ink-muted"
            aria-live="polite"
          >
            {context.view === "relationships"
              ? context.relationshipMode === "inquiry"
                ? `${selectedInquiry.sourceIds.length} sources for this inquiry`
                : `${publishedDispatches.length} public Dispatches`
              : `${counts.inquiry} inquiries · ${counts.source} sources · ${counts.dispatch} Dispatches`}
          </p>
        </div>

        <label
          className={cn(
            "mt-5 grid gap-1",
            context.view === "relationships" && "hidden"
          )}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Search
          </span>
          <input
            type="search"
            value={context.query}
            placeholder="Sources, claims, people, places..."
            onChange={(event) =>
              dispatch({ type: "SEARCH", query: event.target.value })
            }
            className="min-w-0 border border-rule bg-paper px-3 py-3 text-sm placeholder:text-ink-muted focus:border-jade focus:outline-none"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {views.map((view) => (
                <Chip
                  key={view.id}
                  active={context.view === view.id}
                  onClick={() => dispatch({ type: "SET_VIEW", view: view.id })}
                >
                  {view.label}
                </Chip>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-expanded={context.filterPanelOpen}
            aria-controls="archive-filter-panel"
            onClick={() => dispatch({ type: "TOGGLE_FILTER_PANEL" })}
            className={cn(
              "shrink-0 border border-rule px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal lg:hidden",
              context.view === "relationships" && "hidden"
            )}
          >
            Filters ({appliedFilters.length})
          </button>
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          {views.find((view) => view.id === context.view)?.note}
        </p>

        <div
          style={
            context.view === "relationships" ? { display: "none" } : undefined
          }
          id="archive-filter-panel"
          data-testid="archive-filter-panel"
          data-state={context.filterPanelOpen ? "open" : "closed"}
          className={cn(
            "mt-5 gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-3",
            context.filterPanelOpen ? "grid" : "hidden"
          )}
        >
          <fieldset className="col-span-full grid gap-3 sm:grid-cols-2">
            <legend className="mb-3 text-sm text-jade">
              Publication filters
            </legend>{" "}
            <SelectFilter
              label="Year"
              value={context.year}
              onChange={(year) => dispatch({ type: "FILTER_YEAR", year })}
              options={years.map((year) => ({ value: year, label: year }))}
            />{" "}
            <SelectFilter
              label="Publisher"
              value={context.publisher}
              onChange={(publisher) =>
                dispatch({ type: "FILTER_PUBLISHER", publisher })
              }
              options={publishers.map((publisher) => ({
                value: publisher,
                label: publisher,
              }))}
            />
          </fieldset>
          <fieldset className="col-span-full grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <legend className="mb-3 text-sm text-jade">Dispatch filters</legend>
            <p className="col-span-full text-sm text-ink-muted">
              Evidence, topic, format, and place affect only Dispatch results.
            </p>{" "}
            <SelectFilter
              label="Evidence"
              value={context.evidence}
              onChange={(evidence) =>
                dispatch({
                  type: "FILTER_EVIDENCE",
                  evidence: evidence as EvidenceStatus | "all",
                })
              }
              options={evidenceStatuses.map((status) => ({
                value: status,
                label: evidenceStatusLabels[status],
              }))}
            />{" "}
            <SelectFilter
              label="Topic"
              value={context.vertical}
              onChange={(vertical) =>
                dispatch({
                  type: "FILTER_VERTICAL",
                  vertical: vertical as Vertical | "all",
                })
              }
              options={verticals.map((vertical) => ({
                value: vertical.id,
                label: vertical.label,
              }))}
            />{" "}
            <SelectFilter
              label="Format"
              value={context.kind}
              onChange={(kind) =>
                dispatch({
                  type: "FILTER_KIND",
                  kind: kind as DispatchKind | "all",
                })
              }
              options={kinds.map((kind) => ({
                value: kind,
                label: kindLabels[kind],
              }))}
            />{" "}
            <SelectFilter
              label="Place"
              value={context.place}
              onChange={(place) => dispatch({ type: "FILTER_PLACE", place })}
              options={places.map((place) => ({ value: place, label: place }))}
            />
          </fieldset>
        </div>

        {filtersActive && context.view !== "relationships" && (
          <div className="mt-4" aria-label="Applied filters">
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((item) => (
                <button
                  key={item.filter}
                  type="button"
                  aria-label={`Remove ${item.label}`}
                  onClick={() =>
                    dispatch({ type: "CLEAR_FILTER", filter: item.filter })
                  }
                  className="border border-signal bg-signal-soft/30 px-2 py-1.5 font-mono text-xs uppercase tracking-widest text-signal hover:bg-signal-soft/60"
                >
                  {item.label} x
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
              className="mt-3 font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="px-4 py-6 sm:px-6">
        {context.view !== "relationships" && (
          <>
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Result type">
              {(["all", "inquiry", "source", "dispatch"] as const).map(
                (resultType) => (
                  <Chip
                    key={resultType}
                    active={context.resultType === resultType}
                    onClick={() =>
                      dispatch({ type: "SET_RESULT_TYPE", resultType })
                    }
                  >
                    {resultType === "all"
                      ? "All results"
                      : `${discoveryLabels[resultType]} (${counts[resultType]})`}
                  </Chip>
                )
              )}
            </div>
            <DiscoveryResults
              results={results}
              kind={context.resultType}
              timeline={context.view === "timeline"}
            />
            {results.filter(
              (result) =>
                context.resultType === "all" ||
                result.kind === context.resultType
            ).length === 0 && (
              <div className="my-8 border-t border-rule py-6">
                <p>
                  No public inquiries, admitted sources, or Dispatches match
                  this scope.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "CLEAR_ALL_FILTERS" });
                  }}
                  className="mt-3 mr-5 text-signal"
                >
                  Clear filters
                </button>
                <Link href="/notebooks" className="text-signal">
                  Browse inquiries
                </Link>
              </div>
            )}
          </>
        )}
        {context.view === "relationships" && (
          <>
            <div
              className="mb-6 flex flex-wrap gap-3"
              aria-label="Relationship scope"
            >
              <Chip
                active={context.relationshipMode === "inquiry"}
                onClick={() =>
                  dispatch({
                    type: "SET_RELATIONSHIP_MODE",
                    relationshipMode: "inquiry",
                  })
                }
              >
                Inquiry and its sources
              </Chip>
              <Chip
                active={context.relationshipMode === "dispatch"}
                onClick={() =>
                  dispatch({
                    type: "SET_RELATIONSHIP_MODE",
                    relationshipMode: "dispatch",
                  })
                }
              >
                Dispatch connections
              </Chip>
            </div>
            {context.relationshipMode === "inquiry" ? (
              <>
                <div className="mb-4 grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-end">
                  <label
                    htmlFor="archive-inquiry"
                    className="font-mono text-xs uppercase tracking-widest text-ink-muted"
                  >
                    Notebook inquiry
                  </label>
                  <select
                    id="archive-inquiry"
                    value={selectedInquiry.slug}
                    onChange={(event) =>
                      dispatch({
                        type: "SELECT_INQUIRY",
                        inquirySlug: event.target.value,
                      })
                    }
                    className="min-w-0 border border-rule bg-paper px-3 py-2 text-sm focus:border-jade focus:outline-none"
                  >
                    {publicNotebookEntries.map((entry) => (
                      <option key={entry.slug} value={entry.slug}>
                        Inquiry {String(entry.ordinal).padStart(2, "0")} -{" "}
                        {entry.title}
                      </option>
                    ))}
                  </select>
                </div>
                <InquirySources entry={selectedInquiry} data={data} />
              </>
            ) : (
              <>
                <p className="text-sm text-ink-muted">
                  Explore explicit links across {publishedDispatches.length}{" "}
                  public Dispatches. Search and result filters do not change
                  these connections.
                </p>
                <PublishedRelationshipMap
                  records={publishedDispatches}
                  focusId={context.focusId}
                  onSelect={(focusId) =>
                    dispatch({ type: "SELECT_FOCUS", focusId })
                  }
                />
              </>
            )}
          </>
        )}
      </div>

      <StateLab
        title="Archive explorer machine"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "SET_VIEW",
          "FILTER_VERTICAL",
          "FILTER_KIND",
          "FILTER_EVIDENCE",
          "FILTER_PUBLISHER",
          "FILTER_PLACE",
          "FILTER_YEAR",
          "SEARCH",
          "SELECT_FOCUS",
          "SELECT_INQUIRY",
          "OPEN_FILTER_PANEL",
          "CLOSE_FILTER_PANEL",
          "TOGGLE_FILTER_PANEL",
          "CLEAR_FILTER",
          "CLEAR_ALL_FILTERS",
          "RESET",
        ]}
        history={history}
      />
    </section>
  );
}
