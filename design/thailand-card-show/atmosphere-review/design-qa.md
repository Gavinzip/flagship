# Thailand atmosphere correction QA — 2026-10-20

final result: rejected by Gavin; both backgrounds withdrawn from the page and review bundle

Gavin rejected the highlight and partner backgrounds as chaotic and unattractive. Both have been disconnected and the page now uses a plain dark review baseline. All generated files are preserved. The checks below document the superseded implementation; passing them did not establish visual acceptance. No replacement image has been generated while the next visual direction is being clarified.

## Withdrawal verification

- Removed both generated image imports, rendered art layers, sticky positioning and fade layers. The highlights, recap, partner logos, FAQ and transport content remain intact.
- `pnpm build:art-review` and `git diff --check` passed. The review build now has 16 named hashed media assets totaling 3,968,040 B; both rejected WebPs are absent.
- Browser confirmed both section groups have `backgroundImage: none`, zero `.th-scene-art` layers and no horizontal overflow at 1280px. Screenshots: `work/screenshots/thailand-background-withdrawal-2026-10-20/highlights.png` and `partners.png`.
- No replacement image was generated, no file was deleted or promoted, no fallback was added, and no push/deployment occurred. Plain dark surfaces are a review baseline, not a completed or accepted design. The subsequent Taiwan-art-versus-Seoul-photography question was superseded by Gavin's reminder to follow the already supplied Binance reference. See `../binance-reference-review.md` for the live official-site comparison.

## Direct visual comparison

Used `view_image` on Taiwan's original highlight/vendor artworks, the organizer deck, both new 1672×941 PNG backgrounds and their rendered desktop captures. IAB captured the page at 1194×853, 1448×1086 and 390×844; final desktop evidence uses the user's 1194×853 viewport. No browser fallback was used.

| Comparison | Evidence / correction |
| --- | --- |
| Palette | All five highlight surfaces compute to rgba(8,13,23,.91). No solid red/blue variant remains. Gold/yellow is in real rendered gallery lighting; red/blue remain physical banner and light details. The user-approved transport colors are unchanged. |
| Background / asset blend | Candidate 1 continues behind both highlights and Seoul recap; candidate 2 behind partners and FAQ/footer. Sticky image top was 78px inside the active scene. Neutral edge fade and translucent native surfaces preserve readable white type. Mobile framing moved from the empty center to 20% to show gallery/card detail. |
| Layout / completeness | Five full highlight descriptions, real recap photos and all venue/map/transport information remain. Partner area now has two large primary logo positions and three pending positions, following Gavin's exact clarification. No Taiwan vendor wall was copied. |
| Typography / copy | Rejected heading replaced with "卡展亮點". Above-the-fold hero/nav/action copy has no additions. Sponsor labels are 主辦單位 / 主要贊助商, native text in three languages. Original logo lettering is retained. |
| Logo / crop fidelity | Renaiss and Vinci original sources loaded. On mobile: Renaiss 285×49, Vinci 266×97; no distortion or clipping. Renaiss has one accessible name and an aria-hidden icon overlay. |
| Interaction / responsive | First shared film reached readyState=4, muted=true, paused=false, currentTime=.292 after pointer entry; moving to header/another section stopped it. Art layers have no pointer interception. Mobile menu closes after navigation. FAQ ticket answer expanded correctly. |

## Verification

- All generated scene images and original partner logos loaded on the active sections. Offscreen scene image is intentionally lazy-loaded.
- 390px zh-TW/en/ko pages each had document width=viewport width=390. Pending slots measured width=scrollWidth=107px, including English TO BE REVEALED. No clipped primary text, horizontal overflow or broken logo was found.
- Checked current browser console: no warnings/errors observed.
- `pnpm build:art-review` passed TypeScript, Vite, metadata/CSP generation and asset-budget assertion. Build contains 18 named hashed media assets, 4,632,034 B. The two review WebPs add 663,994 B; PNG candidates/prompt files are excluded.
- `git diff --check` passed. No test/harness files were created, no new fallback was introduced, and no image was deleted or promoted. Screenshots are retained review deliverables.
- Source files for outer globe, camera/entry and the venue/access section were not changed in this correction.

## Evidence and pending gates

`work/screenshots/thailand-atmosphere-2026-10-20/`: desktop-highlights.png, desktop-partners.png, mobile-highlights.png, mobile-partners.png.

`work/generated-images/2026-10-20-thailand-atmosphere/README.md`: two candidates, exact prompts, source references and tool-original paths. A retention question is pending for IDs 1/2. All older image rounds remain intact. No Git push, CDN upload or production deployment happened.
