import { FigureSources } from "./figure-sources";
import type { NotebookEntry } from "@/content/notebook/schema";
import type { PowerBalanceNotebookEntry } from "@/content/notebook/schema";

type Comparison = PowerBalanceNotebookEntry["comparisons"][number];
type Concentration = PowerBalanceNotebookEntry["concentrations"][number];
type DemographicProfile =
  PowerBalanceNotebookEntry["demographicProfiles"][number];

function RelativeBar({
  label,
  display,
  value,
  maximum,
  tone,
}: {
  label: string;
  display: string;
  value: number;
  maximum: number;
  tone: "signal" | "jade";
}) {
  const width = maximum === 0 ? 0 : (value / maximum) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="font-mono uppercase tracking-widest text-ink-muted">
          {label}
        </span>
        <strong className="font-mono text-sm text-ink">{display}</strong>
      </div>
      <div className="mt-2 h-2 bg-rule/60" aria-hidden>
        <div
          className={
            tone === "signal" ? "h-full bg-signal-fill" : "h-full bg-jade"
          }
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function PairedPowerMetrics({
  metrics,
  sources,
}: {
  metrics: Comparison[];
  sources: NotebookEntry["sourceTrail"];
}) {
  return (
    <figure aria-labelledby="paired-power-title">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule pb-3">
        <figcaption id="paired-power-title">
          <span className="block font-mono text-xs uppercase tracking-widest text-jade">
            Eight dimensions · no composite score
          </span>
          <span className="mt-1 block font-serif text-xl">
            Paired indicators of scale and reach
          </span>
        </figcaption>
        <div className="flex gap-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-signal-fill" aria-hidden /> China
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-jade" aria-hidden /> United States
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => {
          const maximum = Math.max(
            metric.china.value,
            metric.unitedStates.value
          );
          return (
            <article
              key={metric.id}
              className="border-t border-rule py-4 md:pr-4"
              aria-label={`${metric.label}, ${metric.asOf}: China ${metric.china.display}; United States ${metric.unitedStates.display}`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                {metric.asOf} · {metric.unit}
              </p>
              <h3 className="mt-2 min-h-12 font-serif text-lg leading-snug">
                {metric.label}
              </h3>
              <div className="mt-4 grid gap-3">
                <RelativeBar
                  label="China"
                  display={metric.china.display}
                  value={metric.china.value}
                  maximum={maximum}
                  tone="signal"
                />
                <RelativeBar
                  label="United States"
                  display={metric.unitedStates.display}
                  value={metric.unitedStates.value}
                  maximum={maximum}
                  tone="jade"
                />
              </div>
              <p className="mt-4 text-sm leading-6">{metric.reading}</p>
              <p className="mt-3 border-l-2 border-rule pl-3 text-sm leading-6 text-ink-muted">
                <strong className="text-ink">Do not overread:</strong>{" "}
                {metric.caveat}
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-muted">
        Bar lengths compare only the two values inside each card. They cannot be
        compared across cards because the units differ.
      </p>
      <FigureSources
        ids={[...new Set(metrics.flatMap((item) => item.sourceIds))]}
        sources={sources}
      />
    </figure>
  );
}

export function ChinaConcentrationBars({
  concentrations,
}: {
  concentrations: Concentration[];
}) {
  return (
    <figure aria-labelledby="concentration-title">
      <figcaption
        id="concentration-title"
        className="border-b border-rule pb-3"
      >
        <span className="block font-mono text-xs uppercase tracking-widest text-signal">
          Different denominators · displayed separately
        </span>
        <span className="mt-1 block font-serif text-xl">
          Where production concentrates in China
        </span>
      </figcaption>
      <div className="mt-5 grid gap-6">
        {concentrations.map((item) => (
          <article
            key={item.id}
            aria-label={`${item.label}: ${item.display} as of ${item.asOf}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg">{item.label}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                {item.display} · {item.asOf}
              </p>
            </div>
            <div
              className="mt-2 h-4 overflow-hidden border border-rule bg-paper-warm"
              aria-hidden
            >
              <div
                className="h-full bg-signal-fill"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <p className="mt-2 text-sm leading-6">{item.reading}</p>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              <strong className="text-ink">Boundary:</strong> {item.caveat}
            </p>
          </article>
        ))}
      </div>
    </figure>
  );
}

function DemographicCard({ profile }: { profile: DemographicProfile }) {
  const tones = ["bg-signal-fill", "bg-jade", "bg-ink-muted"];

  return (
    <article className="border border-rule bg-paper-warm/25 p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-jade">
        {profile.asOf} estimate
      </p>
      <h3 className="mt-2 font-serif text-2xl">{profile.country}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-rule py-4">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Population
          </dt>
          <dd className="mt-1 font-serif text-xl">{profile.totalDisplay}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Annual change
          </dt>
          <dd className="mt-1 font-serif text-xl">
            {profile.annualChangeDisplay}
          </dd>
        </div>
      </dl>
      {profile.migrationDisplay && (
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          Migration contribution: {profile.migrationDisplay}
        </p>
      )}
      <div
        className="mt-5 flex h-5 overflow-hidden border border-rule"
        aria-label={`${profile.country} age distribution: ${profile.ageBands
          .map((band) => `${band.label} ${band.display}`)
          .join(", ")}`}
        role="img"
      >
        {profile.ageBands.map((band, index) => (
          <div
            key={band.label}
            className={tones[index]}
            style={{ width: `${band.value}%` }}
          />
        ))}
      </div>
      <dl className="mt-3 grid gap-2">
        {profile.ageBands.map((band, index) => (
          <div
            key={band.label}
            className="flex items-center justify-between gap-3"
          >
            <dt className="flex items-center gap-2 text-xs text-ink-muted">
              <span className={`h-2 w-2 ${tones[index]}`} aria-hidden />
              {band.label}
            </dt>
            <dd className="font-mono text-xs">{band.display}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-rule pt-3 text-sm leading-6 text-ink-muted">
        {profile.note}
      </p>
    </article>
  );
}

export function DemographicProfiles({
  profiles,
}: {
  profiles: DemographicProfile[];
}) {
  return (
    <figure aria-labelledby="demographic-title">
      <figcaption id="demographic-title" className="border-b border-rule pb-3">
        <span className="block font-mono text-xs uppercase tracking-widest text-jade">
          Comparable display bands · distinct national series
        </span>
        <span className="mt-1 block font-serif text-xl">
          Two age structures, two population trajectories
        </span>
      </figcaption>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => (
          <DemographicCard key={profile.country} profile={profile} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-muted">
        The age bands align the visual question, not the statistical systems.
        Census and NBS use different reference periods and national definitions;
        the notes preserve that boundary.
      </p>
    </figure>
  );
}
