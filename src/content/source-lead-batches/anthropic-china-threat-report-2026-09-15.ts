type Candidate = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
  contentType: "primary" | "research" | "reporting" | "podcast";
  topics: string[];
  notes: string;
  byline?: string;
  accessStatus?: "reachable" | "restricted";
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-09-15",
  sourceOrigin: "web-research" as const,
  collectionId: "anthropic-china-threat-report-2026-09-15",
  reviewState: "metadata-checked" as const,
  disposition: "withheld" as const,
  accessStatus: item.accessStatus ?? ("reachable" as const),
  urlStatus: "publisher-canonical" as const,
  canonicalCheckedAt: "2026-09-15",
  language: "English",
  translationStatus: "original-english" as const,
  evidenceStatus: "unverified" as const,
  paywall: false,
  nextReviewAt: "2026-09-22",
  decisionReason:
    "Admitted to the private Anthropic threat-report story packet after publisher, date, scope, and endpoint checks. Withheld pending complete source and audio review, independent corroboration of material attributions, response requests, security review, and editorial approval.",
  ...item,
});

/**
 * Initial source packet for the September 2026 Anthropic threat-intelligence
 * story. Catalog inclusion preserves leads; it does not verify Anthropic's
 * actor attributions or authorize a public Notebook or Dispatch.
 */
export const anthropicChinaThreatReport20260915 = [
  candidate({
    id: "lead-2026-anthropic-september-threat-report",
    title: "Countering misuse of AI: September 2026",
    url: "https://www.anthropic.com/threat-intelligence-report-september-2026",
    publisher: "Anthropic",
    publishedAt: "2026-09-10",
    contentType: "primary",
    topics: [
      "china",
      "anthropic",
      "claude",
      "threat-intelligence",
      "military",
      "weapons",
      "surveillance",
      "transnational-repression",
      "distillation",
    ],
    notes:
      "Controlling company report for activity Anthropic says it observed and disrupted between December 2025 and August 2026. It describes selected, non-typical cases and uses internal actor designators, account evidence, model interactions, and confidence assessments. Treat every actor identity, institutional link, capability-uplift estimate, and operational outcome as Anthropic's claim until independently corroborated. Preserve its differing confidence levels and its explicit inability to identify the anti-torpedo actor.",
  }),
  candidate({
    id: "lead-2026-anthropic-military-intelligence-evaluations",
    title:
      "Measuring tactical intelligence targeting and conventional weapons capabilities of AI models",
    url: "https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities",
    publisher: "Anthropic",
    publishedAt: "2026-09-10",
    contentType: "research",
    topics: [
      "china",
      "anthropic",
      "artificial-intelligence",
      "model-evaluation",
      "military",
      "weapons",
      "intelligence",
    ],
    notes:
      "Companion Frontier Red Team evaluation for tactical targeting and conventional-weapons tasks. It can clarify the capability mechanism alleged in the incident report, but a controlled evaluation is not proof that a named operation achieved an operational military result. Review task construction, baselines, graders, model versions, and reproducibility before using comparative claims about PRC-developed models.",
  }),
  candidate({
    id: "lead-2026-ap-anthropic-threat-report",
    title:
      "Anthropic says it blocked misuse of its AI that could have supported biological weapons",
    url: "https://apnews.com/article/anthropic-ai-threat-bioweapon-russia-00266dca90e4f8853f669648998d3bda",
    publisher: "Associated Press",
    publishedAt: "2026-09-11",
    contentType: "reporting",
    byline: "Barbara Ortutay",
    topics: [
      "china",
      "anthropic",
      "claude",
      "threat-intelligence",
      "military",
      "weapons",
      "surveillance",
      "artificial-intelligence",
    ],
    accessStatus: "restricted",
    notes:
      "Independent reporting establishes the report's release and wider misuse context, including Anthropic's description of selected cases and safeguards. It does not independently validate Anthropic's private account telemetry, actor attributions, institutional links, or claims about capability uplift.",
  }),
  candidate({
    id: "lead-2026-axios-anthropic-threat-report",
    title:
      "Anthropic report: 5 ways Claude was exploited for war, spying and repression",
    url: "https://www.axios.com/2026/09/12/anthropic-ai-threat-report-russia-iran-china",
    publisher: "Axios",
    publishedAt: "2026-09-12",
    contentType: "reporting",
    byline: "Zachary Basu",
    topics: [
      "china",
      "anthropic",
      "claude",
      "threat-intelligence",
      "uyghurs",
      "surveillance",
      "military",
      "artificial-intelligence",
    ],
    notes:
      "Concise independent framing of five cases and the emerging role of frontier-model providers as observers of malicious activity. It remains dependent on Anthropic for the underlying incident evidence and should not be treated as separate corroboration of the China-linked attribution or operational claims.",
  }),
  candidate({
    id: "lead-2026-hudson-china-insider-anthropic-threat-report",
    title:
      "Chinese Actors Cited in Anthropic's Threat Report, Xi Jinping at BRICS Summit, Chinese Workers Complain Abroad to Defend Rights",
    url: "https://www.hudson.org/foreign-policy/chinese-actors-cited-anthropics-threat-report-xi-jinping-brics-summit-chinese-miles-yu-colin-tessier-kay",
    publisher: "China Insider · Hudson Institute",
    publishedAt: "2026-09-15",
    contentType: "podcast",
    byline: "Miles Yu and Colin Tessier-Kay",
    topics: [
      "china",
      "anthropic",
      "claude",
      "threat-intelligence",
      "military",
      "security",
      "podcast",
      "commentary",
    ],
    notes:
      "Initiating story lead and strategic commentary. The publisher page identifies the episode and its subjects but provides no transcript. Do not adopt the phrase 'Chinese foreign actors' as a verified category or treat commentary as corroboration. A complete audio audit with timestamps, speaker attribution, and claim boundaries is required before quotation or publication use.",
  }),
];
