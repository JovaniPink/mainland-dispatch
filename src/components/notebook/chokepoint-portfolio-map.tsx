"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMachine } from "@xstate/react";
import type { FeatureCollection, MultiLineString, Point } from "geojson";
import {
  buildChokepointMapInput,
  type MaritimeMapSubset,
} from "@/content/notebook/maritime-map-subset";
import type { NotebookMaritimeRoute } from "@/content/notebook/schema";
import {
  chokepointMapMachine,
  type ChokepointLens,
} from "@/machines/chokepoint-map-machine";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { cn } from "@/lib/utils";
import { splitAtAntimeridian } from "@/lib/antimeridian";

type MaritimeRoute = NotebookMaritimeRoute;
type MapLibreModule = typeof import("maplibre-gl");
type MapInstance = import("maplibre-gl").Map;
type GeoJsonSource = import("maplibre-gl").GeoJSONSource;
type RouteFeatureCollection = FeatureCollection<
  MultiLineString,
  {
    id: string;
    label: string;
    category: MaritimeRoute["category"];
    selected: boolean;
  }
>;
type PointFeatureCollection = FeatureCollection<
  Point,
  { id: string; routeId: string; label: string; selected: boolean }
>;

const lensOptions: Array<{ id: ChokepointLens; label: string }> = [
  { id: "portfolio", label: "Whole portfolio" },
  { id: "gulf", label: "Hormuz" },
  { id: "red-sea", label: "Red Sea" },
  { id: "arctic", label: "Arctic hedge" },
];

function lineData(
  routes: MaritimeRoute[],
  selectedRouteId: string | null
): RouteFeatureCollection {
  return {
    type: "FeatureCollection",
    features: routes.map((route) => ({
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: splitAtAntimeridian(route.path),
      },
      properties: {
        id: route.id,
        label: route.label,
        category: route.category,
        selected: route.id === selectedRouteId,
      },
    })),
  };
}

function pointData(
  routes: MaritimeRoute[],
  selectedPointId: string | null
): PointFeatureCollection {
  return {
    type: "FeatureCollection",
    features: routes.flatMap((route) =>
      route.points.map((point) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: point.coordinates },
        properties: {
          id: point.id,
          routeId: route.id,
          label: point.label,
          selected: point.id === selectedPointId,
        },
      }))
    ),
  };
}

function fitRoutes(
  map: MapInstance,
  maplibre: MapLibreModule,
  routes: MaritimeRoute[],
  selectedRouteId: string | null
) {
  const selected = routes.find((route) => route.id === selectedRouteId);
  const coordinates = (selected ? [selected] : routes).flatMap(
    (route) => route.path
  );
  if (coordinates.length === 0) return;
  const bounds = new maplibre.LngLatBounds();
  for (const coordinate of coordinates) bounds.extend(coordinate);
  map.fitBounds(bounds, {
    padding: { top: 72, right: 56, bottom: 72, left: 56 },
    maxZoom: selected ? 4.2 : 2.6,
    duration: 450,
  });
}

