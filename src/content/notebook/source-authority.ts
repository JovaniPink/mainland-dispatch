const migratedGateSources = [
  "notebook-source-gates-episode",
  "notebook-source-gates-yu-prior",
  "notebook-source-gates-white-house-transshipment",
  "notebook-source-gates-ustr-origin",
  "notebook-source-gates-usmca-3210",
  "notebook-source-gates-canada-ev",
  "notebook-source-gates-white-house-canada",
  "notebook-source-gates-brookings",
  "notebook-source-gates-canada-china-cycle",
  "notebook-source-gates-canada-origin-measures",
  "notebook-source-gates-usmca-2026",
  "notebook-source-gates-cpa-monitor",
  "notebook-source-gates-fed-mexico",
  "notebook-source-gates-canada-countermeasures",
  "notebook-source-gates-canada-negotiations",
  "notebook-source-gates-trump-warning",
  "notebook-source-gates-canada-trade",
] as const;

const migratedMaritimeSources = [
  "notebook-source-risk-chnl-2025",
  "notebook-source-risk-rosatom-2025",
  "notebook-source-risk-sea-legend",
  "notebook-source-risk-global-times-sea-legend",
  "notebook-source-risk-zhoushan-departure",
  "notebook-source-risk-nsidc-passage",
  "notebook-source-risk-nsidc-2026",
  "notebook-source-risk-imo-hfo",
  "notebook-source-risk-bellona-permits",
  "notebook-source-risk-bellona-shadow",
  "notebook-source-risk-arctic-podcast",
  "notebook-source-risk-aljazeera",
  "notebook-source-risk-guardian",
] as const;

const stableOwners = new Map<string, string>([
  ...migratedGateSources.map(
    (sourceId) => [sourceId, "what-gets-through"] as const
  ),
  ...migratedMaritimeSources.map(
    (sourceId) => [sourceId, "routing-around-risk"] as const
  ),
]);

export function notebookSourceKnowledgeId(
  entrySlug: string,
  sourceId: string
): string {
  const authoritySlug = stableOwners.get(sourceId) ?? entrySlug;
  return `mainland-dispatch:source:${authoritySlug}-${sourceId.replace(
    /^notebook-source-/,
    ""
  )}`;
}

export function dispatchSourceKnowledgeId(
  slug: string,
  sourceId?: string
): string {
  return `mainland-dispatch:source:${slug}-${sourceId ?? "canonical"}`;
}
