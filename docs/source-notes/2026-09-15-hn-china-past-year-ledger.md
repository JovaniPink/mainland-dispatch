# HN China past-year discovery ledger

- **Snapshot:** September 15, 2026
- **Collection:** `china-hn-past-year-2026-09-15`
- **Project:** `mainland-dispatch`
- **Audience:** Mainland Dispatch editorial research
- **Owner:** Jovani Pink
**Publication state:** Withheld

## Research question and decision

Which links in the first seven popularity-ranked pages of the HN Algolia
past-year search for `China` are strong enough to enter editorial research
custody for Mainland Dispatch?

The pass screened all 140 ranked results represented by pages 0 through 6. It
retained 78 new original-publisher links, recognized 14 links already in the
catalog, excluded 46 links, and excluded 2 HN-only stories. Every retained
record remains metadata-checked, unverified, withheld, and without a
`dispatchId`.

HN is the discovery index, not the evidence authority. Popularity, points, and
comment volume can reveal reader interest or contested framing, but do not
establish truth, importance, representativeness, or publication quality.

## Snapshot method

- Search: `China`
- Type: story
- Sort: popularity
- Range: past year
- Pages: 0 through 6
- Retrieval: official HN Algolia search API
- Returned search population: 3,475 matches, subject to Algolia's result cap
- Screened population: the first 140 ranked hits, matching seven 20-hit pages
- External links: 138
- HN-only stories: 2
- Exact or normalized catalog duplicates: 14
- New links admitted: 78
- New links excluded: 46

The rolling past-year cutoff was represented as an Algolia `created_at_i`
filter during retrieval. HN submission timestamps are discovery metadata, not
publisher publication dates. The batch therefore preserves only the year until
the complete publisher page is source-read.

## Intake groups

| Proposed private note | Records | Storytelling use | Required verification |
| --- | ---: | --- | --- |
| `mainland-dispatch:note:hn-china-2026-09-15-technology-ai` | 18 | Open models, chips, data centers, platform governance, and the AI competition narrative | Technical artifacts, primary policy text, company records, comparable benchmarks, and observed implementation |
| `mainland-dispatch:note:hn-china-2026-09-15-security-diplomacy` | 17 | Taiwan, foreign influence, data security, alliance choices, and bilateral diplomacy | Attribution, jurisdiction, chronology, official records, independent corroboration, and observed outcomes |
| `mainland-dispatch:note:hn-china-2026-09-15-trade-industry` | 13 | Tariffs, EVs, semiconductors, soybeans, industrial policy, and supply chains | Effective legal instruments, compatible trade units, company filings, customs data, and policy dates |
| `mainland-dispatch:note:hn-china-2026-09-15-climate-energy` | 8 | Renewable scale, emissions, coal, oil, refining, and climate diplomacy | Periods, units, baselines, model methods, revisions, and primary energy or environmental data |
| `mainland-dispatch:note:hn-china-2026-09-15-society-culture` | 8 | Digital life, migration, demographics, memory, transport, and online culture | Population and regional context, policy records, historical evidence, and bounded treatment of individual narratives |
| `mainland-dispatch:note:hn-china-2026-09-15-economy-society` | 6 | Gig work, housing, living conditions, market narratives, and social consequences | Denominators, real versus nominal values, local versus national scope, and compatible periods |
| `mainland-dispatch:note:hn-china-2026-09-15-science-infrastructure` | 5 | Spaceflight, satellites, public science funding, and research capacity | Original research or mission records, schedules, funding definitions, and observed results |
| `mainland-dispatch:note:hn-china-2026-09-15-governance-rights` | 3 | Platform enforcement, fraud, censorship systems, and state authority | Controlling records, legal status, allegation versus finding, enforcement evidence, and remedies |

These proposed note IDs are research groupings only. They are not added to the
public knowledge index.

## Access and redirect audit

| State | Records | Meaning at intake |
| --- | ---: | --- |
| Reachable | 47 | The publisher endpoint returned usable success status; the complete page was not source-read |
| Paywalled | 12 | Lawful full-text review requires publisher access |
| Restricted | 18 | The endpoint returned an automated access restriction, including Reuters, AP, CNBC, and other protected publishers |
| Unstable | 1 | The China on China endpoint failed the TLS transport check and needs a later recheck |

Three supplied URLs redirected and the resolved publisher URLs are preserved:

- [Sixth Tone QR-code reporting](https://www.sixthtone.com/news/1018752)
- [Sinocities data-center field report](https://sinocities.org/p/chinas-data-center-boom-a-view-from)
- [The Register report on Polish military-base restrictions](https://www.theregister.com/security/2026/02/19/poland-bans-chinese-cars-from-military-bases/4879278)

The Koi AI link was excluded after it redirected to a generic Palo Alto Networks
product page rather than preserving the discovered article. A replacement
record should be created only if the original research or a stable article URL
is recovered.

## High-value narrative constellations

### Open models, chips, and technology power

The intake preserves distinct evidence roles rather than treating an AI-race
headline as a single score. Useful starting points include the
[Reuters DUV equipment report](https://www.reuters.com/world/china/china-starts-production-home-grown-immersion-duv-chipmaking-tools-source-2026-07-28/),
[Nikkei's ASML investigation](https://nikkei.shorthandstories.com/can-china-build-its-own-asml/),
[Reuters on domestic chip-equipment requirements](https://www.reuters.com/world/china/china-mandates-50-domestic-equipment-rule-chipmakers-sources-say-2025-12-30/),
[Noema on open-model soft power](https://www.noemamag.com/chinas-open-ai-models-are-advancing-its-global-soft-power/),
and [Pew's cross-national opinion study](https://www.pewresearch.org/global/2026/07/15/people-in-many-countries-now-view-china-more-positively-than-the-u-s/).
Reporting about capability, production, access restrictions, adoption, and
international sentiment must remain separate measures.

### Climate scale and energy leverage

[Yale Environment 360's renewable-buildout photographs](https://e360.yale.edu/digest/china-renewable-photo-essay),
[Carbon Brief's 21-month emissions analysis](https://www.carbonbrief.org/analysis-chinas-co2-emissions-have-now-been-flat-or-falling-for-21-months/),
[Carbon Brief's China-India coal analysis](https://www.carbonbrief.org/analysis-coal-power-drops-in-china-and-india-for-first-time-in-52-years-after-clean-energy-records/),
and [Commodity Context's oil-market argument](https://www.commoditycontext.com/p/public-how-china-saved-the-global-oil-market)
support a richer question about scale, timing, and leverage. Generation capacity,
actual output, emissions, imports, stocks, refining, and market influence are
not interchangeable.

### Industrial competition and bilateral exposure

The [New York Times soybean report](https://www.nytimes.com/2025/09/25/business/china-soybean-sales-farmers.html),
[Reuters customs update](https://www.reuters.com/world/china/china-imports-no-us-soybeans-september-first-time-seven-years-2025-10-20/),
[BBC trade-surplus report](https://www.bbc.com/news/articles/c9wx1v84rzyo),
and [The Wire China's Canada-EV analysis](https://www.thewirechina.com/2025/10/26/canada-set-to-side-with-china-on-evs/)
can support a narrative about adjustment across countries and industries. Each
still needs primary customs, tariff, regulatory, and company evidence.

### Governance, lived experience, and cultural memory

Potentially distinctive narrative material includes
[Asterisk's last-bus story](https://asteriskmag.com/issues/15/chinas-last-bus),
[CNN on the Tang-dynasty internet hoax](https://www.cnn.com/2026/08/19/style/china-tang-dynasty-never-existed-hoax-intl-hnk),
[Sixth Tone on public QR-code fraud](https://www.sixthtone.com/news/1018752),
[AP's housing photo essay](https://apnews.com/photo-gallery/china-property-cheap-housing-abandoned-9f642584aea206204dcfdd10afb25861),
and [BBC on an AI assistant's cultural reception](https://www.bbc.com/news/articles/cy41n17e23go).
These are useful because they connect systems to daily life, but none should be
generalized from a vivid example to a national condition without further work.

## Duplicate and exclusion accounting

Fourteen discoveries were already represented by normalized publisher URLs in
the catalog. They include the existing Werd open-model argument and prior leads
from BBC, SCMP, The Washington Post, CSIS, USNI, Freakonomics, IEEE Spectrum,
The Economist, and independent technical writers. They were not copied into the
new collection.

The 46 newly encountered exclusions fall into five bounded classes:

1. **Duplicate coverage:** alternate Reuters paths or duplicate submissions for
   the same chip story; secondary versions of the Meta-Manus, hidden-door-handle,
   Pew opinion, emissions, tariff, Arctic, rocket, and trade-war stories.
2. **Non-canonical or lost destination:** the generic Substack inbox URL and the
   Koi link that now resolves to an unrelated vendor page.
3. **Weak provenance or sensational framing:** unsupported intelligence,
   hypersonic, IQ, surveillance-state, and geopolitical claims whose supplied
   pages do not provide a sufficient authority chain for intake.
4. **Thin aggregation:** product, travel, automotive, infrastructure, or science
   rewrites where a stronger retained source or a primary record should be used.
5. **Limited incremental fit:** broad opinion or community pages that add little
   beyond stronger retained reporting, research, or an existing source lead.

The two HN-only posts, stories `47708842` and `49196904`, have no independent
publisher destination. They are excluded from the source catalog. Their threads
may be reviewed later only as question-generation context.

## HN discussion boundary

HN comments are not evidence for factual claims. If a later Notebook uses a
thread to understand reader uncertainty, it should record only substantive,
caveated, checkable questions or counterarguments. It should not quote usernames,
infer representativeness, or convert community consensus into a reported fact.

## Unresolved questions

- Which retained reports expose named primary documents or datasets that should
  replace or accompany the reporting link?
- Which paywalled or restricted records can Jovani lawfully review in full?
- Which competing stories use incompatible periods, populations, units, or
  definitions?
- Which distinctive cultural narratives have enough regional and historical
  context to avoid national overgeneralization?
- Can a stable original destination be recovered for the Koi security report?
- Does the unstable China on China endpoint recover, redirect, or require a
  replacement record?

## Promotion and correction rule

Public projection is empty. Promotion requires a complete source read,
claim-level corroboration, primary records where available, translation review
where applicable, publication-day link checks, public/private boundary review,
and Jovani's editorial approval.

Corrections append a dated ledger entry. Redirects preserve the old URL as an
alias when the repository gains alias support; a materially different source
receives a distinct replacement record rather than silently rewriting this
snapshot.