function RouteMapCanvas({
  routes,
  selectedRouteId,
  selectedPointId,
  onSelectRoute,
  onSelectPoint,
  onReady,
  onFatal,
  onDegraded,
  ariaLabel,
}: {
  routes: MaritimeRoute[];
  selectedRouteId: string | null;
  selectedPointId: string | null;
  onSelectRoute: (id: string) => void;
  onSelectPoint: (routeId: string, pointId: string) => void;
  onReady: () => void;
  onFatal: () => void;
  onDegraded: () => void;
  ariaLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const moduleRef = useRef<MapLibreModule | null>(null);
  const readyRef = useRef(false);
  const routesRef = useRef(routes);
  const selectedRouteRef = useRef(selectedRouteId);
  const selectedPointRef = useRef(selectedPointId);
  const callbacksRef = useRef({
    onSelectRoute,
    onSelectPoint,
    onReady,
    onFatal,
    onDegraded,
  });

  useEffect(() => {
    routesRef.current = routes;
    selectedRouteRef.current = selectedRouteId;
    selectedPointRef.current = selectedPointId;
  }, [routes, selectedPointId, selectedRouteId]);

  useEffect(() => {
    callbacksRef.current = {
      onSelectRoute,
      onSelectPoint,
      onReady,
      onFatal,
      onDegraded,
    };
  }, [onDegraded, onFatal, onReady, onSelectPoint, onSelectRoute]);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let timeoutId: number | undefined;
    let observer: ResizeObserver | undefined;

    async function initialize() {
      try {
        mapRef.current?.remove();
        mapRef.current = null;
        readyRef.current = false;
        const [maplibre] = await Promise.all([
          import("maplibre-gl"),
          import("maplibre-gl/dist/maplibre-gl.css"),
        ]);
        if (cancelled || !containerRef.current) return;
        moduleRef.current = maplibre;
        const night = document.documentElement.dataset.theme === "night";
        const paper = night ? "#17201d" : "#f3f0e8";
        const ink = night ? "#e9e6db" : "#191b18";
        const signal = night ? "#d96a60" : "#bd382d";
        const jade = night ? "#7fa899" : "#486e64";

        const map = new maplibre.Map({
          container: containerRef.current,
          style: `https://tiles.openfreemap.org/styles/${night ? "dark" : "positron"}`,
          center: [70, 42],
          zoom: 1.1,
          minZoom: 0.6,
          maxZoom: 8,
          renderWorldCopies: false,
          attributionControl: { compact: true },
          dragRotate: false,
          pitchWithRotate: false,
          cooperativeGestures: true,
        });
        mapRef.current = map;
        map.touchZoomRotate.disableRotation();
        map.addControl(
          new maplibre.NavigationControl({ showCompass: false }),
          "top-right"
        );

        if (typeof ResizeObserver !== "undefined") {
          observer = new ResizeObserver(() => map.resize());
          observer.observe(containerRef.current);
        }

        timeoutId = window.setTimeout(() => {
          if (!readyRef.current) callbacksRef.current.onFatal();
        }, 12000);

        map.on("load", () => {
          if (cancelled) return;
          map.addSource("risk-routes", {
            type: "geojson",
            data: lineData(routesRef.current, selectedRouteRef.current),
          });
          map.addLayer({
            id: "risk-route-lines",
            type: "line",
            source: "risk-routes",
            paint: {
              "line-color": [
                "match",
                ["get", "category"],
                "energy",
                signal,
                "pipeline",
                "#c58c30",
                "transfer",
                "#7967a8",
                jade,
              ],
              "line-width": ["case", ["get", "selected"], 5, 2.5],
              "line-opacity": ["case", ["get", "selected"], 1, 0.78],
            },
          });
          map.addLayer({
            id: "risk-route-hit",
            type: "line",
            source: "risk-routes",
            paint: { "line-width": 18, "line-opacity": 0 },
          });

          map.addSource("risk-points", {
            type: "geojson",
            data: pointData(routesRef.current, selectedPointRef.current),
          });
          map.addLayer({
            id: "risk-point-dots",
            type: "circle",
            source: "risk-points",
            paint: {
              "circle-radius": ["case", ["get", "selected"], 8, 5],
              "circle-color": ["case", ["get", "selected"], signal, jade],
              "circle-stroke-color": paper,
              "circle-stroke-width": 2,
            },
          });
          map.addLayer({
            id: "risk-point-labels",
            type: "symbol",
            source: "risk-points",
            layout: {
              "text-field": ["get", "label"],
              "text-font": ["Noto Sans Regular"],
              "text-size": 11,
              "text-offset": [0, 1.2],
              "text-anchor": "top",
              "text-allow-overlap": false,
            },
            paint: {
              "text-color": ink,
              "text-halo-color": paper,
              "text-halo-width": 2,
            },
          });
          map.addLayer({
            id: "risk-point-hit",
            type: "circle",
            source: "risk-points",
            paint: { "circle-radius": 20, "circle-opacity": 0 },
          });

          map.on("click", "risk-route-hit", (event) => {
            const id = event.features?.[0]?.properties?.id;
            if (typeof id === "string") callbacksRef.current.onSelectRoute(id);
          });
          map.on("click", "risk-point-hit", (event) => {
            const properties = event.features?.[0]?.properties;
            if (
              typeof properties?.routeId === "string" &&
              typeof properties.id === "string"
            ) {
              callbacksRef.current.onSelectPoint(
                properties.routeId,
                properties.id
              );
            }
          });
          for (const layer of ["risk-route-hit", "risk-point-hit"]) {
            map.on("mouseenter", layer, () => {
              map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", layer, () => {
              map.getCanvas().style.cursor = "";
            });
          }

          fitRoutes(map, maplibre, routesRef.current, selectedRouteRef.current);
          map.once("idle", () => {
            if (cancelled) return;
            if (!map.areTilesLoaded()) {
              callbacksRef.current.onFatal();
              return;
            }
            readyRef.current = true;
            if (timeoutId) window.clearTimeout(timeoutId);
            callbacksRef.current.onReady();
          });
        });

        map.on("error", () => {
          if (cancelled) return;
          if (readyRef.current) callbacksRef.current.onDegraded();
          else callbacksRef.current.onFatal();
        });
      } catch {
        if (!cancelled) callbacksRef.current.onFatal();
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = moduleRef.current;
    if (!map || !maplibre || !readyRef.current) return;
    const routeSource = map.getSource("risk-routes") as
      GeoJsonSource | undefined;
    const pointSource = map.getSource("risk-points") as
      GeoJsonSource | undefined;
    routeSource?.setData(lineData(routes, selectedRouteId));
    pointSource?.setData(pointData(routes, selectedPointId));
    fitRoutes(map, maplibre, routes, selectedRouteId);
  }, [routes, selectedPointId, selectedRouteId]);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
      moduleRef.current = null;
      readyRef.current = false;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="atlas-map h-full min-h-[32rem] w-full"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      role="region"
      aria-label={ariaLabel}
      data-testid="chokepoint-map-container"
    />
  );
}

