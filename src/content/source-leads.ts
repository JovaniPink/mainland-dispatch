import "server-only";
import { z } from "zod";
import { SourceLeadSchema } from "./source-lead-schema";
import { classifySourceLead } from "./source-lead-taxonomy";
import { anthropicChinaThreatReport20260915 } from "./source-lead-batches/anthropic-china-threat-report-2026-09-15";
import { chinaArticleIntake01 } from "./source-lead-batches/china-article-intake-01";
import { chinaArticleIntake02 } from "./source-lead-batches/china-article-intake-02";
import { chinaArticleIntake03 } from "./source-lead-batches/china-article-intake-03";
import { chinaArticleIntake04 } from "./source-lead-batches/china-article-intake-04";
import { chinaArticleIntake05 } from "./source-lead-batches/china-article-intake-05";
import { chinaArticleIntake06 } from "./source-lead-batches/china-article-intake-06";
import { chinaArticleIntake07 } from "./source-lead-batches/china-article-intake-07";
import { chinaArticleIntake08 } from "./source-lead-batches/china-article-intake-08";
import { chinaArticleIntake09 } from "./source-lead-batches/china-article-intake-09";
import { chinaArticleIntake10 } from "./source-lead-batches/china-article-intake-10";
import { chinaArticleIntake11 } from "./source-lead-batches/china-article-intake-11";
import { chinaArticleIntake12 } from "./source-lead-batches/china-article-intake-12";
import { chinaArticleIntake13 } from "./source-lead-batches/china-article-intake-13";
import { chinaCriticalMinerals20260906 } from "./source-lead-batches/china-critical-minerals-2026-09-06";
import { chinaHnPastYear20260915 } from "./source-lead-batches/china-hn-past-year-2026-09-15";
import { chinaNews20260915 } from "./source-lead-batches/china-news-2026-09-15";
import { chinaQualityLinks20260814 } from "./source-lead-batches/china-quality-links-2026-08-14";
import { existingDispatchCanonicalSources } from "./source-lead-batches/existing-dispatch-canonical-sources";

const draftedDispatchByLeadId = new Map<string, string>([
  ["lead-2026-stratechery-chinese-models", "d-013"],
  ["lead-2026-werd-open-models", "d-014"],
  ["lead-2026-kimi-k3", "d-015"],
  ["lead-2026-simon-willison-kimi-k3", "d-016"],
  ["lead-2026-epoch-us-china-eci", "d-017"],
  ["lead-2026-scio-world-ai-keynote-mobile", "d-018"],
  ["lead-2026-hugging-face-security-incident", "d-019"],
  ["lead-2026-interconnects-kimi-k3", "d-020"],
  ["lead-2012-chinafile-web-searches", "d-021"],
  ["lead-2016-chinese-language-technology", "d-022"],
  ["lead-2017-sixth-tone-amateur-programmers", "d-023"],
  ["lead-2017-sixth-tone-student-council", "d-024"],
  ["lead-2018-robot-dividend", "d-025"],
  ["lead-2019-sixth-tone-basketball-fans", "d-026"],
  ["lead-2020-marriage-advocacy", "d-027"],
  ["lead-2021-rest-of-world-alpacas-douyin", "d-028"],
  ["lead-2021-li-ziqi", "d-029"],
  ["lead-2022-tech-workers", "d-030"],
  ["lead-2022-stratechery-chips-china", "d-031"],
  ["lead-2023-meta-llama-2", "d-032"],
  ["lead-2024-meta-llama-3-1", "d-033"],
  ["lead-2024-chinatalk-deepseek-interview", "d-034"],
  ["lead-2025-stratechery-deepseek-faq", "d-035"],
  ["lead-2026-anthropic-redeploying-fable", "d-036"],
]);

const atlasEvidenceLeadIds = new Set([
  "lead-2021-li-ziqi",
  "lead-2021-factory-tiktok",
  "lead-2022-algorithm-rules",
  "lead-2023-meta-llama-2",
  "lead-2024-deepseek-v2",
  "lead-2024-qwen2-release",
  "lead-2024-meta-llama-3-1",
  "lead-2024-chinatalk-deepseek-interview",
  "lead-2026-kimi-k3",
  "lead-2026-scio-world-ai-keynote",
]);

