import {
  parseOriginProofNotebookEntry,
  type OriginProofNotebookEntry,
} from "@/content/notebook/schema";
import {
  initiatingEpisodeSource,
  legacyTradeFrames,
  legacyTradePressure,
  legacyTradeProofs,
  sharedTranscriptAudit,
  tradeClaimAudit,
  tradeGate,
  tradeSources,
  tradeTurningPoint,
} from "@/content/notebook/inquiry-06-09-authority";

const notice1168Source = {
  id: "notebook-source-gates-notice-1168",
  role: "Primary Canadian quota rule",
  title: "Notice to Importers No. 1168 - Electric vehicles from China",
  publisher: "Global Affairs Canada",
  publishedAt: "2026-08-29",
  retrievedAt: "2026-09-01",
  links: [
    {
      label: "Notice 1168",
      url: "https://www.international.gc.ca/trade-commerce/controls-controles/notices-avis/1168.aspx?lang=eng",
    },
  ],
  context:
    "Sets the second quota period at 24,500 vehicles plus unused first-period volume, using shipment-specific permits for imports into Canada.",
  limitation:
    "The notice governs Canadian admission. It does not decide Canadian production, USMCA origin, entry into the United States, or a customs violation.",
} as const;

const quotaUtilizationSource = {
  id: "notebook-source-gates-quota-utilization",
  role: "Primary Canadian utilization record",
  title: "Imports of electric vehicles from China",
  publisher: "Global Affairs Canada Export and Import Controls System",
  publishedAt: "2026-08-28",
  retrievedAt: "2026-09-01",
  links: [
    {
      label: "Quota utilization report",
      url: "https://www.eics-scei.gc.ca/report-rapport/Imports_of_electric_vehicles_from_China.htm",
    },
  ],
  context:
    "Reports 15,603 first-period quota uses and 8,897 remaining from the 24,500-vehicle maximum through August 28.",
  limitation:
    "Aggregate tariff-line utilization is not a VIN-linked production record, USMCA calculation, US entry, or enforcement finding.",
} as const;

const quotaClaims = [
  {
    id: "audit-gates-quota-utilization",
    claim:
      "Canada's first-period China EV quota recorded 15,603 uses and 8,897 remaining.",
    status: "implemented",
    decision: "retain",
    assessment:
      "The responsible Canadian utilization report provides those aggregate first-period counts. They establish Canadian admission activity only and may still be revised or cancelled.",
    sourceIds: ["notebook-source-gates-quota-utilization"],
  },
  {
    id: "audit-gates-second-period-capacity",
    claim: "The September 1 second-period capacity is 33,397 vehicles.",
    status: "officiallyAnnounced",
    decision: "qualify",
    assessment:
      "Notice 1168 supplies a 24,500 base plus unused first-period volume. Adding the reported 8,897 remainder yields 33,397 as derived arithmetic, not an independently published total or origin finding.",
    sourceIds: [
      "notebook-source-gates-notice-1168",
      "notebook-source-gates-quota-utilization",
    ],
  },
] as const;

const secondPeriodEvent = {
  id: "pressure-canada-second-period",
  date: "2026-08-29",
  actor: "Global Affairs Canada",
  action:
    "Notice 1168 sets the September 1 second quota period at 24,500 vehicles plus unused first-period volume.",
  interpretationLimit:
    "An operative Canadian admission rule does not establish production, USMCA qualification, US entry, or fraud.",
  status: "official-position",
  sourceIds: [
    "notebook-source-gates-notice-1168",
    "notebook-source-gates-quota-utilization",
  ],
} as const;

