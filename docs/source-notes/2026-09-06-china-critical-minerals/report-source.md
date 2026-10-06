# From Mine to Magnet: China’s Critical-Minerals Leverage

Research date: 2026-09-06

Audience: Mainland Dispatch editorial and product team

Status: internal research brief; not a verified Dispatch

Source-lead collection: `china-critical-minerals-2026-09-06`

## Direct answer

The strongest version of the idea is not “a map of all the rare minerals China owns.” It is an interactive explanation of **where leverage sits between a mineral occurrence and a finished high-performance magnet**—and which parts of that chain U.S. buyers can or cannot replace.

That distinction matters because “critical minerals” and “rare earths” are not synonyms. The 2025 U.S. list contains 60 critical minerals, including 15 individually listed rare-earth elements; each has a different supply chain and risk profile. ([USGS critical-minerals list](https://www.usgs.gov/media/images/2025-list-critical-minerals))

For a first feature, narrow the scope to magnet rare earths: neodymium and praseodymium, with dysprosium and terbium for high-temperature performance, plus samarium where defense and aerospace uses make it relevant. The International Energy Agency (IEA) estimates that permanent magnets account for about 95% of rare-earth consumption by value. ([IEA rare-earth report](https://www.iea.org/reports/rare-earth-elements/executive-summary))

The core story is **mine-to-magnet concentration**, not scarcity alone. For 2024, the IEA estimates China held about 60% of mined magnet-rare-earth output, 91% of separated and refined output, and 94% of sintered permanent-magnet manufacturing. Those stage-by-stage shares are a much clearer explanation of leverage than a single map of deposits. ([IEA rare-earth report](https://www.iea.org/reports/rare-earth-elements/executive-summary))

## Recommended editorial question

> Where, exactly, does China’s leverage enter the rare-earth magnet supply chain—and what would it take for the United States and its partners to replace each stage?

Working title: **From Mine to Magnet**

Deck: **A deposit is not a supply chain. Follow five rare-earth elements through mining, separation, metal and alloy production, magnet manufacturing, trade controls, and the projects trying to build alternatives.**

This is a geopolitics story because the supply chain connects Chinese industrial capacity, export licensing, U.S. defense and manufacturing demand, allied diversification, environmental tradeoffs, and the gap between an announced project and qualified commercial production.

## What the evidence supports

### 1. China’s advantage is deepest in the middle of the chain

Rare-earth ore is not directly usable in a motor or guidance system. The relevant chain is:

`occurrence → mine/concentrate → separation/refining → metal/alloy → magnet → qualified component`

China’s estimated share rises sharply after mining, from roughly 60% of mined magnet rare earths to 91% of separated and refined supply and 94% of sintered permanent magnets in 2024. The IEA also says demand for magnet rare earths doubled from 2015 to 2025 and could rise by roughly another third by 2030. ([IEA rare-earth report](https://www.iea.org/reports/rare-earth-elements/executive-summary))

This supports a map with separate, filterable supply-chain stages. It does **not** support turning all geologic occurrences into mine symbols or all processing facilities into interchangeable producers.

### 2. China has enough mapped industrial geography for a serious spatial feature

A June 2026 U.S. Geological Survey (USGS) report inventories 932 mines and quarries and 1,506 mineral-processing plants across China. Its commodity tables include 15 rare-earth mines and 15 rare-earth smelters, and the report discusses major sites in Inner Mongolia, Jiangxi, and Sichuan. Most reported production and capacity observations are from 2023, so this is a historical industrial baseline rather than live operating status. ([USGS China report](https://pubs.usgs.gov/publication/ofr20261018/full))

The companion China geodatabase is released under CC0 and includes facilities, deposits, exploration sites, selected permissive tracts, ports, and related infrastructure. It is the best candidate for source custody because it preserves distinct record types instead of implying that every point is equivalent. ([USGS China GIS release](https://www.usgs.gov/data/compilation-geospatial-data-gis-mineral-industries-and-related-infrastructure-peoples-republic))

### 3. “What the U.S. needs” must be answered product by product

USGS estimated 2025 U.S. net import reliance for rare-earth compounds and metals at 67%, with China, Malaysia, Estonia, and Japan as leading import sources over 2021–2024. This is an aggregate commodity measure; it is not a universal dependency rate for every rare-earth element, magnet, component, or defense program. ([USGS Mineral Commodity Summaries 2026](https://pubs.usgs.gov/publication/mcs2026))

The U.S. Census international-trade API can support monthly product-by-country views, but only after validating the current Harmonized Tariff Schedule code, unit, country attribution, and product boundary. A code for sintered neodymium-iron-boron magnets cannot stand in for all rare-earth materials. ([U.S. Census imports API](https://api.census.gov/data/timeseries/intltrade/imports/hs.html))

### 4. Export control is a timeline, not a binary on/off state

China’s April 4, 2025 measure placed specified samarium-, gadolinium-, terbium-, dysprosium-, lutetium-, scandium-, and yttrium-related items under export licensing. It was not a blanket ban on all rare earths. ([MOFCOM Announcement No. 18](https://english.mofcom.gov.cn/Policies/AnnouncementsOrders/art/2025/art_0dd87cbee7b045bf93fabe6ab2faceee.html))

China later suspended relevant measures announced on October 9, 2025 for one year; that suspension should not be silently applied to the separate April licensing regime. ([State Council suspension notice](https://english.www.gov.cn/news/202510/30/content_WS69032059c6d00ca5f9a072fe.html))

MOFCOM stated in December 2025 that compliant civilian-use applications were being promptly approved, but the statement does not provide case-level license counts, timing distributions, denial rates, or proof of completed delivery. ([MOFCOM press conference](https://english.mofcom.gov.cn/News/PressConference/art/2025/art_7d3eae80167d444ca436251d7790fabf.html))

On June 29, 2026, China and the European Union announced a monitoring and data mechanism for relevant trade flows. The statement establishes diplomatic intent and a proposed mechanism, not frictionless shipment performance. ([China–EU statement](https://english.mofcom.gov.cn/News/SignificantNews/art/2026/art_f0f785c9785344dd98e2ee93d6a31d7e.html))

Current Reuters reporting says some Chinese suppliers declined U.S.-bound rare-earth shipments despite licenses, citing unnamed industry sources. Reuters also said it could not determine the total number of firms involved. The publisher page was inaccessible during this intake, so this remains a high-value reporting lead rather than source-read evidence. ([Reuters, September 4, 2026](https://www.reuters.com/business/aerospace-defense/china-rare-earth-firms-halt-some-us-shipments-over-geopolitical-worries-sources-2026-09-04/))

Together, these sources support a time slider with separate event types: `rule announced`, `rule effective`, `license required`, `measure suspended`, `government claim`, and `observed shipment`. They do not support one red “China banned rare earths” band.

### 5. Diversification is real, but announced capacity is not replacement supply

The IEA estimates that, outside China, planned 2035 capacity would cover only about half of projected mining needs, one quarter of refining needs, and less than one fifth of magnet-manufacturing needs. These are modeled projections based on announced projects, not guaranteed supply. ([IEA rare-earth report](https://www.iea.org/reports/rare-earth-elements/executive-summary))

The U.S. Department of Energy announced $134 million in project selections in June 2026, including proposed rare-earth processing demonstrations in Louisiana and New Hampshire. DOE explicitly describes the projects as selected for award negotiations, not issued awards or completed plants. ([DOE selection announcement](https://www.energy.gov/cmei/articles/does-office-critical-minerals-and-energy-innovation-announces-134-million-bolster))

Associated Press reporting adds ground-level context on U.S. and European processing projects, but future capacity figures and schedules remain company claims until facilities are financed, built, commissioned, producing, and qualified by customers. ([AP on U.S. supply-chain projects](https://apnews.com/article/trump-critical-minerals-defense-iran-war-china-df2b6c0f5fdd8b26143ce332336f6489))

Australia and Canada provide useful official comparison layers. Australia’s service distinguishes operating mines, developing projects, care-and-maintenance sites, and deposits as of December 2025; Canada distinguishes active mines, advanced projects, and processing facilities. Those status vocabularies should survive ingestion. ([Geoscience Australia map service](https://services.ga.gov.au/gis/rest/services/AustralianCriticalMineralsOperatingMinesAndDeposits/MapServer), [Natural Resources Canada dataset](https://open.canada.ca/data/en/dataset/22b2db8a-dc12-47f2-9737-99d3da921751?res_page=1))

Brazil is a valuable counterpoint, but geological potential and legislation are both pre-production signals. Brazil’s geological survey publishes a rare-earth potential map for the Ribeira and Brasília belts, while September 2026 AP reporting says a new critical-minerals framework had passed the Senate and was headed to the president. Neither fact alone proves near-term alternative supply. ([Geological Survey of Brazil map](https://rigeo.sgb.gov.br/items/eed2b7e4-5acc-4e1f-a1c2-f4836ba7e9f8), [AP on Brazil’s framework](https://apnews.com/article/brazil-minerals-rare-earths-politics-23c269b2738ded4a6c4cd2f696f83102))

## Proposed interactive

### Act 1: “The dots are not the story”

Open with global rare-earth occurrences. Let the reader toggle between `occurrence`, `deposit`, `operating mine`, and `processing facility`. The visual lesson is immediate: geological presence does not equal usable supply.

Use the USGS global occurrence database as the canonical source. It describes more than 3,100 spatial records plus more than 800 nonspatial records and cites more than 1,590 references, but these are geological records—not a current operating-mine directory. ([USGS global occurrence database](https://www.usgs.gov/data/global-rare-earth-element-occurrence-database))

The related ArcGIS feature layer returned 577 features during intake and reported a transfer limit. That count does not match the full data-release description. Treat the service as a preview or convenience endpoint until record scope and pagination are reconciled. ([USGS hosted feature layer](https://energy.usgs.gov/arcgis/rest/services/Hosted/Rare_earth_element_deposits/FeatureServer/0))

### Act 2: “Follow the chain”

Zoom to the five-stage magnet chain. Give each record exactly one primary stage and allow secondary functions only when the source supports them:

1. mine and concentrate;
2. separation and refining;
3. metal and alloy;
4. magnet manufacturing;
5. component qualification and end use.

The stage-share ribbon should update beside the map. It can show the IEA’s 2024 China concentration estimates, with the year and source always visible. It should never blend shares from different measurement years without labeling them.

### Act 3: “A license is not a shipment”

Add a 2025–2026 policy and trade timeline. Each event needs a status and evidence type. The reader should be able to compare an announced legal rule with monthly customs flows and later reporting.

China Customs is the primary source entry point for monthly export data, but each series needs exact commodity-code, unit, partner, revision, and retrieval metadata. Aggregate rare-earth tonnage should not be labeled “magnets.” ([China Customs Statistics](https://english.customs.gov.cn/Statistics/Statistics))

The OECD export-restrictions inventory is valuable historical context through 2024, but its stated scope and exclusions mean it cannot establish the live legal position of 2025–2026 China-specific controls. ([OECD 2026 inventory](https://www.oecd.org/en/publications/oecd-inventory-of-export-restrictions-on-critical-raw-materials-2026_d5ca8f62-en.html))

### Act 4: “What could replace it?”

Show U.S., Australian, Canadian, Brazilian, European, and other projects by **verified stage and current status**, not by nationality alone. Let the reader filter `operating`, `commissioning`, `under construction`, `award negotiation`, `planned`, `care and maintenance`, `deposit`, and `geological potential`.

The USGS released a U.S. dataset in August 2026 covering more than 800 mining, processing, smelting, refining, and recycling facilities across more than 60 commodities. It is suitable for comparison only if facility presence is kept separate from production, capacity, and qualification. ([USGS U.S. facilities dataset](https://www.usgs.gov/data/mines-smelters-refineries-and-recycling-facilities-united-states))

### Act 5: “Stress test the chain”

A final scenario view may allow a reader to remove one country or stage. It must be labeled as a counterfactual, not a forecast. The IEA’s full-control exposure estimates are modeled scenarios rather than observed losses. ([IEA Global Critical Minerals Outlook 2026](https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary), [USGS 2025-list methodology](https://pubs.usgs.gov/publication/ofr20251047/full))

## Minimum defensible data model

Every plotted or charted record should retain:

| Field | Purpose |
| --- | --- |
| `source_id` and `source_url` | Exact origin and claim custody |
| `source_updated_at` and `retrieved_at` | Distinguish publisher vintage from our intake date |
| `record_type` | `occurrence`, `deposit`, `mine`, `processor`, `refiner`, `metal_alloy`, `magnet`, `recycler`, or `project` |
| `operating_status` | Source-native status plus a documented normalized value |
| `commodity` and `product` | Keep an element, oxide, metal, alloy, magnet, and component distinct |
| `capacity`, `unit`, and `capacity_year` | Prevent unit and vintage drift |
| `production`, `unit`, and `production_year` | Do not substitute capacity for output |
| `latitude`, `longitude`, and `location_precision` | Preserve whether coordinates are exact, approximate, or regional |
| `evidence_date` | Date the status or measurement actually describes |
| `claim_status` | `reported`, `officially_announced`, `implemented`, `independently_observed`, `contested`, or `superseded` |
| `limitations` | Visible warning for inference, licensing, access, or source gaps |

## Claim and gap register

| Proposed claim or feature | Current evidence | Confidence | Gap before publication |
| --- | --- | --- | --- |
| China’s leverage intensifies from mining to magnet manufacturing | IEA 2024 stage shares | High for sourced estimates | Read and archive the complete report tables; preserve definitions and year |
| China has a mappable industrial network | USGS China report and CC0 geodatabase | High for the published inventory | Recheck current operating status and reconcile facility duplicates |
| The U.S. is 67% net-import-reliant for rare-earth compounds and metals | USGS MCS 2026 | High for the aggregate | Build product- and element-level views; do not generalize the aggregate |
| April 2025 controls created a licensing regime for specified items | MOFCOM announcement | High for the legal announcement | Confirm live amendments, implementing guidance, and the controlling Chinese text |
| Some licensed U.S. shipments are reportedly being declined | Reuters, unnamed sources | Medium-low | Direct source access, company confirmation, customs evidence, and scale |
| Alternative projects can replace China | IEA scenarios, DOE selections, AP reporting | Low as a blanket claim | Project-by-project finance, construction, commissioning, output, and qualification evidence |
| Global occurrences show where new supply can emerge | USGS geology data | Medium for occurrence location; low for supply | Reserves, metallurgy, economics, permits, infrastructure, and timeline |
| Export-control events can be compared with trade flows | Government instruments and customs systems | Medium | Stable commodity-code crosswalk, revisions, licenses, inventories, and shipment lags |
| Diversification is environmentally and socially neutral | No | Unsupported | Add primary permitting, waste, water, labor, Indigenous-rights, and community evidence |

## Source-role rules

- **Primary geospatial/data sources** establish what a dataset records, its vintage, geometry, units, and license. They do not automatically establish live operations.
- **Official policy sources** establish what a government announced or formally published. They do not prove implementation outcomes or the truth of broader official claims.
- **Reporting** supplies current observations, interviews, and ground context. Anonymous sourcing and inaccessible full text must remain visible limitations.
- **Analysis and research** supply models, synthesis, and scenarios. Their assumptions and licenses must travel with any reused number or visual.
- **Company and project announcements**, when later added, must be labeled as company claims until independently verified.

## Publication and reuse constraints

- Keep this collection in the private source-lead inbox. All 29 entries are `withheld`, `metadata-checked`, and `unverified`; none is attached to a public Dispatch.
- The IEA pages indicate CC BY 4.0 reuse. Preserve attribution and the report date when adapting data.
- The USGS China and global geospatial releases are marked CC0. Preserve source identifiers anyway for reproducibility.
- The RUSI report is CC BY-NC-ND 4.0. Link and quote within fair-use limits; do not redraw or adapt its charts as if they were our data.
- Confirm the current Canadian and Brazilian dataset licenses before storing or redistributing transformed geometry.
- Store immutable downloaded source bytes, checksums, retrieval timestamps, and transformation receipts before public map generation.

## Complete source ledger

The typed intake is the machine-checked link inventory. This table records the editorial role of every admitted link.

| ID | Source | Role and principal limitation |
| --- | --- | --- |
| `lead-2026-usgs-china-mineral-industries` | [USGS China report](https://pubs.usgs.gov/publication/ofr20261018/full) | China facilities and production context; mostly 2023 observations |
| `lead-2023-usgs-china-mineral-industries-gis` | [USGS China GIS release](https://www.usgs.gov/data/compilation-geospatial-data-gis-mineral-industries-and-related-infrastructure-peoples-republic) | CC0 facility/deposit/infrastructure custody source; mixed record types |
| `lead-2022-usgs-global-rare-earth-occurrences` | [USGS global occurrence database](https://www.usgs.gov/data/global-rare-earth-element-occurrence-database) | Global geology; not operating status or reserves |
| `lead-usgs-rare-earth-feature-service` | [USGS hosted feature layer](https://energy.usgs.gov/arcgis/rest/services/Hosted/Rare_earth_element_deposits/FeatureServer/0) | GeoJSON convenience endpoint; 577-feature/full-release mismatch |
| `lead-2026-usgs-us-mineral-facilities` | [USGS U.S. facilities dataset](https://www.usgs.gov/data/mines-smelters-refineries-and-recycling-facilities-united-states) | U.S. comparison facilities; presence is not output |
| `lead-2025-usgs-critical-minerals-atlas` | [USGS Critical Minerals Atlas](https://www.usgs.gov/tools/critical-minerals-atlas) | Country-level 2023 context; not live facilities |
| `lead-2025-geoscience-australia-critical-minerals-mapserver` | [Geoscience Australia service](https://services.ga.gov.au/gis/rest/services/AustralianCriticalMineralsOperatingMinesAndDeposits/MapServer) | Status-separated official layers; December 2025 vintage |
| `lead-2026-canada-critical-minerals-map` | [Natural Resources Canada dataset](https://open.canada.ca/data/en/dataset/22b2db8a-dc12-47f2-9737-99d3da921751?res_page=1) | Mines, advanced projects, and processing; confirm reuse terms |
| `lead-2025-sgb-brazil-rare-earth-potential` | [Geological Survey of Brazil map](https://rigeo.sgb.gov.br/items/eed2b7e4-5acc-4e1f-a1c2-f4836ba7e9f8) | Geological potential; not operating supply |
| `lead-china-customs-statistics` | [China Customs Statistics](https://english.customs.gov.cn/Statistics/Statistics) | Official monthly-trade entry point; code and unit work required |
| `lead-2026-usgs-mineral-commodity-summaries` | [USGS MCS 2026](https://pubs.usgs.gov/publication/mcs2026) | Annual U.S. and global mineral baseline; aggregate definitions matter |
| `lead-2026-usgs-mineral-commodity-summaries-data` | [USGS MCS data release](https://data.usgs.gov/datacatalog/data/USGS%3A69837e43b66b01367d7ec7c7) | Machine-readable tables; preserve withheld and revision markers |
| `lead-2025-usgs-critical-minerals-list` | [USGS 2025 critical-minerals list](https://www.usgs.gov/media/images/2025-list-critical-minerals) | Vocabulary and U.S. policy scope; not common supply-chain evidence |
| `lead-2025-usgs-critical-minerals-methodology` | [USGS methodology](https://pubs.usgs.gov/publication/ofr20251047/full) | Economic-risk and trade-code method; scenarios are not losses |
| `lead-census-international-trade-imports-api` | [U.S. Census imports API](https://api.census.gov/data/timeseries/intltrade/imports/hs.html) | Monthly U.S. imports; current product-code mapping required |
| `lead-2026-iea-rare-earth-elements` | [IEA rare-earth report](https://www.iea.org/reports/rare-earth-elements/executive-summary) | Mine-to-magnet concentration and scenarios; model assumptions apply |
| `lead-2026-iea-critical-minerals-outlook` | [IEA 2026 outlook](https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary) | Wider critical-minerals concentration and risk scenarios |
| `lead-2026-oecd-export-restrictions-inventory` | [OECD restrictions inventory](https://www.oecd.org/en/publications/oecd-inventory-of-export-restrictions-on-critical-raw-materials-2026_d5ca8f62-en.html) | Historical policy data through 2024; not live 2026 law |
| `lead-2025-mofcom-rare-earth-export-controls` | [MOFCOM April measure](https://english.mofcom.gov.cn/Policies/AnnouncementsOrders/art/2025/art_0dd87cbee7b045bf93fabe6ab2faceee.html) | Official licensing measure; not a blanket ban |
| `lead-2025-china-october-export-control-suspension` | [State Council suspension notice](https://english.www.gov.cn/news/202510/30/content_WS69032059c6d00ca5f9a072fe.html) | Suspension of specified October measures; April regime distinct |
| `lead-2025-mofcom-civilian-export-approvals` | [MOFCOM approval statement](https://english.mofcom.gov.cn/News/PressConference/art/2025/art_7d3eae80167d444ca436251d7790fabf.html) | Official implementation claim; no case-level data |
| `lead-2026-china-eu-critical-materials-dialogue` | [China–EU statement](https://english.mofcom.gov.cn/News/SignificantNews/art/2026/art_f0f785c9785344dd98e2ee93d6a31d7e.html) | Announced monitoring mechanism; outcome not proved |
| `lead-2026-reuters-china-us-rare-earth-shipments` | [Reuters shipment report](https://www.reuters.com/business/aerospace-defense/china-rare-earth-firms-halt-some-us-shipments-over-geopolitical-worries-sources-2026-09-04/) | Timely unnamed-source reporting; direct page restricted |
| `lead-2026-ap-us-rare-earth-defense-supply` | [AP on U.S. projects](https://apnews.com/article/trump-critical-minerals-defense-iran-war-china-df2b6c0f5fdd8b26143ce332336f6489) | Ground reporting; future capacity remains claimed |
| `lead-2026-ap-brazil-critical-minerals-framework` | [AP on Brazil](https://apnews.com/article/brazil-minerals-rare-earths-politics-23c269b2738ded4a6c4cd2f696f83102) | Senate action and tradeoffs; final legal status pending |
| `lead-2026-ap-china-sanctions-us-defense-firms` | [AP on China’s sanctions](https://apnews.com/article/china-us-sanctions-military-defense-tech-dualuse-1aebe98718e127365859b0fb0b63d07b) | Reported firm-level controls; commercial effect uncertain |
| `lead-2026-csis-rare-earth-restrictions-one-year` | [CSIS analysis](https://www.csis.org/analysis/rare-earth-export-restrictions-one-year-later) | Interpretation and customs synthesis; trace figures to primaries |
| `lead-2026-rusi-china-rare-earth-supply-chain` | [RUSI research paper](https://static.rusi.org/china-and-rare-earths-supply-chain-june-2026.pdf) | Detailed synthesis; non-derivative license and mixed evidence types |
| `lead-2026-doe-critical-minerals-award-negotiations` | [DOE selection announcement](https://www.energy.gov/cmei/articles/does-office-critical-minerals-and-energy-innovation-announces-134-million-bolster) | Official project status; selection is not an award or plant |

## Stopping point and next bounded step

The research pass stopped after primary coverage existed for the five required layers—geology, facilities, production/import dependence, legal controls, and alternative projects—and additional sources mostly repeated the same claims without resolving the identified gaps.

The next bounded product step is a **data-spike, not a public article**:

1. download and checksum the CC0 USGS China and global datasets;
2. produce a transformation receipt and a 20-record sample using the minimum data model;
3. reconcile the 577-feature hosted-service result with the full occurrence release;
4. draft an HTS/Chinese customs-code crosswalk for NdFeB magnets and the five scoped elements;
5. prototype two map states—`occurrence` and `operating/processing facility`—with visible source year and status;
6. return for claim-level evidence review before any record enters `publishedDispatches`.