const leads = [
  ...anthropicChinaThreatReport20260915,
  ...chinaArticleIntake01,
  ...chinaArticleIntake02,
  ...chinaArticleIntake03,
  ...chinaArticleIntake04,
  ...chinaArticleIntake05,
  ...chinaArticleIntake06,
  ...chinaArticleIntake07,
  ...chinaArticleIntake08,
  ...chinaArticleIntake09,
  ...chinaArticleIntake10,
  ...chinaArticleIntake11,
  ...chinaArticleIntake12,
  ...chinaArticleIntake13,
  ...chinaCriticalMinerals20260906,
  ...chinaHnPastYear20260915,
  ...chinaNews20260915,
  ...chinaQualityLinks20260814,
  ...existingDispatchCanonicalSources,
  {
    id: "lead-2006-science-plan",
    title:
      "National Medium- and Long-Term Program for Science and Technology Development",
    url: "https://www.itu.int/en/ITU-D/Cybersecurity/Documents/National_Strategies_Repository/China_2006.pdf",
    publisher: "State Council of the PRC / ITU archive",
    accessedAt: "2026-07-21",
    publishedAt: "2006-02-09",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["science-policy", "industrial-policy", "planning"],
    evidenceStatus: "confirmed",
    notes:
      "Early national science-policy baseline; verify translation provenance before quoting.",
  },
  {
    id: "lead-2014-baidu-ai-lab",
    title: "Chinese Search Giant Baidu Moves into Google’s Backyard",
    url: "https://time.com/103324/chinese-search-giant-baidu-moves-into-googles-backyard/",
    publisher: "Time",
    accessedAt: "2026-07-21",
    publishedAt: "2014-05-16",
    contentType: "reporting",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["baidu", "research-labs", "talent"],
    evidenceStatus: "confirmed",
    notes: "Period reporting on Baidu's Silicon Valley lab and Andrew Ng hire.",
  },
  {
    id: "lead-2015-made-in-china-2025",
    title: "Made in China 2025 (English translation)",
    url: "https://cset.georgetown.edu/wp-content/uploads/t0432_made_in_china_2025_EN.pdf",
    publisher: "State Council of the PRC / CSET translation",
    accessedAt: "2026-07-21",
    publishedAt: "2015-05-19",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["manufacturing", "industrial-policy", "robotics"],
    evidenceStatus: "confirmed",
    notes:
      "Use alongside the Chinese original and document translator choices for key terms.",
  },
  {
    id: "lead-2015-deep-speech-2",
    title:
      "Deep Speech 2: End-to-End Speech Recognition in English and Mandarin",
    url: "https://arxiv.org/abs/1512.02595",
    publisher: "Baidu Research",
    accessedAt: "2026-07-21",
    publishedAt: "2015-12-08",
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["speech-recognition", "baidu", "multilingual-ai"],
    evidenceStatus: "vendor-claim",
    notes:
      "Primary technical artifact; performance claims still require period-appropriate comparison context.",
  },
  {
    id: "lead-2016-chinese-language-technology",
    title: "Chinese Is Not a Backward Language",
    url: "https://www.chinafile.com/media/chinese-not-backward-language",
    publisher: "ChinaFile",
    accessedAt: "2026-07-21",
    publishedAt: "2016-05-12",
    contentType: "analysis",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["chinese-language", "input-methods", "technology-history"],
    evidenceStatus: "confirmed",
    notes:
      "Historical argument about technological fitness and orientalism; already queued as d-022.",
  },
  {
    id: "lead-2017-ai-plan-original",
    title:
      "New Generation Artificial Intelligence Development Plan (Chinese original)",
    url: "https://www.nhc.gov.cn/bgt/gwywj2/201707/3b2a93a71c794d9c8137ab394b21d8f3.shtml",
    publisher: "State Council of the PRC",
    accessedAt: "2026-07-21",
    publishedAt: "2017-07-20",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["ai-policy", "planning", "industrial-policy"],
    evidenceStatus: "confirmed",
    notes: "Controlling Chinese text for the 2017 national AI plan.",
  },
  {
    id: "lead-2017-ai-plan-translation",
    title:
      "Full Translation: China’s New Generation Artificial Intelligence Development Plan",
    url: "https://digichina.stanford.edu/work/full-translation-chinas-new-generation-artificial-intelligence-development-plan-2017/",
    publisher: "DigiChina",
    accessedAt: "2026-07-21",
    publishedAt: "2017-08-01",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["ai-policy", "translation", "planning"],
    evidenceStatus: "confirmed",
    notes: "English translation to pair with the controlling Chinese text.",
  },
  {
    id: "lead-2017-ai-powered-future",
    title: "How China Is Preparing for an AI-Powered Future",
    url: "https://www.wilsoncenter.org/sites/default/files/media/documents/publication/how_china_is_preparing_for_ai_powered_future.pdf",
    publisher: "Wilson Center",
    accessedAt: "2026-07-21",
    publicationYear: 2017,
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["ai-policy", "baidu", "industry"],
    evidenceStatus: "confirmed",
    notes:
      "Pre-national-plan snapshot of firms, policy, and technical capabilities.",
  },
  {
    id: "lead-2018-china-ai-dream",
    title: "Deciphering China’s AI Dream",
    url: "https://www.fhi.ox.ac.uk/wp-content/uploads/Deciphering_Chinas_AI-Dream.pdf",
    publisher: "Future of Humanity Institute, University of Oxford",
    accessedAt: "2026-07-21",
    publicationYear: 2018,
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["ai-strategy", "capability", "policy"],
    evidenceStatus: "confirmed",
    notes:
      "Important 2018 corrective to inflated descriptions of Chinese AI capability.",
  },
  {
    id: "lead-2018-robot-dividend",
    title: "Robot Threat or Robot Dividend? A Struggle between Two Lines",
    url: "https://madeinchinajournal.com/2018/07/07/robot-threat-robot-dividend-china/",
    publisher: "Made in China Journal",
    accessedAt: "2026-07-21",
    publishedAt: "2018-07-07",
    contentType: "research",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["automation", "labor", "manufacturing"],
    evidenceStatus: "confirmed",
    notes: "Fieldwork-led labor perspective; already queued as d-025.",
  },
  {
    id: "lead-2019-ai-governance-principles",
    title: "China: AI Governance Principles Released",
    url: "https://www.loc.gov/item/global-legal-monitor/2019-09-09/china-ai-governance-principles-released",
    publisher: "Library of Congress",
    accessedAt: "2026-07-21",
    publishedAt: "2019-09-09",
    contentType: "reporting",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["ai-governance", "ethics", "policy"],
    evidenceStatus: "confirmed",
    notes:
      "Legal-monitor summary with links to the 2019 principles and translation.",
  },
  {
    id: "lead-2019-beijing-ai-principles",
    title: "Beijing AI Principles",
    url: "https://www.baai.ac.cn/blog/beijing-ai-principles",
    publisher: "Beijing Academy of Artificial Intelligence",
    accessedAt: "2026-07-21",
    publicationYear: 2019,
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["ai-governance", "ethics", "research"],
    evidenceStatus: "confirmed",
    notes:
      "First-party principles; archive and verify language variants before close quotation.",
  },
  {
    id: "lead-2020-panopticon",
    title: "The Panopticon Is Already Here",
    url: "https://www.theatlantic.com/magazine/archive/2020/09/china-ai-surveillance/614197/",
    publisher: "The Atlantic",
    accessedAt: "2026-07-21",
    publicationYear: 2020,
    contentType: "reporting",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["surveillance", "computer-vision", "governance"],
    evidenceStatus: "confirmed",
    paywall: true,
    notes:
      "Influential long-form framing; requires claim-by-claim corroboration and paywall-aware citation.",
  },
  {
    id: "lead-2020-marriage-advocacy",
    title:
      "Could Same-Sex Marriage Advocacy in China Be Poised for a Breakthrough?",
    url: "https://www.chinafile.com/reporting-opinion/viewpoint/could-same-sex-marriage-advocacy-china-be-poised-breakthrough",
    publisher: "ChinaFile",
    accessedAt: "2026-07-21",
    publishedAt: "2020-09-17",
    contentType: "reporting",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["lgbtq", "civil-code", "advocacy"],
    evidenceStatus: "confirmed",
    notes: "Dated social-policy backfile; already queued as d-027.",
  },
  {
    id: "lead-2021-fourteenth-five-year-plan",
    title: "China’s 14th Five-Year Plan (CSET translation)",
    url: "https://cset.georgetown.edu/publication/china-14th-five-year-plan/",
    publisher: "National People’s Congress / CSET translation",
    accessedAt: "2026-07-21",
    publishedAt: "2021-05-12",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["planning", "technology-policy", "economy"],
    evidenceStatus: "confirmed",
    notes:
      "Broad planning context; use exact sections rather than treating the plan as a single AI policy.",
  },
  {
    id: "lead-2021-factory-tiktok",
    title: "The Chinese Content Farms Behind Factory TikTok",
    url: "https://restofworld.org/2021/the-chinese-content-farms-behind-factory-tiktok/",
    publisher: "Rest of World",
    accessedAt: "2026-07-21",
    publishedAt: "2021-06-24",
    contentType: "reporting",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["platforms", "factories", "creator-economy"],
    evidenceStatus: "confirmed",
    notes:
      "Useful bridge between industrial production and cross-border platform culture.",
  },
  {
    id: "lead-2021-li-ziqi",
    title:
      "She Drew Millions of TikTok Followers by Selling a Fantasy of Rural China",
    url: "https://restofworld.org/2021/tiktok-china-influencer-liziqi/",
    publisher: "Rest of World",
    accessedAt: "2026-07-21",
    publishedAt: "2021-11-01",
    contentType: "analysis",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["rural-life", "platforms", "creator-economy"],
    evidenceStatus: "confirmed",
    notes: "Culture and platform-economy backfile; already queued as d-029.",
  },
  {
    id: "lead-2022-algorithm-rules",
    title:
      "Algorithmic Recommendation Management Provisions (English translation)",
    url: "https://digichina.stanford.edu/work/translation-internet-information-service-algorithmic-recommendation-management-provisions-effective-march-1-2022/",
    publisher: "CAC and partner ministries / DigiChina translation",
    accessedAt: "2026-07-21",
    publicationYear: 2022,
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["algorithms", "regulation", "platforms"],
    evidenceStatus: "confirmed",
    notes:
      "Foundational platform-algorithm regulation; pair with the Chinese original.",
  },
  {
    id: "lead-2022-tech-workers",
    title: "The Dream Is Over for China’s Tech Workers",
    url: "https://restofworld.org/2022/china-tech-layoffs/",
    publisher: "Rest of World",
    accessedAt: "2026-07-21",
    publishedAt: "2022-07-12",
    contentType: "reporting",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["labor", "996", "technology-industry"],
    evidenceStatus: "confirmed",
    notes: "Worker-centered period account; already queued as d-030.",
  },
  {
    id: "lead-2023-generative-ai-rules-original",
    title: "Interim Measures for Generative AI Services (Chinese original)",
    url: "https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm",
    publisher: "Cyberspace Administration of China",
    accessedAt: "2026-07-21",
    publishedAt: "2023-07-13",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["generative-ai", "regulation", "services"],
    evidenceStatus: "confirmed",
    notes: "Controlling Chinese text for the 2023 interim measures.",
  },
  {
    id: "lead-2023-generative-ai-rules-translation",
    title:
      "Interim Measures for the Management of Generative AI Services (translation)",
    url: "https://www.chinalawtranslate.com/en/generative-ai-interim/",
    publisher: "China Law Translate",
    accessedAt: "2026-07-21",
    publishedAt: "2023-07-13",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["generative-ai", "regulation", "translation"],
    evidenceStatus: "confirmed",
    notes: "English companion to the controlling CAC text.",
  },
  {
    id: "lead-2023-ernie-public",
    title: "Baidu Makes Ernie Bot Publicly Available",
    url: "https://apnews.com/article/627bd09608816847907d41f44da235d9",
    publisher: "Associated Press",
    accessedAt: "2026-07-21",
    publishedAt: "2023-08-31",
    contentType: "reporting",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["baidu", "ernie", "product-release"],
    evidenceStatus: "confirmed",
    notes:
      "Straight-news checkpoint for public product availability after regulatory approval.",
  },
  {
    id: "lead-2024-deepseek-llm",
    title: "DeepSeek LLM: Scaling Open-Source Language Models with Longtermism",
    url: "https://arxiv.org/abs/2401.02954",
    publisher: "DeepSeek AI",
    accessedAt: "2026-07-21",
    publishedAt: "2024-01-05",
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["deepseek", "language-models", "open-weights"],
    evidenceStatus: "vendor-claim",
    notes: "Early technical baseline for DeepSeek's model lineage.",
  },
  {
    id: "lead-2024-deepseek-v2",
    title:
      "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model",
    url: "https://arxiv.org/abs/2405.04434",
    publisher: "DeepSeek AI",
    accessedAt: "2026-07-21",
    publishedAt: "2024-05-07",
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["deepseek", "mixture-of-experts", "inference-economics"],
    evidenceStatus: "vendor-claim",
    notes:
      "Primary architecture and economics paper; distinguish measured design from vendor comparisons.",
  },
  {
    id: "lead-2024-qwen2-release",
    title: "Hello Qwen2",
    url: "https://qwenlm.github.io/blog/qwen2/",
    publisher: "Qwen Team",
    accessedAt: "2026-07-21",
    publishedAt: "2024-06-07",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["qwen", "open-weights", "model-release"],
    evidenceStatus: "vendor-claim",
    notes:
      "Official release narrative and artifact links; benchmark claims remain first-party.",
  },
  {
    id: "lead-2024-qwen2-report",
    title: "Qwen2 Technical Report",
    url: "https://arxiv.org/abs/2407.10671",
    publisher: "Qwen Team",
    accessedAt: "2026-07-21",
    publishedAt: "2024-07-15",
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "metadata-checked",
    topics: ["qwen", "technical-report", "benchmarks"],
    evidenceStatus: "vendor-claim",
    notes: "Technical companion to the Qwen2 release.",
  },
  {
    id: "lead-2025-deepseek-r1",
    title:
      "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    url: "https://arxiv.org/abs/2501.12948",
    publisher: "DeepSeek AI",
    accessedAt: "2026-07-21",
    publishedAt: "2025-01-22",
    contentType: "research",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["deepseek", "reasoning", "reinforcement-learning"],
    evidenceStatus: "vendor-claim",
    notes:
      "Technical artifact identified by the sourcebook; requires direct review before Dispatch promotion.",
  },
  {
    id: "lead-2025-kimi-k2-repository",
    title: "Kimi K2 Repository",
    url: "https://github.com/MoonshotAI/Kimi-K2",
    publisher: "Moonshot AI",
    accessedAt: "2026-07-21",
    publicationYear: 2025,
    contentType: "primary",
    claimedGrade: "A",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["kimi", "open-weights", "model-card"],
    evidenceStatus: "confirmed",
    notes:
      "Official artifact lead; record license, tags, and commit hash during technical review.",
  },
  {
    id: "lead-2025-kimi-k2-report",
    title: "Kimi K2 Technical Report",
    url: "https://arxiv.org/abs/2507.20534",
    publisher: "Moonshot AI",
    accessedAt: "2026-07-21",
    publishedAt: "2025-07-28",
    contentType: "research",
    claimedGrade: "A",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["kimi", "technical-report", "agentic-ai"],
    evidenceStatus: "vendor-claim",
    notes:
      "Primary paper lead from the sourcebook; benchmarks require independent context.",
  },
  {
    id: "lead-2025-qwen3",
    title: "Qwen3: Think Deeper, Act Faster",
    url: "https://qwenlm.github.io/blog/qwen3/",
    publisher: "Qwen Team",
    accessedAt: "2026-07-21",
    publishedAt: "2025-04-29",
    contentType: "primary",
    claimedGrade: "A",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["qwen", "reasoning", "open-weights"],
    evidenceStatus: "vendor-claim",
    notes:
      "Official release lead; verify artifact/license links and separate vendor benchmarks.",
  },
  {
    id: "lead-2026-kimi-k3",
    title: "Kimi K3 Launch",
    url: "https://www.kimi.com/blog/kimi-k3",
    publisher: "Moonshot AI",
    accessedAt: "2026-07-21",
    publishedAt: "2026-07-16",
    contentType: "primary",
    claimedGrade: "A",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["kimi", "model-release", "open-weights"],
    evidenceStatus: "pending",
    notes:
      "API available; promised weight and report release still requires the July 27 follow-up.",
    nextReviewAt: "2026-07-27",
  },
  {
    id: "lead-2026-stratechery-chinese-models",
    title: "Who’s Afraid of Chinese Models?",
    url: "https://stratechery.com/2026/whos-afraid-of-chinese-models/",
    publisher: "Stratechery",
    accessedAt: "2026-07-21",
    publishedAt: "2026-07-20",
    contentType: "analysis",
    claimedGrade: "C",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["model-economics", "distillation", "competition"],
    evidenceStatus: "disputed",
    notes:
      "Anchor argument already queued as d-013; cost assumptions remain open to testing.",
  },
  {
    id: "lead-2026-werd-open-models",
    title: "American AI Is Locked Down and Proprietary. It’s Losing.",
    url: "https://werd.io/american-ai-is-locked-down-and-proprietary-its-losing/",
    publisher: "Werd.io",
    accessedAt: "2026-07-21",
    publishedAt: "2026-07-20",
    contentType: "analysis",
    claimedGrade: "C",
    sourceOrigin: "prior-intake",
    reviewState: "source-read",
    topics: ["open-weights", "platform-strategy", "competition"],
    evidenceStatus: "disputed",
    notes:
      "Opinion thesis already queued as d-014; adoption and economics evidence remain missing.",
  },
  {
    id: "lead-2026-stanford-ai-index",
    title: "2026 AI Index Report",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    publisher: "Stanford HAI",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "research",
    claimedGrade: "B",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["ai-index", "capability", "investment"],
    evidenceStatus: "confirmed",
    notes:
      "Broad empirical context; extract methods and table vintages before citing specific figures.",
  },
  {
    id: "lead-2026-uscc-two-loops",
    title:
      "Two Loops: How China’s Open AI Strategy Reinforces Its Industrial Dominance",
    url: "https://www.uscc.gov/research/two-loops-how-chinas-open-ai-strategy-reinforces-its-industrial-dominance",
    publisher: "U.S.–China Economic and Security Review Commission",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "research",
    claimedGrade: "B",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["open-models", "industry", "robotics"],
    evidenceStatus: "confirmed",
    notes:
      "Strategic research lead; inspect underlying industrial and deployment evidence.",
  },
  {
    id: "lead-2026-digichina-ecosystem",
    title: "Beyond DeepSeek: China’s Diverse Open-Weight AI Ecosystem",
    url: "https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications",
    publisher: "Stanford DigiChina",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "research",
    claimedGrade: "B",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["open-weights", "ecosystem", "policy"],
    evidenceStatus: "confirmed",
    notes: "Useful corrective to treating DeepSeek as the whole ecosystem.",
  },
  {
    id: "lead-2026-csis-models",
    title: "What to Know About Chinese AI Models",
    url: "https://www.csis.org/analysis/what-know-about-chinese-ai-models",
    publisher: "Center for Strategic and International Studies",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "analysis",
    claimedGrade: "B",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["capability", "policy", "distillation"],
    evidenceStatus: "confirmed",
    notes: "Balanced overview lead; follow citations to primary artifacts.",
  },
  {
    id: "lead-2026-nist-deepseek-v4",
    title: "CAISI Evaluation of DeepSeek V4 Pro",
    url: "https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro",
    publisher: "NIST",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "research",
    claimedGrade: "A",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["deepseek", "evaluation", "safety"],
    evidenceStatus: "confirmed",
    notes:
      "Government evaluation lead and counterweight to simple parity claims.",
  },
  {
    id: "lead-2026-brookings-strategies",
    title: "Competing AI Strategies for the U.S. and China",
    url: "https://www.brookings.edu/articles/competing-ai-strategies-for-the-us-and-china/",
    publisher: "Brookings Institution",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "analysis",
    claimedGrade: "B",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["bilateral", "strategy", "deployment"],
    evidenceStatus: "confirmed",
    notes:
      "Multi-race framing lead; verify each comparative claim against cited evidence.",
  },
  {
    id: "lead-2026-american-deepseek",
    title: "The American DeepSeek Project",
    url: "https://www.interconnects.ai/p/the-american-deepseek-project",
    publisher: "Interconnects",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "analysis",
    claimedGrade: "C",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["open-models", "us-policy", "research"],
    evidenceStatus: "pending",
    notes: "Policy proposal rather than evidence of an implemented program.",
  },
  {
    id: "lead-2023-lost-in-the-middle",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    url: "https://arxiv.org/abs/2307.03172",
    publisher: "Stanford University and collaborators",
    accessedAt: "2026-07-21",
    publishedAt: "2023-07-06",
    contentType: "research",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["long-context", "evaluation", "retrieval"],
    evidenceStatus: "confirmed",
    notes:
      "Supports a bounded positional-retrieval failure claim, not a universal 32K-token collapse threshold.",
  },
  {
    id: "lead-2024-chinese-language-models",
    title:
      "How Chinese Are Chinese Language Models? The Puzzling Lack of Language Policy in China’s LLMs",
    url: "https://arxiv.org/abs/2407.09652",
    publisher: "Cornell University and collaborators",
    accessedAt: "2026-07-21",
    publishedAt: "2024-07-12",
    contentType: "research",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["multilingual-ai", "language-policy", "evaluation"],
    evidenceStatus: "confirmed",
    notes:
      "Six-model, 18-language study; supports parity within its tests, not a universal absence-of-bias claim.",
  },
  {
    id: "lead-2024-qwen-million-context",
    title: "Extending the Context Length to 1M Tokens!",
    url: "https://qwenlm.github.io/blog/qwen2.5-turbo/",
    publisher: "Qwen Team",
    accessedAt: "2026-07-21",
    publishedAt: "2024-11-15",
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["qwen", "long-context", "inference"],
    evidenceStatus: "vendor-claim",
    notes:
      "Official 1M-token release claim; the same post acknowledges instability and inference cost in real long-sequence work.",
  },
  {
    id: "lead-2025-csis-deepseek-race",
    title: "DeepSeek’s Latest Breakthrough Is Redefining AI Race",
    url: "https://www.csis.org/analysis/deepseeks-latest-breakthrough-redefining-ai-race",
    publisher: "Center for Strategic and International Studies",
    accessedAt: "2026-07-21",
    publishedAt: "2025-02-03",
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["deepseek", "export-controls", "ai-competition"],
    evidenceStatus: "disputed",
    notes:
      "Useful policy framing, but claims of state orchestration and relative training cost require independent corroboration.",
  },
  {
    id: "lead-2025-irena-renewable-capacity",
    title: "Record-Breaking Annual Growth in Renewable Power Capacity",
    url: "https://www.irena.org/News/pressreleases/2025/Mar/Record-Breaking-Annual-Growth-in-Renewable-Power-Capacity",
    publisher: "International Renewable Energy Agency",
    accessedAt: "2026-07-21",
    publishedAt: "2025-03-26",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["energy", "renewables", "infrastructure"],
    evidenceStatus: "confirmed",
    notes:
      "Supports China’s nearly 64% share of global 2024 renewable-capacity additions; it does not attribute those additions to AI demand.",
  },
  {
    id: "lead-2025-csis-hawkish-ai",
    title: "Hawkish AI? Uncovering DeepSeek’s Foreign Policy Biases",
    url: "https://www.csis.org/analysis/hawkish-ai-uncovering-deepseeks-foreign-policy-biases",
    publisher: "Center for Strategic and International Studies",
    accessedAt: "2026-07-21",
    publishedAt: "2025-04-16",
    contentType: "research",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["deepseek", "foreign-policy", "evaluation"],
    evidenceStatus: "confirmed",
    notes:
      "Benchmark evidence for model behavior in simulated crises; do not generalize it into a national or cultural essence claim.",
  },
  {
    id: "lead-2025-public-opinion-simulation",
    title: "A Cross-Cultural Comparison of LLM-Based Public Opinion Simulation",
    url: "https://arxiv.org/abs/2506.21587",
    publisher: "KAIST and collaborators",
    accessedAt: "2026-07-21",
    publishedAt: "2025-06-17",
    contentType: "research",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["public-opinion", "demographic-bias", "evaluation"],
    evidenceStatus: "confirmed",
    notes:
      "Supports specific simulation failures and demographic overgeneralization; retain the authors’ task and dataset boundaries.",
  },
  {
    id: "lead-2025-lmarena-method",
    title: "About LMArena and Community Model Evaluation",
    url: "https://blog.lmarena.ai/about/",
    publisher: "LMArena",
    accessedAt: "2026-07-21",
    publicationYear: 2025,
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["benchmarks", "human-preference", "methodology"],
    evidenceStatus: "confirmed",
    notes:
      "Useful evaluation infrastructure, but arena preference is not a complete measure of cost, safety, or production fitness.",
  },
  {
    id: "lead-2026-anthropic-distillation",
    title: "Detecting and Preventing Distillation Attacks",
    url: "https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks",
    publisher: "Anthropic",
    accessedAt: "2026-07-21",
    publishedAt: "2026-02-23",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["distillation", "deepseek", "moonshot", "minimax"],
    evidenceStatus: "vendor-claim",
    notes:
      "Detailed company allegation with attribution methods and traffic counts; record as Anthropic’s claim pending independent evidence.",
  },
  {
    id: "lead-2026-china-coal-capacity",
    title: "China’s Coal Power Proposals and Commissioning in 2025",
    url: "https://energyandcleanair.org/wp/wp-content/uploads/2026/02/CREA_GEM_China_Coal-power_H2-2025.pdf",
    publisher: "CREA and Global Energy Monitor",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "research",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["energy", "coal", "infrastructure"],
    evidenceStatus: "confirmed",
    notes:
      "Supports 78 GW commissioned in 2025; does not by itself establish that AI data centers caused the additions.",
  },
  {
    id: "lead-2026-qwen-robot-suite",
    title:
      "Qwen-Robot Suite: A Foundation Model Suite for Physical World Intelligence",
    url: "https://qwen.ai/home/",
    publisher: "Qwen Team",
    accessedAt: "2026-07-21",
    publicationYear: 2026,
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "metadata-checked",
    topics: ["qwen", "robotics", "embodied-ai"],
    evidenceStatus: "vendor-claim",
    notes:
      "Official product listing located; repository, license, benchmark protocol, and durable release URL still require review.",
  },
  {
    id: "lead-2022-stratechery-chips-china",
    title: "Chips and China",
    url: "https://stratechery.com/2022/chips-and-china/",
    publisher: "Stratechery",
    accessedAt: "2026-07-22",
    publishedAt: "2022-10-25",
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["semiconductors", "export-controls", "bilateral"],
    evidenceStatus: "disputed",
    paywall: true,
    notes:
      "Foundational argument about chip controls and interdependence; valuable framing, not proof that later model efficiency was caused by the controls.",
  },
  {
    id: "lead-2023-meta-llama-2",
    title: "Meta and Microsoft Introduce the Next Generation of Llama",
    url: "https://ai.meta.com/blog/llama-2/",
    publisher: "Meta AI",
    accessedAt: "2026-07-22",
    publishedAt: "2023-07-18",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["llama", "open-weights", "model-release"],
    evidenceStatus: "vendor-claim",
    notes:
      "Controlling release announcement. Review the license separately before repeating Meta's open-source terminology.",
  },
  {
    id: "lead-2024-meta-llama-3",
    title: "Introducing Meta Llama 3",
    url: "https://ai.meta.com/blog/meta-llama-3/",
    publisher: "Meta AI",
    accessedAt: "2026-07-22",
    publishedAt: "2024-04-18",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["llama", "open-weights", "model-release"],
    evidenceStatus: "vendor-claim",
    notes:
      "Fills the missing Llama 3 chronology; benchmark and responsibility claims remain first-party.",
  },
  {
    id: "lead-2024-meta-llama-3-1",
    title: "Introducing Llama 3.1: Our Most Capable Models to Date",
    url: "https://ai.meta.com/blog/meta-llama-3-1/",
    publisher: "Meta AI",
    accessedAt: "2026-07-22",
    publishedAt: "2024-07-23",
    contentType: "primary",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["llama", "open-weights", "model-release", "distillation"],
    evidenceStatus: "vendor-claim",
    notes:
      "Primary artifact for the 405B release, license change, ecosystem partners, and Meta's disclosed evaluation claims.",
  },
  {
    id: "lead-2024-zuckerberg-open-ai-letter",
    title: "Open Source AI Is the Path Forward",
    url: "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    publisher: "Meta",
    accessedAt: "2026-07-22",
    publishedAt: "2024-07-23",
    contentType: "analysis",
    sourceOrigin: "web-research",
    reviewState: "source-read",
    topics: ["llama", "open-weights", "platform-strategy"],
    evidenceStatus: "disputed",
    notes:
      "Zuckerberg's strategic case for the Llama ecosystem. Treat cost, safety, and future-standard predictions as interested claims.",
  },
  {
    id: "lead-2024-chinatalk-deepseek-interview",
    title: "DeepSeek: The Quiet Giant Leading China’s AI Race",
    url: "https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas",
    publisher: "ChinaTalk",
    accessedAt: "2026-07-22",
    publishedAt: "2024-11-27",
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["deepseek", "liang-wenfeng", "translation", "open-weights"],
    evidenceStatus: "confirmed",
    notes:
      "Annotated translation of a 36Kr/Waves interview. Preserve the original interview date and distinguish Liang's account from translator notes.",
  },
  {
    id: "lead-2025-stratechery-deepseek-faq",
    title: "DeepSeek FAQ",
    url: "https://stratechery.com/2025/deepseek-faq/",
    publisher: "Stratechery",
    accessedAt: "2026-07-22",
    publishedAt: "2025-01-27",
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["deepseek", "semiconductors", "inference-economics"],
    evidenceStatus: "disputed",
    paywall: true,
    notes:
      "Period interpretation of R1, efficiency, distillation, and the chip ban; pair every technical claim with DeepSeek's papers or independent measurements.",
  },
  {
    id: "lead-2025-interconnects-china-trajectory",
    title: "On China’s Open Source AI Trajectory",
    url: "https://www.interconnects.ai/p/on-chinas-open-source-ai-trajectory",
    publisher: "Interconnects",
    accessedAt: "2026-07-22",
    publishedAt: "2025-09-09",
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["china-ai", "open-weights", "industrial-policy"],
    evidenceStatus: "disputed",
    notes:
      "Useful chronology and policy lead. Validate city targets and adoption claims against the linked government records.",
  },
  {
    id: "lead-2026-techcrunch-figma-anthropic",
    title: "Anthropic CPO Leaves Figma’s Board",
    url: "https://techcrunch.com/2026/04/16/anthropic-cpo-leaves-figmas-board-after-reports-he-will-offer-a-competing-product/",
    publisher: "TechCrunch",
    accessedAt: "2026-07-22",
    publishedAt: "2026-04-16",
    contentType: "reporting",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["anthropic", "figma", "platform-dependency"],
    evidenceStatus: "confirmed",
    notes:
      "Confirms the board resignation and reported product conflict; the broader vendor-dependency thesis remains interpretation.",
  },
  {
    id: "lead-2026-anthropic-redeploying-fable",
    title: "Redeploying Claude Fable 5",
    url: "https://www.anthropic.com/news/redeploying-fable-5",
    publisher: "Anthropic",
    accessedAt: "2026-07-22",
    publishedAt: "2026-06-30",
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["anthropic", "export-controls", "cybersecurity", "safeguards"],
    evidenceStatus: "vendor-claim",
    notes:
      "Primary company timeline and safeguards proposal. Attribute technical and government-collaboration claims to Anthropic.",
  },
  {
    id: "lead-2026-hugging-face-security-incident",
    title: "Security Incident Disclosure (July 2026)",
    url: "https://huggingface.co/blog/security-incident-july-2026",
    publisher: "Hugging Face",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-16",
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["cybersecurity", "incident-response", "glm-5-2", "open-weights"],
    evidenceStatus: "vendor-claim",
    notes:
      "First-party incident disclosure for the 17,000-event analysis and GLM 5.2 fallback; external forensic findings remain pending.",
  },
  {
    id: "lead-2026-scio-world-ai-keynote",
    title: "Keynote Address at the 2026 World AI Conference",
    url: "https://english.scio.gov.cn/topnews/2026-07/18/content_118605932.html",
    publisher: "Xinhua / State Council Information Office",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-18",
    contentType: "primary",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["ai-policy", "global-governance", "official-statements"],
    evidenceStatus: "confirmed",
    notes:
      "Official English text of Xi Jinping's July 17 address. Policy language does not establish individual firms' motives or licenses.",
  },
  {
    id: "lead-2026-chinatalk-mythos-moment",
    title: "China’s Mythos Moment",
    url: "https://www.chinatalk.media/p/chinas-mythos-moment-366",
    publisher: "ChinaTalk",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-20",
    contentType: "podcast",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["china-ai", "cybersecurity", "regulation", "export-controls"],
    evidenceStatus: "disputed",
    paywall: true,
    notes:
      "Corrected from the brief's July 16 date to July 20. Scenario analysis, not evidence that Beijing has adopted a particular response.",
  },
  {
    id: "lead-2026-emerging-trajectories-lab-economics",
    title: "Kimi K3, Qwen 3.8, and Anthropic’s Potential Unravelling",
    url: "https://www.emergingtrajectories.com/lh/frontier-lab-economics/",
    publisher: "Emerging Trajectories",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-19",
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "source-read",
    topics: ["lab-economics", "inference", "infrastructure"],
    evidenceStatus: "disputed",
    notes:
      "Clear value-chain hypothesis, but its cost chart and infrastructure-ownership claims inherit mixed-quality footnotes.",
  },
  {
    id: "lead-2026-stack-hugging-face-glm",
    title: "Hugging Face Hacked: Turned to a Chinese LLM for Help",
    url: "https://www.thestack.technology/hugging-face-hacked-turned-to-chinese-llm-for-help-after-us-models-blocked-blue-team/",
    publisher: "The Stack",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-19",
    contentType: "reporting",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["cybersecurity", "hugging-face", "glm-5-2"],
    evidenceStatus: "confirmed",
    notes:
      "Secondary reporting lead. Prefer Hugging Face's own disclosure for incident facts and use this for reporting context.",
  },
  {
    id: "lead-2026-marktechpost-qwen-3-8",
    title: "Alibaba Previews Qwen 3.8-Max after Kimi K3",
    url: "https://www.marktechpost.com/2026/07/19/alibaba-previews-qwen3-8-max-a-2-4-trillion-parameter-multimodal-model-days-after-moonshots-kimi-k3-open-weight-launch/",
    publisher: "MarkTechPost",
    accessedAt: "2026-07-22",
    publishedAt: "2026-07-19",
    contentType: "reporting",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["qwen", "kimi-k3", "model-release"],
    evidenceStatus: "vendor-claim",
    notes:
      "Discovery and basic release facts only; benchmark and social-reaction synthesis require primary corroboration.",
  },
  {
    id: "lead-2026-orcarouter-qwen-kimi",
    title: "Qwen 3.8 vs. Kimi K3, Head to Head",
    url: "https://www.orcarouter.ai/blog/qwen-3-8-vs-kimi-k3",
    publisher: "OrcaRouter",
    accessedAt: "2026-07-22",
    publicationYear: 2026,
    contentType: "analysis",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    topics: ["qwen", "kimi-k3", "benchmarks", "routing"],
    evidenceStatus: "unverified",
    notes:
      "Vendor-tier comparison. Do not cite scores until the third-party test inputs, outputs, pricing date, and methodology are available.",
  },
];