const parsed = parseOriginProofNotebookEntry({
  variant: "origin-proof",
  ordinal: 9,
  slug: "where-does-origin-change",
  title: "Where Does Origin Change?",
  subtitle:
    "A vehicle can enter Canada without becoming Canadian-origin. What evidence separates border admission from production, origin qualification, and the trade treatment available at US entry?",
  description:
    "A source-audited inquiry into the separate proof gates for Canadian admission, production, USMCA qualification, certification, and entry into the United States.",
  thesis:
    "Admission to Canada does not establish Canadian origin. Production, product-specific USMCA qualification, certification, and US entry each require separate evidence. The reviewed public record documents aggregate Canadian admission; it does not identify a quota vehicle that completed those later steps or establish that one violated customs law.",
  frontPagePreview: {
    finding:
      "Canada recorded 15,603 first-period China EV quota uses, but admission is only the first step in a separate production, qualification, certification, and US-entry proof chain.",
    status: "observed",
    caveat:
      "The quota totals are aggregate, the 33,397 second-period quantity is derived arithmetic, and no reviewed record identifies a vehicle that completed the later gates or violated customs law.",
    sourceIds: [
      "notebook-source-gates-notice-1168",
      "notebook-source-gates-quota-utilization",
    ],
  },
  publishedAt: "2026-09-01",
  updatedAt: "2026-09-01",
  presentationUpdatedAt: "2026-09-07",
  readTime: "19 min",
  tags: ["Canada", "China", "Electric vehicles", "Rules of origin", "USMCA"],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [],
  turningPoints: [tradeTurningPoint],
  gates: [tradeGate],
  tradeProofs: legacyTradeProofs,
  tradePressure: [...legacyTradePressure, secondPeriodEvent],
  tradeFrames: legacyTradeFrames,
  claimAudit: [...tradeClaimAudit, ...quotaClaims],
  sourceTrail: [...tradeSources, notice1168Source, quotaUtilizationSource],
  sections: {
    frame: [
      "Origin is a legal and evidentiary sequence, not a story that can be inferred from the direction of travel. The current public argument begins with a real Canadian admission channel and a contested US concern about circumvention. It must stop at each gate until a record answers the next question.",
      "The initiating episode is shared with Inquiry 06 because it introduced the three circulation cases. Its audio player remains only on Inquiry 06. This page uses the one manually audited transcript record without creating a second media or consent surface.",
    ],
    admission: [
      "Global Affairs Canada's utilization report records 15,603 first-period uses from a maximum of 24,500 vehicles and 8,897 remaining. Notice 1168 sets the next period's base at 24,500 plus that unused amount. The resulting 33,397 is arithmetic from two official component values; it remains subject to revision or cancellation.",
      "These records establish aggregate Canadian admission activity. They do not identify where a vehicle was assembled, calculate its regional value content, certify it under USMCA, record entry into the United States, or find a violation.",
    ],
    production: [
      "Production requires manufacturing or assembly evidence tied to the product. A shipment-specific Canadian import permit says that a vehicle may enter Canada under the quota. It does not transform the vehicle into Canadian production or document a Canadian manufacturing step.",
    ],
    qualification: [
      "USMCA qualification is product-specific. It requires the applicable rule of origin, a content calculation, and certification. Political concern, ownership, aggregate trade growth, or a Canadian destination cannot substitute for those records.",
    ],
    entry: [
      "Entry into the United States is another event with another record. The reviewed public set contains no VIN-linked US entry, origin determination, seizure, penalty, or court finding for a vehicle admitted through the Canadian quota.",
      "Absence from this bounded public review is not proof that no confidential shipment or enforcement record exists. It is a limit on what this publication can claim.",
    ],
    pressure: [
      "The policy chronology is evidence of sustained pressure, changing tariffs, and competing government positions. It is not evidence that every action shares one hidden cause. The September 8 Canadian countertariffs were future-effective at this cutoff, apply to US-origin imports into Canada, and do not establish China-origin transshipment.",
    ],
    limits: [
      "Aggregate utilization cannot identify a vehicle. Modeled exposure cannot assign Canada-only value when its source combines countries. Commentary cannot replace an origin determination. A quota ceiling or use count cannot establish production, qualification, entry, intent, or fraud.",
    ],
    changed: [
      "September 1 publication: rules-of-origin material moved from Inquiry 06 with all 16 legacy trade source identities, its chronology, proof ladder, source frames, and claim checks preserved.",
      "Two primary records were reviewed after the article split: Notice 1168 and the quota utilization report. They clarify observed admission and the calculation of second-period capacity. They do not establish production, origin qualification, or US entry.",
      "Inquiry 06 retains the initiating format, audio metadata, player, culture and memory analysis, original route identity, and accessible compatibility notices for every moved fragment.",
    ],
  },
  unresolvedQuestion:
    "Will a public vehicle-linked record ever connect Canadian admission to production, USMCA certification, and US entry strongly enough to complete the proof chain?",
  limitations: [
    "Quota utilization is aggregate Canadian admission data, not a vehicle-level origin or production record.",
    "The 33,397 second-period quantity is derived arithmetic and remains subject to official revision or cancellation.",
    "USMCA qualification requires product-specific rules, calculations, and certification that are absent from the reviewed quota records.",
    "The reviewed public set contains no VIN-linked US entry or responsible customs finding tied to a quota vehicle.",
    "Political allegations, commentary, and modeled exposure remain attributed and do not establish fraud or intent.",
    "The September 8 countertariffs were future-effective at the September 1 cutoff and concern US-origin imports into Canada.",
  ],
  relatedNotebooks: [
    {
      slug: "what-gets-through",
      relation: "companion",
      label: "Culture, attention, and public memory",
    },
  ],
});

export const whereDoesOriginChange: OriginProofNotebookEntry = Object.freeze({
  ...parsed,
  sourceTrail: parsed.sourceTrail.map((source) =>
    source.id === initiatingEpisodeSource.id ? initiatingEpisodeSource : source
  ),
  claimAudit: parsed.claimAudit.map((claim) =>
    claim.id === sharedTranscriptAudit.id ? sharedTranscriptAudit : claim
  ),
});
