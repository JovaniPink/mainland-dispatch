"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import type {
  AtlasRelease,
  AtlasSeries,
  EvidenceStatus,
  SignalStep,
} from "@/content/schema";
import { evidenceStatusLabels } from "@/content/dossiers";
import { getStepScope } from "@/content/atlas-selectors";
import { atlasMachine, type AtlasEvent } from "@/machines/atlas-machine";
import { formatDate } from "@/content/site";
import { StateLab } from "@/components/state-lab/state-lab";
import { MapDialog, type AtlasMapStatus } from "./map-dialog";
import { RelationDiagram } from "./relation-diagram";
import { TradeChart } from "./trade-chart";

const statusTone: Record<EvidenceStatus, string> = {
  reported: "border-rule text-ink-muted",
  officiallyAnnounced: "border-jade text-jade",
  implemented: "border-jade bg-jade-soft text-jade",
  independentlyObserved: "border-jade bg-jade-soft text-jade",
  contested: "border-signal bg-signal-soft text-signal",
  superseded: "border-rule text-ink-muted line-through",
  corrected: "border-signal text-signal",
};

function unique(values: string[]) {
  return [...new Set(values)];
}

function seriesForStep(series: AtlasSeries, step: SignalStep): AtlasSeries {
  return {
    ...series,
    annotations: series.annotations.filter((annotation) =>
      step.eventIds.includes(annotation.eventId)
    ),
  };
}

