type Candidate = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  publicationYear?: number;
  contentType: "primary" | "research" | "reporting" | "analysis";
  topics: string[];
  notes: string;
  accessStatus?:
    "reachable" | "paywalled" | "restricted" | "unavailable" | "unstable";
  language?: string;
  translationStatus?:
    | "original-language"
    | "original-english"
    | "publisher-translation"
    | "independent-translation";
  nextReviewAt?: string;
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-09-06",
  sourceOrigin: "web-research" as const,
  collectionId: "china-critical-minerals-2026-09-06",
  reviewState: "metadata-checked" as const,
  disposition: "withheld" as const,
  accessStatus: item.accessStatus ?? ("reachable" as const),
  urlStatus: "publisher-canonical" as const,
  canonicalCheckedAt: "2026-09-06",
  language: item.language ?? "English",
  translationStatus: item.translationStatus ?? ("original-english" as const),
  evidenceStatus: "unverified" as const,
  paywall: false,
  ...item,
  decisionReason:
    item.accessStatus === "restricted"
      ? "The publisher endpoint did not permit direct full-text review during intake. Retained as a reporting lead and withheld pending authorized source-read, primary records, later developments, and independent corroboration."
      : "Admitted to research custody after a publisher and metadata check, but not promoted into a public Dispatch. Facility status, measurement dates, legal effect, and material-specific claims still require claim-level review.",
});

/**
 * Bounded research intake for a proposed mine-to-magnet critical-minerals
 * interactive. Every record remains private and withheld from publication.
 */
