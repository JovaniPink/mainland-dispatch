# Mainland Dispatch

A public research notebook built on a transparent, interactive evidence archive
for understanding contemporary China and the U.S.–China relationship. Each
inquiry begins with a consequential conversation, document or development and
follows it into its sources, assumptions, competing interpretations, historical
context and unresolved questions.

> **Editorial boundary:** every public Dispatch, Compare source, Trace entry,
> Dossier document, and Notebook inquiry has passed its stated review boundary.
> Prototype and source-snapshot records remain local research fixtures. Desk
> leads do not become public merely by entering the review queue.

## Design direction

“The Correspondent’s Notebook” combines a mineral-paper field notebook with a
disciplined source archive. It uses near-black editorial ink, vermilion
annotations, jade metadata, a double ruled margin, restrained motion, and Paper
and Night reading environments. System serif/sans/mono stacks keep builds
network-independent.

The stream is deliberately not a wall of identical cards. Video, audio,
documents, data, galleries, social captures, articles, and original notes have
distinct visual signatures, while the first item receives a wider editorial
treatment. The pattern borrows chapter rhythm from `christinepink`, structured
link metadata from `jovanipink-site`, selectable moments from `chess-lab`, and
claim-safety posture from `handoff-navigator`.

## Reader experiences

- **Notebook** — the dominant public journey. A bounded inquiry combines
  personal motivation, a faithful reconstruction of an argument, timecoded
  turning points, claim labels, pushback, institutional context, a short source
  trail and one unresolved question.
  Eight source-reviewed inquiries are public. The newest, “Below Half Is Not
  Gone,” separates generation share, output, installed capacity, and system use
  instead of collapsing them into one energy-transition score.
- **Source Archive** — an interactive public evidence surface with faceted
  search, chronological and relationship views, reviewed source metadata,
  classified claims, explicit limitations and shareable URL state. It exposes
  only published records; aggregate corpus counts explain the private reservoir
  without rendering withheld or rejected leads as recommendations.
- **Compare** — mainland, US, and primary-document framing with shared facts,
  differing emphasis, and no synthetic bias score. Mobile uses state-driven
  source tabs.
- **Trace** — a selectable chronology with critical moments and an explicit
  evidence status for the current assessment.
- **Dossiers** — claims separated into reported, announced, implemented,
  independently observed, contested, superseded, and corrected. The
  current open-model record links directly to its chronology and source-backed
  Dispatches.
- **Evidence view** — three local research cases used to test evidence-chain,
  relationship, chart, and map interactions. `/atlas` returns not found until a
  case completes a separate publication review.
- **Saved** — a browser-local reading collection implemented as an external
  store, so all Save controls stay synchronized.
- **Desk** — a local editorial sandbox with link intake, live Zod feedback, and
  an evidence-focused review queue. It is absent from public navigation and
  returns 404 in production unless `ENABLE_EDITORIAL_DESK=1` is explicitly set
  at build time. It is not an authenticated CMS. The Desk reads the source-lead
  catalog on the server and passes it to its client components as props; the
  catalog modules are `server-only`.

## Publication and evidence boundaries

- Only `published` and `corrected` dispatches can enter public streams, static
  route generation, related links, saved reading, Compare, Trace, or Dossiers.
- Review-stage records remain available to the local Desk but do not resolve on
  public dispatch routes.
- Every record declares `provenance: "verified" | "prototype"`. Public reader
  records are verified. Prototype Atlas releases are excluded from public
  selectors, routes, dossier modules, metadata, and the sitemap.
- `src/content/catalog.ts` validates the complete graph at import time: schema
  variants, real calendar dates, route-safe slugs, unique IDs/slugs, date order,
  chronological trace entries, and every dispatch/trace/dossier relation.
- Every URL exposed by a public Dispatch, Compare, Trace, or Dossier must use
  HTTPS. Historical HTTP links can remain in the private source-lead inbox for
  provenance, but they cannot cross the publication boundary until a reviewed
  secure canonical record replaces them.
- Atlas sources distinguish controlling records, supporting statements,
  contextual data, methodology, and enrichment. Stored artifacts declare a
  local path and SHA-256 that the test suite recomputes. The complete source
  inventory, web audit, query contract, exclusions, and promotion threshold are
  documented in
  [`docs/evidence-atlas-source-methodology.md`](docs/evidence-atlas-source-methodology.md).

