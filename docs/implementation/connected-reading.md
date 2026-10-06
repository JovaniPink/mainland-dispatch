# Connected reading implementation

Status: Package 1 is in draft PR #58; hosted Node 22/24 canonical CI passes at
`964a395`. Package 2 is implemented for review. Packages 3–4 remain queued.
No merge or production release is authorized.

## Package 1: correctness, accessibility, dates, and media

Base: `0c0b200`. Review branch: `codex/connected-reading-correctness`.

PR #52's three commits were rebased onto the base on this separate branch. The
original PR branch is unchanged. The audio-element regression and dated demo
record remain intact; the documentation index retains its newer September 6
date. Issue #53 remains the native Safari acceptance requirement. PR #51 and
issue #35 are separate work.

Implemented:

- Shared Archive URL parser/serializer with public selection validation, latest
  inquiry input, explicit inquiry identity, preserved unrelated query parameters
  and fragments, push for explicit changes, replace for search, and history
  restoration without a write effect. Invalid public selections produce a
  visible fallback notice.
- Focus record label association; wrapped Archive/Compare controls; persistent
  navigation location; bounded mobile section menus; 44px standalone controls.
- Separate vermilion text, fill, and focus tokens. Public component metadata is
  at least 12px, shared source limitations at least 14px, and shared prose 18px
  with 1.65 line height and a 70-character maximum measure.
- Full historical date years and partial-date formatting; required Trace
  `assessmentAsOf` seeded from its documented July 22, 2026 assessment; optional
  Notebook `presentationUpdatedAt` without changing evidence-review dates.
- One consented audio node across loading, readiness, playing, pause, buffering,
  and completion. Native media events drive reader-facing status. Error and
  unload remove the node; retry creates a new one. Fixed media colors and focus
  prevent theme inversion.

Evidence so far:

- Before the fix, the new Arctic reload test failed because serialization
  removed its inquiry parameter. It passes after the repair.
- Tests cover URL round trips, invalid selections, history restoration, audio
  node/position continuity and all playback states, unrounded contrast ratios,
  navigation ownership, and partial dates. Existing content and compatibility
  inventories are retained.
- Install-script review found no unreviewed scripts; both dependency audits
  returned zero vulnerabilities.
- Local canonical validation passes checks before production compilation, but
  Turbopack cannot create its PostCSS process/port (`Operation not permitted`).
  Retrying outside the sandbox produced the same restriction.
- A webpack production build completed as a diagnostic. This does not substitute
  for the canonical build gate or prove visual/native acceptance.
- Local browser access was blocked by the browser client. Responsive visual,
  keyboard, VoiceOver, zoom, native Safari audio, and performance acceptance
  remain unverified.

The draft review package must complete affected production-browser journeys
before it is ready to merge. Hosted canonical CI passed. Do not mark issue #53
complete using simulated media events or headless WebKit.

## Remaining packages

2. Typed public Inquiry/Source/Dispatch discovery, source identities with all
   contextual uses, mutually exclusive relationship explorers, shared-source
   anchors, and mixed browser-local Saved reading with storage-failure feedback.
3. Homepage, shared reader shell, About and public GitHub correction form, plus
   Inquiry 08 as the production-rendered design reference. Review the reference
   before extending the design.
4. Refine all ten openings and repeated terminology with an original/replacement
   evidence-boundary ledger. Complete distinct explanatory diagrams, retain
   legacy fragments and sources, and standardize companion/adjacent navigation.

Every package runs the AGENTS.md gates and the approved acceptance matrix. The
later packages must preserve the public selectors, knowledge IDs, source and
claim inventories, browser-local saved references, existing URLs/fragments,
consent boundary, and historical research records. No new reporting or source
promotion is included.

## Review and rollback

Review state/URL compatibility and native audio lifetime first, then inspect
Paper/Night focus, contrast, wrapping, and dates. Preserve source publication
precision and distinguish presentation revisions from evidence review.

Revert each package's implementation commit separately. Retain the rebased PR
#52 repair unless its owner explicitly decides otherwise. Later Saved work must
retain unknown stored references even when a target is no longer public.

