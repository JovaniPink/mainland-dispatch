import type { SourceLeadRegion, SourceLeadTheme } from "./schema";

/** Display labels for the Desk's source-lead filters; no lead data. */
export const sourceLeadThemeLabels: Record<SourceLeadTheme, string> = {
  "governance-law": "Governance and law",
  "security-geopolitics": "Security and geopolitics",
  "economy-finance": "Economy and finance",
  "trade-industry": "Trade and industry",
  "technology-digital": "Technology and digital systems",
  "science-health": "Science and health",
  "society-culture": "Society and culture",
  "environment-resources": "Environment and resources",
  "infrastructure-mobility": "Infrastructure and mobility",
  "history-memory": "History and memory",
  "cross-cutting": "Cross-cutting",
};

export const sourceLeadRegionLabels: Record<SourceLeadRegion, string> = {
  "china-mainland": "Mainland China",
  "hong-kong": "Hong Kong",
  macau: "Macau",
  taiwan: "Taiwan",
  "united-states": "United States",
  canada: "Canada",
  europe: "Europe",
  "asia-pacific": "Asia-Pacific",
  africa: "Africa",
  "latin-america": "Latin America",
  "middle-east": "Middle East",
  global: "Global",
};
