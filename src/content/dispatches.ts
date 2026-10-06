import "server-only";
import { z } from "zod";
import {
  DispatchSchema,
  type Dispatch,
  type DispatchKind,
  type PublicDispatch,
} from "./schema";
import { sourceLeads } from "./source-leads";

type DispatchSeed = Record<string, unknown> & {
  id: string;
  title: string;
  summary: string;
  commentary: string;
  source: string;
  sourceUrl: string;
  sourceDate: string;
  curatedAt: string;
  language: string;
  translationStatus: Dispatch["translationStatus"];
  byline?: string;
  pullQuote?: string;
};

function materializeDispatch(seed: DispatchSeed): unknown {
  const { source, sourceUrl, sourceDate, byline, pullQuote, ...dispatch } =
    seed;
  const lead = sourceLeads.find((candidate) => candidate.url === sourceUrl);
  if (!lead) {
    throw new Error(`${seed.id} needs a source lead for ${sourceUrl}`);
  }

  const canonicalSourceId = "source-canonical";
  const excerpt = pullQuote
    ? [
        {
          sourceId: canonicalSourceId,
          text: pullQuote,
          context: "Short excerpt selected from the canonical source.",
        },
      ]
    : [];

  return {
    ...dispatch,
    sourceLeadId: lead.id,
    canonicalSource: {
      id: canonicalSourceId,
      title: lead.title,
      publisher: source,
      byline,
      url: sourceUrl,
      publishedAt: sourceDate,
      retrievedAt: lead.accessedAt,
      language: seed.language,
      translationStatus: seed.translationStatus,
      limitations: [lead.notes],
    },
    supportingSources: [],
    claims: [
      {
        id: "claim-source-report",
        statement: seed.summary,
        status: "reported",
        sourceIds: [canonicalSourceId],
        limitations: [
          "This entry does not treat the canonical publisher as independent confirmation of its own report.",
        ],
      },
    ],
    excerpts: excerpt,
  };
}