export const SourceLeadCatalogSchema = z
  .array(SourceLeadSchema)
  .min(1)
  .superRefine((items, ctx) => {
    const ids = new Set<string>();
    const urls = new Set<string>();
    const dispatchIds = new Set<string>();
    for (const item of items) {
      if (ids.has(item.id)) {
        ctx.addIssue({
          code: "custom",
          message: `duplicate source lead id: ${item.id}`,
        });
      }
      if (urls.has(item.url)) {
        ctx.addIssue({
          code: "custom",
          message: `duplicate source lead URL: ${item.url}`,
        });
      }
      if (item.publishedAt && item.publishedAt > item.accessedAt) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} was accessed before publication`,
        });
      }
      const exactYear = item.publishedAt
        ? Number(item.publishedAt.slice(0, 4))
        : undefined;
      if (!exactYear && !item.publicationYear) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} needs a publication date or year`,
        });
      }
      if (
        exactYear &&
        item.publicationYear &&
        exactYear !== item.publicationYear
      ) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} publication year conflicts with its date`,
        });
      }
      if (item.nextReviewAt && item.nextReviewAt < item.accessedAt) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} has a next review before access`,
        });
      }
      if (item.urlStatus !== "supplied" && !item.canonicalCheckedAt) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} needs a canonical URL check date`,
        });
      }
      if (
        ["source-read", "evidence-reviewed"].includes(item.reviewState) &&
        !item.reviewedAt
      ) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} needs a review date`,
        });
      }
      if (
        ["withheld", "rejected"].includes(item.disposition) &&
        !item.decisionReason
      ) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} needs a disposition reason`,
        });
      }
      if (
        item.disposition === "drafted" &&
        (item.reviewState !== "evidence-reviewed" || !item.dispatchId)
      ) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} cannot link a draft before evidence review`,
        });
      }
      if (item.disposition !== "drafted" && item.dispatchId) {
        ctx.addIssue({
          code: "custom",
          message: `${item.id} has a dispatch without a drafted disposition`,
        });
      }
      if (item.dispatchId && dispatchIds.has(item.dispatchId)) {
        ctx.addIssue({
          code: "custom",
          message: `duplicate linked dispatch: ${item.dispatchId}`,
        });
      }
      ids.add(item.id);
      urls.add(item.url);
      if (item.dispatchId) dispatchIds.add(item.dispatchId);
    }
  });

export const sourceLeads = SourceLeadCatalogSchema.parse(
  leads.map((lead) => ({
    disposition: "pending",
    urlStatus: "supplied",
    ...lead,
    taxonomy: classifySourceLead(lead),
    ...(draftedDispatchByLeadId.has(lead.id)
      ? {
          reviewState: "evidence-reviewed",
          disposition: "drafted",
          dispatchId: draftedDispatchByLeadId.get(lead.id),
        }
      : {}),
    ...(atlasEvidenceLeadIds.has(lead.id)
      ? { reviewState: "evidence-reviewed" }
      : {}),
    ...(draftedDispatchByLeadId.has(lead.id) ||
    atlasEvidenceLeadIds.has(lead.id)
      ? {
          urlStatus: "publisher-canonical",
          canonicalCheckedAt: lead.accessedAt,
        }
      : {}),
    ...(["source-read", "evidence-reviewed"].includes(lead.reviewState)
      ? { reviewedAt: lead.accessedAt }
      : {}),
  }))
);
