type Candidate = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  publicationYear?: number;
  contentType: "primary" | "reporting";
  topics: string[];
  notes: string;
  language?: string;
  translationStatus?:
    "original-language" | "original-english" | "publisher-translation";
  accessStatus?: "reachable" | "restricted";
  nextReviewAt: string;
  decisionReason?: string;
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-09-15",
  sourceOrigin: "web-research" as const,
  collectionId: "china-news-2026-09-15",
  reviewState: "metadata-checked" as const,
  disposition: "withheld" as const,
  accessStatus: item.accessStatus ?? ("reachable" as const),
  urlStatus: "publisher-canonical" as const,
  canonicalCheckedAt: "2026-09-15",
  language: item.language ?? "English",
  translationStatus: item.translationStatus ?? ("original-english" as const),
  evidenceStatus: "unverified" as const,
  paywall: false,
  ...item,
  decisionReason:
    item.decisionReason ??
    "Admitted to the September 15 research snapshot after a publisher and metadata check. Withheld from public use pending a complete source read, claim-level corroboration, translation review where applicable, and editorial approval.",
});

/**
 * Five-story current-news intake frozen on September 15, 2026. These records
 * remain research leads for the locally gated Desk and are not publications.
 */
export const chinaNews20260915 = [
  candidate({
    id: "lead-2026-nbs-august-economy",
    title:
      "National Economy Remained Steady with Innovation-Led and High-Quality Development in August",
    url: "https://www.stats.gov.cn/english/PressRelease/202609/t20260915_1965305.html",
    publisher: "National Bureau of Statistics of China",
    publishedAt: "2026-09-15",
    contentType: "primary",
    topics: [
      "china",
      "economy",
      "industrial-production",
      "investment",
      "trade",
    ],
    language: "English",
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-10-19",
    notes:
      "Official August overview covering industrial production, investment, trade, employment, and prices. Preserve real versus nominal growth, monthly versus cumulative periods, survey thresholds, and the notice that the Chinese edition controls if versions differ.",
  }),
  candidate({
    id: "lead-2026-nbs-august-retail-sales",
    title: "Total Retail Sales of Consumer Goods, January to August 2026",
    url: "https://www.stats.gov.cn/sj/zxfb/202609/t20260915_1965311.html",
    publisher: "National Bureau of Statistics of China",
    publishedAt: "2026-09-15",
    contentType: "primary",
    topics: ["china", "economy", "retail-sales", "consumption", "statistics"],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-10-19",
    notes:
      "Official release reports August and January to August retail measures. Retail sales are not total household consumption; the release also changes online-retail coverage and warns that the revised series is not directly comparable with the former measure.",
  }),
  candidate({
    id: "lead-2026-nbs-august-real-estate",
    title: "National Real Estate Market, January to August 2026",
    url: "https://www.stats.gov.cn/sj/zxfb/202609/t20260915_1965310.html",
    publisher: "National Bureau of Statistics of China",
    publishedAt: "2026-09-15",
    contentType: "primary",
    topics: ["china", "economy", "property", "housing", "investment"],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-10-19",
    notes:
      "Official cumulative release for development investment, construction, sales, inventory, and developer funding. Keep new-home sales, second-hand transaction registrations, floor area, value, investment, and financing as separate measures.",
  }),
  candidate({
    id: "lead-2026-ap-china-august-exports",
    title: "China's exports pick up in August as its trade surplus widens",
    url: "https://apnews.com/article/china-trade-exports-digital-trump-jinping-77c208d1f62270bba66b8241b1b14a4c",
    publisher: "Associated Press",
    publishedAt: "2026-09-08",
    contentType: "reporting",
    topics: ["china", "economy", "exports", "trade-surplus", "united-states"],
    nextReviewAt: "2026-10-19",
    notes:
      "Independent reporting on August customs data and trade context. Reported percentage changes, bilateral values, analyst interpretation, and geopolitical explanations require the underlying customs release and compatible denominators before reuse.",
  }),
  candidate({
    id: "lead-2026-state-council-exit-entry-regulation",
    title: "State Council Regulation on Exit and Entry Administration",
    url: "https://www.gov.cn/zhengce/content/202607/content_7077172.htm",
    publisher: "State Council of the People's Republic of China",
    publishedAt: "2026-07-31",
    contentType: "primary",
    topics: [
      "china",
      "exit-entry",
      "immigration",
      "national-security",
      "technology-transfer",
    ],
    language: "Chinese",
    translationStatus: "original-language",
    accessStatus: "restricted",
    nextReviewAt: "2026-10-15",
    decisionReason:
      "The canonical State Council endpoint returned an access restriction during the September 15 refresh, while the official government gateway exposed the regulation metadata and text. Withheld pending direct canonical readback, legal review, corroboration, and editorial approval.",
    notes:
      "Controlling regulation issued as State Council Decree No. 841 and effective September 15, 2026. Do not characterize targeted no-exit provisions or high-risk-travel warnings as a general closure of China's borders.",
  }),
  candidate({
    id: "lead-2026-nia-exit-entry-regulation-qa",
    title:
      "Justice, public security, and immigration officials explain the exit-entry regulation",
    url: "https://www.nia.gov.cn/n794014/n1050181/n1050484/c1793235/content.html",
    publisher: "National Immigration Administration of China",
    publicationYear: 2026,
    contentType: "primary",
    topics: [
      "china",
      "exit-entry",
      "immigration",
      "legal-guidance",
      "technology-transfer",
    ],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-10-15",
    notes:
      "Official question-and-answer explanation of safety warnings, exit restrictions, foreign entry, intermediary registration, privacy, written notice, and remedies. It is an agency interpretation and does not supply implementation statistics or independent legal analysis.",
  }),
  candidate({
    id: "lead-2026-ap-china-exit-bans",
    title:
      "China can block citizens from leaving over national security or technology export violations",
    url: "https://apnews.com/article/china-immigration-exit-bans-technology-national-security-1473949945b7ef60a68e80db598c847a",
    publisher: "Associated Press",
    publishedAt: "2026-09-15",
    contentType: "reporting",
    topics: [
      "china",
      "exit-entry",
      "national-security",
      "technology-transfer",
      "civil-rights",
    ],
    nextReviewAt: "2026-10-15",
    notes:
      "Independent same-day report on selected provisions and government explanations. The report establishes the rule's effective date and quoted scope, not how frequently or broadly authorities will apply the powers in practice.",
  }),
  candidate({
    id: "lead-2026-beijing-drone-regulation",
    title: "Beijing Regulation on Unmanned Aircraft Administration",
    url: "https://gaj.beijing.gov.cn/wsgs/2024zcwj/zcfg/202609/t20260914_4862705.html",
    publisher: "Beijing Municipal People's Congress Standing Committee",
    publishedAt: "2026-09-13",
    contentType: "primary",
    topics: ["beijing", "drones", "aviation", "public-security", "regulation"],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-11-15",
    notes:
      "Full revised municipal text effective November 15, 2026. Preserve its Beijing jurisdiction, restrictions on flight, possession, storage, transport, sale, and modification, listed special-support cases, agency rules, and penalty ranges.",
  }),
  candidate({
    id: "lead-2026-beijing-drone-disposal-guidance",
    title:
      "Beijing announces implementation date and disposal channels for revised drone rules",
    url: "https://www.beijing.gov.cn/ywdt/yaowen/202609/t20260913_4861674.html",
    publisher: "Beijing Daily via Beijing Municipal Government",
    publishedAt: "2026-09-13",
    contentType: "reporting",
    topics: ["beijing", "drones", "buyback", "recycling", "regulation"],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-11-15",
    notes:
      "Official-portal reporting on buyback, recycling, shipment, and removal deadlines for existing devices. Eligibility, subsidy amounts, dates, and local implementation should be rechecked against district notices before practical guidance is published.",
  }),
  candidate({
    id: "lead-2026-ap-beijing-drone-ban",
    title: "Beijing bans drone possession after earlier moves to tighten rules",
    url: "https://apnews.com/article/beijing-drones-ban-china-c66efabeb1293231165cf4c75a8bedf6",
    publisher: "Associated Press",
    publishedAt: "2026-09-13",
    contentType: "reporting",
    topics: ["beijing", "drones", "aviation", "public-security", "regulation"],
    nextReviewAt: "2026-11-15",
    notes:
      "Independent report summarizing the revised possession rules, earlier registration policy, enforcement, and disposal choices. Do not generalize Beijing's rules to the rest of China or omit the regulation's special-support cases.",
  }),
  candidate({
    id: "lead-2026-mofcom-reciprocal-tariff-briefing",
    title: "Ministry of Commerce regular press conference, September 10, 2026",
    url: "https://www.mofcom.gov.cn/xwfbzt/2026/swbzklxxwfbh2026n9y10r/index.html",
    publisher: "Ministry of Commerce of the People's Republic of China",
    publishedAt: "2026-09-10",
    contentType: "primary",
    topics: [
      "china",
      "united-states",
      "tariffs",
      "trade-negotiations",
      "trade-policy",
    ],
    language: "Chinese",
    translationStatus: "original-language",
    nextReviewAt: "2026-09-24",
    notes:
      "Official Chinese statement that consultations continue on a reciprocal tariff-reduction framework covering 30 billion dollars on each side. It does not establish implementation, products, tariff lines, rates, timing, or legal instruments.",
  }),
  candidate({
    id: "lead-2026-ustr-board-of-trade-update",
    title:
      "Ambassador Greer discusses the U.S.-China Board of Trade and nonsensitive goods",
    url: "https://www.ustr.gov/about/policy-offices/press-office/press-releases/2026/september/ambassador-greer-joins-ft-news-briefing-podcast-financial-times-aime-williams",
    publisher: "Office of the United States Trade Representative",
    publishedAt: "2026-09-09",
    contentType: "primary",
    topics: [
      "china",
      "united-states",
      "tariffs",
      "board-of-trade",
      "trade-negotiations",
    ],
    nextReviewAt: "2026-09-24",
    notes:
      "Official U.S. excerpt describing work to identify balanced trade in nonsensitive goods. It is an attributed policy statement, not a published agreement, product schedule, tariff modification, or measured outcome.",
  }),
  candidate({
    id: "lead-2026-ap-us-china-tariff-framework",
    title: "China and the United States discuss a limited tariff rollback",
    url: "https://apnews.com/article/china-us-tariffs-trade-trump-xi-summit-f2066bf9ae668afd3a5a2a0658748b4f",
    publisher: "Associated Press",
    publishedAt: "2026-09-10",
    contentType: "reporting",
    topics: [
      "china",
      "united-states",
      "tariffs",
      "trade-negotiations",
      "bilateral-trade",
    ],
    nextReviewAt: "2026-09-24",
    notes:
      "Independent reporting connects statements from both sides and adds scale and analyst context. Treat summit timing, negotiating expectations, and possible benefits as attributed or prospective until official schedules and legal actions are published.",
  }),
  candidate({
    id: "lead-2026-mfa-xi-modi-brics",
    title: "President Xi Jinping meets with Prime Minister Narendra Modi",
    url: "https://www.mfa.gov.cn/mfa_eng/xw/zyxw/202609/t20260913_12021206.html",
    publisher: "Ministry of Foreign Affairs of the People's Republic of China",
    publishedAt: "2026-09-12",
    contentType: "primary",
    topics: ["china", "india", "brics", "diplomacy", "border-relations"],
    language: "English",
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-10-12",
    notes:
      "Official Chinese readout of the September 12 bilateral meeting. Preserve its statements as China's account and compare claims attributed to India with India's own record before reuse.",
  }),
  candidate({
    id: "lead-2026-india-pib-xi-modi-brics",
    title:
      "Prime Minister's bilateral meeting with Chinese President Xi Jinping",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2309538&lang=1&reg=48",
    publisher: "Press Information Bureau, Government of India",
    publishedAt: "2026-09-12",
    contentType: "primary",
    topics: ["china", "india", "brics", "diplomacy", "border-relations"],
    nextReviewAt: "2026-10-12",
    notes:
      "Official Indian readout emphasizing border peace, existing agreements, trade imbalance, supply chains, market access, mobility, and a mutually acceptable boundary resolution. It records positions and commitments, not completed outcomes.",
  }),
  candidate({
    id: "lead-2026-ap-xi-modi-brics",
    title: "India's Modi and China's Xi seek to reset ties on BRICS sidelines",
    url: "https://apnews.com/article/india-china-brics-e51a7eb70cfb3c79c978fbf9cc9cbed5",
    publisher: "Associated Press",
    publishedAt: "2026-09-12",
    contentType: "reporting",
    topics: ["china", "india", "brics", "diplomacy", "border-relations"],
    nextReviewAt: "2026-10-12",
    notes:
      "Independent reporting compares the two official accounts and adds border-clash chronology. A meeting, stated consensus, or diplomatic thaw does not establish a boundary settlement, troop change, market-access change, or durable reset.",
  }),
];
