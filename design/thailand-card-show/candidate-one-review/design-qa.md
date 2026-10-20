# Selected candidate one — restoration QA

Navigation follow-up: the prior hero check missed the full world roundtrip and the removed independent emblem broke the handoff lookup. This has now been repaired and tested from the direct page, normal entry and FAQ on mobile/desktop layouts. Cause, implementation and evidence: `navigation-qa.md`. The selected visual design is unchanged by that repair.

Status: selected design implemented and internally verified. Gavin explicitly prefers candidate 1; acceptance of the final website remains his decision. New artwork retention is a separate pending choice. No push, upload, deployment or candidate deletion/promotion occurred.

Selected concept: `work/generated-images/2026-10-20-thailand-card-hero/01-card-hero-concept.png`, 1536×1024. Unlike the previous iteration, its complete background and composition are the implementation reference. The former omission of texture, diagonal light and reflective ground is revoked.

## Fidelity ledger

| Point | Selected concept / former mismatch | Restoration and browser evidence |
| --- | --- | --- |
| First viewport geometry | 85px header; yellow hero ends at y919. Former layout had a narrow max-width copy column and mismatched scale. | Native 1536px check: header 85px, hero y85–918.9, copy x61.4. Hero uses the selected art aspect ratio; copy uses a 4% gutter instead of the former max-1280px container. |
| Golden material / light | Selected texture, diagonal light/strokes and reflective floor were omitted before. | The complete opaque artwork extracted by built-in Image Generation now retains all three. No flat gradient replaces the background and there is no tint or overlay on desktop artwork. |
| Cards and event identity | Former isolated fan and foreground emblem were independently resized/repositioned. | One complete artwork preserves the selected combined card/identity composition. Red, silver/black and blue remain in the original foil subject; gold frames/reflections remain. No duplicate foreground emblem is overlaid, and there is no globe. |
| Display type and logistics | Former title, date, metadata and controls were too small / misaligned relative to the selected concept. | H1 box begins near y200, with optical alignment matching the italic reference; native Barlow Condensed 900. Date approximately 55px; venue/time 26px. Matching larger header wordmark, nav and CTA. All copy is real DOM text. |
| Buttons / icons | Selected primary CTA near x60/y688, 294×74; explore beside it. | Native CTA and iconoir arrows restored to the selected scale/spacing. Proportional desktop scaling preserves positions. At 1194px, CTA x47.8/y539.8, 228.5×57.5; all controls remain visible and clickable. |
| Transition heading | Former intro showed a left headline and stats immediately across the bottom viewport. | Centered gold 下一站，曼谷相見。 with balanced decorative rules matches the selected first viewport. Existing body and planned/expected figures remain below it; no factual content was deleted. |
| Responsive continuity | Desktop concept needs a usable mobile continuation. | Mobile/tablet crop the same complete art above native copy. A 24px bottom edge blend joins the reflected ground to the same gold field while preserving the emblem/reflection; desktop art is unaltered. Chinese/English/Korean at 390px all have document width equal to viewport width, with complete side-by-side actions. |
| Copy / behavior | Required native UI, existing links and source facts. | Above-fold DOM copy comparison found no invented, removed or renamed title/date/venue/time/CTA/ticket-note strings. Header anchors, language selection, menu open/close, explore and back-to-top work. The real highlights heading lands visibly at y124 after Explore. |

## Browser and image review

IAB was used directly; no alternate browser-control fallback. Latest retained captures under `work/screenshots/thailand-candidate-one-2026-10-20/`:
- `native-hero.png`: 1536×1024, the selected concept's native dimensions.
- `desktop-hero.png`: 1194×853.
- `tablet-hero.png`: 768×1024.
- `mobile-hero.png`: 390×844.

`view_image` was used on the selected concept and the latest native, tablet and mobile browser renders in the same review pass. Composition, typography, palette/materials, subject proportions, whitespace, icon/CTA treatment and copy were compared directly. The implementation now follows the selected reference rather than the revoked simplified interpretation. The standalone art is an Image Generation extraction, so it is not a claim of pixel-identical source bitmap preservation; its full selected visual treatment is retained. Native type metrics and the responsive stack are the necessary HTML/responsive implementation details.

The new hero has one complete loaded artwork, with no rasterized UI text/controls. Hero/route ancestors have opacity 1 and no filter/transform after admission. The accepted outer globe/entry implementation and highlight playback implementation were not modified. Full route/header interactive behavior remains present.

Final warning/error log was empty. The viewport was reset, the preview left at `#top` in Traditional Chinese and marked as a deliverable. Both generated PNG and WebP remain preserved after Gavin explicitly deferred retention until viewing the completed website.

## Build and scope

- `pnpm build:art-review` passes TypeScript, Vite, generated route metadata, strict CSP and asset budgets.
- New complete-art review WebP: 272,572 B. Current review output: 16 named hashed media files, 4,026,206 B total under the existing 11,000,000 B budget. The old 330,354 B isolated-fan WebP remains preserved but is absent from the bundle.
- Concepts, raw PNGs and prompts stay under work, outside public/build output. All generated originals and previous rounds remain intact. No file deletion or promotion happened.
- Hero art, native hero copy and intro styling have separate files. No runtime/data fallback or test/harness files were added. Retained screenshots/docs are review deliverables, not disposable tests.
- `git diff --check` passes. Production gate remains active; no Git push, CDN upload or deployment.