## Architecture

- Next.js 16.3, React 19.2, Tailwind CSS 4, a TypeScript 7 CLI with TypeScript 6
  compiler-API compatibility, XState 5, and Zod 4.
- Zod discriminated union for `article`, `video`, `audio`, `document`, `social`,
  `gallery`, `data`, and `original` dispatches.
- XState owns real interaction state:
  - stream filtering/search;
  - Archive view selection, faceted filters, relationship focus, query
    hydration, Notebook inquiry selection and shareable URL state;
  - Notebook consent-gated audio;
  - Compare source selection;
  - Trace entry selection;
  - media poster → loading → playing/unavailable/retry;
  - Desk intake → validation → duplicate check → editing → saved JSON.
- Notebook `promise` selection is deliberately URL-derived state rather than a
  statechart. XState is reserved for lifecycle behavior; pure functions validate
  and update selection while preserving unrelated query parameters.
- Media embeds are consent-gated. A verified external video creates its iframe
  only after consent and reports readiness through iframe load/error events.
  Prototype media exercises the same machine without contacting a third party.
- Local Atlas geography follows the same privacy contract. A labeled SVG and
  semantic relationship list carry the evidence by default; MapLibre and
  OpenFreeMap load only after the reader opens the optional geographic dialog.
  Paper uses Positron and Night uses the native Dark style. Closing the dialog
  disposes the map, while failed or degraded tiles never remove the local
  evidence.
- Atlas deep links accept `chain`, `step`, `place`, and `month`. Place and month
  are retained only when valid for the selected step; month is strictly a chart
  cursor, not an evidence-as-of reconstruction.
- Development-only State Lab panels expose current state, recent events,
  available events, and Zod results.
- Metadata includes route titles/descriptions, route canonicals, Open Graph
  artwork, WebSite/Organization and NewsArticle structured data, manifest,
  `robots.txt`, private-route `noindex`, and a public-only dated sitemap. The
  contract is documented in
  [`docs/seo-and-indexing.md`](docs/seo-and-indexing.md).

## Development

Requires Node 22.22.2+ or 24.15.0+ and Corepack. The package metadata pins npm
12.0.2 by version and integrity; the package-manager warning exists only so a
managed host's bundled npm can bootstrap that exact release. The active gate
still rejects any npm executable other than 12.0.2.

```bash
corepack npm ci
corepack npm run dev
```

The complete quality gate is:

```bash
corepack npm install-scripts ls
corepack npm run audit:production
corepack npm run audit:dependencies
corepack npm run test-all
```

It rejects high-severity advisories in both the deployed and complete dependency
graphs, then runs formatting, ESLint, the fail-closed compiler contract, strict
checks with TypeScript 7 and TypeScript 6, Jest/Testing Library coverage, a
production build, and a public-boundary audit that fails if any source-lead ID
or serialized source-lead field reaches a client chunk or prerendered public
document. The same gates run on Node 22 and Node 24 in GitHub Actions.
Individual commands remain available for formatting
(`corepack npm run format:check`), lint (`corepack npm run lint`), baseline
validation (`corepack npm run baseline:check`), compiler validation
(`corepack npm run toolchain:check`), primary types
(`corepack npm run typecheck`), compatibility types
(`corepack npm run typecheck:compat`), tests (`corepack npm test`), and the
production build (`corepack npm run build`).

### TypeScript transition contract

The repository follows Microsoft's
[side-by-side TypeScript 7 transition guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60).
`@typescript/native` supplies the TypeScript 7 CLI used by the primary check,
while the ordinary `typescript` package stays on the TypeScript 6 line for
Next.js, ESLint, Jest, and other tools that still require the compiler API.
Both commands use explicit package paths so npm binary-link ordering cannot
silently select the wrong compiler. `npm run toolchain:check` verifies the
package identities, major versions, and script contract before either typecheck
runs.

Dependency changes must keep both audit scripts green. The production audit
covers the deployed graph; the full dependency audit covers development and
build dependencies as well.
Next.js and `eslint-config-next` move together, React and React DOM stay on the
same exact version, and transitive advisory fixes are resolved through a
compatible lockfile refresh without forced major upgrades or audit exclusions.
TypeScript major updates require compatibility review across the native CLI and
compiler-API lines; a new major must not be merged merely because it installs.
Renovate groups routine non-major updates, while every major waits for explicit
Dependency Dashboard approval before opening a compatibility change.

