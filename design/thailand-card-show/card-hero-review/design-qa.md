# Thailand card hero QA — 2026-10-20

Historical QA only: Gavin rejected this simplified implementation and selected the complete candidate 1. The internal fidelity claim below did not establish user acceptance and is superseded by `../candidate-one-review/design-qa.md`. Gold texture, diagonal light, ground reflections and the selected composition must be restored.

Status: local implementation and internal visual/interaction checks complete. Gavin will decide visual acceptance and candidate retention after viewing the website. No image has been promoted/deleted; no push, upload or deployment occurred.

## Reference and fidelity ledger

Working concept: `work/generated-images/2026-10-20-thailand-card-hero/01-card-hero-concept.png` (1536×1024), generated with the organizer PPT, original emblem and additional official Binance campaigns. This is a working reference authorized by the redesign request, not an accepted final design.

| Comparison | Concept / requirement | Latest native render and action |
| --- | --- | --- |
| Composition | Strong italic type left, one large card fan with emblem at right | Native two-column composition; red/black/blue fan is one subject. Existing max-1280px container keeps copy inside the site gutter rather than the generated mockup's wider edge alignment. |
| Typography | Heavy condensed italic CARD SHOW / THAILAND and strong date | Existing local Barlow Condensed 900 is rendered natively with italic styling; date uses Arial Black italic. No generated text becomes UI. Both H1 lines fit at 1194px and 768px; mobile remains two deliberate lines. |
| Palette / background | Yellow-dominant campaign, red/blue in actual card material | Native yellow tonal field sampled from concept; no overlay on the card image. Red/black/blue foil and gold bevels derive from the deck's emblem. No globe, venue room, speed streaks, floor, arbitrary colored blocks or side stripe. |
| Artwork / identity | Three gold-framed cards and original recognizable emblem | Transparent image retains its alpha and color; original selected emblem is unchanged as a separate foreground. Initial tablet emblem clipping was fixed by adjusting its width/left offset and lifting the tablet position. Final 768px emblem bounds x348–736, inside viewport; 1194px bounds x542–1138. Background blue-card cropping is intentional, matching the concept; identity text is complete. |
| Exact copy / controls | Existing title, date, venue/time, tracking, explore and ticket-note strings | Above-fold DOM copy comparison found no added/removed/renamed copy. Existing header labels and iconoir arrow controls retained. Tracking remains the actual official updates URL, with no invented booking claim. |
| Responsive / spacing | One clear subject, no art/copy collision | Checked 1536×1024, 1194×853, 768×1024, 390×844 and the user's current 541px viewport. Document width equals viewport width. Mobile artwork stacks above native centered copy and complete actions. |
| Motion / navigation | Restrained art reveal; functioning explore action | Card entrance settles to an identity transform, original emblem reveal retained; reduced-motion CSS disables new animation. Explore scrolls to the real highlights heading (visible y124); back-to-top returns to hero. No video or outer-globe implementation was changed. |

## Evidence

Latest IAB captures in `work/screenshots/thailand-card-hero-2026-10-20/`:
- `native-hero.png`: 1536×1024, matching working-concept native dimensions.
- `desktop-hero.png`: 1194×853.
- `tablet-hero.png`: 768×1024.
- `mobile-hero.png`: 390×844, Traditional Chinese.

Used `view_image` on the working concept and latest native/mobile screenshots in the same final review pass; tablet had also been inspected after the clipping repair. The implementation faithfully follows the written working spec, with the explicit adaptations above. No unresolved internal clipping, loading, type, palette or control mismatch was found. This does not establish Gavin's acceptance of the design.

Mobile English and Korean also retain complete hero copy, side-by-side actions and no horizontal overflow (390px document and viewport). Both hero images loaded at natural width 1536px. Final browser warning/error log was empty. The viewport was reset to the user's current dimensions and the tab retained at the top for review.

## Build / files

- `pnpm build:art-review` passed TypeScript, Vite, edition metadata/CSP and named/total asset budgets.
- The new alpha WebP is 330,354 B. Review build has 16 named hashed media files totaling 4,083,988 B, under the existing 11,000,000 B total budget. Raw PNGs, prompts and concept screenshots remain outside public/build output.
- Components, local review imports and hero styles have separate ownership. No runtime/data fallback or new test/harness file was introduced. These four screenshots and design records are retained review deliverables, not disposable tests.
- All current and previous generated candidates and tool originals remain preserved. Gavin deferred this round's retention decision with “先看完成網頁再決定”. Prompt files, tool mode and source paths are recorded in the candidate README.
- `git diff --check` passed. Release remains gated pending image review and normal CDN/release steps; no Git push or deployment was attempted.
