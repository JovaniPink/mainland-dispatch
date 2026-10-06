import {
  parseCirculationTwoDomainNotebookEntry,
  type CirculationTwoDomainNotebookEntry,
} from "@/content/notebook/schema";
import { legacyWhatGetsThrough } from "@/content/notebook/what-gets-through-legacy";
import {
  cultureClaimAudit,
  cultureGates,
  cultureSources,
  cultureTurningPoints,
  initiatingEpisodeSource,
  inquiry06LegacyFragments,
  sharedTranscriptAudit,
} from "@/content/notebook/inquiry-06-09-authority";

const parsed = parseCirculationTwoDomainNotebookEntry({
  variant: "circulation-two-domain",
  ordinal: legacyWhatGetsThrough.ordinal,
  slug: legacyWhatGetsThrough.slug,
  title: legacyWhatGetsThrough.title,
  subtitle:
    "How does culture reach an audience, and how does public memory remain sayable? Networked attention and national-security law impose different rules, with profoundly different stakes.",
  description:
    "A source-audited inquiry into how networked attention and national-security law shape what reaches an audience or remains publicly sayable.",
  thesis:
    "Networked attention and national-security law shape circulation through different institutions. Audiences and cinemas allocate attention; courts assign criminal meaning to political advocacy. Comparing their rules helps explain how a film becomes visible and how public remembrance is restricted, while keeping box-office visibility and loss of liberty distinct in their human stakes.",
  frontPagePreview: {
    finding:
      "Culture and public memory move through different institutions: audiences can reverse a film's visibility, while law can narrow the space for political remembrance.",
    status: "interpretation",
    caveat:
      "The film figures are dated snapshots, the Hong Kong convictions remain distinct from sentencing, and the two mechanisms are not morally equivalent.",
    sourceIds: [
      "notebook-source-gates-guardian-niulai",
      "notebook-source-gates-judgment",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: legacyWhatGetsThrough.publishedAt,
  updatedAt: "2026-09-01",
  readTime: "16 min",
  tags: [
    "China",
    "Niu Lai",
    "Hong Kong",
    "Networked attention",
    "Public memory",
  ],
  editorialStatus: "corrected",
  reviewState: legacyWhatGetsThrough.reviewState,
  formats: legacyWhatGetsThrough.formats,
  audio: legacyWhatGetsThrough.audio,
  turningPoints: cultureTurningPoints,
  gates: cultureGates,
  claimAudit: cultureClaimAudit,
  sourceTrail: cultureSources,
  sections: {
    lens: [
      "The original inquiry compared three gates: customs origin, networked attention, and national-security law. The rules-of-origin material now has its own companion because its legal proof sequence was obscured by a three-domain comparison. This corrected article keeps the two domains that ask how speech and culture become publicly reachable.",
      "The mechanisms still must not be collapsed. A film can gain screens when attention changes a commercial demand signal. Political remembrance can become evidence in a criminal case when a court assigns legal meaning to advocacy. One is a distribution reversal; the other carries state coercion and loss of liberty.",
    ],
    culture: legacyWhatGetsThrough.sections.culture,
    memory: legacyWhatGetsThrough.sections.memory,
    limits: legacyWhatGetsThrough.sections.limits,
    changed: [
      "September 1 correction: the rules-of-origin and transshipment-proof material moved to Inquiry 09, Where Does Origin Change?, with its source identities, chronology, claim checks, and figure preserved.",
      "Inquiry 06 now compares culture and public memory. The original publisher audio remains on this page, where readers can load it by consent.",
      "The original article URL and publication date are unchanged. Earlier links to trade material and its sources still lead readers to the corresponding passage in the companion inquiry.",
    ],
  },
  unresolvedQuestion:
    "When institutions restrict circulation, which forms of public evidence can distinguish a temporary distribution failure from a durable narrowing of civic space?",
  limitations: [
    "The publisher provides no transcript or chapter record; the culture and memory locators were audited manually against the complete audio.",
    "The Niu Lai box-office figures are dated Maoyan snapshots rather than a final gross or a common-period lifetime comparison.",
    "The Hong Kong judgment, prosecution position, rights criticism, conviction, mitigation, and sentencing are distinct records.",
    "The culture and memory mechanisms are compared for structure, not moral equivalence or common consequence.",
    "Rules-of-origin material now belongs to Inquiry 09; compatibility notices preserve the predecessor fragments without making Inquiry 06 a duplicate trade article.",
  ],
  relatedNotebooks: [
    {
      slug: "where-does-origin-change",
      relation: "companion",
      label: "Rules of origin and transshipment proof",
    },
  ],
  legacyFragments: inquiry06LegacyFragments,
});

export const whatGetsThrough: CirculationTwoDomainNotebookEntry = Object.freeze(
  {
    ...parsed,
    sourceTrail: parsed.sourceTrail.map((source) =>
      source.id === initiatingEpisodeSource.id
        ? initiatingEpisodeSource
        : source
    ),
    claimAudit: parsed.claimAudit.map((claim) =>
      claim.id === sharedTranscriptAudit.id ? sharedTranscriptAudit : claim
    ),
  }
);
