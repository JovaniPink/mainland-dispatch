import { z } from "zod";
import { EvidenceStatusSchema } from "@/content/schema";

const nonEmpty = z.string().trim().min(1);
const slug = nonEmpty.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "expected a lowercase kebab-case slug"
);
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "expected a real calendar date");
const sourceDate = z
  .string()
  .regex(
    /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/,
    "expected YYYY, YYYY-MM, or YYYY-MM-DD"
  )
  .refine((value) => {
    if (/^\d{4}$/.test(value)) return true;
    if (/^\d{4}-\d{2}$/.test(value)) {
      const month = Number(value.slice(5, 7));
      return month >= 1 && month <= 12;
    }
    const date = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "expected a real source date");
const sourceId = nonEmpty.regex(/^notebook-source-[a-z0-9]+(?:-[a-z0-9]+)*$/);
const cleanHttpsUrl = z
  .url()
  .refine((value) => new URL(value).protocol === "https:", {
    message: "expected an HTTPS URL",
  })
  .refine(
    (value) =>
      ![...new URL(value).searchParams.keys()].some((key) =>
        key.toLowerCase().startsWith("utm_")
      ),
    { message: "tracking parameters are not allowed" }
  );

export const NotebookEvidenceStatusSchema = z.enum([
  "observed",
  "official-position",
  "interpretation",
  "contested",
  "scenario",
]);

const NotebookFormatSchema = z.object({
  id: nonEmpty.regex(/^format-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  title: nonEmpty,
  publisher: nonEmpty,
  duration: nonEmpty.optional(),
  url: cleanHttpsUrl,
  retrievedAt: isoDate,
  note: nonEmpty,
});

const NotebookTurningPointSchema = z.object({
  id: nonEmpty.regex(/^turning-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  timecode: nonEmpty,
  endTimecode: nonEmpty.optional(),
  seconds: z.number().int().nonnegative().optional(),
  title: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  argument: nonEmpty,
  reading: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookSourceLinkSchema = z.object({
  label: nonEmpty,
  url: cleanHttpsUrl,
});

const NotebookTrailItemSchema = z.object({
  id: sourceId,
  role: nonEmpty,
  title: nonEmpty,
  publisher: nonEmpty,
  author: nonEmpty.optional(),
  publishedAt: sourceDate.optional(),
  retrievedAt: isoDate,
  links: z.array(NotebookSourceLinkSchema).min(1),
  context: nonEmpty,
  limitation: nonEmpty,
});

const NotebookTimelineItemSchema = z.object({
  year: nonEmpty,
  label: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  explanation: nonEmpty,
});

const NotebookClaimAuditSchema = z.object({
  id: nonEmpty.regex(/^audit-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  claim: nonEmpty,
  status: EvidenceStatusSchema,
  decision: z.enum(["retain", "qualify", "exclude"]),
  assessment: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookWatchUpdateSchema = z.object({
  id: nonEmpty.regex(/^update-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: isoDate,
  status: EvidenceStatusSchema,
  summary: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookWatchUpdateStateSchema = z.discriminatedUnion("state", [
  z.object({
    state: z.literal("no-verified-change"),
    reviewedAt: isoDate,
  }),
  z.object({
    state: z.literal("verified-change"),
    reviewedAt: isoDate,
    updates: z.array(NotebookWatchUpdateSchema).min(1),
  }),
]);

const NotebookWatchItemSchema = z.object({
  id: nonEmpty.regex(/^promise-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  claimType: z.enum([
    "commitment",
    "institutional_fact",
    "policy_principle",
    "observed_condition",
    "reported_proposal",
  ]),
  label: nonEmpty,
  baseline: nonEmpty,
  responsibleActor: nonEmpty,
  baselineDate: isoDate,
  deliveryWindow: nonEmpty,
  baselineStatus: EvidenceStatusSchema,
  assessmentStatus: EvidenceStatusSchema,
  whatHasHappened: nonEmpty,
  whatRemainsUnknown: z.array(nonEmpty).min(1),
  sourceIds: z.array(sourceId).min(1),
  wouldStrengthen: z.array(nonEmpty).min(1),
  wouldWeaken: z.array(nonEmpty).min(1),
  updateState: NotebookWatchUpdateStateSchema,
});

export const NotebookAudioSchema = z.object({
  sourceId,
  canonicalUrl: cleanHttpsUrl,
  mediaUrl: cleanHttpsUrl,
  publisher: nonEmpty,
  duration: nonEmpty,
  reviewedAt: isoDate,
  transcriptAvailable: z.boolean(),
});

const NotebookComparisonMetricSchema = z.object({
  id: nonEmpty.regex(/^metric-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  asOf: sourceDate,
  unit: nonEmpty,
  china: z.object({ display: nonEmpty, value: z.number().nonnegative() }),
  unitedStates: z.object({
    display: nonEmpty,
    value: z.number().nonnegative(),
  }),
  reading: nonEmpty,
  caveat: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookConcentrationMetricSchema = z.object({
  id: nonEmpty.regex(/^concentration-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  display: nonEmpty,
  value: z.number().min(0).max(100),
  asOf: sourceDate,
  reading: nonEmpty,
  caveat: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookDemographicProfileSchema = z.object({
  country: z.enum(["China", "United States"]),
  asOf: sourceDate,
  totalDisplay: nonEmpty,
  annualChangeDisplay: nonEmpty,
  migrationDisplay: nonEmpty.optional(),
  ageBands: z
    .array(
      z.object({
        label: nonEmpty,
        display: nonEmpty,
        value: z.number().min(0).max(100),
      })
    )
    .length(3),
  sourceIds: z.array(sourceId).min(1),
  note: nonEmpty,
});

const NotebookPowerTimelineItemSchema = z.object({
  date: sourceDate,
  label: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  explanation: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookMaritimePointSchema = z.object({
  id: nonEmpty.regex(/^point-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  coordinates: z.tuple([
    z.number().min(-180).max(180),
    z.number().min(-85).max(85),
  ]),
  role: nonEmpty,
  note: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookMaritimeRouteSchema = z.object({
  id: nonEmpty.regex(/^route-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  lens: z.enum(["gulf", "red-sea", "arctic", "portfolio"]),
  category: z.enum(["energy", "container", "pipeline", "transfer"]),
  status: NotebookEvidenceStatusSchema,
  scale: nonEmpty,
  asOf: sourceDate,
  reading: nonEmpty,
  caveat: nonEmpty,
  path: z
    .array(
      z.tuple([z.number().min(-180).max(180), z.number().min(-85).max(85)])
    )
    .min(2),
  points: z.array(NotebookMaritimePointSchema).min(1),
  sourceIds: z.array(sourceId).min(1),
});

const NotebookScaleMetricSchema = z.object({
  id: nonEmpty.regex(/^scale-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  display: nonEmpty,
  unit: nonEmpty,
  asOf: sourceDate,
  reading: nonEmpty,
  caveat: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookMaritimeTimelineItemSchema = z.object({
  date: sourceDate,
  label: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  explanation: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookCirculationGateSchema = z.object({
  id: nonEmpty.regex(/^gate-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  domain: z.enum(["trade", "culture", "memory"]),
  subject: nonEmpty,
  gatekeeper: nonEmpty,
  admissionRule: nonEmpty,
  observedMovement: nonEmpty,
  outcome: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  caveat: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookTradeProofSchema = z.object({
  id: nonEmpty.regex(/^proof-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  currentRecord: nonEmpty,
  proofNeeded: nonEmpty,
  verdict: z.enum(["documented", "not-publicly-established"]),
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookTradePressureSchema = z.object({
  id: nonEmpty.regex(/^pressure-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: isoDate,
  actor: nonEmpty,
  action: nonEmpty,
  interpretationLimit: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookTradeFrameSourceClassSchema = z.enum([
  "Commentary and analysis",
  "Official legal rationale",
  "Official risk model and allegation",
  "Official actions across time",
  "Independent trade-flow analysis",
]);

export const NotebookTradeFrameSchema = z.object({
  id: nonEmpty.regex(/^frame-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  record: nonEmpty,
  sourceClass: NotebookTradeFrameSourceClassSchema,
  says: nonEmpty,
  establishes: nonEmpty,
  leavesOpen: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookPassageAuditSchema = z.object({
  id: nonEmpty.regex(/^passage-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  requirement: z.enum([
    "first-shock",
    "second-shock",
    "distribution",
    "germany",
    "policy",
    "ai-software",
  ]),
  speaker: nonEmpty,
  spans: z
    .array(
      z.object({
        start: nonEmpty,
        end: nonEmpty,
        startSeconds: z.number().nonnegative(),
        endSeconds: z.number().positive(),
      })
    )
    .min(1),
  paraphrase: nonEmpty,
  boundary: nonEmpty,
  auditState: z.enum(["audited", "blocked"]),
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookMechanismStepSchema = z.object({
  id: nonEmpty.regex(/^mechanism-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  order: z.number().int().min(1).max(5),
  label: nonEmpty,
  definition: nonEmpty,
  measuredHere: nonEmpty,
  notEstablished: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookShockComparisonSchema = z.object({
  id: nonEmpty.regex(/^comparison-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  dimension: nonEmpty,
  firstShock: nonEmpty,
  secondShock: nonEmpty,
  boundary: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookDistributionCaseSchema = z.object({
  id: nonEmpty.regex(/^distribution-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  group: nonEmpty,
  benefit: nonEmpty,
  cost: nonEmpty,
  scope: nonEmpty,
  caveat: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookPolicyOptionSchema = z.object({
  id: nonEmpty.regex(/^policy-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  targetProblem: nonEmpty,
  mechanism: nonEmpty,
  payer: nonEmpty,
  tradeoff: nonEmpty,
  timeHorizon: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  uncertainty: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookIndicatorContrastSchema = z.object({
  label: nonEmpty,
  display: nonEmpty,
  value: z.number(),
  unit: z.enum(["percent change", "diffusion index points"]),
  comparison: nonEmpty,
});

const notebookEconomicIndicatorDimensions = [
  "industrial-output",
  "industrial-profits",
  "retail-sales",
  "fixed-investment",
  "property",
  "manufacturing-pmi",
] as const;

export type NotebookEconomicSourceRolePrefix =
  "Primary" | "Official" | "Independent" | "Technical";

type NotebookEconomicSourceRoleRequirement = Readonly<{
  prefix: NotebookEconomicSourceRolePrefix;
  count: number;
  label: string;
}>;

const notebookEconomicSourceRoleRequirements = [
  { prefix: "Primary", count: 6, label: "six primary" },
  { prefix: "Official", count: 1, label: "exactly one official" },
  {
    prefix: "Independent",
    count: 3,
    label: "exactly three independent",
  },
  { prefix: "Technical", count: 1, label: "exactly one technical" },
] as const satisfies readonly NotebookEconomicSourceRoleRequirement[];

export const NotebookEconomicIndicatorSchema = z.object({
  id: nonEmpty.regex(/^indicator-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  dimension: z.enum(notebookEconomicIndicatorDimensions),
  label: nonEmpty,
  period: nonEmpty,
  observedAt: sourceDate,
  display: nonEmpty,
  value: z.number(),
  unit: z.enum(["percent change", "diffusion index points"]),
  comparison: z.enum(["year over year", "50-point threshold"]),
  basis: z.enum([
    "real",
    "nominal",
    "comparable",
    "not price adjusted",
    "seasonally adjusted survey",
  ]),
  coverage: nonEmpty,
  reading: nonEmpty,
  counterReading: nonEmpty,
  caveat: nonEmpty,
  status: z.literal("observed"),
  contrasts: z.array(NotebookIndicatorContrastSchema).min(1),
  sourceIds: z.array(sourceId).min(1),
});

const NotebookAlternativeReadingSchema = z.object({
  id: nonEmpty.regex(/^reading-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  status: z.enum(["interpretation", "scenario"]),
  reading: nonEmpty,
  boundary: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const notebookEnergyLayerIds = [
  "generation-mix",
  "generation-volume",
  "installed-capacity",
  "system-use",
] as const;

export const NotebookEnergyEvidenceKindSchema = z.enum([
  "official-measurement",
  "independent-analysis",
  "modeled-estimate",
  "forecast",
]);

const NotebookEnergyContrastSchema = z.object({
  id: nonEmpty.regex(/^energy-contrast-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  display: nonEmpty,
  value: z.number(),
  unit: nonEmpty,
  period: nonEmpty,
  comparison: nonEmpty,
  evidenceKind: NotebookEnergyEvidenceKindSchema,
  boundary: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

export const NotebookEnergyMeasureSchema = z.object({
  id: nonEmpty.regex(/^energy-measure-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  layer: z.enum(notebookEnergyLayerIds),
  label: nonEmpty,
  display: nonEmpty,
  value: z.number(),
  unit: nonEmpty,
  period: nonEmpty,
  comparison: nonEmpty,
  basis: nonEmpty,
  evidenceKind: NotebookEnergyEvidenceKindSchema,
  interpretation: nonEmpty,
  counterReading: nonEmpty,
  boundary: nonEmpty,
  contrasts: z.array(NotebookEnergyContrastSchema),
  sourceIds: z.array(sourceId).min(1),
});

const NotebookEnergyLayerSchema = z.object({
  id: z.enum(notebookEnergyLayerIds),
  label: nonEmpty,
  question: nonEmpty,
  measures: z
    .array(NotebookEnergyMeasureSchema)
    .length(2, "each energy-system layer requires exactly 2 measures"),
});

export const NotebookRelatedNotebookSchema = z.object({
  slug,
  relation: z.literal("companion"),
  label: nonEmpty,
});

const fragmentId = nonEmpty.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "expected a fragment ID without a leading hash"
);

export const NotebookLegacyFragmentSchema = z.object({
  id: fragmentId,
  successorSlug: slug,
  successorFragment: fragmentId,
  notice: nonEmpty,
});

const NotebookBaseSchema = z.object({
  ordinal: z.number().int().positive(),
  slug,
  title: nonEmpty,
  subtitle: nonEmpty,
  description: nonEmpty,
  thesis: nonEmpty,
  frontPagePreview: z.object({
    finding: nonEmpty,
    status: NotebookEvidenceStatusSchema,
    caveat: nonEmpty,
    sourceIds: z.array(sourceId).min(1).max(3),
  }),
  publishedAt: isoDate,
  updatedAt: isoDate,
  presentationUpdatedAt: isoDate.optional(),
  readTime: nonEmpty,
  tags: z.array(nonEmpty).min(1),
  editorialStatus: z.enum(["draft", "published", "corrected"]),
  reviewState: z.enum(["source-reviewed", "editorial-review"]),
  formats: z.array(NotebookFormatSchema).min(1),
  turningPoints: z.array(NotebookTurningPointSchema).min(1),
  sourceTrail: z.array(NotebookTrailItemSchema).min(1),
  unresolvedQuestion: nonEmpty,
  limitations: z.array(nonEmpty).min(1),
  relatedNotebooks: z.array(NotebookRelatedNotebookSchema).optional(),
  legacyFragments: z.array(NotebookLegacyFragmentSchema).optional(),
});

const ArgumentNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("argument-model"),
  timeline: z.array(NotebookTimelineItemSchema).min(1),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    model: z.array(nonEmpty).min(1),
    explains: z.array(nonEmpty).min(1),
    pushback: z.array(nonEmpty).min(1),
    context: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const EvidenceWatchNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("evidence-watch"),
  audio: NotebookAudioSchema,
  claimAudit: z.array(NotebookClaimAuditSchema).min(1),
  watchItems: z.array(NotebookWatchItemSchema).length(6),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    proposal: z.array(nonEmpty).min(1),
    strongest: z.array(nonEmpty).min(1),
    overreach: z.array(nonEmpty).min(1),
    noul: z.array(nonEmpty).min(1),
    talent: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const PowerBalanceNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("power-balance"),
  audio: NotebookAudioSchema,
  claimAudit: z.array(NotebookClaimAuditSchema).min(1),
  comparisons: z.array(NotebookComparisonMetricSchema).min(6),
  concentrations: z.array(NotebookConcentrationMetricSchema).min(4),
  demographicProfiles: z.array(NotebookDemographicProfileSchema).length(2),
  timeline: z.array(NotebookPowerTimelineItemSchema).min(6),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    verdict: z.array(nonEmpty).min(1),
    industry: z.array(nonEmpty).min(1),
    science: z.array(nonEmpty).min(1),
    leverage: z.array(nonEmpty).min(1),
    demography: z.array(nonEmpty).min(1),
    history: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const MaritimeRiskNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("maritime-risk"),
  formats: z.array(NotebookFormatSchema).length(2),
  turningPoints: z.array(NotebookTurningPointSchema).length(3),
  sourceTrail: z.array(NotebookTrailItemSchema).length(15),
  claimAudit: z.array(NotebookClaimAuditSchema).length(7),
  routes: z.array(NotebookMaritimeRouteSchema).length(5),
  scaleMetrics: z.array(NotebookScaleMetricSchema).length(3),
  timeline: z.array(NotebookMaritimeTimelineItemSchema).length(5),
  sections: z
    .object({
      why: z.array(nonEmpty).min(1),
      verdict: z.array(nonEmpty).min(1),
      chokepoints: z.array(nonEmpty).min(1),
      portfolio: z.array(nonEmpty).min(1),
      governance: z.array(nonEmpty).min(1),
      history: z.array(nonEmpty).min(1),
      changed: z.array(nonEmpty).min(1),
    })
    .strict(),
}).strict();

const ArcticRouteSchema = NotebookMaritimeRouteSchema.extend({
  lens: z.literal("arctic"),
  points: z.array(NotebookMaritimePointSchema).length(3),
});

const ArcticRouteNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("arctic-route"),
  formats: z.array(NotebookFormatSchema).length(1),
  turningPoints: z.array(NotebookTurningPointSchema).length(1),
  sourceTrail: z.array(NotebookTrailItemSchema).length(13),
  claimAudit: z.array(NotebookClaimAuditSchema).length(5),
  routes: z.array(ArcticRouteSchema).length(1),
  scaleMetrics: z.array(NotebookScaleMetricSchema).length(3),
  timeline: z.array(NotebookMaritimeTimelineItemSchema).length(6),
  sections: z
    .object({
      frame: z.array(nonEmpty).min(1),
      scale: z.array(nonEmpty).min(1),
      season: z.array(nonEmpty).min(1),
      governance: z.array(nonEmpty).min(1),
      environment: z.array(nonEmpty).min(1),
      limits: z.array(nonEmpty).min(1),
      changed: z.array(nonEmpty).min(1),
    })
    .strict(),
}).strict();

const CirculationGatesNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("circulation-gates"),
  audio: NotebookAudioSchema,
  claimAudit: z.array(NotebookClaimAuditSchema).min(9),
  gates: z.array(NotebookCirculationGateSchema).length(3),
  tradeProofs: z.array(NotebookTradeProofSchema).length(4),
  tradePressure: z.array(NotebookTradePressureSchema).min(4),
  tradeFrames: z.array(NotebookTradeFrameSchema).length(5),
  sections: z.object({
    lens: z.array(nonEmpty).min(1),
    trade: z.array(nonEmpty).min(1),
    culture: z.array(nonEmpty).min(1),
    memory: z.array(nonEmpty).min(1),
    limits: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const CirculationTwoDomainNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("circulation-two-domain"),
  formats: z.array(NotebookFormatSchema).length(1),
  turningPoints: z.array(NotebookTurningPointSchema).length(2),
  sourceTrail: z.array(NotebookTrailItemSchema).length(9),
  audio: NotebookAudioSchema,
  claimAudit: z.array(NotebookClaimAuditSchema).length(10),
  gates: z.array(NotebookCirculationGateSchema).length(2),
  sections: z.object({
    lens: z.array(nonEmpty).min(1),
    culture: z.array(nonEmpty).min(1),
    memory: z.array(nonEmpty).min(1),
    limits: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
}).strict();

const OriginProofNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("origin-proof"),
  formats: z.array(NotebookFormatSchema).length(0),
  turningPoints: z.array(NotebookTurningPointSchema).length(1),
  sourceTrail: z.array(NotebookTrailItemSchema).length(19),
  claimAudit: z.array(NotebookClaimAuditSchema).length(21),
  gates: z.array(NotebookCirculationGateSchema).length(1),
  tradeProofs: z.array(NotebookTradeProofSchema).length(4),
  tradePressure: z.array(NotebookTradePressureSchema).length(11),
  tradeFrames: z.array(NotebookTradeFrameSchema).length(5),
  sections: z.object({
    frame: z.array(nonEmpty).min(1),
    admission: z.array(nonEmpty).min(1),
    production: z.array(nonEmpty).min(1),
    qualification: z.array(nonEmpty).min(1),
    entry: z.array(nonEmpty).min(1),
    pressure: z.array(nonEmpty).min(1),
    limits: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
}).strict();

const TradeAdjustmentNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("trade-adjustment"),
  audio: NotebookAudioSchema,
  passageAudit: z.array(NotebookPassageAuditSchema).length(6),
  claimAudit: z.array(NotebookClaimAuditSchema).min(12),
  mechanismSteps: z.array(NotebookMechanismStepSchema).length(5),
  shockComparisons: z.array(NotebookShockComparisonSchema).min(5),
  distributionCases: z.array(NotebookDistributionCaseSchema).min(6),
  policyOptions: z.array(NotebookPolicyOptionSchema).min(6),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    verdict: z.array(nonEmpty).min(1),
    mechanism: z.array(nonEmpty).min(1),
    distribution: z.array(nonEmpty).min(1),
    policy: z.array(nonEmpty).min(1),
    scenario: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const EconomicSignalsNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("economic-signals"),
  formats: z
    .array(NotebookFormatSchema)
    .length(3, "economic signals require exactly 3 context formats"),
  sourceTrail: z
    .array(NotebookTrailItemSchema)
    .length(11, "economic signals require exactly 11 source records"),
  limitations: z
    .array(nonEmpty)
    .length(8, "economic signals require exactly 8 limitations"),
  indicators: z.array(NotebookEconomicIndicatorSchema).length(6),
  alternativeReadings: z.array(NotebookAlternativeReadingSchema).length(5),
  sections: z.object({
    frame: z.array(nonEmpty).min(1),
    production: z.array(nonEmpty).min(1),
    demand: z.array(nonEmpty).min(1),
    investment: z.array(nonEmpty).min(1),
    property: z.array(nonEmpty).min(1),
    synthesis: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
}).strict();

const EnergySystemNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("energy-system"),
  formats: z
    .array(NotebookFormatSchema)
    .length(3, "energy systems require exactly 3 context formats"),
  sourceTrail: z
    .array(NotebookTrailItemSchema)
    .length(8, "energy systems require exactly 8 source records"),
  energyLayers: z
    .array(NotebookEnergyLayerSchema)
    .length(4, "energy systems require exactly 4 layers"),
  alternativeReadings: z.array(NotebookAlternativeReadingSchema).length(4),
  sections: z.object({
    frame: z.array(nonEmpty).min(1),
    mix: z.array(nonEmpty).min(1),
    output: z.array(nonEmpty).min(1),
    capacity: z.array(nonEmpty).min(1),
    constraints: z.array(nonEmpty).min(1),
    synthesis: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
}).strict();

export const NotebookEntrySchema = z
  .discriminatedUnion("variant", [
    ArgumentNotebookSchema,
    EvidenceWatchNotebookSchema,
    PowerBalanceNotebookSchema,
    MaritimeRiskNotebookSchema,
    ArcticRouteNotebookSchema,
    CirculationGatesNotebookSchema,
    CirculationTwoDomainNotebookSchema,
    OriginProofNotebookSchema,
    TradeAdjustmentNotebookSchema,
    EconomicSignalsNotebookSchema,
    EnergySystemNotebookSchema,
  ])
  .superRefine((entry, ctx) => {
    if (entry.updatedAt < entry.publishedAt) {
      ctx.addIssue({
        code: "custom",
        message: "updatedAt must not precede publishedAt",
        path: ["updatedAt"],
      });
    }

    const checkUnique = (
      values: string[],
      path: (string | number)[],
      message: string
    ) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: "custom", message, path });
      }
    };

    checkUnique(
      entry.formats.map((format) => format.id),
      ["formats"],
      "format IDs must be unique"
    );
    checkUnique(
      entry.turningPoints.map((point) => point.id),
      ["turningPoints"],
      "turning-point IDs must be unique"
    );
    checkUnique(
      entry.sourceTrail.map((source) => source.id),
      ["sourceTrail"],
      "source IDs must be unique"
    );
    checkUnique(
      entry.sourceTrail.flatMap((source) =>
        source.links.map((link) => link.label.trim().toLocaleLowerCase("en-US"))
      ),
      ["sourceTrail"],
      "source-link labels must be unique within a Notebook"
    );

    entry.formats.forEach((format, formatIndex) => {
      if (format.retrievedAt > entry.updatedAt) {
        ctx.addIssue({
          code: "custom",
          message: "retrievedAt must not follow entry updatedAt",
          path: ["formats", formatIndex, "retrievedAt"],
        });
      }
    });
    entry.sourceTrail.forEach((source, sourceIndex) => {
      if (source.retrievedAt > entry.updatedAt) {
        ctx.addIssue({
          code: "custom",
          message: "retrievedAt must not follow entry updatedAt",
          path: ["sourceTrail", sourceIndex, "retrievedAt"],
        });
      }
    });

    const knownSources = new Set(entry.sourceTrail.map((source) => source.id));
    const references = [
      ...entry.frontPagePreview.sourceIds,
      ...entry.turningPoints.flatMap((point) => point.sourceIds),
      ...(entry.variant === "evidence-watch"
        ? [
            entry.audio.sourceId,
            ...entry.claimAudit.flatMap((item) => item.sourceIds),
            ...entry.watchItems.flatMap((item) => item.sourceIds),
            ...entry.watchItems.flatMap((item) =>
              item.updateState.state === "verified-change"
                ? item.updateState.updates.flatMap((update) => update.sourceIds)
                : []
            ),
          ]
        : entry.variant === "power-balance"
          ? [
              entry.audio.sourceId,
              ...entry.claimAudit.flatMap((item) => item.sourceIds),
              ...entry.comparisons.flatMap((item) => item.sourceIds),
              ...entry.concentrations.flatMap((item) => item.sourceIds),
              ...entry.demographicProfiles.flatMap((item) => item.sourceIds),
              ...entry.timeline.flatMap((item) => item.sourceIds),
            ]
          : entry.variant === "maritime-risk" ||
              entry.variant === "arctic-route"
            ? [
                ...entry.claimAudit.flatMap((item) => item.sourceIds),
                ...entry.routes.flatMap((route) => route.sourceIds),
                ...entry.routes.flatMap((route) =>
                  route.points.flatMap((point) => point.sourceIds)
                ),
                ...entry.scaleMetrics.flatMap((item) => item.sourceIds),
                ...entry.timeline.flatMap((item) => item.sourceIds),
              ]
            : entry.variant === "circulation-gates"
              ? [
                  entry.audio.sourceId,
                  ...entry.claimAudit.flatMap((item) => item.sourceIds),
                  ...entry.gates.flatMap((gate) => gate.sourceIds),
                  ...entry.tradeProofs.flatMap((item) => item.sourceIds),
                  ...entry.tradePressure.flatMap((item) => item.sourceIds),
                  ...entry.tradeFrames.flatMap((item) => item.sourceIds),
                ]
              : entry.variant === "circulation-two-domain"
                ? [
                    entry.audio.sourceId,
                    ...entry.claimAudit.flatMap((item) => item.sourceIds),
                    ...entry.gates.flatMap((gate) => gate.sourceIds),
                  ]
                : entry.variant === "origin-proof"
                  ? [
                      ...entry.claimAudit.flatMap((item) => item.sourceIds),
                      ...entry.gates.flatMap((gate) => gate.sourceIds),
                      ...entry.tradeProofs.flatMap((item) => item.sourceIds),
                      ...entry.tradePressure.flatMap((item) => item.sourceIds),
                      ...entry.tradeFrames.flatMap((item) => item.sourceIds),
                    ]
                  : entry.variant === "trade-adjustment"
                    ? [
                        entry.audio.sourceId,
                        ...entry.passageAudit.flatMap((item) => item.sourceIds),
                        ...entry.claimAudit.flatMap((item) => item.sourceIds),
                        ...entry.mechanismSteps.flatMap(
                          (item) => item.sourceIds
                        ),
                        ...entry.shockComparisons.flatMap(
                          (item) => item.sourceIds
                        ),
                        ...entry.distributionCases.flatMap(
                          (item) => item.sourceIds
                        ),
                        ...entry.policyOptions.flatMap(
                          (item) => item.sourceIds
                        ),
                      ]
                    : entry.variant === "economic-signals"
                      ? [
                          ...entry.indicators.flatMap((item) => item.sourceIds),
                          ...entry.alternativeReadings.flatMap(
                            (item) => item.sourceIds
                          ),
                        ]
                      : entry.variant === "energy-system"
                        ? [
                            ...entry.energyLayers.flatMap((layer) =>
                              layer.measures.flatMap((measure) => [
                                ...measure.sourceIds,
                                ...measure.contrasts.flatMap(
                                  (contrast) => contrast.sourceIds
                                ),
                              ])
                            ),
                            ...entry.alternativeReadings.flatMap(
                              (item) => item.sourceIds
                            ),
                          ]
                        : []),
    ];
    for (const reference of references) {
      if (!knownSources.has(reference)) {
        ctx.addIssue({
          code: "custom",
          message: `unknown Notebook source reference: ${reference}`,
          path: ["sourceTrail"],
        });
      }
    }

    if (entry.variant === "evidence-watch") {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.watchItems.map((item) => item.id),
        ["watchItems"],
        "watch-item IDs must be unique"
      );
      entry.watchItems.forEach((item, itemIndex) => {
        if (item.updateState.reviewedAt > entry.updatedAt) {
          ctx.addIssue({
            code: "custom",
            message: "watch review date must not follow entry updatedAt",
            path: ["watchItems", itemIndex, "updateState", "reviewedAt"],
          });
        }
        if (item.updateState.reviewedAt < item.baselineDate) {
          ctx.addIssue({
            code: "custom",
            message: "watch review date must not precede its baseline",
            path: ["watchItems", itemIndex, "updateState", "reviewedAt"],
          });
        }
        if (item.updateState.state !== "verified-change") return;

        checkUnique(
          item.updateState.updates.map((update) => update.id),
          ["watchItems", itemIndex, "updateState", "updates"],
          "watch-update IDs must be unique within a watch item"
        );
        item.updateState.updates.forEach((update, updateIndex) => {
          if (update.date < item.baselineDate) {
            ctx.addIssue({
              code: "custom",
              message: "watch update date must not precede its baseline",
              path: [
                "watchItems",
                itemIndex,
                "updateState",
                "updates",
                updateIndex,
                "date",
              ],
            });
          }
          if (update.date > item.updateState.reviewedAt) {
            ctx.addIssue({
              code: "custom",
              message: "watch update date must not follow its review date",
              path: [
                "watchItems",
                itemIndex,
                "updateState",
                "updates",
                updateIndex,
                "date",
              ],
            });
          }
        });
      });
    }

    if (entry.variant === "power-balance") {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.comparisons.map((item) => item.id),
        ["comparisons"],
        "comparison metric IDs must be unique"
      );
      checkUnique(
        entry.concentrations.map((item) => item.id),
        ["concentrations"],
        "concentration metric IDs must be unique"
      );
      checkUnique(
        entry.demographicProfiles.map((item) => item.country),
        ["demographicProfiles"],
        "demographic countries must be unique"
      );
    }

    if (entry.variant === "maritime-risk" || entry.variant === "arctic-route") {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.routes.map((route) => route.id),
        ["routes"],
        "route IDs must be unique"
      );
      checkUnique(
        entry.routes.flatMap((route) => route.points.map((point) => point.id)),
        ["routes"],
        "map point IDs must be unique"
      );
      checkUnique(
        entry.scaleMetrics.map((item) => item.id),
        ["scaleMetrics"],
        "scale metric IDs must be unique"
      );
      for (let index = 1; index < entry.timeline.length; index += 1) {
        if (entry.timeline[index - 1].date > entry.timeline[index].date) {
          ctx.addIssue({
            code: "custom",
            message: "maritime timeline entries must be chronological",
            path: ["timeline", index, "date"],
          });
        }
      }
    }

    if (entry.variant === "circulation-gates") {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.gates.map((gate) => gate.id),
        ["gates"],
        "gate IDs must be unique"
      );
      checkUnique(
        entry.gates.map((gate) => gate.domain),
        ["gates"],
        "gate domains must be unique"
      );
      checkUnique(
        entry.tradeProofs.map((item) => item.id),
        ["tradeProofs"],
        "trade-proof IDs must be unique"
      );
      checkUnique(
        entry.tradePressure.map((item) => item.id),
        ["tradePressure"],
        "trade-pressure IDs must be unique"
      );
      checkUnique(
        entry.tradeFrames.map((item) => item.id),
        ["tradeFrames"],
        "trade-frame IDs must be unique"
      );
      for (let index = 1; index < entry.tradePressure.length; index += 1) {
        if (
          entry.tradePressure[index - 1].date > entry.tradePressure[index].date
        ) {
          ctx.addIssue({
            code: "custom",
            message: "trade pressure entries must be chronological",
            path: ["tradePressure", index, "date"],
          });
        }
      }
    }

    if (
      entry.variant === "circulation-two-domain" ||
      entry.variant === "origin-proof"
    ) {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.gates.map((gate) => gate.id),
        ["gates"],
        "gate IDs must be unique"
      );
      checkUnique(
        entry.gates.map((gate) => gate.domain),
        ["gates"],
        "gate domains must be unique"
      );
    }

    if (entry.variant === "circulation-two-domain") {
      const domains = entry.gates.map((gate) => gate.domain);
      if (domains[0] !== "culture" || domains[1] !== "memory") {
        ctx.addIssue({
          code: "custom",
          message: "two-domain circulation requires culture then memory",
          path: ["gates"],
        });
      }
    }

    if (entry.variant === "origin-proof") {
      if (entry.gates[0]?.domain !== "trade") {
        ctx.addIssue({
          code: "custom",
          message: "origin proof requires exactly the trade gate",
          path: ["gates"],
        });
      }
      checkUnique(
        entry.tradeProofs.map((item) => item.id),
        ["tradeProofs"],
        "trade-proof IDs must be unique"
      );
      checkUnique(
        entry.tradePressure.map((item) => item.id),
        ["tradePressure"],
        "trade-pressure IDs must be unique"
      );
      checkUnique(
        entry.tradeFrames.map((item) => item.id),
        ["tradeFrames"],
        "trade-frame IDs must be unique"
      );
      for (let index = 1; index < entry.tradePressure.length; index += 1) {
        if (
          entry.tradePressure[index - 1].date > entry.tradePressure[index].date
        ) {
          ctx.addIssue({
            code: "custom",
            message: "trade pressure entries must be chronological",
            path: ["tradePressure", index, "date"],
          });
        }
      }
    }

    if (entry.variant === "trade-adjustment") {
      checkUnique(
        entry.passageAudit.map((item) => item.id),
        ["passageAudit"],
        "passage-audit IDs must be unique"
      );
      checkUnique(
        entry.passageAudit.map((item) => item.requirement),
        ["passageAudit"],
        "passage-audit requirements must be unique"
      );
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.mechanismSteps.map((item) => item.id),
        ["mechanismSteps"],
        "mechanism-step IDs must be unique"
      );
      checkUnique(
        entry.shockComparisons.map((item) => item.id),
        ["shockComparisons"],
        "shock-comparison IDs must be unique"
      );
      checkUnique(
        entry.distributionCases.map((item) => item.id),
        ["distributionCases"],
        "distribution-case IDs must be unique"
      );
      checkUnique(
        entry.policyOptions.map((item) => item.id),
        ["policyOptions"],
        "policy-option IDs must be unique"
      );

      if (entry.passageAudit.some((item) => item.auditState !== "audited")) {
        ctx.addIssue({
          code: "custom",
          message: "every required publisher-audio passage must be audited",
          path: ["passageAudit"],
        });
      }

      const expectedOrders = [1, 2, 3, 4, 5];
      if (
        entry.mechanismSteps.some(
          (item, index) => item.order !== expectedOrders[index]
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "mechanism steps must be ordered 1 through 5",
          path: ["mechanismSteps"],
        });
      }

      entry.passageAudit.forEach((passage, passageIndex) => {
        passage.spans.forEach((span, spanIndex) => {
          if (span.endSeconds <= span.startSeconds) {
            ctx.addIssue({
              code: "custom",
              message: "passage span end must follow its start",
              path: ["passageAudit", passageIndex, "spans", spanIndex],
            });
          }
        });
      });
    }

    if (entry.variant === "economic-signals") {
      checkUnique(
        entry.indicators.map((item) => item.id),
        ["indicators"],
        "indicator IDs must be unique"
      );
      checkUnique(
        entry.indicators.map((item) => item.dimension),
        ["indicators"],
        "indicator dimensions must be unique"
      );
      checkUnique(
        entry.alternativeReadings.map((item) => item.id),
        ["alternativeReadings"],
        "alternative-reading IDs must be unique"
      );

      if (
        entry.indicators.some(
          (item, index) =>
            item.dimension !== notebookEconomicIndicatorDimensions[index]
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "economic indicators must preserve the six-dimension order",
          path: ["indicators"],
        });
      }

      const roles = entry.sourceTrail.map((source) => source.role);
      for (const expected of notebookEconomicSourceRoleRequirements) {
        if (
          roles.filter((role) => role.startsWith(expected.prefix)).length !==
          expected.count
        ) {
          ctx.addIssue({
            code: "custom",
            message: `economic signals require ${expected.label} source roles`,
            path: ["sourceTrail"],
          });
        }
      }
    }

    if (entry.variant === "energy-system") {
      const measures = entry.energyLayers.flatMap((layer) => layer.measures);
      const expectedMeasureIds = [
        "energy-measure-coal-share",
        "energy-measure-renewable-share",
        "energy-measure-coal-output",
        "energy-measure-coal-output-change",
        "energy-measure-wind-solar-capacity",
        "energy-measure-coal-commissioned",
        "energy-measure-coal-utilization",
        "energy-measure-curtailment",
      ];

      checkUnique(
        measures.map((measure) => measure.id),
        ["energyLayers"],
        "energy measure IDs must be unique"
      );
      checkUnique(
        measures.flatMap((measure) =>
          measure.contrasts.map((contrast) => contrast.id)
        ),
        ["energyLayers"],
        "energy contrast IDs must be unique"
      );
      checkUnique(
        entry.alternativeReadings.map((item) => item.id),
        ["alternativeReadings"],
        "alternative-reading IDs must be unique"
      );

      if (
        entry.energyLayers.some(
          (layer, index) => layer.id !== notebookEnergyLayerIds[index]
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "energy layers must preserve the four-layer order",
          path: ["energyLayers"],
        });
      }
      if (
        measures.some(
          (measure, index) => measure.id !== expectedMeasureIds[index]
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "energy measures must preserve the eight-measure order",
          path: ["energyLayers"],
        });
      }

      entry.energyLayers.forEach((layer, layerIndex) => {
        layer.measures.forEach((measure, measureIndex) => {
          checkUnique(
            measure.sourceIds,
            ["energyLayers", layerIndex, "measures", measureIndex, "sourceIds"],
            "energy measure source references must be unique"
          );
          measure.contrasts.forEach((contrast, contrastIndex) => {
            checkUnique(
              contrast.sourceIds,
              [
                "energyLayers",
                layerIndex,
                "measures",
                measureIndex,
                "contrasts",
                contrastIndex,
                "sourceIds",
              ],
              "energy contrast source references must be unique"
            );
          });
          if (measure.layer !== layer.id) {
            ctx.addIssue({
              code: "custom",
              message: "energy measure layer must match its parent layer",
              path: ["energyLayers", layerIndex, "measures", measureIndex],
            });
          }
        });
      });

      const curtailment = measures.find(
        (measure) => measure.id === "energy-measure-curtailment"
      );
      if (curtailment?.evidenceKind !== "modeled-estimate") {
        ctx.addIssue({
          code: "custom",
          message: "360 TWh curtailment must remain a modeled estimate",
          path: ["energyLayers"],
        });
      }
      const demandForecast = measures
        .flatMap((measure) => measure.contrasts)
        .find((contrast) => contrast.id === "energy-contrast-demand-forecast");
      if (demandForecast?.evidenceKind !== "forecast") {
        ctx.addIssue({
          code: "custom",
          message: "IEA 5.5 percent demand growth must remain a forecast",
          path: ["energyLayers"],
        });
      }
    }
  });

export type NotebookEntry = z.infer<typeof NotebookEntrySchema>;
export type ArgumentNotebookEntry = Extract<
  NotebookEntry,
  { variant: "argument-model" }
>;
export type EvidenceWatchNotebookEntry = Extract<
  NotebookEntry,
  { variant: "evidence-watch" }
>;
export type PowerBalanceNotebookEntry = Extract<
  NotebookEntry,
  { variant: "power-balance" }
>;
export type MaritimeRiskNotebookEntry = Extract<
  NotebookEntry,
  { variant: "maritime-risk" }
>;
export type ArcticRouteNotebookEntry = Extract<
  NotebookEntry,
  { variant: "arctic-route" }
>;
export type CirculationGatesNotebookEntry = Extract<
  NotebookEntry,
  { variant: "circulation-gates" }
>;
export type CirculationTwoDomainNotebookEntry = Extract<
  NotebookEntry,
  { variant: "circulation-two-domain" }
>;
export type OriginProofNotebookEntry = Extract<
  NotebookEntry,
  { variant: "origin-proof" }
>;
export type TradeAdjustmentNotebookEntry = Extract<
  NotebookEntry,
  { variant: "trade-adjustment" }
>;
export type EconomicSignalsNotebookEntry = Extract<
  NotebookEntry,
  { variant: "economic-signals" }
>;
export type EnergySystemNotebookEntry = Extract<
  NotebookEntry,
  { variant: "energy-system" }
>;
export type NotebookMechanismStep = z.infer<typeof NotebookMechanismStepSchema>;
export type NotebookShockComparison = z.infer<
  typeof NotebookShockComparisonSchema
>;
export type NotebookDistributionCase = z.infer<
  typeof NotebookDistributionCaseSchema
>;
export type NotebookPolicyOption = z.infer<typeof NotebookPolicyOptionSchema>;
export type NotebookEconomicIndicator = z.infer<
  typeof NotebookEconomicIndicatorSchema
>;
export type NotebookEnergyMeasure = z.infer<typeof NotebookEnergyMeasureSchema>;
export type NotebookCirculationGate = z.infer<
  typeof NotebookCirculationGateSchema
>;
export type NotebookTradeProof = z.infer<typeof NotebookTradeProofSchema>;
export type NotebookTradePressure = z.infer<typeof NotebookTradePressureSchema>;
export type NotebookTradeFrame = z.infer<typeof NotebookTradeFrameSchema>;
export type NotebookTradeFrameSourceClass = z.infer<
  typeof NotebookTradeFrameSourceClassSchema
>;
export type NotebookAudio = z.infer<typeof NotebookAudioSchema>;
export type NotebookEvidenceStatus = z.infer<
  typeof NotebookEvidenceStatusSchema
>;
export type NotebookMaritimeRoute = z.infer<typeof NotebookMaritimeRouteSchema>;
export type NotebookRelatedNotebook = z.infer<
  typeof NotebookRelatedNotebookSchema
>;
export type NotebookLegacyFragment = z.infer<
  typeof NotebookLegacyFragmentSchema
>;

export function parseNotebookEntry(value: unknown): NotebookEntry {
  return NotebookEntrySchema.parse(value);
}

export function parseMaritimeRiskNotebookEntry(
  value: unknown
): MaritimeRiskNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "maritime-risk") {
    throw new Error("expected a maritime-risk Notebook entry");
  }
  return entry;
}

export function parseArcticRouteNotebookEntry(
  value: unknown
): ArcticRouteNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "arctic-route") {
    throw new Error("expected an arctic-route Notebook entry");
  }
  return entry;
}

export function parseCirculationGatesNotebookEntry(
  value: unknown
): CirculationGatesNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "circulation-gates") {
    throw new Error("expected a circulation-gates Notebook entry");
  }
  return entry;
}

export function parseCirculationTwoDomainNotebookEntry(
  value: unknown
): CirculationTwoDomainNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "circulation-two-domain") {
    throw new Error("expected a circulation-two-domain Notebook entry");
  }
  return entry;
}

export function parseOriginProofNotebookEntry(
  value: unknown
): OriginProofNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "origin-proof") {
    throw new Error("expected an origin-proof Notebook entry");
  }
  return entry;
}

export function parseTradeAdjustmentNotebookEntry(
  value: unknown
): TradeAdjustmentNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "trade-adjustment") {
    throw new Error("expected a trade-adjustment Notebook entry");
  }
  return entry;
}

export function parseEconomicSignalsNotebookEntry(
  value: unknown
): EconomicSignalsNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "economic-signals") {
    throw new Error("expected an economic-signals Notebook entry");
  }
  return entry;
}

export function parseEnergySystemNotebookEntry(
  value: unknown
): EnergySystemNotebookEntry {
  const entry = NotebookEntrySchema.parse(value);
  if (entry.variant !== "energy-system") {
    throw new Error("expected an energy-system Notebook entry");
  }
  return entry;
}
