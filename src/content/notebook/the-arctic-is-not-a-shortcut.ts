import {
  arcticClaimAudit,
  arcticFormats,
  arcticRoutes,
  arcticScaleMetrics,
  arcticSources,
  arcticTimeline,
  arcticTurningPoints,
  legacyRoutingAroundRisk,
} from "@/content/notebook/inquiry-04-10-authority";
import { parseArcticRouteNotebookEntry } from "@/content/notebook/schema";

const scopedArcticClaims = arcticClaimAudit.map((item) =>
  item.id === "audit-risk-portfolio"
    ? {
        ...item,
        claim:
          "The Northern Sea Route can replace the energy function of Hormuz or the container scale of Suez.",
        status: "corrected" as const,
        decision: "exclude" as const,
        assessment:
          "The reviewed records describe a small seasonal container program under Russian administration. CHNL's transit series, operator scheduling, and independent launch reporting do not establish Gulf energy substitution, Suez-scale capacity, completed repeatable service, or a risk-free corridor.",
        sourceIds: [
          "notebook-source-risk-chnl-2025",
          "notebook-source-risk-aljazeera",
          "notebook-source-risk-guardian",
        ],
      }
    : item
);

export const theArcticIsNotAShortcut = parseArcticRouteNotebookEntry({
  variant: "arctic-route",
  ordinal: 10,
  slug: "the-arctic-is-not-a-shortcut",
  title: "The Arctic Is Not a Shortcut",
  subtitle:
    "A shorter Arctic route promises faster container journeys. Can seasonal sailings become dependable service, and what do the public records actually establish about their scale?",
  description:
    "A shorter Arctic route raises a harder question: can seasonal sailings become dependable service? Examine the scale, operating constraints, and unresolved voyage evidence.",
  thesis:
    "The Northern Sea Route supports a small seasonal container experiment under ice, Russian-administration, insurance, sanctions, vessel, and environmental constraints. It cannot be read as a reliable substitute for Hormuz energy flows or Suez-scale container traffic. A schedule or reported departure still does not establish completed transit or repeatable service.",
  frontPagePreview: {
    finding:
      "The Northern Sea Route can shorten selected seasonal container voyages, but the admitted record establishes only a bounded experiment under ice, Russian-administration, insurance, sanctions, and environmental constraints.",
    status: "interpretation",
    caveat:
      "A schedule and a reported departure do not prove arrival, completed Arctic transit, reliable weekly operation, safe passage, or lower lifecycle impact.",
    sourceIds: [
      "notebook-source-risk-nsidc-passage",
      "notebook-source-risk-imo-hfo",
      "notebook-source-risk-zhoushan-departure",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-09-01",
  updatedAt: "2026-09-01",
  readTime: "16 min",
  tags: [
    "China",
    "Northern Sea Route",
    "Arctic shipping",
    "Russia",
    "Maritime trade",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: arcticFormats,
  turningPoints: arcticTurningPoints,
  claimAudit: scopedArcticClaims,
  scaleMetrics: arcticScaleMetrics,
  routes: arcticRoutes,
  timeline: arcticTimeline,
  sections: {
    frame: [
      "The map invites a category error. A route that may reduce distance for selected containers does not perform the same economic function as Hormuz oil and LNG flows or Suez-scale container traffic. The Northern Sea Route must be judged in its own units: season, vessel, cargo, administration, and completed passage.",
      "The public record supports commercial experimentation. It does not support a claim that China has escaped Middle Eastern chokepoints, that an operator schedule has become reliable liner service, or that one reported departure completed the route.",
    ],
    scale: legacyRoutingAroundRisk.sections.arctic.slice(0, 2),
    season: [
      legacyRoutingAroundRisk.sections.arctic[2],
      "A shorter physical line therefore carries a schedule distribution, not a guaranteed transit time. Vessel ice class, local conditions, escort availability, weather, and port sequence can change whether a planned sailing departs, which route it takes, and when it arrives.",
    ],
    governance: [
      "The corridor is administered through Russian permits, ice information, traffic services, emergency capacity, and, in some conditions, icebreaker support. Operators also face flag, ownership, sanctions, insurance, contracting, and payment dependencies that a distance comparison does not show.",
      "Bellona's two counts describe different populations: 100 non-Russian-flagged vessels received permits in 2024, while a separate review identified 100 sanctioned or shadow vessels operating in 2025. Neither count alone proves a completed voyage, safe operation, or the composition of a dependable liner fleet.",
    ],
    environment: [
      "The IMO prohibition on carrying or using heavy fuel oil in Arctic waters took effect in July 2024, but protected-tank provisions and coastal-state waivers preserve transition paths through July 2029. An operative rule with exemptions is not the same thing as a route-wide elimination of HFO risk.",
      "Less distance may reduce fuel used on a particular voyage, but the reviewed sources do not establish lower lifecycle impact. Black carbon, spill response, rescue distance, ice operations, vessel design, cargo, and the counterfactual route all affect the comparison.",
    ],
    limits: [
      "The admitted evidence records one port-backed August 15 departure after a weather adjustment. It does not establish arrival, completed Arctic transit, a particular ship's current position, or whether later scheduled sailings operated.",
      "This inquiry offers no ice certification, AIS feed, voyage tracker, navigation advice, safety promise, sanctions screening, insurance recommendation, or route selection. The map is a source-backed schematic corridor.",
    ],
    changed: [
      "On September 1, the Arctic material became a separate inquiry. Its route, measurements, chronology, sources, and claim review moved together from Inquiry 04.",
      "Both inquiries still cite the same Al Jazeera and Guardian records, with context specific to each article. Existing source identifiers and links remain valid.",
      "The publication refresh found a later report of departure from the final Chinese port on August 19, but no public arrival or completed-transit record. The later report remains in the dated research addendum, outside the sources reviewed for this article.",
    ],
  },
  sourceTrail: arcticSources,
  unresolvedQuestion:
    "Will public arrival records and repeated completed voyages show that the announced seasonal program can operate predictably without understating ice, rescue, insurance, sanctions, and environmental dependencies?",
  limitations: [
    "The source cutoff is September 1, 2026; later voyage evidence requires a dated review rather than a silent rewrite.",
    "The map uses schematic corridor geometry, not AIS tracks, navigational routes, live ice conditions, security guidance, or proof of a named vessel's movement.",
    "NSIDC's broad July-to-October guidance does not certify any segment ice-free or predict conditions for a particular vessel.",
    "Sea Legend's eight-sailing schedule is operator-derived; a public-authority report confirms the August 15 departure but not arrival or completed transit.",
    "Total NSR cargo, international transit cargo, and scheduled container sailings use different scopes and units and cannot be added into one scale claim.",
    "The IMO HFO rule includes protected-tank provisions and coastal-state waivers through 2029; the reviewed page does not quantify route-wide fuel use or lifecycle impact.",
    "Bellona's permit and shadow-fleet datasets are open-source NGO analyses that require vessel-level review for ownership, flag, sanctions date, ice class, and voyage completion.",
  ],
  relatedNotebooks: [
    {
      slug: "routing-around-risk",
      relation: "companion",
      label: "The non-Arctic chokepoint portfolio",
    },
  ],
});
