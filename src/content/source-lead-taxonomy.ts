import "server-only";
import type {
  SourceLeadRegion,
  SourceLeadTaxonomy,
  SourceLeadTheme,
} from "./schema";

export {
  sourceLeadRegionLabels,
  sourceLeadThemeLabels,
} from "./source-lead-labels";

type TaxonomyInput = {
  id: string;
  title: string;
  topics: string[];
  notes: string;
  publishedAt?: string;
  publicationYear?: number;
};

type ThemeRule = {
  theme: Exclude<SourceLeadTheme, "cross-cutting">;
  patterns: RegExp[];
};

type RegionRule = {
  region: SourceLeadRegion;
  patterns: RegExp[];
};

const themeRules: ThemeRule[] = [
  {
    theme: "governance-law",
    patterns: [
      /\bgovern(?:ance|ment)\b/,
      /\b(?:law|legal|regulat(?:ion|ory)|policy|constitution)\b/,
      /\b(?:communist-party|party-state|state-council)\b/,
      /\b(?:censorship|dissent|propaganda|press-freedom)\b/,
      /\b(?:human-rights|civil-rights|academic-freedom)\b/,
      /\b(?:detention|policing|court|litigation|criminal-case)\b/,
      /\b(?:protest|democracy|election|citizenship)\b/,
      /\b(?:public-statement|foreign-ministry)\b/,
      /\b(?:xinjiang|uyghurs?|tibet)\b/,
    ],
  },
  {
    theme: "security-geopolitics",
    patterns: [
      /\b(?:diplomacy|geopolitics|foreign-policy|national-security)\b/,
      /\b(?:military|defen[cs]e|weapons?|missiles?|navy|war|conflict)\b/,
      /\b(?:sanctions?|export-controls?|entity-list)\b/,
      /\b(?:intelligence|espionage|attribution|apt\d*)\b/,
      /\b(?:cybersecurity|hacking|cyberattack|backdoor)\b/,
      /\b(?:south-china-sea|taiwan-strait|arctic)\b/,
      /\b(?:trade-secrets?|supply-chain-security)\b/,
      /\b(?:bilateral|strategic-competition)\b/,
    ],
  },
  {
    theme: "economy-finance",
    patterns: [
      /\b(?:economy|economic|macroeconomics|growth|gdp|inflation)\b/,
      /\b(?:finance|financial|markets?|stock-market|bonds?|banking)\b/,
      /\b(?:currency|exchange-rate|yuan|renminbi|monetary-policy|pboc)\b/,
      /\b(?:debt|credit|defaults?|property|housing|mortgages?)\b/,
      /\b(?:investment|capital-flows?|venture-capital|private-equity)\b/,
      /\b(?:employment|labor-economics|wages?|wealth|productivity)\b/,
      /\b(?:prices?|consumer-spending|retail-sales)\b/,
      /\b(?:entrepreneurship|competition|model-economics)\b/,
    ],
  },
  {
    theme: "trade-industry",
    patterns: [
      /\b(?:trade|tariffs?|imports?|exports?|trade-war|trade-policy)\b/,
      /\b(?:manufactur\w*|industry|industrial-policy|factories?|factory)\b/,
      /\b(?:supply-chains?|shipping|logistics|freight|ports?)\b/,
      /\b(?:semiconductors?|chips?|automotive|electric-vehicles?)\b/,
      /\b(?:critical-minerals?|rare-earth-elements?|mining|processing)\b/,
      /\b(?:steel|cement|solar|recycling|agriculture|textiles?)\b/,
      /\b(?:e-commerce|marketplace|business|corporate-strategy)\b/,
    ],
  },
  {
    theme: "technology-digital",
    patterns: [
      /\b(?:technology|digital|internet|software|hardware|telecom|5g)\b/,
      /\b(?:artificial-intelligence|machine-learning|ai-policy|ai-strategy)\b/,
      /\b(?:open-models?|open-weights|model-release|model-evaluation)\b/,
      /\b(?:deepseek|qwen|llama|kimi|kimi-k3|baidu|huawei|tencent|alibaba)\b/,
      /\b(?:google|apple|microsoft|amazon|meta|facebook)\b/,
      /\b(?:platforms?|social-media|weibo|mobile-apps?|app-stores?)\b/,
      /\b(?:algorithms?|data|network-measurement|dns|privacy|surveillance)\b/,
      /\b(?:cybersecurity|mobile-security|encryption|semiconductors?|robotics|automation)\b/,
      /\b(?:quantum|satellite-data|cloud-computing|search)\b/,
      /\b(?:agentic-ai|language-models?|long-context|retrieval|evaluation)\b/,
      /\b(?:distillation|technical-report|deployment)\b/,
    ],
  },
  {
    theme: "science-health",
    patterns: [
      /\b(?:science|scientific|research|universities|academic-research)\b/,
      /\b(?:health|public-health|medicine|medical|disease|pandemic|covid)\b/,
      /\b(?:biology|biotech|gene-editing|crispr|bioethics)\b/,
      /\b(?:physics|nuclear-science|fusion|astronomy)\b/,
      /\b(?:space|spaceflight|space-science|moon|mars)\b/,
      /\b(?:archaeology|geology|research-governance)\b/,
    ],
  },
  {
    theme: "society-culture",
    patterns: [
      /\b(?:society|social-change|culture|daily-life|everyday-life)\b/,
      /\b(?:media|journalism|press|television|film|music|literature)\b/,
      /\b(?:education|schools?|students?|universities|tutoring)\b/,
      /\b(?:family|marriage|gender|births?|demograph\w*)\b/,
      /\b(?:migration|emigration|immigration|diaspora|citizenship)\b/,
      /\b(?:labor|workers?|employment|996|inequality)\b/,
      /\b(?:religion|sports?|games|tourism|travel|food)\b/,
      /\b(?:creators?|rural-life|urban-life|housing)\b/,
      /\b(?:academia|expatriate-life|personal-essay|first-person|tennis)\b/,
    ],
  },
  {
    theme: "environment-resources",
    patterns: [
      /\b(?:environment|climate|emissions?|pollution|air-quality)\b/,
      /\b(?:energy|electricity|coal|oil|gas|solar|wind|nuclear-energy)\b/,
      /\b(?:water|waste|recycling|conservation|wildlife|oceans?)\b/,
      /\b(?:fishing|agriculture|food-security|desertification)\b/,
      /\b(?:critical-minerals?|rare-earth-elements?|mining|mines|geology)\b/,
      /\b(?:resources?|deposits|reserves|processing)\b/,
    ],
  },
  {
    theme: "infrastructure-mobility",
    patterns: [
      /\b(?:infrastructure|construction|urbanization|facilities)\b/,
      /\b(?:transport|mobility|roads?|bridges?|rail|trains?|maglev)\b/,
      /\b(?:aviation|airlines?|airports?|shipping|ports?|freight)\b/,
      /\b(?:electric-grid|power-grid|uhv|dams?|broadband)\b/,
      /\b(?:geospatial-data|map-data|mapping|arcgis)\b/,
    ],
  },
  {
    theme: "history-memory",
    patterns: [
      /\b(?:history|historical|memory|anniversary|archives?|archival)\b/,
      /\b(?:tiananmen|cultural-revolution|mao|cold-war)\b/,
      /\b(?:ancient|archaeology|museum|heritage)\b/,
    ],
  },
];

