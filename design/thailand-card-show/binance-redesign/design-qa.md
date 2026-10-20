# Thailand Binance redesign QA — 2026-10-20

Historical iteration: the hero was subsequently redesigned using the PPT's three gold-framed cards. Current hero evidence is in `../card-hero-review/design-qa.md`; downstream verification below remains applicable.

Status: implementation, local build and browser visual/interaction review completed. Gavin's latest correction removes the interior globe; outer globe navigation and entry remain preserved. User visual acceptance and candidate retention remain pending.

## Reference and implementation ledger

| Area | Reference | Implemented / adaptation |
| --- | --- | --- |
| Hero composition | 01-hero-concept.png and Binance official hero | Full yellow graphic poster, large native black CARD SHOW / THAILAND, original emblem, date/venue/time and real tracking CTA. Existing simple FLAGSHIP home link preserved. Native Arial Black metrics used to keep headline within its grid column; emblem is contained without clipping. |
| Background material | User's latest interior-globe correction | The hero is native yellow with the original emblem; its halftone globe image, import, styles and media-budget entry were removed. All candidate files remain preserved. Prior generated venue/atmosphere images are also disconnected and absent from output. Highlights and partners have no background image. |
| Highlights | 02-highlights-concept.png | Centered gold heading, large first film, open native captions and four smaller films. Original exact copy is used instead of generated paraphrases. Media crops respect source 16:9 on smaller films; first film is cinematic on desktop and 16:10 on mobile. Shared Korea-style hover playback component is unchanged. |
| Authentic photo recap | 04-seoul-recap-concept.png | Original three Seoul review derivatives and factual captions remain; generated photo recreations are not consumed. Existing mosaic retained with a larger gold heading. |
| Partners / FAQ | 03-partners-faq-concept.png | Original Renaiss/Vinci logos, open columns, three native coming-soon slots and neutral dividers. No outer card frames or background art. Native FAQ buttons and answers remain. |
| Section rhythm | 01/03/04 concepts and original accepted venue/access | Yellow hero, dark intro/media/partners, complete yellow venue region, secondary dark FAQ, yellow footer. Existing map, address, floor distinction and route content preserved. Red/blue stay in original logo, actual films/photos and the previously accepted transport blocks. |

## Checks completed

- TypeScript, Vite, generated edition metadata/CSP and named asset-budget checks passed in `pnpm build:art-review`.
- Named hashed media after globe removal: 15 assets, 3,753,634 B. Concept PNGs/prompts and unused halftone artwork remain excluded from build/public output. The locally served Chinese display-font subset is 52,692 B, with source/license and a manual update script.
- Local review server responds HTTP 200 and HTML `Cache-Control: no-cache` on port 5176.
- `git diff --check` passed. No new fallback was introduced. No test/harness files were created. Review images and documentation are retained deliverables under the user's image-management rule, not disposable tests.
- No outer-globe or entry-animation file was edited. No Git push, CDN upload or deployment happened.

## Browser and visual verification

The initial Browser Use URL-policy rejection was resolved after Gavin manually reopened the preview and confirmed it. The resulting IAB tab was read normally; no alternate browser-control workaround was used.

- Desktop review at 1194×853 and each concept's native dimensions completed; actual renders were inspected with `view_image` against the working concepts. Latest globe-free hero captures replaced the earlier desktop/native/mobile captures. The concept-to-product globe omission is explicitly user-directed.
- Chinese section typography now uses the actual locally served Noto Sans TC 900 subset; browser font checks succeeded. Hero headline is capped at 108px and fits its column at 1505px. Date uses Arial Black; the mobile highlights introduction uses balanced wrapping.
- Mobile 390×844 checks in Traditional Chinese, English and Korean found no horizontal overflow or clipped section text. Mobile navigation closes after anchor selection. Latest globe-free hero also has document width 390px at viewport width 390px.
- The hero contains exactly one loaded image, the original Thailand emblem; `.th-hero-graphic` count is zero on desktop and mobile. Highlights and partners use no background images.
- Original five film posters, three Seoul photos, venue photo and two partner logos loaded. The first film auto-played on pointer entry (readyState 4, muted, playing, 854×480 source); leaving the section unmounted playback. Shared Korea-style media implementation remains unchanged.
- Ticket FAQ opened its actual unannounced-ticket answer. Google Maps rendered QSNCC; address, MRT Exit 3 and the two activities' separate floors remain visible. Browser error/warning log was empty.
- Screenshots are retained in `work/screenshots/thailand-binance-redesign-2026-10-20/`. Viewport was reset and the current preview left at the top for Gavin's review. Internal visual checks do not imply user design acceptance.

Concept native dimensions: hero 1505×1045; highlights 1435×1096; partners/FAQ 1320×1192; Seoul recap 1487×1058. Artwork 1638×960. Active spec: `design-spec.md`; prompts and five preserved candidates: `work/generated-images/2026-10-20-thailand-binance-redesign/README.md`.