Standards used: [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[WCAG target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
and [native playing events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event).

## Package 2: public discovery and Saved

The Archive receives a build-time public projection through server-component
props. Browser code does not import the underlying Dispatch/Notebook catalogs.
The projection includes 10 inquiries, 153 established source identities, and 13
Dispatches. Notebook sources retain every publication-specific use and limitation.
The canonical source identity helper is shared with knowledge.json without
changing its output contract.

Results group the three types; Time uses publication dates and an undated group.
Publication filters apply across groups; labeled Dispatch facets apply only to
Dispatch results. Inquiry/source and Dispatch connections are mutually exclusive.
Legacy inquiry links take precedence when both selections exist, preserving the
dormant Dispatch selection. Switching to Dispatch mode removes the inquiry
parameter so copied links restore that mode.

Saved retains string-array storage with new notebook:<slug> references. A compact
reverse-save-order list resolves only public records; unknown/withdrawn references
remain stored without rendering. Notebook headers and index entries share Save
controls, cross-tab updates, and visible storage errors. Source links open stable
publication-specific anchors.

The full Jest suite passed 356 tests before final packaging. Both audits reported
zero vulnerabilities; install-script review found no unreviewed scripts. Canonical
local compilation remains subject to the documented sandbox restriction. Require
hosted CI and connected reader-journey acceptance on the final package commit.

Package 1 browser progress: the hosted preview preserved Arctic on reload and
Back, named the Focus record selector, and showed no document overflow at sampled
390px, 320px, and 1440px widths. Chrome native Play advanced from 0.35 to 14.60
seconds on the first press; native Pause reported Paused, and Unload removed the
audio. Native Safari/audibility confirmation remains pending under issue #53.

## Package 3: shared design reference

The homepage brings the latest headline, synopsis, Read, Save, and Sources into
its opening composition. The three entry routes follow it. The index features
the latest inquiry once and lists nine earlier inquiries while retaining all ten
collection metadata entries. The shared reader puts dated metadata and editor
credit before a roman-type thesis, with public GitHub correction links.

About names Jovani Pink as editor without attributing external reporting to him.
The correction form requests the public article URL, passage, proposed correction,
and sources. It never submits an issue automatically. Presentation revisions
are dated September 7 separately from unchanged evidence-review dates and source
inventories. Substantive copy edits are recorded in
`docs/editorial/2026-09-07-presentation-copy.json`.

Inquiry 08 is the design reference: four separate bands, 0–100 percent share bars,
independent output and change labels, capacity additions/retirements, and aligned
utilization comparisons. Modeled curtailment remains separate. Source references
and essential limits are visible before optional method disclosures. Existing
measure values, evidence labels, source IDs, and compatibility anchors remain.

Production render review of this package precedes package 4. Native Safari,
VoiceOver, full zoom/reflow, and broader visual acceptance remain explicit gates;
these draft packages are not release authorization.

## Package 4: remaining editorial redesign

All ten openings now meet the agreed ranges (subtitles 22–25 words; theses
47–59 words). The copy ledger records original/replacement passages and preserved
boundaries. Public migration explanations use reader language while historical
research snapshots remain unchanged.

Primary explanation is static: Inquiry 01 uses attributed argument/interpretation
rows and its separate three-date strip; 02 adds a dated promise ledger while
retaining detailed promise links; 03 keeps independent country comparisons;
04 pairs the consent map with visible workaround/risk explanations; 05 retains
its five-stage mechanism and distribution/policy rows; 06 presents parallel gate
structures; 07 adds six independently scaled strips with explicit zero-change
or PMI-50 baselines; 08 retains the accepted energy reference; 09 separates
four proof steps; 10 combines admitted schematic geometry, climatological
window guidance, and three separately labeled measures. Source references,
evidence labels, and semantic text accompany the visuals.

Article endings now show established companions followed by full-title adjacent
inquiries. No thematic or evidentiary relationship was inferred. The generic
article placeholder is replaced with publisher/type/date, Compare uses parallel
record names, and the single-option Arctic filter is removed. Seven pre-existing
duplicate source-trail IDs were resolved by naming the inner ledger separately;
existing compatibility anchors remain reachable.

The ten-route contract checks unique IDs, primary figures, a single reading-end
navigation, and absence of audio/iframes before consent. Existing source and
claim inventories, public selection, source identity, media lifetime, and fragment
checks remain in the required suite. Hosted canonical builds and final production
renders remain required at the review head.

Package 2 production journeys were exercised on the cumulative package 3 preview:
Arctic returned its inquiry and admitted sources; following the NSIDC source
opened its correct disclosure. Saving survived reload, and removal in another tab
updated the first tab. Relationships displayed only its selected scope. Package 3
hosted CI passed on Node 22 and 24 at `a09a76a`; production renders covered the
homepage, shared shell, and energy figure, including mobile Paper and desktop Night.
The 390×844 homepage Read action appeared within the first screen. These observations
preceded the remaining visual implementation.

## Review evidence

See [connected-reading-validation.md](connected-reading-validation.md) for package
heads, hosted gates, production preview observations, measurements, and remaining
manual acceptance. Draft review readiness is separate from release acceptance.