export const chinaCriticalMinerals20260906 = [
  candidate({
    id: "lead-2026-usgs-china-mineral-industries",
    title:
      "The Mineral Industry of China: Geospatial Data and Recent Developments",
    url: "https://pubs.usgs.gov/publication/ofr20261018/full",
    publisher: "U.S. Geological Survey",
    publishedAt: "2026-06-12",
    contentType: "research",
    topics: [
      "critical-minerals",
      "china",
      "mines",
      "processing",
      "geospatial-data",
    ],
    notes:
      "Cornerstone facility inventory for a China layer. The report inventories mines, quarries, and processing plants, but most production and capacity observations refer to 2023; a plotted facility must not be presented as currently operating without a later status check.",
  }),
  candidate({
    id: "lead-2023-usgs-china-mineral-industries-gis",
    title:
      "Compilation of geospatial data for the mineral industries and related infrastructure of China",
    url: "https://www.usgs.gov/data/compilation-geospatial-data-gis-mineral-industries-and-related-infrastructure-peoples-republic",
    publisher: "U.S. Geological Survey",
    publishedAt: "2023-12-07",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "china",
      "geodatabase",
      "facilities",
      "infrastructure",
    ],
    notes:
      "CC0 geodatabase for mines, processing facilities, deposits, exploration sites, selected permissive tracts, ports, and infrastructure. Preserve the source geometry and feature type rather than converting every record into an active mine.",
  }),
  candidate({
    id: "lead-2022-usgs-global-rare-earth-occurrences",
    title: "Global rare earth element occurrence database",
    url: "https://www.usgs.gov/data/global-rare-earth-element-occurrence-database",
    publisher: "U.S. Geological Survey",
    publishedAt: "2022-02-23",
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "global",
      "deposits",
      "geology",
      "geospatial-data",
    ],
    notes:
      "CC0 occurrence database with spatial and nonspatial records. It describes geology and known occurrences, not present operating status, production, recoverability, or commercially viable reserves.",
  }),
  candidate({
    id: "lead-usgs-rare-earth-feature-service",
    title: "Rare earth element deposits hosted feature layer",
    url: "https://energy.usgs.gov/arcgis/rest/services/Hosted/Rare_earth_element_deposits/FeatureServer/0",
    publisher: "U.S. Geological Survey",
    publicationYear: 2026,
    contentType: "primary",
    topics: ["rare-earth-elements", "arcgis", "geojson", "map-data", "api"],
    notes:
      "Convenience WGS84 point service that supports GeoJSON queries. Intake returned 577 features and a transfer-limit warning, far fewer than the full data release describes; use the downloadable USGS data release as the custody source and treat this layer as a preview until the mismatch is reconciled.",
  }),
  candidate({
    id: "lead-2026-usgs-us-mineral-facilities",
    title:
      "Mines, smelters, refineries, and recycling facilities in the United States",
    url: "https://www.usgs.gov/data/mines-smelters-refineries-and-recycling-facilities-united-states",
    publisher: "U.S. Geological Survey",
    publishedAt: "2026-08-19",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "united-states",
      "processing",
      "recycling",
      "geospatial-data",
    ],
    notes:
      "Useful U.S. comparison layer covering more than 800 facilities. Facility presence and reported status must remain distinct from verified production, capacity, ownership, and qualification for a specific rare-earth product.",
  }),
  candidate({
    id: "lead-2025-usgs-critical-minerals-atlas",
    title: "Critical Minerals Atlas",
    url: "https://www.usgs.gov/tools/critical-minerals-atlas",
    publisher: "U.S. Geological Survey",
    publishedAt: "2025-08-14",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "global-production",
      "reserves",
      "trade",
      "atlas",
    ],
    notes:
      "Public-domain country-level atlas based principally on 2023 data published in the 2025 Mineral Commodity Summaries and Minerals Yearbook. Appropriate for national context, not live facility or shipment status.",
  }),
  candidate({
    id: "lead-2025-geoscience-australia-critical-minerals-mapserver",
    title: "Australian critical minerals operating mines and deposits",
    url: "https://services.ga.gov.au/gis/rest/services/AustralianCriticalMineralsOperatingMinesAndDeposits/MapServer",
    publisher: "Geoscience Australia",
    publicationYear: 2025,
    contentType: "primary",
    topics: [
      "critical-minerals",
      "australia",
      "operating-mines",
      "deposits",
      "arcgis",
    ],
    notes:
      "CC BY 4.0 service with separate operating, developing, care-and-maintenance, and deposit layers, reported current to December 2025. Preserve those statuses and its GDA94 coordinate reference system during transformation.",
  }),
  candidate({
    id: "lead-2026-canada-critical-minerals-map",
    title: "Canadian Critical Minerals Map dataset",
    url: "https://open.canada.ca/data/en/dataset/22b2db8a-dc12-47f2-9737-99d3da921751?res_page=1",
    publisher: "Natural Resources Canada",
    publishedAt: "2026-08-11",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "canada",
      "mines",
      "advanced-projects",
      "processing",
    ],
    notes:
      "Official download and service directory for advanced projects, active mines, and processing facilities. Confirm the current Open Government Licence and dataset update semantics before ingesting or redistributing transformed records.",
  }),
  candidate({
    id: "lead-2025-sgb-brazil-rare-earth-potential",
    title: "Map of rare earth potential in the Ribeira and Brasilia belts",
    url: "https://rigeo.sgb.gov.br/items/eed2b7e4-5acc-4e1f-a1c2-f4836ba7e9f8",
    publisher: "Geological Survey of Brazil",
    publicationYear: 2025,
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "brazil",
      "geological-potential",
      "exploration",
      "map-data",
    ],
    language: "Portuguese",
    translationStatus: "original-language",
    notes:
      "Official 1:250,000-scale potential map. Geological potential is not an operating mine, proved reserve, permitted project, or near-term alternative supply source; confirm reuse terms before republishing derived geometry.",
  }),
  candidate({
    id: "lead-china-customs-statistics",
    title: "China Customs Statistics",
    url: "https://english.customs.gov.cn/Statistics/Statistics",
    publisher: "General Administration of Customs of China",
    publicationYear: 2026,
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "china",
      "customs",
      "exports",
      "trade-data",
    ],
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-09-24",
    notes:
      "Official entry point for monthly customs releases and the query system. Any interactive series needs the precise Chinese commodity code, unit, revision state, partner-country treatment, and download date; aggregate rare-earth exports do not identify magnets or individual elements.",
  }),
  candidate({
    id: "lead-2026-usgs-mineral-commodity-summaries",
    title: "Mineral Commodity Summaries 2026",
    url: "https://pubs.usgs.gov/publication/mcs2026",
    publisher: "U.S. Geological Survey",
    publishedAt: "2026-01-30",
    contentType: "research",
    topics: [
      "critical-minerals",
      "rare-earth-elements",
      "production",
      "trade",
      "import-reliance",
    ],
    notes:
      "Primary annual baseline for U.S. production, imports, net import reliance, world production, and reserves. Preserve commodity-specific definitions and reference years; do not turn one aggregate rare-earth reliance estimate into a claim about every product or element.",
  }),
  candidate({
    id: "lead-2026-usgs-mineral-commodity-summaries-data",
    title: "Mineral Commodity Summaries 2026 data release",
    url: "https://data.usgs.gov/datacatalog/data/USGS%3A69837e43b66b01367d7ec7c7",
    publisher: "U.S. Geological Survey",
    publishedAt: "2026-01-30",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "statistics",
      "production",
      "trade",
      "downloadable-data",
    ],
    notes:
      "Machine-readable companion to MCS 2026, DOI 10.5066/P1WKQ63T. Retain commodity names, units, year fields, withheld-value markers, and revision metadata during normalization.",
  }),
  candidate({
    id: "lead-2025-usgs-critical-minerals-list",
    title: "2025 list of critical minerals",
    url: "https://www.usgs.gov/media/images/2025-list-critical-minerals",
    publisher: "U.S. Geological Survey",
    publishedAt: "2025-11-07",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "rare-earth-elements",
      "united-states",
      "classification",
      "policy",
    ],
    notes:
      "Official list distinguishing the broader 60-mineral critical-minerals category from its 15 listed rare-earth elements. Use for vocabulary and scope, not as evidence that all listed minerals share the same supply-chain structure.",
  }),
  candidate({
    id: "lead-2025-usgs-critical-minerals-methodology",
    title:
      "Methodology and technical input for the 2025 U.S. list of critical minerals",
    url: "https://pubs.usgs.gov/publication/ofr20251047/full",
    publisher: "U.S. Geological Survey",
    publishedAt: "2025-08-25",
    contentType: "research",
    topics: [
      "critical-minerals",
      "economic-risk",
      "trade-codes",
      "methodology",
      "rare-earth-elements",
    ],
    notes:
      "Technical basis for the economic-risk model and rare-earth trade-code disaggregation. Modeled exposure is a scenario output, not an observed loss, forecast, or automatic result of a licensing measure.",
  }),
  candidate({
    id: "lead-census-international-trade-imports-api",
    title: "International Trade Imports API",
    url: "https://api.census.gov/data/timeseries/intltrade/imports/hs.html",
    publisher: "U.S. Census Bureau",
    publicationYear: 2026,
    contentType: "primary",
    topics: [
      "united-states",
      "imports",
      "harmonized-system",
      "trade-data",
      "api",
    ],
    notes:
      "Official monthly U.S. import API with country, district, value, quantity, and shipping-weight fields. Validate current HTS codes and units for each product; a permanent-magnet code is not interchangeable with all rare-earth materials.",
  }),
  candidate({
    id: "lead-2026-iea-rare-earth-elements",
    title: "Rare Earth Elements: Executive summary",
    url: "https://www.iea.org/reports/rare-earth-elements/executive-summary",
    publisher: "International Energy Agency",
    publishedAt: "2026-02-24",
    contentType: "research",
    topics: [
      "rare-earth-elements",
      "permanent-magnets",
      "supply-concentration",
      "export-controls",
      "scenarios",
    ],
    notes:
      "Best concise source for a mine-to-refining-to-magnet supply-chain frame, recent export-control effects, and 2035 diversification scenarios. Separate IEA scenarios and announced-project assumptions from observed present-day outcomes.",
  }),
  candidate({
    id: "lead-2026-iea-critical-minerals-outlook",
    title: "Global Critical Minerals Outlook 2026: Executive summary",
    url: "https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary",
    publisher: "International Energy Agency",
    publicationYear: 2026,
    contentType: "research",
    topics: [
      "critical-minerals",
      "supply-concentration",
      "export-controls",
      "prices",
      "scenarios",
    ],
    notes:
      "Broader context for concentration, strategic-mineral prices, export restrictions, and modeled economic exposure. Preserve mineral-level variation and distinguish the full-control scenario from realized trade loss.",
  }),
  candidate({
    id: "lead-2026-oecd-export-restrictions-inventory",
    title:
      "OECD Inventory of Export Restrictions on Critical Raw Materials 2026",
    url: "https://www.oecd.org/en/publications/oecd-inventory-of-export-restrictions-on-critical-raw-materials-2026_d5ca8f62-en.html",
    publisher: "Organisation for Economic Co-operation and Development",
    publishedAt: "2026-04-28",
    contentType: "research",
    topics: [
      "critical-minerals",
      "export-restrictions",
      "policy",
      "trade",
      "historical-data",
    ],
    notes:
      "Cross-country policy inventory useful for history through 2024. Its coverage and exclusions mean it cannot establish the current legal status of China-specific 2025-2026 controls without direct government instruments.",
  }),
  candidate({
    id: "lead-2025-mofcom-rare-earth-export-controls",
    title:
      "Announcement No. 18 of 2025 on export control of medium and heavy rare-earth-related items",
    url: "https://english.mofcom.gov.cn/Policies/AnnouncementsOrders/art/2025/art_0dd87cbee7b045bf93fabe6ab2faceee.html",
    publisher: "Ministry of Commerce of the People's Republic of China",
    publishedAt: "2025-04-04",
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "export-controls",
      "licensing",
      "china",
      "legal-instrument",
    ],
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-09-24",
    notes:
      "Controlling official English-language presentation of the April 2025 licensing measure for specified samarium, gadolinium, terbium, dysprosium, lutetium, scandium, and yttrium items. It establishes export licensing, not a blanket ban on every rare-earth product.",
  }),
  candidate({
    id: "lead-2025-china-october-export-control-suspension",
    title: "China suspends certain October 2025 export control measures",
    url: "https://english.www.gov.cn/news/202510/30/content_WS69032059c6d00ca5f9a072fe.html",
    publisher: "State Council of the People's Republic of China",
    publishedAt: "2025-10-30",
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "export-controls",
      "suspension",
      "china",
      "policy-timeline",
    ],
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-09-24",
    notes:
      "Official summary of the one-year suspension of relevant October 9 measures. Do not infer that the separate April 2025 licensing regime was repealed or that every controlled shipment became unrestricted.",
  }),
  candidate({
    id: "lead-2025-mofcom-civilian-export-approvals",
    title: "MOFCOM press conference on rare-earth export applications",
    url: "https://english.mofcom.gov.cn/News/PressConference/art/2025/art_7d3eae80167d444ca436251d7790fabf.html",
    publisher: "Ministry of Commerce of the People's Republic of China",
    publishedAt: "2025-12-04",
    contentType: "primary",
    topics: [
      "rare-earth-elements",
      "export-licenses",
      "civilian-use",
      "china",
      "official-claims",
    ],
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-09-24",
    notes:
      "Official position that compliant civilian-use applications were being promptly approved. The statement does not supply a case-level licensing dataset, processing-time distribution, denial rate, or shipment completion evidence.",
  }),
  candidate({
    id: "lead-2026-china-eu-critical-materials-dialogue",
    title:
      "China-EU joint statement on export-control communication and critical-material trade flows",
    url: "https://english.mofcom.gov.cn/News/SignificantNews/art/2026/art_f0f785c9785344dd98e2ee93d6a31d7e.html",
    publisher: "Ministry of Commerce of the People's Republic of China",
    publishedAt: "2026-06-29",
    contentType: "primary",
    topics: [
      "china-eu",
      "critical-materials",
      "export-controls",
      "trade-flows",
      "diplomacy",
    ],
    translationStatus: "publisher-translation",
    nextReviewAt: "2026-09-24",
    notes:
      "Official account of an agreed monitoring and data mechanism plus continuing dialogue. It proves the announced mechanism and diplomatic position, not frictionless shipments or mutually verified implementation outcomes.",
  }),
  candidate({
    id: "lead-2026-reuters-china-us-rare-earth-shipments",
    title:
      "China rare-earth firms halt some U.S. shipments over geopolitical worries, sources say",
    url: "https://www.reuters.com/business/aerospace-defense/china-rare-earth-firms-halt-some-us-shipments-over-geopolitical-worries-sources-2026-09-04/",
    publisher: "Reuters",
    publishedAt: "2026-09-04",
    contentType: "reporting",
    topics: [
      "rare-earth-elements",
      "united-states",
      "shipments",
      "export-licenses",
      "geopolitics",
    ],
    accessStatus: "restricted",
    nextReviewAt: "2026-09-24",
    notes:
      "Timely reporting lead based on unnamed industry sources about some suppliers and U.S. shipments. Direct publisher full text was unavailable during intake; the total scale, product mix, company identities, license state, and whether the behavior persists remain unverified.",
  }),
  candidate({
    id: "lead-2026-ap-us-rare-earth-defense-supply",
    title:
      "The U.S. is racing to build rare-earth supply chains for defense uses",
    url: "https://apnews.com/article/trump-critical-minerals-defense-iran-war-china-df2b6c0f5fdd8b26143ce332336f6489",
    publisher: "Associated Press",
    publicationYear: 2026,
    contentType: "reporting",
    topics: [
      "rare-earth-elements",
      "defense",
      "united-states",
      "processing",
      "industrial-policy",
    ],
    notes:
      "Ground reporting on U.S. and European processing and magnet projects. Treat announced future capacity, qualification schedules, and company projections as claims or plans rather than operating replacement supply.",
  }),
  candidate({
    id: "lead-2026-ap-brazil-critical-minerals-framework",
    title: "Brazil's Senate advances a critical-minerals framework",
    url: "https://apnews.com/article/brazil-minerals-rare-earths-politics-23c269b2738ded4a6c4cd2f696f83102",
    publisher: "Associated Press",
    publishedAt: "2026-09-03",
    contentType: "reporting",
    topics: [
      "critical-minerals",
      "brazil",
      "legislation",
      "industrial-policy",
      "environmental-rights",
    ],
    nextReviewAt: "2026-09-24",
    notes:
      "Current reporting on a Senate-approved framework headed to Brazil's president, including financing, tax, screening, environmental, and Indigenous-rights questions. Do not describe the bill as enacted until final legal status is confirmed.",
  }),
  candidate({
    id: "lead-2026-ap-china-sanctions-us-defense-firms",
    title:
      "China imposes sanctions and dual-use export restrictions on U.S. defense firms",
    url: "https://apnews.com/article/china-us-sanctions-military-defense-tech-dualuse-1aebe98718e127365859b0fb0b63d07b",
    publisher: "Associated Press",
    publishedAt: "2026-06-22",
    contentType: "reporting",
    topics: [
      "china",
      "united-states",
      "sanctions",
      "dual-use-exports",
      "defense",
    ],
    notes:
      "Reports restrictions naming U.S. companies including rare-earth firms. Preserve the analyst caveat that some measures may be symbolic and verify the operative legal instruments and observable commercial effects before claiming supply interruption.",
  }),
  candidate({
    id: "lead-2026-csis-rare-earth-restrictions-one-year",
    title: "Rare earth export restrictions, one year later",
    url: "https://www.csis.org/analysis/rare-earth-export-restrictions-one-year-later",
    publisher: "Center for Strategic and International Studies",
    publishedAt: "2026-04-27",
    contentType: "analysis",
    topics: [
      "rare-earth-elements",
      "export-controls",
      "china",
      "customs-data",
      "supply-chains",
    ],
    notes:
      "Policy analysis combining customs figures and market interpretation. Use its argument as a viewpoint and trace numerical claims back to Chinese customs, company, and government records before publication.",
  }),
  candidate({
    id: "lead-2026-rusi-china-rare-earth-supply-chain",
    title: "China and the rare earths supply chain",
    url: "https://static.rusi.org/china-and-rare-earths-supply-chain-june-2026.pdf",
    publisher: "Royal United Services Institute",
    publishedAt: "2026-06-01",
    contentType: "research",
    topics: [
      "rare-earth-elements",
      "mine-to-magnet",
      "china",
      "customs-data",
      "diversification",
    ],
    notes:
      "Detailed mine-to-magnet research paper with customs charts and alternative-facility discussion. Licensed CC BY-NC-ND 4.0, so link and cite rather than adapting its charts; distinguish interviews and company plans from verified operating capacity.",
  }),
  candidate({
    id: "lead-2026-doe-critical-minerals-award-negotiations",
    title:
      "DOE selects $134 million in projects to bolster domestic critical-minerals supply chains",
    url: "https://www.energy.gov/cmei/articles/does-office-critical-minerals-and-energy-innovation-announces-134-million-bolster",
    publisher: "U.S. Department of Energy",
    publishedAt: "2026-06-02",
    contentType: "primary",
    topics: [
      "critical-minerals",
      "united-states",
      "processing",
      "demonstration-projects",
      "funding",
    ],
    notes:
      "Official project-selection announcement covering proposed Louisiana and New Hampshire demonstration work. Selection for award negotiations is not an issued award, completed project, operating plant, or demonstrated commercial capacity.",
  }),
];
