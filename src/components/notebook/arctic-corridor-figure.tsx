import type { ArcticRouteNotebookEntry } from "@/content/notebook/schema";
import { FigureSources } from "./figure-sources";
import { MaritimeScaleCards } from "./maritime-risk-graphics";

export function ArcticCorridorFigure({
  entry,
}: {
  entry: ArcticRouteNotebookEntry;
}) {
  const route = entry.routes[0];
  // Keep the antimeridian continuous in this schematic; source coordinates stay unchanged.
  const longitude = (x: number) => (x < 0 ? x + 360 : x);
  const xs = route.path.map(([x]) => longitude(x));
  const ys = route.path.map(([, y]) => y);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const points = route.path
    .map(
      ([x, y]) =>
        `${30 + ((longitude(x) - minX) / (maxX - minX || 1)) * 660},${110 - ((y - minY) / (maxY - minY || 1)) * 80}`
    )
    .join(" ");
  return (
    <figure
      aria-labelledby="arctic-corridor-title"
      className="border-y border-rule py-6"
    >
      <figcaption id="arctic-corridor-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Seasonal corridor · interpretation
        </span>
        <span className="mt-3 block font-serif text-2xl">
          A shorter line still has a limited operating window
        </span>
      </figcaption>
      <svg
        viewBox="0 0 720 180"
        aria-hidden="true"
        className="mt-5 w-full text-jade"
      >
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 5"
        />
        {route.points.map((point) => {
          const x =
            30 +
            ((longitude(point.coordinates[0]) - minX) / (maxX - minX || 1)) *
              660;
          const y =
            110 - ((point.coordinates[1] - minY) / (maxY - minY || 1)) * 80;
          return (
            <g key={point.id}>
              <circle cx={x} cy={y} r="5" fill="currentColor" />
              <text
                x={x}
                y={y + 30}
                fontSize="24"
                textAnchor={x > 600 ? "end" : x < 100 ? "start" : "middle"}
                fill="currentColor"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm leading-6">
        {route.label}. The schematic follows the admitted route geometry; it is
        not a vessel track or evidence of completed passage.
      </p>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        {route.points
          .map((point) => `${point.label}: ${point.role}`)
          .join("; ")}
        .
      </p>
      <div className="mt-5 border-l-2 border-jade pl-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Scientific route guidance
        </p>
        <p className="mt-2 text-lg">
          Broad July–October window · mid-September optimum
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Climatological guidance does not certify conditions for a particular
          vessel or voyage. Local ice risk persists.
        </p>
      </div>
      <FigureSources
        ids={[
          ...new Set([
            ...route.sourceIds,
            ...entry.scaleMetrics.flatMap((metric) => metric.sourceIds),
            "notebook-source-risk-nsidc-passage",
          ]),
        ]}
        sources={entry.sourceTrail}
      />
      <div className="mt-7">
        <MaritimeScaleCards metrics={entry.scaleMetrics} />
      </div>
    </figure>
  );
}
