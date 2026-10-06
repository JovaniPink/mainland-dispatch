# Source-link taxonomy

**Version:** `source-taxonomy-v1`
**Status:** Implemented, provisional
**Scope:** The private 526-record source-lead catalog
**Decision owner:** Mainland Dispatch editor
**Classification basis:** Existing repository-owned titles, topics, notes, and
publication dates

## Purpose and authority

This taxonomy makes the private source reservoir easier to browse without
changing what any source can prove. It is a classification layer over the
existing source-lead metadata. The source URL, publisher, date, content type,
review state, evidence status, access status, disposition, and decision reason
remain the authoritative fields for editorial decisions.

The taxonomy is provisional because most records have not passed full source
review. A taxonomy assignment is not an endorsement, a source-quality score, a
canonical-URL check, or publication approval. It never changes `reviewState`,
`evidenceStatus`, `disposition`, `urlStatus`, or `dispatchId`.

## Vocabulary model

| Term | Proposed definition | Evidence and examples | Non-examples | Relationships | Invariant | Authority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Source lead | A private candidate URL retained for editorial review | `SourceLeadSchema`; the Desk inbox | A published Dispatch or Notebook | Has raw topics and one taxonomy object | Presence never makes a source public | Source-lead catalog | Observed |
| Raw topic | A granular, source-specific descriptive tag | `censorship`, `kimi-k3`, `rare-earth-elements` | A controlled top-level family | Supplies classification evidence | At least one remains required | Individual source record | Observed |
| Theme | A controlled, reusable subject family | `technology-digital`, `trade-industry` | Evidence strength or source quality | A lead has one to four themes | Themes are unique | `source-taxonomy-v1` | Implemented, provisional |
| Primary theme | The highest-scoring controlled theme | A mineral atlas can be `trade-industry`; an AI release can be `technology-digital` | The only topic a source may discuss | Must also appear in `themes` | Exactly one per lead | `source-taxonomy-v1` | Implemented, provisional |
| Geographic scope | A controlled place or region explicitly indicated by current metadata | `china-mainland`, `hong-kong`, `united-states`, `global` | Publisher headquarters or legal jurisdiction inferred from a domain | A lead can have several regions | At least one per lead; values are unique | `source-taxonomy-v1` | Implemented, provisional |
| Publication decade | The decade containing `publishedAt` or `publicationYear` | `2000s`, `2010s`, `2020s` | Access date or review date | Derived from publication chronology | Exactly one per lead | Source date metadata | Implemented |
| Taxonomy status | The maturity of the classification assignment | Every current assignment is `provisional` | Source-review status | Independent of evidence and publication state | Cannot imply verification | Taxonomy contract | Implemented |
| Classification method | How the assignment was produced | `existing-metadata-rules` | Full-text semantic review | Records provenance for the assignment | Same version and method on all current leads | Taxonomy contract | Implemented |

## Controlled themes

| Theme | Includes | Excludes |
| --- | --- | --- |
| `governance-law` | Government, regulation, law, rights, censorship, policing, and political institutions | A technical or market claim with no governance dimension |
| `security-geopolitics` | Diplomacy, military affairs, sanctions, intelligence, cyber conflict, and strategic competition | Ordinary commercial competition |
| `economy-finance` | Growth, employment, currency, markets, debt, property, investment, prices, and productivity | A product launch without economic analysis |
| `trade-industry` | Trade, tariffs, manufacturing, supply chains, shipping, semiconductors, critical minerals, and industrial sectors | General macroeconomic conditions without an industry or trade mechanism |
| `technology-digital` | AI, software, hardware, internet systems, platforms, telecommunications, cybersecurity, and data | Technology used only as incidental context |
| `science-health` | Research, medicine, public health, biology, physical science, space, and archaeology | Vendor product claims without a research question |
| `society-culture` | Daily life, media, education, family, migration, labor, religion, sports, arts, and creators | Government policy considered only as an institutional act |
| `environment-resources` | Climate, energy, pollution, conservation, agriculture, minerals, geology, and natural resources | A mineral trade restriction with no resource or environmental dimension |
| `infrastructure-mobility` | Transport, construction, facilities, grids, aviation, shipping infrastructure, and geospatial systems | Supply-chain policy without a physical-system focus |
| `history-memory` | Historical interpretation, archives, collective memory, anniversaries, and heritage | Publication age alone |
| `cross-cutting` | A safe fallback for a future lead that matches no current controlled theme | A substitute for reviewing known vocabulary |

Themes are multi-valued because the same source can connect several editorial
questions. The primary theme is a navigation choice, not a claim that the other
themes are secondary in the source itself.

## Controlled geographic scopes

`china-mainland`, `hong-kong`, `macau`, `taiwan`, `united-states`, `canada`,
`europe`, `asia-pacific`, `africa`, `latin-america`, `middle-east`, and
`global`.

The values describe geographic focus visible in current metadata. They do not
settle sovereignty, publisher location, audience, legal jurisdiction, or the
location of every event mentioned by the source. When current metadata contains
no explicit regional marker, `china-mainland` is the catalog-scope fallback.
That fallback should be reviewed during full source review.

## Classification method

1. Normalize the title, raw topics, and editorial notes.
2. Score controlled theme rules against those fields.
3. Retain up to four matching themes; the highest score is the primary theme.
   Stable rule order resolves ties.
4. Match every explicit controlled geography. Use the catalog-scope fallback
   only when no geography is visible.
5. Derive the decade from the publication year.
6. Validate the completed object through `SourceLeadTaxonomySchema`.

The rules operate on metadata already in custody. They do not fetch, summarize,
or reinterpret external pages.

## Current assignment snapshot

All 526 current source leads have a valid `source-taxonomy-v1` object and none
uses the `cross-cutting` fallback.

| Primary theme | Records |
| --- | ---: |
| Governance and law | 177 |
| Technology and digital systems | 109 |
| Trade and industry | 64 |
| Economy and finance | 63 |
| Security and geopolitics | 48 |
| Science and health | 20 |
| Society and culture | 21 |
| Environment and resources | 15 |
| Infrastructure and mobility | 8 |
| History and memory | 1 |
| **Total** | **526** |

Geographic scopes are multi-valued, so their counts do not sum to 526. The
current assignments are: mainland China 498, United States 73, global 33, Hong
Kong 23, Asia-Pacific 14, Taiwan 8, Europe 7, Canada 5, Latin America 4,
Africa 1, and Middle East 1. No current record explicitly matches Macau.

The publication-decade split is 4 records from the 2000s, 293 from the 2010s,
and 229 from the 2020s.

## Invariants and review needs

- Every source lead has one versioned taxonomy object.
- The primary theme is a member of the lead's unique theme list.
- `cross-cutting`, when needed for a future record, must be the only theme.
- Geographic values are unique and non-empty.
- Every lead has one publication decade.
- Search and filters may use taxonomy metadata only inside the private Desk.
- Taxonomy must never affect public selectors, routes, relations, structured
  data, sitemaps, or publication eligibility.

Known ambiguity remains between geographic focus and project relevance. The
current metadata often names China even when a source is global or bilateral;
multi-value classification preserves those overlaps. Item-level source review
may correct a region or theme, but a future manual override should record who
reviewed it, when, and why rather than silently changing a rule.

The next ratification decision is whether the editor wants the current
provisional assignments frozen as reviewed metadata or wants an item-by-item
human pass first.