The hosted workflow pins third-party actions to immutable commits, grants only
read access to repository contents, and cancels superseded runs for the same
branch or pull request.

### Browser and social identity

The App Router owns a deterministic Mainland Dispatch metadata surface:
`/favicon.ico` is a committed 64-pixel fallback generated by
`scripts/generate-favicon.mjs`; `/icon0`, `/icon1`, `/icon2`, and
`/apple-icon` retain the correspondent-notebook mark; the web manifest declares
their exact sizes; and the Open Graph image remains a score-free, static
editorial cover. `corepack npm run baseline:check` fails if the favicon bytes or
required routes drift.

Current regression coverage includes catalog integrity, publication boundaries,
reader/media/explorer/intake machines, Archive timelines and relationships,
consent-gated external media, saved reading, stream filtering, and exclusion of
review-stage content.

Atlas includes semiconductor policy, culture/everyday life, and open-model
release-state cases. It remains an unpublished experimental source lab; its
prototype/source-snapshot releases are retained for local development and
methodology review only.

## Content workflow

Content lives in `src/content/`. The local Desk can assemble and validate a
draft, then emit JSON for review. That JSON is not persisted automatically; a
real authenticated write path and source-verification workflow are separate
product decisions.

Public promotion follows the explicit checklist in
[`docs/publication-methodology.md`](docs/publication-methodology.md). In short:
read the canonical source, separate reported fact from editorial commentary,
record date/language/attribution limitations, verify every public relationship,
and fail closed when a promised artifact or independent check has not arrived.
Research prompts remain private and cannot support public claims. The tracked
catalog distinguishes supplied article URLs from publisher-verified canonical
URLs and retains reviewed supporting records, explicit claim statuses, and
limitations.

**Season Zero intake boundary:** the July 23 contract froze additional article
intake, automated ingestion, generalized CMS work and new top-level product
areas. On August 14 the editor narrowly reopened one manually curated
quality-link batch from the supplied HN Algolia discovery query. The change does
not authorize recurring scraping, public promotion or a second intake system.
The August 30 ten-Notebook program supersedes only the original three-entry
ceiling; it preserves the recurring time discipline and every evidence,
privacy, and publication gate. The Archive still visualizes only the reviewed
public boundary. Inquiries 01–10 are now public; Inquiries 04 and 06 are corrected
predecessors with published companions 10 and 09. These ten Notebooks are
distinct from the 13 public Dispatch records. The governing decisions are recorded in
[`docs/decisions/2026-07-23-season-zero.md`](docs/decisions/2026-07-23-season-zero.md),
[`docs/decisions/2026-07-28-notebook-two.md`](docs/decisions/2026-07-28-notebook-two.md),
[`docs/decisions/2026-08-14-notebook-three.md`](docs/decisions/2026-08-14-notebook-three.md),
[`docs/decisions/2026-08-18-notebook-four.md`](docs/decisions/2026-08-18-notebook-four.md),
[`docs/decisions/2026-08-21-notebook-five.md`](docs/decisions/2026-08-21-notebook-five.md),
[`docs/decisions/2026-08-25-notebook-six.md`](docs/decisions/2026-08-25-notebook-six.md),
[`docs/decisions/2026-08-29-notebook-seven.md`](docs/decisions/2026-08-29-notebook-seven.md),
[`docs/decisions/2026-08-30-notebook-eight.md`](docs/decisions/2026-08-30-notebook-eight.md),
[`docs/decisions/2026-09-01-notebook-nine.md`](docs/decisions/2026-09-01-notebook-nine.md),
[`docs/decisions/2026-09-01-notebook-ten.md`](docs/decisions/2026-09-01-notebook-ten.md),
[`docs/source-notes/2026-09-01-below-half-is-not-gone-publication-refresh.md`](docs/source-notes/2026-09-01-below-half-is-not-gone-publication-refresh.md),
[`docs/decisions/2026-08-30-ten-notebook-program.md`](docs/decisions/2026-08-30-ten-notebook-program.md),
and
[`docs/decisions/2026-08-14-curated-source-intake-resumption.md`](docs/decisions/2026-08-14-curated-source-intake-resumption.md).