const rawSeeds: unknown[] = [
  {
    kind: "article",
    id: "d-013",
    slug: "whos-afraid-of-chinese-models",
    title: "Who’s afraid of Chinese models?",
    summary:
      "Ben Thompson argues that the durable contest is not API token price alone, but the cost of producing useful intelligence, the economics of inference, and control of the customer experience.",
    commentary:
      "The essay’s least demonstrated premise is that cheaper tokens do not necessarily produce cheaper completed work. A defensible comparison still needs cost per successful task, workload mix, serving constraints, and switching costs; weight availability also remains distinct from legal openness and operational portability.",
    whyItMatters:
      "It reframes US–China model competition around serving economics and distribution, while leaving its central cost assumptions open to empirical testing.",
    source: "Stratechery",
    sourceUrl: "https://stratechery.com/2026/whos-afraid-of-chinese-models/",
    sourceDate: "2026-07-20",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology", "economy"],
    tags: ["ai-models", "open-weights", "inference-economics", "distillation"],
    people: ["Ben Thompson"],
    organizations: ["Moonshot AI", "Anthropic", "OpenAI"],
    places: ["China", "United States"],
    relatedDispatchIds: ["d-014", "d-015", "d-017", "d-020"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Ben Thompson",
  },
  {
    kind: "article",
    id: "d-014",
    slug: "american-ai-locked-down-and-proprietary",
    title: "American AI is locked down and proprietary. It’s losing.",
    summary:
      "Ben Werdmuller argues that open-weight Chinese models can erode the strategic position of closed US labs by making model access more portable and reducing dependence on a single provider.",
    commentary:
      "The headline outruns the available evidence. Open weights are not the same as open source; enterprises may value data handling, support, jurisdiction, and predictable operating cost more than weight availability. The essay is best treated as an ecosystem-strategy argument, not proof that a winner has been determined.",
    whyItMatters:
      "The argument captures a growing narrative about Chinese model diffusion, but its strongest claims require adoption, revenue, operating-cost, and deployment evidence that the article does not provide.",
    source: "Werd.io",
    sourceUrl:
      "https://werd.io/american-ai-is-locked-down-and-proprietary-its-losing/",
    sourceDate: "2026-07-20",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology", "economy"],
    tags: ["ai-models", "open-weights", "platform-strategy"],
    people: ["Ben Werdmuller"],
    organizations: ["Moonshot AI", "Anthropic", "OpenAI"],
    places: ["China", "United States"],
    relatedDispatchIds: ["d-013", "d-015", "d-018", "d-019"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Ben Werdmuller",
  },
  {
    kind: "article",
    id: "d-015",
    slug: "kimi-k3-launch-before-open-weights",
    title: "Kimi K3 launches by API before its promised open-weight release",
    summary:
      "Moonshot AI’s launch post introduces a 2.8-trillion-parameter model, publishes architecture and benchmark claims, and promises full weights and a technical report by July 27, 2026.",
    commentary:
      "This is the controlling source for what Moonshot announced, not independent confirmation of its benchmarks. The key date is still ahead of us: on July 21 the API is available, but the weights and technical report have not yet reached the promised July 27 release point. Until that happens, describing K3 as already open-weight overstates the evidence.",
    whyItMatters:
      "The distinction between an available API and downloadable weights determines whether claims about auditability, local control, and ecosystem diffusion can actually be tested.",
    source: "Kimi",
    sourceUrl: "https://www.kimi.com/blog/kimi-k3",
    sourceDate: "2026-07-16",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "bilateral"],
    tags: ["kimi-k3", "open-weights", "model-release", "primary-source"],
    people: [],
    organizations: ["Moonshot AI"],
    places: ["China"],
    relatedDispatchIds: ["d-013", "d-014", "d-016", "d-020"],
    editorialStatus: "sourceReview",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-016",
    slug: "kimi-k3-pelican-benchmark",
    title: "What one hands-on Kimi K3 test can and cannot show",
    summary:
      "Simon Willison documents an API test that exposes Kimi K3’s high reasoning-token use, current max-effort behavior, vision capability, and the limits of a deliberately informal benchmark.",
    commentary:
      "The value here is reproducible observation rather than a league-table verdict. One small task reveals cost, verbosity, and product behavior, while the author explicitly warns that it does not measure the agentic tool use that matters most for current models.",
    whyItMatters:
      "Hands-on tests help separate product behavior from launch marketing, provided their narrow scope is preserved instead of turning them into general capability scores.",
    source: "Simon Willison’s Weblog",
    sourceUrl: "https://simonwillison.net/2026/Jul/16/kimi-k3/",
    sourceDate: "2026-07-16",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology"],
    tags: ["kimi-k3", "benchmarks", "inference-cost", "hands-on-test"],
    people: ["Simon Willison"],
    organizations: ["Moonshot AI", "Artificial Analysis"],
    places: [],
    relatedDispatchIds: ["d-015", "d-017"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Simon Willison",
  },
  {
    kind: "article",
    id: "d-017",
    slug: "epoch-us-china-model-capability-gap",
    title:
      "Epoch AI’s capability index puts the historical US–China gap at seven months",
    summary:
      "Epoch AI estimates that leading Chinese models trailed the US frontier by an average of seven months from 2023 through its January 2026 analysis, using a composite benchmark index.",
    commentary:
      "This is a useful counterweight to claims that either side has already won. Its method is explicit, but it is historical context rather than a Kimi K3 evaluation; a January snapshot cannot establish how far the gap moved after July releases.",
    whyItMatters:
      "A dated, methodological baseline makes it possible to ask whether newer Chinese models changed the gap instead of substituting launch-week attention for a trend.",
    source: "Epoch AI",
    sourceUrl: "https://epoch.ai/data-insights/us-vs-china-eci",
    sourceDate: "2026-01-02",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "bilateral"],
    tags: ["ai-models", "benchmarks", "capability-gap", "methodology"],
    people: ["Luke Emberson"],
    organizations: ["Epoch AI"],
    places: ["China", "United States"],
    relatedDispatchIds: ["d-013", "d-015", "d-020"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Luke Emberson",
  },
  {
    kind: "article",
    id: "d-018",
    slug: "xi-jinping-open-source-ai-speech",
    title:
      "Xi Jinping’s AI speech endorses openness, collaboration, and sharing",
    summary:
      "The official English text of Xi Jinping’s World AI Conference keynote calls for open source, international collaboration, and wider diffusion of AI benefits.",
    commentary:
      "The speech establishes high-level policy language, but it does not prove why a particular company chose a license, whether promised weights will ship, or how deployment economics work. Company decisions and implementation evidence must be reviewed separately from the state’s stated position.",
    whyItMatters:
      "Primary policy language lets readers distinguish an explicit government position from broader claims about state direction that remain interpretation.",
    source: "State Council Information Office of the PRC",
    sourceUrl:
      "https://english.scio.gov.cn/m/topnews/2026-07/18/content_118605932.html",
    sourceDate: "2026-07-17",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en (translated from zh)",
    translationStatus: "human-translated",
    verticals: ["bilateral", "technology"],
    tags: ["ai-policy", "open-source", "official-statements"],
    people: ["Xi Jinping"],
    organizations: ["State Council Information Office", "World AI Conference"],
    places: ["Shanghai", "China"],
    relatedDispatchIds: ["d-014", "d-015", "d-020"],
    editorialStatus: "sourceReview",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-019",
    slug: "hugging-face-open-weight-incident-response",
    title:
      "Why Hugging Face used a self-hosted Chinese model during incident response",
    summary:
      "Hugging Face’s incident disclosure says hosted frontier-model guardrails blocked analysis of attack commands and credentials, so its team ran GLM 5.2 locally over more than 17,000 recorded events.",
    commentary:
      "This is a concrete operational case, but it should not be inflated into a general verdict on US and Chinese models. It shows that hosted safety controls failed one forensic workflow and that local execution preserved sensitive data; it does not establish which model family is broadly safer or more capable.",
    whyItMatters:
      "The incident turns abstract arguments about model control into a specific question of whether defenders can inspect malicious material without provider refusal or data leaving their environment.",
    source: "Hugging Face",
    sourceUrl: "https://huggingface.co/blog/security-incident-july-2026",
    sourceDate: "2026-07-16",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology"],
    tags: ["cybersecurity", "open-weights", "incident-response", "glm-5-2"],
    people: [],
    organizations: ["Hugging Face", "Z.ai"],
    places: [],
    relatedDispatchIds: ["d-013", "d-014"],
    editorialStatus: "sourceReview",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-020",
    slug: "kimi-k3-open-weights-escalation",
    title: "Kimi K3 and the conditional case for an open-weight escalation",
    summary:
      "Nathan Lambert argues that Kimi K3 narrows the open-to-closed model gap and changes the economics and risk debate around frontier AI diffusion.",
    commentary:
      "The analysis is valuable because it states its key condition: the argument assumes Moonshot follows through on the July 27 weight release. Its benchmark synthesis and industry access make it stronger than launch-week reaction, but claims about the size of the capability gap and the role of distillation remain informed interpretation.",
    whyItMatters:
      "It connects technical performance, Chinese policy, lab economics, and open-model risk while preserving the unresolved release condition underneath the thesis.",
    source: "Interconnects",
    sourceUrl:
      "https://www.interconnects.ai/p/kimi-k3-the-open-weights-escalation",
    sourceDate: "2026-07-20",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "bilateral", "economy"],
    tags: ["kimi-k3", "open-weights", "ai-policy", "model-economics"],
    people: ["Nathan Lambert"],
    organizations: ["Moonshot AI", "Anthropic", "OpenAI"],
    places: ["China", "United States"],
    relatedDispatchIds: ["d-013", "d-015", "d-017", "d-018"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Nathan Lambert",
  },
  {
    kind: "article",
    id: "d-021",
    slug: "popular-chinese-web-searches-2012",
    title: "What China searched for in 2012",
    summary:
      "A period snapshot of Baidu trends ranging from the Bo Xilai scandal and food-safety rumors to restaurant logos, viral television moments, and the rise of diaosi self-mockery.",
    commentary:
      "The list is valuable precisely because it is not a clean political chronology. It shows how scandal, consumer anxiety, celebrity, jokes, and suspicion of official accounts occupied the same online attention space.",
    whyItMatters:
      "Old search behavior preserves the texture of an internet moment that contemporary retrospectives tend to flatten into censorship or politics alone.",
    source: "ChinaFile",
    sourceUrl:
      "https://www.chinafile.com/reporting-opinion/media/most-popular-chinese-web-searches-of-2012",
    sourceDate: "2012-12-24",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland", "technology"],
    tags: ["baidu", "internet-culture", "search", "archive"],
    people: ["Shelley Jiang"],
    organizations: ["Baidu", "Tea Leaf Nation", "ChinaFile"],
    places: ["China"],
    relatedDispatchIds: ["d-022", "d-023", "d-028"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Shelley Jiang",
  },
  {
    kind: "article",
    id: "d-022",
    slug: "chinese-is-not-a-backward-language",
    title: "Chinese is not a backward language",
    summary:
      "Thomas Mullaney traces claims that Chinese writing is technologically unfit for modern life back to older orientalist hierarchies of language and civilization.",
    commentary:
      "This is a useful historical interruption to every new claim that a writing system predetermines technological capacity. It is an argument, not a neutral survey, and should be paired with work on how Chinese input methods actually developed.",
    whyItMatters:
      "Language technology is also cultural history: keyboards, input methods, and literacy debates carry assumptions about which societies are imagined as modern.",
    source: "ChinaFile",
    sourceUrl: "https://www.chinafile.com/media/chinese-not-backward-language",
    sourceDate: "2016-05-12",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "technology"],
    tags: ["chinese-language", "input-methods", "orientalism", "history"],
    people: ["Thomas S. Mullaney"],
    organizations: ["ChinaFile", "Foreign Policy", "Tea Leaf Nation"],
    places: ["China"],
    relatedDispatchIds: ["d-021", "d-023", "d-032"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Thomas S. Mullaney",
  },
  {
    kind: "article",
    id: "d-023",
    slug: "amateur-programmers-gaokao-games",
    title: "The amateur programmers turning the gaokao into games",
    summary:
      "A 2017 game jam used visual-development tools and college-entrance-exam prompts to make branching stories about education, inequality, apps, family pressure, and public life.",
    commentary:
      "This is the kind of culture-and-technology story a current-news feed misses: amateur creators used a rigid national ritual as raw material for small, critical, sometimes strange interactive fiction.",
    whyItMatters:
      "Games can function as vernacular social criticism, especially when low-code tools let young creators work outside the professional industry.",
    source: "Sixth Tone",
    sourceUrl: "https://www.sixthtone.com/news/1000350",
    sourceDate: "2017-06-18",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland", "technology"],
    tags: ["gaokao", "games", "youth-culture", "education"],
    people: ["Sun Jing"],
    organizations: ["Sixth Tone", "Orange Light"],
    places: ["China"],
    relatedDispatchIds: ["d-021", "d-022", "d-024"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Sun Jing",
  },
  {
    kind: "article",
    id: "d-024",
    slug: "power-play-chinese-student-council",
    title: "Power play inside a Chinese student council",
    summary:
      "A short report on photographer Yang Wenbin's documentary project about hierarchy, authority, and blocked access inside a university student council.",
    commentary:
      "The small scale is the point. Rather than explaining Chinese politics through national institutions, the photographs observe how status and administrative power are rehearsed on a campus.",
    whyItMatters:
      "Everyday organizations can teach authority long before their members enter formal workplaces or government institutions.",
    source: "Sixth Tone",
    sourceUrl:
      "https://www.sixthtone.com/news/1001240/power-play%3A-inside-a-chinese-student-council",
    sourceDate: "2017-11-23",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland"],
    tags: ["photography", "universities", "student-life", "authority"],
    people: ["Ding Yining", "Shi Yangkun", "Yang Wenbin"],
    organizations: ["Sixth Tone", "Communication University of China"],
    places: ["Beijing", "Shanghai"],
    relatedDispatchIds: ["d-023", "d-027"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Ding Yining and Shi Yangkun",
  },
  {
    kind: "article",
    id: "d-025",
    slug: "robot-threat-or-robot-dividend",
    title: "Robot threat or robot dividend?",
    summary:
      "Fieldwork from the Pearl River Delta examines competing claims that industrial automation either displaces workers or creates better jobs, with attention to bargaining power and vocational training.",
    commentary:
      "Published before the current generative-AI cycle, the essay is a reminder that automation debates already had a shop floor, subsidy system, and labor politics. Its normative conclusion is openly pro-worker rather than presented as neutral forecasting.",
    whyItMatters:
      "Model-era arguments about technological displacement are incomplete without the older record of factories, local industrial policy, and who captures productivity gains.",
    source: "Made in China Journal",
    sourceUrl:
      "https://madeinchinajournal.com/2018/07/07/robot-threat-robot-dividend-china/",
    sourceDate: "2018-07-07",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "economy", "mainland"],
    tags: ["automation", "labor", "manufacturing", "made-in-china-2025"],
    people: ["Huang Yu"],
    organizations: ["Made in China Journal", "Foxconn"],
    places: ["Pearl River Delta", "Dongguan", "China"],
    relatedDispatchIds: ["d-030"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Huang Yu",
  },
  {
    kind: "article",
    id: "d-026",
    slug: "hermit-culture-misty-mountains",
    title: "The hermit culture living on in China’s misty mountains",
    summary:
      "A reported visit to Taoist and Buddhist recluses in the Zhongnan Mountains, where urban disillusionment, revived religious life, environmental enforcement, and unsafe informal housing converge.",
    commentary:
      "The piece resists making retreat purely romantic. Smartphones, demolished temples, registration offices, tourism, health, and genuine danger remain part of the modern hermit's landscape.",
    whyItMatters:
      "Tradition survives through contemporary institutions and pressures, not outside them; even withdrawal from modern life produces new negotiations with the state and market.",
    source: "Sixth Tone",
    sourceUrl: "https://www.sixthtone.com/news/1003932",
    sourceDate: "2019-05-04",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland"],
    tags: ["taoism", "buddhism", "religion", "subculture"],
    people: ["Lin Qiqing"],
    organizations: ["Sixth Tone", "Zhongnan Cottage"],
    places: ["Zhongnan Mountains", "Shaanxi", "China"],
    relatedDispatchIds: ["d-029", "d-024"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Lin Qiqing",
  },
  {
    kind: "article",
    id: "d-027",
    slug: "same-sex-marriage-advocacy-china-2020",
    title: "How marriage-equality advocates used China’s Civil Code process",
    summary:
      "A 2020 account of LGBTQ organizers using the Civil Code comment period, family language, litigation, and personal stories to press for marriage equality despite legal defeat and tightening constraints.",
    commentary:
      "The article captured a real opening without pretending it guaranteed a breakthrough. Read today, the hopeful headline should remain tied to its publication date and to the setbacks the author documented in the same piece.",
    whyItMatters:
      "It records how advocates worked through official procedures and culturally legible ideas of family rather than reducing Chinese LGBTQ politics to either silence or inevitable progress.",
    source: "ChinaFile",
    sourceUrl:
      "https://www.chinafile.com/reporting-opinion/viewpoint/could-same-sex-marriage-advocacy-china-be-poised-breakthrough",
    sourceDate: "2020-09-17",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland"],
    tags: ["lgbtq", "marriage", "civil-code", "advocacy"],
    people: ["Darius Longarino"],
    organizations: ["ChinaFile", "Ai Cheng Jia", "PFLAG China"],
    places: ["China"],
    relatedDispatchIds: ["d-024", "d-029"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Darius Longarino",
  },
  {
    kind: "article",
    id: "d-028",
    slug: "alpaca-influencers-douyin-moderation",
    title: "When Douyin’s wildlife rules met China’s alpaca influencers",
    summary:
      "Alpaca owners described livestream blocks that appeared to classify their pets as protected wildlife, exposing the uncertain boundary between safety policy, automated moderation, and creator income.",
    commentary:
      "This sounds like a novelty story until the enforcement mistake cuts off a livestream business. It is an unusually clear, small-scale example of how platform rules become economic policy for creators.",
    whyItMatters:
      "Content moderation is experienced through edge cases: a defensible wildlife policy can still become arbitrary when classification, appeals, and income are coupled at platform scale.",
    source: "Rest of World",
    sourceUrl: "https://restofworld.org/2021/alpacas-tiktok-china-douyin/",
    sourceDate: "2021-05-11",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "technology", "mainland"],
    tags: ["douyin", "content-moderation", "creator-economy", "alpacas"],
    people: ["Amanda Florian"],
    organizations: ["Rest of World", "Douyin"],
    places: ["China", "Hangzhou", "Guangdong"],
    relatedDispatchIds: ["d-021", "d-029"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Amanda Florian",
  },
  {
    kind: "article",
    id: "d-029",
    slug: "li-ziqi-rural-fantasy-platform-economy",
    title: "Li Ziqi’s rural fantasy and the platform economy behind it",
    summary:
      "A 2021 essay follows the global appeal of Li Ziqi's pastoral videos into rural-revitalization policy, influencer management, e-commerce, labor, and a dispute over control of her brand.",
    commentary:
      "The strongest tension is not authenticity versus fakery. The fantasy is culturally meaningful and commercially engineered at the same time, with countryside imagery circulating through urban capital and global platforms.",
    whyItMatters:
      "A culture story can also be an infrastructure story about who owns a creator's audience, labor, products, and political legibility.",
    source: "Rest of World",
    sourceUrl: "https://restofworld.org/2021/tiktok-china-influencer-liziqi/",
    sourceDate: "2021-11-01",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "mainland", "economy", "technology"],
    tags: ["li-ziqi", "rural-life", "creator-economy", "platforms"],
    people: ["Yi-Ling Liu", "Li Ziqi"],
    organizations: ["Rest of World", "Douyin", "Hangzhou Weinian"],
    places: ["Sichuan", "China"],
    relatedDispatchIds: ["d-026", "d-027", "d-028"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Yi-Ling Liu",
  },
  {
    kind: "article",
    id: "d-030",
    slug: "dream-over-china-tech-workers",
    title: "The dream is over for China’s tech workers",
    summary:
      "Interviews with laid-off employees and recruiters document the collision of the internet-sector slowdown, regulatory change, zero-COVID disruption, and disillusionment with 996 work culture.",
    commentary:
      "The article is a period account, not a permanent verdict on Chinese technology. Its lasting value is the workers' shift in imagination: from private-sector prestige and upside toward stability, civil-service exams, and relief at leaving punishing jobs.",
    whyItMatters:
      "Industry cycles change social aspirations as well as balance sheets; the meaning of a desirable career can reverse within a generation.",
    source: "Rest of World",
    sourceUrl: "https://restofworld.org/2022/china-tech-layoffs/",
    sourceDate: "2022-07-12",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "economy", "mainland"],
    tags: ["996", "labor", "tech-workers", "layoffs"],
    people: ["Viola Zhou"],
    organizations: ["Rest of World", "ByteDance", "Alibaba", "Tencent"],
    places: ["China", "Shanghai", "Shenzhen"],
    relatedDispatchIds: ["d-025", "d-029"],
    editorialStatus: "published",
    provenance: "verified",
    byline: "Viola Zhou",
  },
  {
    kind: "article",
    id: "d-031",
    slug: "chips-and-china-2022",
    title: "Before DeepSeek: the chip-control wager",
    summary:
      "Ben Thompson's October 2022 analysis traces semiconductor specialization and argues that restricting China's access to advanced chips could increase both pressure to innovate and geopolitical fragility.",
    commentary:
      "This is valuable as a dated forecast, not as proof that export controls produced DeepSeek. The causal chain still needs evidence about the chips Chinese labs used, the constraints they actually faced, and which efficiency techniques would have emerged without the controls.",
    whyItMatters:
      "The current open-weight debate began before Kimi or DeepSeek: it sits downstream of a policy wager about whether hardware denial would slow capability or redirect engineering effort.",
    source: "Stratechery",
    sourceUrl: "https://stratechery.com/2022/chips-and-china/",
    sourceDate: "2022-10-25",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology", "economy"],
    tags: ["semiconductors", "export-controls", "ai-history"],
    people: ["Ben Thompson"],
    organizations: ["TSMC", "ASML", "Intel"],
    places: ["China", "United States", "Taiwan", "Netherlands"],
    relatedDispatchIds: ["d-013", "d-017", "d-035"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Ben Thompson",
  },
  {
    kind: "article",
    id: "d-032",
    slug: "llama-2-open-weight-precedent",
    title: "Llama 2 established the American open-weight precedent",
    summary:
      "Meta's July 2023 announcement made Llama 2 weights and starting code available for research and most commercial uses through a custom community license.",
    commentary:
      "Meta repeatedly called the release open source, but the license included use restrictions and a large-platform condition. The historically accurate description is an unusually broad open-weight release, not an unqualified open-source baseline.",
    whyItMatters:
      "Chinese labs did not invent open-weight distribution. Llama 2 shows that a major American platform company pursued the same ecosystem strategy before the present US–China framing hardened.",
    source: "Meta AI",
    sourceUrl: "https://ai.meta.com/blog/llama-2/",
    sourceDate: "2023-07-18",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "economy"],
    tags: ["llama-2", "open-weights", "model-licenses"],
    people: ["Mark Zuckerberg"],
    organizations: ["Meta", "Microsoft"],
    places: ["United States"],
    relatedDispatchIds: ["d-022", "d-033", "d-034"],
    editorialStatus: "published",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-033",
    slug: "llama-3-1-open-ecosystem-claim",
    title: "Llama 3.1 made Meta's open-model strategy explicit",
    summary:
      "Meta released the 405-billion-parameter Llama 3.1 model in July 2024 alongside a broader ecosystem pitch covering clouds, inference providers, distillation, safety tools, and a proposed Llama Stack interface.",
    commentary:
      "The release is both a technical artifact and interested platform strategy. Meta's capability, cost, and safety comparisons are first-party claims; its partner list and license changes are records that can be checked directly.",
    whyItMatters:
      "The strongest comparison with China's model ecosystem is not open versus closed by nationality, but how durable each firm's incentives are to keep weights, tools, and derivative rights available.",
    source: "Meta AI",
    sourceUrl: "https://ai.meta.com/blog/meta-llama-3-1/",
    sourceDate: "2024-07-23",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "economy"],
    tags: ["llama-3-1", "open-weights", "platform-strategy"],
    people: ["Mark Zuckerberg"],
    organizations: ["Meta"],
    places: ["United States"],
    relatedDispatchIds: ["d-032", "d-034"],
    editorialStatus: "published",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-034",
    slug: "liang-wenfeng-deepseek-playbook",
    title: "Liang Wenfeng described DeepSeek's playbook before the shock",
    summary:
      "ChinaTalk's annotated translation of a 2024 interview records DeepSeek founder Liang Wenfeng discussing architectural efficiency, open releases, recruiting, price competition, and the lab's focus on foundational research.",
    commentary:
      "The interview is unusually informative because it is contemporaneous and first-person, but it remains a founder explaining his own company. Claims about costs, motives, technical gaps, and long-term strategy require comparison with papers, releases, hiring, and business behavior.",
    whyItMatters:
      "It replaces retrospective mythology with a dated record of how one Chinese lab understood its constraints and ambitions before R1 became a global market event.",
    source: "ChinaTalk",
    sourceUrl:
      "https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas",
    sourceDate: "2024-11-27",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en and zh",
    translationStatus: "bilingual",
    verticals: ["mainland", "technology", "economy"],
    tags: ["deepseek", "liang-wenfeng", "translation", "open-weights"],
    people: ["Liang Wenfeng", "Jordan Schneider"],
    organizations: ["DeepSeek", "High-Flyer", "ChinaTalk", "36Kr"],
    places: ["China"],
    relatedDispatchIds: ["d-032", "d-033"],
    editorialStatus: "published",
    provenance: "verified",
  },
  {
    kind: "article",
    id: "d-035",
    slug: "deepseek-faq-market-reaction",
    title: "The first DeepSeek shock established the pattern",
    summary:
      "Ben Thompson's January 2025 FAQ separates DeepSeek's disclosed efficiency work from the market and policy reaction that followed R1's release.",
    commentary:
      "The piece is most useful as a period interpretation of what surprised investors and policymakers. Its conclusions about distillation, legal chips, capability leadership, and Nvidia's moat should remain attributed analysis rather than settled technical history.",
    whyItMatters:
      "The Kimi K3 cycle is not unprecedented. Comparing the 2025 and 2026 reactions helps distinguish recurring market anxiety from changes in model capability or deployment economics.",
    source: "Stratechery",
    sourceUrl: "https://stratechery.com/2025/deepseek-faq/",
    sourceDate: "2025-01-27",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology", "economy"],
    tags: ["deepseek-r1", "market-reaction", "inference-economics"],
    people: ["Ben Thompson"],
    organizations: ["DeepSeek", "Nvidia", "OpenAI"],
    places: ["China", "United States"],
    relatedDispatchIds: ["d-013", "d-017", "d-031", "d-034"],
    editorialStatus: "sourceReview",
    provenance: "verified",
    byline: "Ben Thompson",
  },
  {
    kind: "article",
    id: "d-036",
    slug: "anthropic-fable-export-control-timeline",
    title: "Anthropic's Fable episode turned model access into policy",
    summary:
      "Anthropic's June 2026 account documents the suspension and redeployment of Fable 5 and Mythos 5, its safeguard changes, and its proposed framework for evaluating jailbreak severity.",
    commentary:
      "This is the controlling source for Anthropic's timeline and position, not an independent account of the government's reasoning or the disputed bypass. The useful record is the sequence of access restrictions, mitigation, testing, and redeployment; causal motives must remain attributed.",
    whyItMatters:
      "The incident shows that access to a proprietary model can become a live export-control and operational dependency, not merely a pricing or product choice.",
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/redeploying-fable-5",
    sourceDate: "2026-06-30",
    curatedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology"],
    tags: ["anthropic", "export-controls", "cybersecurity", "safeguards"],
    people: [],
    organizations: ["Anthropic", "Amazon", "CAISI"],
    places: ["United States"],
    relatedDispatchIds: ["d-013", "d-019", "d-031"],
    editorialStatus: "sourceReview",
    provenance: "verified",
  },
];

export const dispatches: Dispatch[] = z
  .array(DispatchSchema)
  .parse(rawSeeds.map((seed) => materializeDispatch(seed as DispatchSeed)));

const publicStatuses = new Set<Dispatch["editorialStatus"]>([
  "published",
  "corrected",
]);

/** The only records allowed to cross the public publication boundary. */
export function isPublicDispatch(dispatch: Dispatch): boolean {
  return publicStatuses.has(dispatch.editorialStatus);
}

export const publishedDispatches = dispatches.filter(isPublicDispatch);

const publicProjections = new WeakMap<Dispatch, PublicDispatch>();

/**
 * Strips the private source-lead link before a Dispatch becomes a client prop.
 * Projections are memoized so one record keeps one identity in RSC payloads.
 */
export function toPublicDispatch(dispatch: Dispatch): PublicDispatch {
  const cached = publicProjections.get(dispatch);
  if (cached) return cached;
  const projection: Partial<Dispatch> = { ...dispatch };
  delete projection.sourceLeadId;
  publicProjections.set(dispatch, projection as PublicDispatch);
  return projection as PublicDispatch;
}

export function getDispatch(slug: string): Dispatch | undefined {
  return dispatches.find((d) => d.slug === slug);
}

export function getPublicDispatch(slug: string): Dispatch | undefined {
  return publishedDispatches.find((d) => d.slug === slug);
}

export function getDispatchById(id: string): Dispatch | undefined {
  return dispatches.find((d) => d.id === id);
}

export function relatedDispatches(d: Dispatch): Dispatch[] {
  return d.relatedDispatchIds
    .map(getDispatchById)
    .filter((x): x is Dispatch => Boolean(x));
}

export function publicRelatedDispatches(d: Dispatch): Dispatch[] {
  return relatedDispatches(d).filter(isPublicDispatch);
}

export function countsByVertical(
  collection: Dispatch[] = publishedDispatches
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const d of collection) {
    for (const v of d.verticals) counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

export function countsByKind(
  collection: Dispatch[] = publishedDispatches
): Partial<Record<DispatchKind, number>> {
  const counts: Partial<Record<DispatchKind, number>> = {};
  for (const d of collection) counts[d.kind] = (counts[d.kind] ?? 0) + 1;
  return counts;
}