const regionRules: RegionRule[] = [
  {
    region: "china-mainland",
    patterns: [
      /\b(?:china|chinese|mainland|prc)\b/,
      /\b(?:beijing|shanghai|shenzhen|guangdong|xinjiang|tibet)\b/,
      /\b(?:sichuan|guizhou|hubei|hunan|zhejiang|jiangsu|yunnan)\b/,
    ],
  },
  { region: "hong-kong", patterns: [/\b(?:hong-kong|hong kong)\b/] },
  { region: "macau", patterns: [/\b(?:macau|macao)\b/] },
  { region: "taiwan", patterns: [/\btaiwan(?:ese)?\b/] },
  {
    region: "united-states",
    patterns: [
      /\b(?:united-states|united states|american|america)\b|\bu\.s\.(?=\s|$)/,
      /\b(?:washington|california|silicon-valley)\b/,
    ],
  },
  { region: "canada", patterns: [/\bcanad(?:a|ian)\b/] },
  {
    region: "europe",
    patterns: [
      /\b(?:europe|european-union|european union|eu)\b/,
      /\b(?:united-kingdom|britain|british|germany|german|france|italy)\b/,
    ],
  },
  {
    region: "asia-pacific",
    patterns: [
      /\b(?:asia|asia-pacific|indo-pacific|asean)\b/,
      /\b(?:japan|japanese|korea|korean|india|indian)\b/,
      /\b(?:australia|australian|new-zealand|vietnam|philippines)\b/,
    ],
  },
  { region: "africa", patterns: [/\bafrica(?:n)?\b/] },
  {
    region: "latin-america",
    patterns: [/\b(?:latin-america|south-america|brazil|brazilian|ecuador)\b/],
  },
  {
    region: "middle-east",
    patterns: [/\b(?:middle-east|iran|saudi-arabia|gulf|hormuz)\b/],
  },
  {
    region: "global",
    patterns: [/\b(?:global|worldwide|world|international)\b/],
  },
];

const matchesAny = (text: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(text));

const scoreTheme = (text: string, rule: ThemeRule) =>
  rule.patterns.reduce(
    (score, pattern) => score + (pattern.test(text) ? 1 : 0),
    0
  );

export function classifySourceLead(input: TaxonomyInput): SourceLeadTaxonomy {
  const text = [input.title, ...input.topics, input.notes]
    .join(" ")
    .toLowerCase();
  const scoredThemes = themeRules
    .map((rule, order) => ({
      theme: rule.theme,
      score: scoreTheme(text, rule),
      order,
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.order - right.order)
    .slice(0, 4)
    .map(({ theme }) => theme);
  const themes: SourceLeadTheme[] =
    scoredThemes.length > 0 ? scoredThemes : ["cross-cutting"];
  const regions = regionRules
    .filter((rule) => matchesAny(text, rule.patterns))
    .map((rule) => rule.region);
  const year = input.publishedAt
    ? Number(input.publishedAt.slice(0, 4))
    : input.publicationYear;

  if (!year) {
    throw new Error(`${input.id} requires a publication year for taxonomy`);
  }

  return {
    version: "source-taxonomy-v1",
    status: "provisional",
    method: "existing-metadata-rules",
    primaryTheme: themes[0],
    themes,
    regions: regions.length > 0 ? regions : ["china-mainland"],
    publicationDecade: `${Math.floor(year / 10) * 10}s`,
  };
}