The current documentation map, governing-methodology precedence, and catalog
rollup are maintained in [`docs/README.md`](docs/README.md). The source-lead
catalog contains 510 records. The thirteen general-China intake batches plus the
August 14 quality-link intake cover 404 external article candidates: 375
withheld, 29 rejected, and none drafted or public. A separate September 6
critical-minerals intake contributes 29 withheld research leads. Every catalog
record carries the versioned, provisional theme, geography, and chronology
metadata defined in
[`docs/source-link-taxonomy.md`](docs/source-link-taxonomy.md); taxonomy never
changes evidence or publication status.

The dated [Safari demo handoff](docs/plans/2026-09-03-demo-readiness.md) separates
the released product from presentation verification, fallback evidence, and
remaining approval gates.

Topic-specific intake logs record source quality, exclusions, open checks, and
the exact research stopping point. They are dated snapshots, so earlier totals
describe the catalog at that review time. The current Chinese open-model package is
documented in
[`docs/source-notes/2026-07-21-chinese-open-models.md`](docs/source-notes/2026-07-21-chinese-open-models.md).
The user-supplied follow-up brief is tracked separately in
[`docs/source-notes/2026-07-21-supplied-open-weight-brief.md`](docs/source-notes/2026-07-21-supplied-open-weight-brief.md),
and the deliberately varied historical intake is recorded in
[`docs/source-notes/2026-07-21-random-backfile-sampler.md`](docs/source-notes/2026-07-21-random-backfile-sampler.md).
The larger editorial-only link backlog and its 2006–2026 chronology are
documented in
[`docs/source-notes/2026-07-21-open-model-sourcebook-expanding-time.md`](docs/source-notes/2026-07-21-open-model-sourcebook-expanding-time.md).
The follow-up global-architecture dossier, claim audit, withheld assertions, and
recommended evidence-first article structure are documented in
[`docs/source-notes/2026-07-21-global-ai-architectures-dossier-audit.md`](docs/source-notes/2026-07-21-global-ai-architectures-dossier-audit.md).
The revised Kimi K3 sourcing brief, canonical-source corrections, six historical
drafts, source-inbox expansion, and exact research stopping point are documented
in
[`docs/source-notes/2026-07-22-kimi-k3-sourcing-brief-intake.md`](docs/source-notes/2026-07-22-kimi-k3-sourcing-brief-intake.md).
The three supplied general-China article batches are consolidated into one
88-candidate access and disposition audit in
[`docs/source-notes/2026-07-22-china-article-corpus-review.md`](docs/source-notes/2026-07-22-china-article-corpus-review.md).
The fourth 30-candidate batch, including redirect corrections, two rejections,
and article-specific review blockers, is recorded in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-04-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-04-review.md).
The fifth 30-candidate batch adds legal, technical, culture, infrastructure,
finance, and everyday-life leads with six documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-05-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-05-review.md).
The sixth 30-candidate batch adds space, mobility, labor, education, media,
science, legal-case, and everyday-life leads with source-specific corrections
and four documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-06-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-06-review.md).
The seventh 30-candidate batch adds archaeology, infrastructure, environment,
cybersecurity, research, finance, culture, and maritime leads with three
documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-07-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-07-review.md).
The eighth 30-candidate batch adds daily life, science, platform governance,
public health, environment, corporate policy, and rights reporting with four
documented rejections and numerical or policy corrections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-08-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-08-review.md).
The ninth 30-candidate batch adds science, religion, education, geospatial,
security, industry, climate, social-policy, and rights reporting with two
documented rejections and explicit corrections to social-credit, space-station,
emissions, and mapping claims in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-09-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-09-review.md).
The tenth supplied group contains 29 external candidates after exclusion of one
discussion-only prompt. It adds history, space, literature, cyber, climate,
trade, finance, and everyday-business leads with three documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-10-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-10-review.md).
The eleventh supplied group contains 28 external candidates after excluding two
discussion-only submissions. It adds manufacturing, conservation, sports,
security, markets, academic-freedom, infrastructure, and everyday-business
leads, all withheld at the exact point where source or corroboration review
remains incomplete, in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-11-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-11-review.md).
The twelfth supplied group contains 29 new external candidates after excluding
one exact duplicate already tracked in batch 05. It adds law, finance, energy,
mapping, media, conservation, technology, and everyday-life leads with three
documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-12-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-12-review.md).
The thirteenth supplied group adds 30 distinct infrastructure, trade, protest,
media, space, sports, daily-life, maritime, technology, and legal candidates,
with two documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-13-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-13-review.md).
The August 14 quality-link intake records the exact HN Algolia query boundary,
de-duplicates repeated publisher URLs, excludes discussion-only and weak or
off-topic results, and adds 20 original-publisher leads without creating any
public mapping in
[`docs/source-notes/2026-08-14-china-quality-links-review.md`](docs/source-notes/2026-08-14-china-quality-links-review.md).
The founding Notebook’s verified formats, corrected timecodes, claim
classifications, source trail, access limitations and exact research stopping
point are recorded in
[`docs/source-notes/2026-07-23-what-xi-jinping-wants-ledger.md`](docs/source-notes/2026-07-23-what-xi-jinping-wants-ledger.md).
Notebook Two’s audio boundary, 13 source stops, claim decisions, promise
baselines, excluded assertions, and exact July 28 stopping point are recorded in
[`docs/source-notes/2026-07-28-open-models-closed-system-ledger.md`](docs/source-notes/2026-07-28-open-models-closed-system-ledger.md).
Notebook Three’s NPR audio boundary, 23 source stops, indicator methods,
excluded composite-ranking claims, demographic derivation, and exact August 14
stopping point are recorded in
[`docs/source-notes/2026-08-14-dominance-is-a-dashboard-ledger.md`](docs/source-notes/2026-08-14-dominance-is-a-dashboard-ledger.md).
Notebook Four’s original maritime-route model, 24 public source stops, 12 claim
dispositions, Reuters attribution boundary, schematic-map limitation, and exact
August 18 stopping point are recorded in
[`docs/source-notes/2026-08-18-strategic-rebalancing-research-ledger.md`](docs/source-notes/2026-08-18-strategic-rebalancing-research-ledger.md).
Notebook Five’s trade-adjustment model and evidence boundaries are recorded in
[`docs/source-notes/2026-08-21-china-shock-adjustment-ledger.md`](docs/source-notes/2026-08-21-china-shock-adjustment-ledger.md).
Notebook Six’s circulation-gate model is recorded in
[`docs/source-notes/2026-08-25-what-gets-through-ledger.md`](docs/source-notes/2026-08-25-what-gets-through-ledger.md),
with its August 30 transshipment revision controlled by the immutable
[`follow-up research snapshot`](docs/source-notes/2026-08-30-us-canada-china-transshipment-follow-up.md).
The manual watch has a dated
[`September 1 EV quota result`](docs/source-notes/2026-09-01-canada-ev-quota-watch.md)
that records actual Canadian quota use without inferring US entry or origin
fraud.
The accepted [Inquiry 09 decision](docs/decisions/2026-09-01-notebook-nine.md)
authorized the atomic Inquiry 06 correction and companion publication, released
in [PR #48](https://github.com/JovaniPink/mainland-dispatch/pull/48). Its
[lossless custody specification](docs/plans/2026-09-01-inquiry-06-09-migration-spec.md)
continues to define the migration contract.
The accepted [Inquiry 10 decision](docs/decisions/2026-09-01-notebook-ten.md)
authorized the atomic Inquiry 04 correction and Arctic companion publication,
released in [PR #49](https://github.com/JovaniPink/mainland-dispatch/pull/49).
Its [Arctic custody specification](docs/plans/2026-09-01-inquiry-04-10-migration-spec.md)
preserves one consent-gated map implementation. These accepted decisions and
releases supersede the former proposed-state summaries; dated research and
custody records remain historical authority, not an unfinished publication queue.
Notebook Seven was selected from the immutable
[`August 27 candidate ledger`](docs/source-notes/2026-08-27-china-news-candidate-ledger.md)
under its
[`commission decision`](docs/decisions/2026-08-29-notebook-seven.md).
The published Inquiry 08 has a dedicated, publication-oriented
[`“Below Half Is Not Gone” ledger`](docs/source-notes/2026-08-30-below-half-is-not-gone-ledger.md),
with the release recorded in its
[`publication refresh note`](docs/source-notes/2026-09-01-below-half-is-not-gone-publication-refresh.md).
