"use client";

import type { AtlasSeries } from "@/content/schema";
import type { AtlasMetric } from "@/machines/atlas-machine";

const WIDTH = 760;
const HEIGHT = 300;
const PAD = { top: 28, right: 22, bottom: 42, left: 62 };

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function percent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function TradeChart({
  series,
  metric,
  selectedMonth,
  onSelectMonth,
}: {
  series: AtlasSeries;
  metric: AtlasMetric;
  selectedMonth: string | null;
  onSelectMonth: (month: string) => void;
}) {
  const points = series.observations.map((observation, index) => {
    const previous = series.observations[index - 12];
    const yoy = previous
      ? ((observation.value - previous.value) / previous.value) * 100
      : null;
    return {
      ...observation,
      displayValue: metric === "value" ? observation.value : yoy,
    };
  });
  const visible = points.filter(
    (point): point is typeof point & { displayValue: number } =>
      point.displayValue !== null
  );
  const values = visible.map((point) => point.displayValue);
  const min = metric === "yoy" ? Math.min(0, ...values) : 0;
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerWidth = WIDTH - PAD.left - PAD.right;
  const innerHeight = HEIGHT - PAD.top - PAD.bottom;
  const x = (month: string) => {
    const index = points.findIndex((point) => point.month === month);
    return PAD.left + (index / Math.max(points.length - 1, 1)) * innerWidth;
  };
  const y = (value: number) => PAD.top + ((max - value) / range) * innerHeight;
  const path = visible
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${x(point.month).toFixed(2)} ${y(
          point.displayValue
        ).toFixed(2)}`
    )
    .join(" ");
  const selected = points.find((point) => point.month === selectedMonth);

  return (
    <div>
      <div className="overflow-x-auto border border-rule bg-paper-warm/25">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="min-w-[42rem]"
          role="img"
          aria-label={`${series.title}, ${metric === "value" ? "monthly value" : "year-over-year change"}`}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const value = max - range * ratio;
            const yPosition = PAD.top + innerHeight * ratio;
            return (
              <g key={ratio}>
                <line
                  x1={PAD.left}
                  x2={WIDTH - PAD.right}
                  y1={yPosition}
                  y2={yPosition}
                  stroke="var(--rule)"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 10}
                  y={yPosition + 4}
                  textAnchor="end"
                  fill="var(--ink-muted)"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  {metric === "value" ? money(value) : percent(value)}
                </text>
              </g>
            );
          })}

          {series.annotations.map((annotation, index) => (
            <g key={annotation.eventId}>
              <line
                x1={x(annotation.month)}
                x2={x(annotation.month)}
                y1={PAD.top}
                y2={HEIGHT - PAD.bottom}
                stroke="var(--signal)"
                strokeDasharray="4 4"
              />
              <text
                x={x(annotation.month) + (index === 0 ? -5 : 5)}
                y={PAD.top + 12}
                textAnchor={index === 0 ? "end" : "start"}
                fill="var(--signal)"
                fontFamily="var(--font-mono)"
                fontSize="9"
              >
                {annotation.label}
              </text>
            </g>
          ))}

          <path
            d={path}
            fill="none"
            stroke="var(--jade)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {visible.map((point) => {
            const active = point.month === selectedMonth;
            return (
              <g
                key={point.month}
                role="button"
                tabIndex={0}
                aria-label={`${point.month}: ${
                  metric === "value"
                    ? money(point.value)
                    : percent(point.displayValue)
                }`}
                onClick={() => onSelectMonth(point.month)}
                onMouseEnter={() => onSelectMonth(point.month)}
                onFocus={() => onSelectMonth(point.month)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectMonth(point.month);
                  }
                }}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={x(point.month)}
                  cy={y(point.displayValue)}
                  r={active ? 7 : 4}
                  fill={active ? "var(--signal)" : "var(--paper)"}
                  stroke={active ? "var(--signal)" : "var(--jade)"}
                  strokeWidth="2"
                />
              </g>
            );
          })}

          <text
            x={PAD.left}
            y={HEIGHT - 14}
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="10"
          >
            JAN 2024
          </text>
          <text
            x={WIDTH - PAD.right}
            y={HEIGHT - 14}
            textAnchor="end"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="10"
          >
            DEC 2025
          </text>
        </svg>
      </div>

      {selected && (
        <p
          className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted"
          aria-live="polite"
        >
          {selected.month} · {money(selected.value)}
          {selected.displayValue !== null && metric === "yoy"
            ? ` · ${percent(selected.displayValue)} year over year`
            : ""}{" "}
          · Estimated aggregate
        </p>
      )}

      <details className="mt-4 border-t border-rule pt-3">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-jade">
          Open accessible data table
        </summary>
        <div className="mt-3 max-h-80 overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-paper">
              <tr className="border-b border-rule font-mono text-xs uppercase tracking-widest text-ink-muted">
                <th className="py-2 pr-3">Month</th>
                <th className="py-2 pr-3">Value</th>
                <th className="py-2">YoY</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr
                  key={point.month}
                  className={`border-b border-rule/70 ${
                    point.month === selectedMonth ? "bg-signal-soft/60" : ""
                  }`}
                >
                  <td className="py-2 pr-3 font-mono text-xs">{point.month}</td>
                  <td className="py-2 pr-3">{money(point.value)}</td>
                  <td className="py-2">
                    {point.displayValue !== null && metric === "yoy"
                      ? percent(point.displayValue)
                      : (() => {
                          const index = points.indexOf(point);
                          const prior = points[index - 12];
                          return prior
                            ? percent(
                                ((point.value - prior.value) / prior.value) *
                                  100
                              )
                            : "Not available";
                        })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
