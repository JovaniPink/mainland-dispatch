import type { AtlasPlace, AtlasRelation } from "@/content/schema";

type Point = { x: number; y: number };

function positions(
  places: AtlasPlace[],
  relations: AtlasRelation[]
): Map<string, Point> {
  const result = new Map<string, Point>();
  const sourceIds = [...new Set(relations.map((item) => item.from))];
  const targetIds = [...new Set(relations.map((item) => item.to))];

  sourceIds.forEach((id, index) => {
    result.set(id, {
      x: 110,
      y: sourceIds.length === 1 ? 160 : 88 + index * 144,
    });
  });
  targetIds.forEach((id, index) => {
    result.set(id, {
      x: 590,
      y: targetIds.length === 1 ? 160 : 88 + index * 144,
    });
  });
  places
    .filter((place) => !result.has(place.id))
    .forEach((place, index) =>
      result.set(place.id, { x: 350, y: 260 + index * 36 })
    );
  return result;
}

export function RelationDiagram({
  places,
  relations,
  selectedId,
  onSelect,
}: {
  places: AtlasPlace[];
  relations: AtlasRelation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const byId = new Map(places.map((place) => [place.id, place]));
  const coordinates = positions(places, relations);

  return (
    <figure className="border border-rule bg-paper-warm/20">
      <svg
        viewBox="0 0 700 320"
        className="hidden aspect-[2.2/1] w-full sm:block"
        aria-hidden="true"
      >
        {relations.map((relation) => {
          const from = coordinates.get(relation.from);
          const to = coordinates.get(relation.to);
          if (!from || !to) return null;
          const middleX = (from.x + to.x) / 2;
          const middleY = (from.y + to.y) / 2;
          return (
            <g key={relation.id}>
              <line
                x1={from.x + 58}
                y1={from.y}
                x2={to.x - 58}
                y2={to.y}
                stroke="var(--jade)"
                strokeWidth="2"
                strokeDasharray="7 6"
              />
              <rect
                x={middleX - 86}
                y={middleY - 15}
                width="172"
                height="30"
                fill="var(--paper)"
                stroke="var(--rule)"
              />
              <text
                x={middleX}
                y={middleY + 4}
                textAnchor="middle"
                fill="var(--ink-muted)"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.7"
              >
                {relation.label.toUpperCase()}
              </text>
            </g>
          );
        })}
        {places.map((place) => {
          const point = coordinates.get(place.id);
          if (!point) return null;
          const selected = place.id === selectedId;
          return (
            <g key={place.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={selected ? 44 : 38}
                fill={selected ? "var(--signal-soft)" : "var(--paper)"}
                stroke={selected ? "var(--signal)" : "var(--jade)"}
                strokeWidth={selected ? 3 : 2}
              />
              <text
                x={point.x}
                y={point.y - 3}
                textAnchor="middle"
                fill="var(--ink)"
                fontFamily="var(--font-serif)"
                fontSize="13"
              >
                {place.label.length > 16
                  ? `${place.label.slice(0, 15)}…`
                  : place.label}
              </text>
              <text
                x={point.x}
                y={point.y + 15}
                textAnchor="middle"
                fill="var(--ink-muted)"
                fontFamily="var(--font-mono)"
                fontSize="8"
                letterSpacing="1"
              >
                {place.precision.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="grid gap-5 p-4 sm:border-t sm:border-rule sm:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Places in this step
          </p>
          <ul className="mt-2 space-y-1" aria-label="Step locations">
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
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Documented relationships
          </p>
          <ul className="mt-2 space-y-3 text-sm">
            {relations.map((relation) => (
              <li key={relation.id} className="leading-relaxed">
                <span className="font-serif">
                  {byId.get(relation.from)?.label} →{" "}
                  {byId.get(relation.to)?.label}
                </span>
                <span className="mt-0.5 block font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {relation.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-rule px-4 py-3 text-xs leading-relaxed text-ink-muted">
        Lines represent only the relationship named in the source ledger. They
        do not imply physical routes, volumes, causation, or an unreported
        connection.
      </figcaption>
    </figure>
  );
}
