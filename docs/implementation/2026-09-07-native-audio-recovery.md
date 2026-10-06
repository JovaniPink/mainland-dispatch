# Native Safari audio recovery — September 7, 2026

## Reproduced defect and repair

On the correctness preview, Safari could remain on “Loading audio” indefinitely
when Web Inspector blocked the publisher media request. An explicit source-error
handler alone did not resolve this browser behavior: a blocked request did not
produce a usable error event, and Safari could retain metadata while playback
remained unavailable.

The audio machine now handles native waiting during initial loading. Initial
metadata loading and active buffering each have a 30-second recovery bound.
Loaded metadata prevents an idle, consented player from timing out while awaiting
the reader's Play action. Pause and actual playback cancel buffering recovery.
A stalled attempt reaches failure, removes its media element, and exposes Retry
and Return to poster. Retry creates a fresh element. Consent still never starts
playback, and readiness alone never reports Playing.

## Native browser evidence

Verified implementation: `44a5143`, [PR 58](https://github.com/JovaniPink/Mainland-Dispatch/pull/58),
[review preview](https://deploy-preview-58--mainland-dispatch.netlify.app/notebook/what-gets-through#notebook-audio-title),
Netlify deploy `6a9f5f051b8942000857e965`. Browser: native Safari 26.6.2 in an
isolated desktop window; native controls were activated through the visible UI.

- Before consent, the Safari Network panel filtered to Simplecast showed no
  matching requests after reload. Consent produced the publisher MP3 request.
- On the preceding implementation, one native Play activation advanced the timer
  to 16 seconds; Pause showed Paused; native seeking reached 5:14 while paused.
- On the repaired implementation, a request-scoped Web Inspector block followed
  by native Play produced Buffering. After the 30-second bound the page showed
  Audio unavailable, Retry audio, and Return to poster.
- After disabling that temporary block, Retry followed by one native Play
  activation produced Playing and an advancing timer, observed at 43 seconds.
  Safari also exposed its active-audio tab indicator. Pause showed Paused at
  50 seconds, and Unload restored the consent poster.
- The temporary request block was disabled and the inspector closed. No raw
  browser headers, session identifiers, or private captures are published.

## Validation and limits

The regression for a request that never loads metadata failed before the timeout
repair. Tests also cover cached-metadata playback stalls, cancellation on pause
and playback, fresh retry, and source-element failure. The correctness package
passes 68 suites and 347 tests. Both dependency audits report zero vulnerabilities;
install-script review is clear. Both explicit TypeScript lines pass. The local
canonical build still encounters the documented process/port sandbox restriction.
[Hosted Node 22 and 24 gates](https://github.com/JovaniPink/Mainland-Dispatch/actions/runs/34175397637)
passed, including the canonical production build and static link audit.

Audible output has not been independently confirmed by the reader; native control,
advancing time, and Safari's audio indicator are recorded separately from hearing
sound. Issue 53 therefore remains open. This record does not establish full
VoiceOver, viewport/zoom, or end-of-media acceptance and is not a production release
claim. The user's merge-train authorization remains recorded; remaining agreed
acceptance gates still apply.
