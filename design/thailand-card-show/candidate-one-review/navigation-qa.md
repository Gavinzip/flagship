# Thailand hero / globe navigation repair — 2026-10-20

Cause: the selected complete hero embeds its emblem inside one raster artwork. The entry and return handoffs still queried the former `.fs-hero-artwork .fs-original-emblem` element. Removing that independent visual node broke both transition target lookups. The return overlay reported the existing generic globe-load error even though the globe renderer itself was ready. This was a missed integration check in the earlier hero QA.

Repair:
- Added one explicit handoff-target resolver used by entry and return. Thailand measures the actual emblem region inside the complete artwork, including its `object-fit: cover` scale and desktop/mobile crop. Source dimensions/region live in a small companion geometry file shared with the artwork component.
- Embedded artwork is never hidden as a whole. The travelling emblem crossfades into/out of the existing embedded emblem on the same journey clock, avoiding a duplicate stationary mark or a disappearing full hero.
- Existing Korea/Taiwan target representations remain explicit; no guessed selector or missing-target fallback was added.
- Thailand preparation now also loads the actual new hero artwork before entry. Globe rendering, gold mutation and camera timings remain unchanged.

Verification through the current IAB tab:
- Reproduced the user's failed-return overlay before the repair.
- Direct Thailand URL at 541px: clicked the real upper-left home link, completed reverse flight, reached `/?lang=zh-TW&theme=dark#world-thailand`; globe and entry controls visible and usable.
- Re-entered Thailand from the globe at 541px: entry preparation/flight/handoff completed, actual selected hero loaded, no error overlay.
- Returned after normal entry successfully, with outer scroll state 0 restored.
- At 1194px, entered Thailand again with the desktop 50%/50% cover position. Gold mutation became active during flight; entry and handoff completed.
- Scrolled to FAQ (scrollY 6190; hero fully offscreen), then clicked the upper-left home link. Returned to the globe with no overlay/error, correct selected Thailand chapter and original outer frame.
- Final browser error/warning log was empty. Final outer mutation is false / 0.0000, so selecting the chapter alone retains the original globe appearance. Preview left on the globe for the user to replay entry.
- `pnpm build:art-review` passed TypeScript, Vite, edition metadata/CSP and media budgets. 16 named media files, 4,026,206 B, unchanged by this fix. `git diff --check` passed.

Screenshots are retained review deliverables under `work/screenshots/thailand-return-fix-2026-10-20/`, including `world-ready.png`, `world-return.png`, `entry-complete.png` and flight observations. These are screenshots, not a video capture of every animation frame. No test/harness files, generated artwork, runtime/data fallback, image deletion, Git push or deployment were introduced.

## Superseding repair: actual foreground emblem — 2026-10-20

The functional embedded-region repair above did not satisfy visual alignment: the baked emblem and original travelling emblem were different images. Gavin explicitly requested separation. The current implementation supersedes that region/crossfade method: a new clean background has no emblem or emblem reflection, and the original transparent emblem is a real foreground over the cards. Both handoff directions measure the actual DOM image and hide that foreground while the exact same image travels. No embedded-image target or crossfade remains.

Current checks at 1194px:
- Direct admission succeeds. Independent emblem bounds: x 589.277, y 350.609, width 463.008, height 308.672; no horizontal overflow.
- Header return starts with the independent foreground hidden, then completes at the original globe with the Thailand chapter selected.
- Re-entry reaches the handoff with gold mutation active, static foreground hidden and travelling/foreground images using exactly the same hashed source. Entry completes with the visible foreground at precisely the same bounds as direct admission.
- Clean background is `thailand-clean-hero-review`, containing only the large cards and gold treatment. The old baked-logo artwork is disconnected from the page, preserved in its candidate round.

390px review: cards and foreground share the mobile crop; foreground x 82.141, y 206.852, width 235.711, height 157.141. No horizontal overflow. Header return succeeds, scroll 0, original globe mutation false.

Review screenshots: `work/screenshots/thailand-separated-logo-2026-10-20/`. These are observations, not every frame of a recorded video. New source/derivative are local review only; no file deletion, runtime fallback, push, publication or deployment. User visual acceptance remains pending.

390px re-entry also completes with the exact same foreground bounds as direct admission. Restored the user's viewport and left the Thailand hero open. Final browser error/warning log is empty. `git diff --check` passes; no test or harness files were created. Final screenshot: `final-hero.png` in the new screenshot round.
