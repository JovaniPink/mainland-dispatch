# Safari demo readiness — September 3, 2026

**Status:** Code and CI validated; browser acceptance incomplete. Not a full
live-demo sign-off.
**Observed:** September 2, 2026. Presentation and merge decision owner: Jovani.
The implementation agent owns the verification packet. No automatic merge,
production deployment, issue update, or new automation is authorized.

## Candidate and boundaries

- Production and refreshed `origin/main` baseline:
  `7598f5fbc55e8ff2ed05ef04d227487400ef1a7a`.
- Ready production Netlify deploy: `6a97ac3d6020870008c0f751`, from that exact SHA.
- Runtime candidate: `84b24c42044ca229b3cc5eacad68ab1283ca8025`.
  [Readiness PR #52](https://github.com/JovaniPink/Mainland-Dispatch/pull/52)
  remains draft. Its final head and exact-head check runs are the authority
  for subsequent documentation-only commits; they do not deploy this fix.
- Initial readiness head `0f9cde4c2b5f6295cb4c73429edd5110e84846af` passed
  [hosted Node 22 and Node 24 CI](https://github.com/JovaniPink/Mainland-Dispatch/actions/runs/33689540848).
  Its Netlify preview `6a98a033e078100008dca865` was ready from that exact SHA.
  [The PR preview](https://deploy-preview-52--mainland-dispatch.netlify.app)
  is the candidate browser-retest target, not production. Recheck the PR's
  latest head after this evidence-only documentation update.
- Candidate branch: `codex/demo-readiness-2026-09-03`, isolated from the shared
  checkout and all existing worktrees.
- Local toolchain: Node 24.19.0, Corepack 0.35.0, pinned npm 12.0.2.
- Native Safari 26.6.2 on macOS 26.6.2; a fresh private window with Web Inspector
  opened before the captured reloads. Developer tools were already enabled.
- [PR #51](https://github.com/JovaniPink/Mainland-Dispatch/pull/51) and its
  upstream dependency are outside this work and remain untouched.

Season Zero is published: ten Notebooks, separate from 13 public Dispatch
records. Inquiries 04/06 are corrected predecessors with companions 10/09.
[PR #48](https://github.com/JovaniPink/Mainland-Dispatch/pull/48) and
[PR #49](https://github.com/JovaniPink/Mainland-Dispatch/pull/49) completed the
paired releases; [#32](https://github.com/JovaniPink/Mainland-Dispatch/issues/32)
is closed. Do not repeat commissions, migrations, or program closure.

The README changes reconcile current state only. Dated decisions, research
notes, custody specifications, and memory records remain unchanged. There are
no new dependencies, routes, schemas, source cohorts, or editorial claims.

## Reproduced blocker and bounded fix

**AUDIO-01 — first Play action interrupted.** On the production baseline,
Safari 26.6.2, Inquiry 06, 1440×900, Paper:

1. Reload the page with no media consent.
2. Choose **Load external audio** and wait for its 39:23 duration to appear.
3. Press the native **Play** control once.
4. Inspect playback position and the audio state.

Expected: the same consented player continues playing and time advances.
Observed: the facade entered `playing`, but the audio element was replaced;
the new element was paused at 0 seconds with `readyState: 1`. A second Play
action advanced to 1.87 seconds with `readyState: 4` and `paused: false`.
Playback was paused after this short check.

The component keyed the audio element by `loading` versus `playing`, forcing a
remount on `CAN_PLAY`. The fix removes that key. It does not change the machine,
its event vocabulary, consent requirement, media URL, or public content. Error
and reset still unmount the player; retry still creates a fresh player.

The added regression failed on element identity before the fix (five existing
tests passed), then passed after it. It checks identity and position across
`CAN_PLAY`, repeated readiness events, and a fresh element after error/retry.
The two focused page suites passed all 14 tests. This verifies DOM lifecycle,
not real media playback. Candidate Safari playback remains a separate gate.
The shared facade also serves other audio-bearing Notebooks; its existing
consent and failure tests remain required.

## Verification record

### Public-contract readback

The September 2 production HTTP/DOM readback found:

- All ten Notebook routes returned 200 with exactly their expected canonical.
  Sitemap order retained Inquiries 01–10.
- All 19 Inquiry 06/09 and 12 Inquiry 04/10 compatibility targets existed in
  both the predecessor notice DOM and the successor DOM: 31 checked, zero missing.
- Both companion pairs retained reciprocal links.
- Inquiry 04 retained `datePublished: 2026-08-18`; Inquiry 06 retained
  `datePublished: 2026-08-25`. Both report `dateModified: 2026-09-01`.
- `/knowledge.json` returned 199 objects with 199 unique IDs. The initiating
  episode and the two shared Arctic reporting sources each retained two
  publication-scoped `source.useRecords`, including their scope and limitations.

These are current production observations, not evidence that the candidate fix
is deployed. The existing custody, citation, registry, map-subset, and knowledge
tests remain part of the canonical gate. Do not change expected counts merely
to accommodate a discrepancy.

The ready initial PR preview also returned all ten routes with their production
canonicals. Its entire 199-object knowledge payload was identical to production,
including all three shared sources' two use records. No production deployment
was made by this readiness run.

### Safari presentation matrix

| Inquiry | 1440×900 Paper | 1440×900 Night | 390×844 Paper | 390×844 Night |
| --- | --- | --- | --- | --- |
| 04 | Layout checked | Layout checked | Layout checked | Layout checked |
| 06 | Layout checked | Layout checked | Layout checked | Layout checked |
| 09 | Layout checked | Layout checked | Layout checked | Layout checked |
| 10 | Layout checked | Layout checked | Layout checked | Layout checked |

All 16 observations used actual `innerWidth`/`innerHeight` measurements, not only
the responsive toolbar label. `scrollWidth` equaled `clientWidth`: 1423 CSS
pixels at desktop and 373 at mobile, with Safari's scrollbar occupying the
remaining width. Article headings and thesis content remained readable in the
saved screenshots. Theme switching worked. No audio element or map canvas was
initialized on these fresh page loads.

This is responsive desktop Safari testing, **not physical iPhone certification**
or a WCAG conformance audit. The full keyboard/disclosure/source-section matrix
is not yet complete. Safari's responsive size fields must be committed by typing
and pressing Return; simply setting the accessibility value did not reliably
resize the page in the initial check.

### Consent evidence

Raw HAR captures remain outside Git. Each pre-consent log contains ordinary
page requests, and the post-consent captures provide positive controls:

| Capture | Total requests | Third-party requests | Observation |
| --- | ---: | ---: | --- |
| Inquiry 10 before consent | 28 | 0 | All requests to Mainland Dispatch |
| Inquiry 10 after map consent | 60 | 30 | OpenFreeMap requests; map visibly rendered |
| Inquiry 09 reload | 27 | 0 | No audio surface/player; first-party requests present |
| Inquiry 06 before consent | 27 | 0 | No Simplecast request or audio element |
| Inquiry 06 after audio consent | 28 | 1 | Simplecast partial-content response; duration loaded |

Captures span 21:50–22:05 UTC on September 2. Cache bypass was not enabled;
the checkbox did not latch, and no cache-bypass pass is claimed. No privacy
protections were disabled. A blank request log is inconclusive, never a pass.
The baseline audio playback defect above remains relevant despite successful
metadata loading. Inquiry 04's separate Network capture, controlled map/audio
failure and retry, and candidate post-fix playback still require Safari evidence.

### Repository and live-link gates

Run these commands in the isolated candidate with the pinned package manager:

```text
corepack npm install-scripts ls
corepack npm run audit:production
corepack npm run audit:dependencies
corepack npm run test-all
corepack npm run link:audit:live
```

Baseline result: no unreviewed install scripts; both audits reported zero
vulnerabilities; `test-all` passed 65 suites / 319 tests, both TypeScript lines,
formatting, lint, build, and static links. The corrected candidate subsequently
passed the same local gates with **65 suites / 320 tests** and zero audit
vulnerabilities. The new lifecycle regression accounts for the additional test.
Exact-head hosted Node 22 and Node 24 checks remain required before approval;
neither a baseline run nor a different build substitutes for candidate evidence.
Both hosted checks passed on the initial readiness head identified above; the
PR check record must remain green on its latest head before approval. A repeat
local `test-all` also passed on that committed head.

Fresh live-link classification: **200 third-party URLs — 170 reachable,
23 restricted, six redirected, one inconclusive, zero confirmed dead**; 29
sitemap routes, zero audit failures. Restricted is not reachable. The MOFCOM
significant-news destination was initially inconclusive (`fetch failed`), not
proved dead. A subsequent exact-head rerun returned **171 reachable, 22 restricted,
seven redirected, zero inconclusive, and zero confirmed dead**, again over 200
third-party URLs and 29 sitemap routes with zero audit failures. Keep both
observations: access classification can vary between requests.

Optional outbound demo links were reachable in this run:
[Notice 1168](https://www.international.gc.ca/trade-commerce/controls-controles/notices-avis/1168.aspx?lang=eng),
[quota utilization](https://www.eics-scei.gc.ca/report-rapport/Imports_of_electric_vehicles_from_China.htm),
[NSIDC passage explanation](https://nsidc.org/learn/ask-scientist/when-northeast-passage-open-ship-traffic),
and [IMO polar rules](https://www.imo.org/en/mediacentre/hottopics/pages/polar-default.aspx).
This was an availability check, not a new substantive review of their claims.

## Core demonstration — 5 minutes 45 seconds

| Time | Surface and action | Point to make |
| --- | --- | --- |
| 0:00–0:45 | [Homepage](https://mainlanddispatch.com/) → [Notebook index](https://mainlanddispatch.com/notebooks) | Ten source-reviewed inquiries; understand an argument and follow its evidence. |
| 0:45–2:15 | [Inquiry 09 proof gates](https://mainlanddispatch.com/notebook/where-does-origin-change#trade) → [sources](https://mainlanddispatch.com/notebook/where-does-origin-change#sources) | Canadian admission is not proof of production, origin qualification, certification, or US entry. Follow one source and state that limit. |
| 2:15–3:45 | [Inquiry 10 route](https://mainlanddispatch.com/notebook/the-arctic-is-not-a-shortcut#arctic) → [limits](https://mainlanddispatch.com/notebook/the-arctic-is-not-a-shortcut#limits) | Read the schematic and limitations first. Optionally consent to the map; distance does not establish reliable service or safe passage. |
| 3:45–4:45 | [Inquiry 04 legacy Arctic fragment](https://mainlanddispatch.com/notebook/routing-around-risk#arctic) → its companion notice link | Correction preserves the old route and useful history without duplicating the article. |
| 4:45–5:45 | [Archive](https://mainlanddispatch.com/archive) inquiry selection and relationships | Show a useful next source and a connected publication. Reserve [knowledge JSON](https://mainlanddispatch.com/knowledge.json) for technical questions. |

Opening language: “This is source-reviewed explanatory work. The paired
inquiries have a September 1 review cutoff; they are not live intelligence or
continuously refreshed reporting.” Do not equate ten publications with reader
value. Exclude the Desk, private lead catalog, fleet governance, and unproved
cross-project integrations. Audio is not part of the core script.

### Rehearsal and local fallback

Complete one timed normal run and one timed run with external media left
unloaded. Keep route/source text usable without the map or audio. Prepare and
open these four local screenshots before the meeting:

1. `fallback-01-notebook-index`: index and completed body of work.
2. `fallback-02-origin-proof`: Inquiry 09 proof gates and limit.
3. `fallback-03-arctic-route`: Inquiry 10 route evidence and limits.
4. `fallback-04-legacy-notice`: predecessor compatibility notice.

**Outstanding:** these four presentation-specific captures and both timed
rehearsals are not yet complete. Layout screenshots and raw request captures
are verification artifacts, not a substitute for the fallback package. Review
and crop only public-page content before sharing; keep raw logs, browser/session
identifiers, and local workstation paths out of public documentation.

If connectivity or unresolved media behavior prevents the live demonstration,
use the labeled static screenshots and the same narrative. Say explicitly that
these are captured pages; **the website itself is not certified to work offline**.

After the demonstration, record three qualitative observations: can attendees
explain the argument, identify an evidentiary limit, and find a useful next
source? Record actual responses rather than infer value from publication count.

## Issue #35 update — draft only, not posted

> Season Zero publication is complete. Inquiry 09 and the corrected Inquiry 06
> shipped together in [PR #48](https://github.com/JovaniPink/Mainland-Dispatch/pull/48);
> [Where Does Origin Change?](https://mainlanddispatch.com/notebook/where-does-origin-change)
> is public. The [September 1 quota review](https://github.com/JovaniPink/Mainland-Dispatch/blob/main/docs/source-notes/2026-09-01-canada-ev-quota-watch.md)
> remains the dated research authority; the subsequent accepted commission
> authorized publication without rewriting that note.
>
> Keep this issue open as a manual evidence watch. The next dated review is on
> or after September 8: check the operative countertariff notice and any
> amendment, suspension, or replacement; quota revisions and second-period
> utilization; and any responsible origin, certification, entry, or enforcement
> evidence. Canadian admission does not itself establish USMCA qualification,
> US entry, or fraud. Later substantive findings require a new dated note.
>
> The demo-readiness run checked availability and product behavior, not the
> substance of new source evidence. It adds no substantive source-review claim,
> recurring monitor, or ownership change.

## Approval, freeze, remaining gates, and rollback

The native Safari session became unavailable during verification. Remaining
gates must be completed after access is restored; this is an environment
limitation, not a product failure or a privacy pass:

- [ ] Retest first-click playback on the exact built candidate in Safari.
- [ ] Record controlled map/audio failure and recovery, then restore inspector settings.
- [ ] Complete keyboard focus, disclosures, source sections, and companion navigation checks.
- [ ] Check the archive inquiry selector and relationship navigation in Safari.
- [ ] Finish Inquiry 04's separate pre/post-consent request trace.
- [ ] Capture the four local fallback views and complete both timed rehearsals.
- [x] Pass canonical local candidate gates (65 suites / 320 tests).
- [x] Pass hosted Node 22/24 checks on the initial readiness head linked above.
- [ ] Confirm the latest PR head is still green before approving; any push requires fresh checks.

Stop at PR approval. Jovani decides whether and when to merge. Do not merge an
approved release inside **T−60 minutes**. At **T−30 minutes**, recheck production
SHA/deploy readiness, required pages, fragment navigation, theme, consent, and
the presentation/fallback files. Exact demo time has not been supplied.

If merge is explicitly approved before the freeze, require a ready Netlify
deploy from the exact merge SHA and repeat affected production checks. Any
subsequent deployment invalidates the prior candidate sign-off. If Safari
evidence or an approved fix remains incomplete at the freeze, use a clearly
labeled static walkthrough and disclose the limitation.

Rollback scope is only this readiness PR: the audio lifecycle change, its test,
and current-state handoff edits. Use a reviewed revert after a separately
authorized merge, or retain the baseline while the PR is unmerged. Never undo
one side of a published companion pair. Preserve failure evidence and dated
editorial records. Leave #35 open and preserve the existing scheduled link
availability audit; no new automation is part of this package.