export function AtlasExplorer({ release }: { release: AtlasRelease }) {
  const input = useMemo(() => {
    const stepIdsByChain = Object.fromEntries(
      release.chains.map((chain) => [
        chain.slug,
        chain.steps.map((step) => step.id),
      ])
    );
    const placeIdsByStep = Object.fromEntries(
      release.chains.flatMap((chain) =>
        chain.steps.map((step) => [step.id, step.placeIds])
      )
    );
    const monthsByStep = Object.fromEntries(
      release.chains.flatMap((chain) =>
        chain.steps.map((step) => [
          step.id,
          unique(
            release.series
              .filter((series) => step.seriesIds.includes(series.id))
              .flatMap((series) =>
                series.observations.map((observation) => observation.month)
              )
          ).sort(),
        ])
      )
    );
    return {
      chainSlugs: release.chains.map((chain) => chain.slug),
      stepIdsByChain,
      placeIdsByStep,
      monthsByStep,
    };
  }, [release]);
  const [state, send] = useMachine(atlasMachine, { input });
  const [hydrated, setHydrated] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const pendingEvent = useRef<string | null>(null);
  const hasInteracted = useRef(false);

  function dispatch(event: AtlasEvent) {
    hasInteracted.current = true;
    send(event);
    setLastEvent(event.type);
    pendingEvent.current = event.type;
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (!hasInteracted.current) {
        const event: AtlasEvent = {
          type: "HYDRATE",
          chain: params.get("chain"),
          step: params.get("step"),
          place: params.get("place"),
          month: params.get("month"),
        };
        send(event);
        setLastEvent(event.type);
        pendingEvent.current = event.type;
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
    // Query hydration is intentionally a one-time machine event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    selectedChain,
    selectedStepId,
    selectedPlace,
    selectedMonth,
    metric,
  } = state.context;

  useEffect(() => {
    if (!pendingEvent.current) return;
    const event = pendingEvent.current;
    pendingEvent.current = null;
    setHistory((items) => [
      ...items.slice(-7),
      `${event} → ${JSON.stringify(state.value)}`,
    ]);
  }, [
    metric,
    selectedChain,
    selectedMonth,
    selectedPlace,
    selectedStepId,
    state.value,
  ]);

  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    url.searchParams.set("chain", selectedChain);
    url.searchParams.set("step", selectedStepId);
    if (selectedPlace) url.searchParams.set("place", selectedPlace);
    else url.searchParams.delete("place");
    if (selectedMonth) url.searchParams.set("month", selectedMonth);
    else url.searchParams.delete("month");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }, [hydrated, selectedChain, selectedMonth, selectedPlace, selectedStepId]);

  const chain =
    release.chains.find((item) => item.slug === selectedChain) ??
    release.chains[0];
  const step =
    chain.steps.find((item) => item.id === selectedStepId) ?? chain.steps[0];
  const scope = getStepScope(release, step);
  const selectedPlaceRecord = scope.places.find(
    (item) => item.id === selectedPlace
  );
  const scopedSeries = scope.series.map((series) =>
    seriesForStep(series, step)
  );
  const selectedObservation = scopedSeries
    .flatMap((series) => series.observations)
    .find((observation) => observation.month === selectedMonth);
  const sourceIds = unique([
    ...scope.sourceIds,
    ...scope.series.flatMap((series) => series.sourceIds),
    ...(selectedPlaceRecord?.sourceIds ?? []),
    ...(selectedObservation?.sourceIds ?? []),
  ]);
  const sources = release.sources.filter((source) =>
    sourceIds.includes(source.id)
  );
  const mapStatus: AtlasMapStatus = state.matches({ map: "closed" })
    ? "closed"
    : state.matches({ map: "loading" })
      ? "loading"
      : state.matches({ map: "ready" })
        ? "ready"
        : state.matches({ map: "degraded" })
          ? "degraded"
          : "failed";

  function selectChain(slug: string) {
    dispatch({ type: "CLOSE_MAP" });
    dispatch({ type: "SELECT_CHAIN", slug });
  }

  function selectStep(id: string) {
    dispatch({ type: "CLOSE_MAP" });
    dispatch({ type: "SELECT_STEP", id });
  }

  return (
    <div className="mt-10 space-y-12">
      <section aria-labelledby="chain-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Signals together
            </p>
            <h2
              id="chain-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl"
            >
              Choose an evidence chain
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "CLOSE_MAP" });
              dispatch({ type: "RESET" });
            }}
            className="border border-rule px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-signal hover:text-signal"
          >
            Reset evidence view
          </button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {release.chains.map((item) => {
            const active = item.slug === chain.slug;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectChain(item.slug)}
                className={`text-left border p-4 transition-colors ${
                  active
                    ? "border-signal bg-signal-soft/40"
                    : "border-rule bg-paper-warm/25 hover:bg-paper-warm/60"
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-jade">
                  {item.eyebrow}
                </span>
                <span className="mt-2 block font-serif text-lg leading-snug">
                  {item.title}
                </span>
                <span
                  className={`mt-3 inline-block border px-2 py-0.5 font-mono text-xs uppercase tracking-widest ${statusTone[item.evidenceStatus]}`}
                >
                  {evidenceStatusLabels[item.evidenceStatus]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="steps-heading">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Selected chain
        </p>
        <h2 id="steps-heading" className="mt-2 font-serif text-2xl sm:text-3xl">
          {chain.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
          {chain.summary}
        </p>

        <ol className="relative mt-6 grid gap-3 before:absolute before:top-7 before:bottom-7 before:left-[1.45rem] before:w-px before:bg-rule md:grid-cols-4 md:gap-0 md:before:top-[1.45rem] md:before:right-7 md:before:bottom-auto md:before:left-7 md:before:h-px md:before:w-auto">
          {chain.steps.map((item, index) => {
            const active = item.id === step.id;
            const itemScope = getStepScope(release, item);
            return (
              <li key={item.id} className="relative md:px-1">
                <button
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => selectStep(item.id)}
                  className={`relative h-full w-full border p-4 pl-14 text-left transition-colors md:min-h-72 md:p-4 md:pt-14 ${
                    active
                      ? "border-signal bg-signal-soft/35"
                      : "border-rule bg-paper hover:bg-paper-warm/45"
                  }`}
                >
                  <span
                    className={`absolute top-3 left-3 z-10 grid h-8 w-8 place-items-center rounded-full border font-mono text-xs md:left-4 ${
                      active
                        ? "border-signal bg-signal-fill text-[#f3f0e8]"
                        : "border-jade bg-paper text-jade"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-jade">
                    {item.code}
                  </span>
                  <span className="mt-2 block font-serif text-lg leading-snug">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-muted">
                    {item.detail}
                  </span>
                  <span className="mt-4 block font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-muted">
                    {item.date ? `${formatDate(item.date)} · ` : ""}
                    {itemScope.sourceIds.length} source
                    {itemScope.sourceIds.length === 1 ? "" : "s"}
                  </span>
                  <span
                    className={`mt-2 inline-block border px-2 py-0.5 font-mono text-xs uppercase tracking-widest ${statusTone[item.evidenceStatus]}`}
                  >
                    {evidenceStatusLabels[item.evidenceStatus]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        aria-labelledby="step-detail-heading"
        className="border-y border-rule py-7"
      >
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.7fr)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Step evidence · {step.code}
            </p>
            <h2
              id="step-detail-heading"
              className="mt-2 font-serif text-3xl leading-tight"
            >
              {step.label}
            </h2>
            <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed">
              {step.detail}
            </p>
            {scope.events.length > 0 && (
              <div className="mt-6 space-y-3">
                {scope.events.map((event) => (
                  <article
                    key={event.id}
                    className="border-l-2 border-jade pl-4"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      {formatDate(event.date)} ·{" "}
                      {evidenceStatusLabels[event.evidenceStatus]}
                    </p>
                    <h3 className="mt-1 font-serif text-lg">{event.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {event.detail}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
          <aside className="bg-paper-warm/35 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              What the chain supports
            </p>
            <p className="mt-2 font-serif text-lg leading-relaxed">
              {chain.conclusion}
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-signal">
              What it does not prove
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {chain.caveat}
            </p>
          </aside>
        </div>
      </section>

      {scope.places.length === 1 && (
        <section
          aria-labelledby="place-heading"
          className="border border-rule p-5"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Place named in this step
          </p>
          <h2 id="place-heading" className="mt-2 font-serif text-2xl">
            {scope.places[0].label}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {scope.places[0].role}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
            {scope.places[0].precision} precision · no geographic relation
            asserted
          </p>
        </section>
      )}

      {scope.mapEligible && (
        <section aria-labelledby="relations-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-jade">
                Documented geography
              </p>
              <h2
                id="relations-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl"
              >
                Relationships in this step
              </h2>
            </div>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-controls="atlas-map-dialog"
              onClick={() => dispatch({ type: "OPEN_MAP" })}
              className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Explore geographic context…
            </button>
          </div>
          <div className="mt-5">
            <RelationDiagram
              places={scope.places}
              relations={scope.relations}
              selectedId={selectedPlace}
              onSelect={(id) => dispatch({ type: "SELECT_PLACE", id })}
            />
          </div>
          {selectedPlace && (
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_PLACE" })}
              className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
            >
              Clear location focus →
            </button>
          )}
        </section>
      )}

      {scope.places.length > 1 && !scope.mapEligible && (
        <section aria-labelledby="places-heading">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Places named in this step
          </p>
          <h2 id="places-heading" className="mt-2 font-serif text-2xl">
            Location record
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {scope.places.map((place) => (
              <article key={place.id} className="border border-rule p-4">
                <h3 className="font-serif text-lg">{place.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {place.role}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {scopedSeries.map((series) => (
        <section key={series.id} aria-labelledby={`notebook-${series.id}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-jade">
                Quantitative context
              </p>
              <h2
                id={`notebook-${series.id}`}
                className="mt-2 font-serif text-2xl sm:text-3xl"
              >
                {series.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {series.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["value", "yoy"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={metric === item}
                  onClick={() => dispatch({ type: "SET_METRIC", metric: item })}
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-widest ${metric === item ? "border-signal bg-signal-soft text-signal" : "border-rule text-ink-muted hover:text-ink"}`}
                >
                  {item === "value" ? "Monthly value" : "Year over year"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <TradeChart
              series={series}
              metric={metric}
              selectedMonth={selectedMonth}
              onSelectMonth={(month) =>
                dispatch({ type: "SELECT_MONTH", month })
              }
            />
          </div>
          <div className="mt-5 grid gap-4 border-y border-rule py-4 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                Interpretation boundary
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
                Month selection is a chart cursor, not an evidence-as-of
                reconstruction. Aggregate estimated observations cannot
                establish policy causation.
              </p>
            </div>
            <a
              href={series.downloadPath}
              download
              className="self-start border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Download snapshot ↓
            </a>
          </div>
        </section>
      ))}

      <section aria-labelledby="sources-heading">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Source ledger
        </p>
        <h2
          id="sources-heading"
          className="mt-2 font-serif text-2xl sm:text-3xl"
        >
          Evidence for this step
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Sources are derived from the selected step, its events and
          relationships{release.places.length > 0 ? ", the focused place" : ""}
          {release.series.length > 0
            ? ", and the selected chart observation"
            : ""}
          .
        </p>
        <div className="mt-5 divide-y divide-rule border-y border-rule">
          {sources.map((source) => (
            <details key={source.id} className="group py-4">
              <summary className="cursor-pointer list-none sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-serif text-lg group-open:text-signal">
                  {source.label}
                </span>
                <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-ink-muted sm:mt-0">
                  {source.evidenceRole} · {source.sourceClass} ·{" "}
                  {source.publisher}
                </span>
              </summary>
              <div className="mt-4 grid gap-4 border-l-2 border-jade pl-4 text-sm sm:grid-cols-[1fr_1.25fr]">
                <dl className="space-y-2">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      Published
                    </dt>
                    <dd>
                      {source.publishedAt
                        ? formatDate(source.publishedAt)
                        : "Continuously updated"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      Retrieved · vintage
                    </dt>
                    <dd>
                      {formatDate(source.retrievedAt)} · {source.datasetVintage}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      Record
                    </dt>
                    <dd className="break-all font-mono text-xs">
                      {source.recordId}
                    </dd>
                  </div>
                  {source.artifact && (
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                        Local artifact · SHA-256
                      </dt>
                      <dd className="break-all font-mono text-xs">
                        {source.artifact.path} · {source.artifact.sha256}
                      </dd>
                    </div>
                  )}
                </dl>
                <div>
                  <p className="leading-relaxed text-ink-muted">
                    {source.notes}
                  </p>
                  {source.revisionPolicy && (
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      Revision policy: {source.revisionPolicy}
                    </p>
                  )}
                  <a
                    href={source.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                  >
                    Open canonical source ↗
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <MapDialog
        open={mapStatus !== "closed"}
        status={mapStatus}
        places={scope.places}
        relations={scope.relations}
        selectedId={selectedPlace}
        onSelect={(id) => dispatch({ type: "SELECT_PLACE", id })}
        onReady={() => dispatch({ type: "MAP_READY" })}
        onFatal={() => dispatch({ type: "MAP_FATAL" })}
        onDegraded={() => dispatch({ type: "MAP_DEGRADED" })}
        onRetry={() => dispatch({ type: "RETRY_MAP" })}
        onClose={() => dispatch({ type: "CLOSE_MAP" })}
      />

      <p className="sr-only" aria-live="polite">
        Viewing {chain.title}, step {step.label}
        {selectedPlaceRecord ? ` at ${selectedPlaceRecord.label}` : ""}
        {selectedMonth ? `, chart cursor ${selectedMonth}` : ""}.
      </p>

      <StateLab
        title="Evidence Atlas"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "SELECT_CHAIN",
          "SELECT_STEP",
          "SELECT_PLACE",
          "SELECT_MONTH",
          "OPEN_MAP",
          "CLOSE_MAP",
          "RETRY_MAP",
          "SET_METRIC",
          "RESET",
        ]}
        history={history}
      />
    </div>
  );
}
