# Connected reading: review evidence

Recorded September 7, 2026. These are draft review packages, not a production release.

## Package identity and canonical gates

| Package | Draft PR | Validated implementation head | Hosted gate |
| --- | --- | --- | --- |
| Correctness, accessibility, dates, media | [58](https://github.com/JovaniPink/mainland-dispatch/pull/58) | `964a395` | [Node 22 and 24 passed](https://github.com/JovaniPink/mainland-dispatch/actions/runs/34167988990) |
| Public discovery and Saved | [59](https://github.com/JovaniPink/mainland-dispatch/pull/59) | `97a3b14` | [Node 22 and 24 passed](https://github.com/JovaniPink/mainland-dispatch/actions/runs/34169557395) |
| Homepage, reader shell, Inquiry 08 reference | [60](https://github.com/JovaniPink/mainland-dispatch/pull/60) | `a09a76a` | [Node 22 and 24 passed](https://github.com/JovaniPink/mainland-dispatch/actions/runs/34170177167) |
| Remaining editorial redesign and acceptance fixes | [61](https://github.com/JovaniPink/mainland-dispatch/pull/61) | `5e8f8cd541f68b245bf291210f02b7b9ba5fda7b` | [Node 22 and 24 passed](https://github.com/JovaniPink/mainland-dispatch/actions/runs/34172179416) |

Every package ran install-script review, both dependency audits, and `test-all`.
The final code has 70 passing suites and 359 passing tests. Both explicit compiler
lines passed: TypeScript 7 CLI and TypeScript 6 API compatibility. Dependency
audits reported zero vulnerabilities and no unreviewed install scripts.

Local canonical Turbopack compilation still encounters a process/port permission
restriction. It is not counted as successful acceptance. The allowed hosted
runners completed the canonical production build and static link audit as part
of `test-all`; both Node lanes are green at the recorded implementation head.

The final code preview is [PR 61](https://deploy-preview-61--mainland-dispatch.netlify.app),
Netlify deploy `6a9f51462c0cc80008b83f21`. The reference preview was inspected before
implementing the remaining figures. PR 52's rebased lifetime fix, regression,
and historical demo documentation remain in package 1. Issue 53 remains open.
PR 51 and issue 35 are outside this program.

## Behavioral evidence

Automated coverage includes Archive parsing/serialization and history behavior,
public-only discovery and source identities, legacy and Notebook saved references,
malformed/unavailable storage, cross-tab synchronization, native audio events and
element lifetime, publication date precision, navigation semantics, and contrast
tokens. Ten-route checks cover primary figures, unique IDs, one reading-end
navigation, consent markup, and existing source/claim/fragment inventories.

Production browser observations include:

- The Arctic selection survives reload with explicit inquiry identity in the URL.
  Invalid public selections show generic fallback feedback. Relationships shows
  one explorer at a time; the 320px control layout has no document overflow.
- Searching Arctic finds its inquiry and admitted sources. The NSIDC context link
  opens the correct article source disclosure.
- Notebook saving survives reload. Removing it in a second tab updates the first.
- Native Chrome Play advanced playback time; Pause reported Paused and Unload
  returned to the consent poster on the correctness preview. Final audio poster
  labeling was separately rechecked by the automated accessibility audit.
- Homepage Read is visible without scrolling at 390×844: its bottom was approximately
  686px. Latest headline, action, and Save precede the evidence preview on mobile.
- Exact and subordinate navigation destinations expose the intended current-page
  semantics. Historical source dates include years and preserve partial dates.

## Visual and accessibility evidence

Production render samples covered all ten principal treatments, across Paper and
Night samples at 1440×900, 768×1024, 390×844, 320×740, and 844×390 landscape.
This is sampled coverage, not every page/theme/viewport combination.
The mobile landscape section disclosure has its own scroll area. Country panels
retain independent units and periods; indicator strips preserve zero-change and
PMI-50 reference points. The Arctic schematic now handles the antimeridian and
labels the admitted locations without changing source coordinates.

Lighthouse 13.4.1 accessibility audits covered the homepage, Archive, and all ten
inquiries. Nine inquiries scored 100 at `e1ed2c7`; Inquiry 02 initially scored 93,
revealing invalid definition-list nesting and a consent button whose visible text
did not match its accessible name. Both were corrected in `5e8f8cd`. The rerun of
Inquiry 02 scored 100, as did final reruns of Inquiries 04 and 06. Homepage and
Archive scored 100. These scores do not establish WCAG conformance.

A computed solid-background contrast sample of 213 rendered Night-theme text
nodes on Inquiry 01 found no ratio below the applicable normal/large-text limit.
Token tests use unrounded ratios. Background images, all interaction states, and
all pages are not covered by that single rendered sample.

Pre-consent Lighthouse network logs for final Inquiries 02, 04, and 06 contained
no publisher audio or map-service requests. The review environment itself injects
the Netlify feedback drawer, including Netlify videos and telemetry; those are
not application consent requests and are absent from the production application
code. Controlled media failure remains covered by automated component/state tests,
not a completed final native-browser failure rehearsal.

## Performance measurement and limits

One mobile Lighthouse run against the public homepage scored 91, with LCP 1.834s,
TBT 195ms, and 511,421 transferred bytes. Its serving SHA was not independently
verified, so this is an observed public comparison, not an exact `0c0b200` baseline.

The initial review homepage run scored 76 with LCP 5.742s. Inspection found about
1.318MB of injected Netlify drawer videos. First-party transfer was 364,870 bytes
versus 511,421 on the observed public page (about 29% less); first-party script
transfer was 248,696 versus 459,476 bytes (about 46% less). CSS increased from
9,377 to 9,549 bytes, and prefetched page data increased from 29,047 to 93,191 bytes.
The expanded public discovery prefetch is a review focus despite the lower total.

A diagnostic run with the drawer URL blocked scored 100, LCP 1.137s, and TBT 8ms.
Run timing and caching varied, and total-byte accounting still included preview
resources. Treat the diagnostic as evidence of preview interference, not a
production performance promise. Final Inquiry 06 also showed a slower run with
Netlify videos; no publisher audio was loaded. Recheck affected routes after an
authorized release. Preview SEO 66 reflects noindex; best-practices 96 reflects
a cookie issue from the injected Netlify drawer.

## Remaining acceptance and release boundary

The implementation is available for staged review. Do not mark release acceptance
complete until these checks are recorded:

- Native Safari issue 53: one native Play activation, audible sound, and advancing
  time, then pause, seek, completion, unload, failure, and retry as applicable.
- Full VoiceOver and keyboard journeys, 200% text zoom, reduced-motion behavior,
  every required page/theme/viewport combination, and open-disclosure/focus review.
- A controlled third-party failure rehearsal in native browsers, keeping the
  independent evidence reading usable.
- After separate merge/release authorization, verify the exact deployed SHA and
  repeat the affected public discovery, source, history, saved, and media journeys.

No production merge or release occurred. Revert packages in reverse dependency
order when rolling back the full program; preserve stored references, established
source IDs, and historical evidence. The copy ledger records substantive wording
changes and preserved evidence boundaries separately from historical snapshots.
