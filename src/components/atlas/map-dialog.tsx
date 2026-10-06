"use client";

import { useEffect, useRef } from "react";
import type { AtlasPlace, AtlasRelation } from "@/content/schema";
import { ContextMap } from "./context-map";

export type AtlasMapStatus =
  "closed" | "loading" | "ready" | "degraded" | "failed";

export function MapDialog({
  open,
  status,
  places,
  relations,
  selectedId,
  onSelect,
  onReady,
  onFatal,
  onDegraded,
  onRetry,
  onClose,
}: {
  open: boolean;
  status: AtlasMapStatus;
  places: AtlasPlace[];
  relations: AtlasRelation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReady: () => void;
  onFatal: () => void;
  onDegraded: () => void;
  onRetry: () => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const selected = places.find((place) => place.id === selectedId);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [open]);

  function handleClose() {
    onClose();
    openerRef.current?.focus();
  }

  return (
    <dialog
      ref={dialogRef}
      id="atlas-map-dialog"
      aria-labelledby="atlas-map-dialog-title"
      onClose={handleClose}
      onCancel={(event) => {
        event.preventDefault();
        event.currentTarget.close();
      }}
      className="atlas-map-dialog-modal m-0 w-full max-w-none overflow-y-auto border border-rule bg-paper p-0 text-ink backdrop:bg-night/65 sm:m-auto sm:w-[min(72rem,calc(100%-2rem))]"
    >
      <div className="flex items-start justify-between gap-6 border-b border-rule px-4 py-4 sm:px-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Optional geographic context
          </p>
          <h2 id="atlas-map-dialog-title" className="mt-1 font-serif text-2xl">
            Places named in this evidence step
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            The basemap supplies geography only. Lines retain the same
            source-backed meanings shown in the local diagram.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="shrink-0 border border-rule px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
          aria-label="Close geographic context"
        >
          Close
        </button>
      </div>

      <div className="grid lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="border-b border-rule p-4 lg:border-r lg:border-b-0 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Location controls
          </p>
          <ul
            className="mt-3 space-y-1"
            aria-label="Geographic context locations"
          >
            {places.map((place) => (
              <li key={place.id}>
                <button
                  type="button"
                  aria-pressed={place.id === selectedId}
                  onClick={() => onSelect(place.id)}
                  className={`flex w-full items-baseline justify-between gap-3 border-b border-rule py-2 text-left ${
                    place.id === selectedId
                      ? "text-signal"
                      : "hover:text-signal"
                  }`}
                >
                  <span className="font-serif">{place.label}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {place.precision}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-rule pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Relationship legend
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              {relations.map((relation) => (
                <li key={relation.id} className="border-l-2 border-jade pl-3">
                  <span className="font-serif">{relation.label}</span>
                  <span className="mt-0.5 block font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {relation.kind.replaceAll("-", " ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 border-l-2 border-jade pl-3">
            <p className="font-serif text-lg">
              {selected?.label ?? "Full step geography"}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {selected?.role ??
                "Select a named place to focus the map without changing the evidence claim."}
            </p>
          </div>
          <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-muted">
            External source · OpenFreeMap · no inferred routes
          </p>
        </aside>

        <div className="relative h-[calc(100dvh-22rem)] min-h-[22rem] sm:h-[min(58vh,38rem)]">
          {open && status !== "failed" && (
            <ContextMap
              places={places}
              relations={relations}
              selectedId={selectedId}
              status={
                status === "degraded"
                  ? "degraded"
                  : status === "ready"
                    ? "ready"
                    : "loading"
              }
              onSelect={onSelect}
              onReady={onReady}
              onFatal={onFatal}
              onDegraded={onDegraded}
            />
          )}

          {open && status === "loading" && (
            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-paper-warm/90">
              <div className="flex flex-col items-center gap-3">
                <span className="loading-mark h-8 w-8 rounded-full border-2 border-ink/20 border-t-signal" />
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Loading geographic context
                </p>
              </div>
            </div>
          )}

          {status === "degraded" && (
            <div className="absolute top-3 right-3 left-3 z-10 flex flex-wrap items-center justify-between gap-3 border border-signal bg-paper/95 p-3 text-sm">
              <p>
                Some map resources failed. The diagram and source record remain
                authoritative.
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
              >
                Retry map
              </button>
            </div>
          )}

          {status === "failed" && (
            <div className="absolute inset-0 grid place-items-center bg-paper-warm/70 p-8 text-center">
              <div className="max-w-md">
                <p className="font-mono text-xs uppercase tracking-widest text-signal">
                  Geographic view unavailable
                </p>
                <p className="mt-3 font-serif text-xl leading-relaxed">
                  The local relation diagram, location controls, and source
                  ledger remain available without the basemap.
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-5 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
                >
                  Retry map
                </button>
              </div>
            </div>
          )}

          <p className="absolute right-2 bottom-2 left-2 z-10 bg-paper/90 px-2 py-1 text-center font-mono text-xs uppercase tracking-widest text-ink-muted">
            Source-backed relationship; not a physical or inferred route
          </p>
        </div>
      </div>
    </dialog>
  );
}
