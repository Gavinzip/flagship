# Typography and motion review evidence — 2026-10-20

Status: local implementation ready for Gavin's visual review. Build and browser QA do not constitute user acceptance. No Git push, CDN publication or deployment.

## Fidelity inspection

Used the real IAB tab and saved browser screenshots; no alternate browser automation or screenshot fallback. Used `view_image` on working concept `work/generated-images/2026-10-20-thailand-type-motion/02-editorial-type-concept.png`, the actual same-size 1484 × 1060 implementation screenshot, and final 1194 × 853 screenshot. Also reviewed 390 × 844 and 768 × 1024 layouts.

Compared these concrete points:
1. Composition: three foil cards and the existing gold treatment remain image-led on the right, with native left-side content. No new image overlay or ornamental scene.
2. Independent logo: source coordinates are unchanged, with desktop x589.277 / y350.609 / 463.008 × 308.672 at 1194px. No baked emblem or emblem reflection remains.
3. Typography: title case and upright neutral sans replace all-uppercase condensed italic 900. The main title is 97.908px/600 at 1194px; Card Show is 53.73px/500. This intentionally uses a lighter first line than the generated concept, matching the user's request to reduce poster weight.
4. Vertical rhythm: first title line begins around y220; date around y414, then venue/time, actions around y539 and note around y625. The dark next-section preview remains in the first viewport.
5. Controls/icons: retained rounded primary CTA, quieter explore link, coherent Iconoir arrows, real URLs and full keyboard focus outlines. CTA gold trace follows its full perimeter and activates only on hover/focus.
6. Palette and imagery: existing yellow/gold, native red/blue within cards/logo, black header and dark lower sections. No recoloring or additional colored bars.
7. Intro: clean upright gold heading without flanking bars; existing paragraph and facts remain. Other section headings/subheads use the same less-heavy type system.

Above-the-fold copy diff: only `CARD SHOW` → `Card Show` and `THAILAND` → `Thailand`. Nav labels, date, venue, time, CTA, explore link and ticket note remain exact. No new eyebrow, badges, event claims or sponsor claims.

Intentional deviations from the working generated reference: retained the exact real brand emblem/art rather than the generator's reinterpreted mark, existing responsive header geometry, lighter Card Show weight, and existing body text sizing. The current working design is faithfully implemented with these explicitly recorded refinements; no known material clipping, overflow or unresolved visual defect remains in the inspected states. It is not described as a user-approved new design.

## Interaction and state evidence

- Direct reload: admission completes, `data-presented=true`; both native title parts observed in `in` phase after release and `rest` after completion.
- Return from FAQ: expanded a real FAQ answer, with hero completely offscreen (bottom -5160.281px), then used header home link; returned to globe successfully.
- Globe re-entry: at geographic handoff, gold mutation=true, static foreground logo hidden, `data-presented=false` and both title phases still `from`. After transfer release, presentation=true and titles complete. Motion is not consumed invisibly behind the geographic cover.
- Highlight video: real pointer interaction produced a muted video with paused=false, readyState=4 and currentTime advancing. Existing automatic preview contract remains.
- 390px: native hero fits; English and Korean content inspected without horizontal overflow. Corrected English heading alignment to remain centered while wrapping by words. Chinese/Korean animation supports letter wrapping. Mobile menu/language selection remains functional.
- 768px: no horizontal overflow, scroll 0, card foreground/background crop remains synchronized.
- Final user viewport restored to 1194 × 853, Chinese `#top`, scroll 0, no horizontal overflow, presentation=true, both title phases `rest`.
- Final browser warning/error log is empty.
- Reduced-motion final-state path, CSS animation disable rules, observer disconnect and timer cleanup were inspected in source. IAB offers no reduced-motion emulation capability, so changed-OS-preference behavior was not claimed as interactively tested.

## Build and asset review

`pnpm build:art-review` and `git diff --check` pass. Main JS 494.96kB / gzip160.09kB; edition JS112.91kB / gzip34.87kB. Named media16, 4,002,564 bytes; clean card background248,930 bytes. No new GSAP/animation runtime dependency. No concept PNG or source PNG imported into the application/public/dist. All review images are retained deliverables; no test/harness files were created.

Retained clean background candidate 1 was moved to `design/thailand-card-show/source-artwork/thailand-card-hero-clean-source.png`, with optimized runtime image `src/flagship/assets/thailand/thailand-card-hero-clean.webp`. This single-image round had no other candidates, so no image deletion occurred. New type concepts 1/2 and all earlier undecided rounds remain preserved pending explicit file-retention choice. Platform-generated copies were not deleted.

Source-retrieval backup: MCP named registry lookup lacked configuration; the direct URL metadata succeeded; official shadcn4.22.0 CLI view retrieved the exact current TS-CSS source. Runtime fallback introduced: none. Registry response, SHA-256 provenance and MIT+Commons Clause license retained.

Screenshots: `work/screenshots/thailand-type-motion-2026-10-20/`, especially `final-hero.png`, `native-concept-size.png`, `mobile-hero.png`, `tablet-hero.png`, `highlights.png` and the entry observation. These are screenshots, not a continuous animation recording.