export function ChokepointPortfolioMap({
  subset,
}: {
  subset: MaritimeMapSubset;
}) {
  const routes = subset.routes;
  const input = useMemo(() => buildChokepointMapInput(subset), [subset]);
  const [state, send] = useMachine(chokepointMapMachine, { input });
  const { selectedLens, selectedRouteId, selectedPointId } = state.context;
  const visibleRouteIds = state.context.routeIdsByLens[selectedLens] ?? [];
  const visibleRoutes = routes.filter((route) =>
    visibleRouteIds.includes(route.id)
  );
  const selectedRoute = routes.find((route) => route.id === selectedRouteId);
  const selectedPoint = selectedRoute?.points.find(
    (point) => point.id === selectedPointId
  );
  const mapStatus = state.matches({ map: "idle" })
    ? "idle"
    : state.matches({ map: "loading" })
      ? "loading"
      : state.matches({ map: "ready" })
        ? "ready"
        : state.matches({ map: "degraded" })
          ? "degraded"
          : "failed";

  return (
    <div className="border border-rule bg-paper-warm/20">
      <div className="border-b border-rule p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Corridor lens
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
              {subset.allowedLenses.length > 1
                ? "Filter the portfolio, then select a line or place."
                : "Select the Arctic route or a place for its details."}{" "}
              Geometry is schematic and source-backed; it is not a vessel track.
            </p>
          </div>
          {selectedRouteId && (
            <button
              type="button"
              onClick={() => send({ type: "CLEAR_SELECTION" })}
              className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
            >
              Clear selection
            </button>
          )}
        </div>
        {subset.allowedLenses.length > 1 && (
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Map lens"
          >
            {lensOptions
              .filter((option) => subset.allowedLenses.includes(option.id))
              .map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selectedLens === option.id}
                  onClick={() => send({ type: "SELECT_LENS", lens: option.id })}
                  className={cn(
                    "border px-3 py-2 font-mono text-xs uppercase tracking-widest",
                    selectedLens === option.id
                      ? "border-signal bg-signal-soft/55 text-signal"
                      : "border-rule bg-paper text-ink-muted hover:border-jade hover:text-jade"
                  )}
                >
                  {option.label}
                </button>
              ))}
          </div>
        )}
      </div>

      {mapStatus === "idle" && (
        <div className="grid min-h-[32rem] place-items-center px-6 py-12 text-center">
          <div className="max-w-lg">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
              Map held locally
            </p>
            <h3 className="mt-4 font-serif text-2xl">
              Load the geographic layer
            </h3>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              The evidence and route list are already on this page. Loading the
              basemap requests map tiles from OpenFreeMap; it will not happen
              until you choose to continue.
            </p>
            <button
              type="button"
              onClick={() => send({ type: "LOAD_MAP" })}
              className="mt-6 border border-signal bg-signal-fill px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#f3f0e8] hover:bg-[#191b18]"
            >
              Load interactive map
            </button>
          </div>
        </div>
      )}

      {(mapStatus === "loading" ||
        mapStatus === "ready" ||
        mapStatus === "degraded") && (
        <div className="relative min-h-[32rem] overflow-hidden">
          <RouteMapCanvas
            key={state.context.attempt}
            routes={visibleRoutes}
            selectedRouteId={selectedRouteId}
            selectedPointId={selectedPointId}
            onSelectRoute={(id) => send({ type: "SELECT_ROUTE", id })}
            onSelectPoint={(routeId, pointId) =>
              send({ type: "SELECT_POINT", routeId, pointId })
            }
            onReady={() => send({ type: "MAP_READY" })}
            onFatal={() => send({ type: "MAP_FATAL" })}
            onDegraded={() => send({ type: "MAP_DEGRADED" })}
            ariaLabel={
              subset.id === "northern-sea-route"
                ? "Interactive map of the Northern Sea Route corridor"
                : "Interactive map of China's chokepoint risk portfolio"
            }
          />
          {mapStatus === "loading" && (
            <div className="pointer-events-none absolute inset-x-4 top-4 border border-rule bg-paper/95 px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink-muted shadow-sm">
              Loading basemap and corridor layers…
            </div>
          )}
          {mapStatus === "degraded" && (
            <div className="absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-3 border border-signal bg-paper/95 px-4 py-3 text-sm text-signal shadow-sm">
              <span>
                The basemap reported a tile error. Route evidence remains below.
              </span>
              <button
                type="button"
                onClick={() => send({ type: "RETRY_MAP" })}
                className="font-mono text-xs uppercase tracking-widest"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      {mapStatus === "failed" && (
        <div className="grid min-h-[20rem] place-items-center px-6 py-10 text-center">
          <div className="max-w-md">
            <h3 className="font-serif text-2xl">The basemap did not verify</h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">
              No route is being reported as loaded. The source-backed corridor
              cards below remain available without third-party tiles.
            </p>
            <button
              type="button"
              onClick={() => send({ type: "RETRY_MAP" })}
              className="mt-5 border border-signal px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal"
            >
              Retry map
            </button>
          </div>
        </div>
      )}

      <div className="grid border-t border-rule lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {visibleRoutes.map((route) => (
            <button
              key={route.id}
              type="button"
              aria-pressed={selectedRouteId === route.id}
              onClick={() => send({ type: "SELECT_ROUTE", id: route.id })}
              className={cn(
                "min-w-0 bg-paper p-4 text-left hover:bg-jade-soft/25",
                selectedRouteId === route.id && "bg-signal-soft/30"
              )}
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-jade">
                  {route.category}
                </span>
                <NotebookStatus status={route.status} />
              </span>
              <strong className="mt-3 block font-serif text-lg leading-snug">
                {route.label}
              </strong>
              <span className="mt-2 block text-sm leading-6 text-ink-muted">
                {route.scale}
              </span>
              <span className="mt-3 block text-sm leading-6">
                {route.reading}
              </span>
              <span className="mt-3 block text-sm leading-6 text-ink-muted">
                <strong>Displaced risk:</strong> {route.caveat}
              </span>
            </button>
          ))}
        </div>
        <aside className="border-t border-rule bg-paper-warm/35 p-5 lg:border-l lg:border-t-0">
          {selectedRoute ? (
            <>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                Selected corridor
              </p>
              <h3 className="mt-3 font-serif text-xl leading-snug">
                {selectedPoint?.label ?? selectedRoute.label}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-jade">
                {selectedPoint?.role ?? selectedRoute.scale}
              </p>
              <p className="mt-4 text-sm leading-6">
                {selectedPoint?.note ?? selectedRoute.reading}
              </p>
              {!selectedPoint && (
                <p className="mt-4 border-l-2 border-signal pl-3 text-sm leading-6 text-ink-muted">
                  {selectedRoute.caveat}
                </p>
              )}
              {selectedRoute.points.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedRoute.points.map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() =>
                        send({
                          type: "SELECT_POINT",
                          routeId: selectedRoute.id,
                          pointId: point.id,
                        })
                      }
                      className={cn(
                        "border px-2 py-1 font-mono text-xs uppercase tracking-widest",
                        selectedPointId === point.id
                          ? "border-signal text-signal"
                          : "border-rule text-ink-muted"
                      )}
                    >
                      {point.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="font-mono text-xs uppercase tracking-widest text-jade">
                Reading rule
              </p>
              <p className="mt-3 font-serif text-lg italic leading-relaxed">
                A shorter line is not automatically a safer, larger, or more
                reliable route.
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-muted">
                Select any corridor to see its function, measurement, and hard
                limit without loading the basemap.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
