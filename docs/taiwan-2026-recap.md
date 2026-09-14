# Taiwan 2026 event recap

The Taiwan page now documents the completed September 5, 2026 event. Its three highlights use original event photography selected from the user's [FLAGSHIP TAIWAN Drive folder](https://drive.google.com/drive/u/0/folders/1aVw4B6LFpN2EhuKtmGVrxH1L6LBfqqiN).

## Photograph selection

| Highlight | Original | Reason | Source |
| --- | --- | --- | --- |
| Gifts and on-site surprises | DSC05999.jpg | A smiling attendee holds cards beside the prize drum, with other visitors around him. | [Drive original](https://drive.google.com/file/d/1u26E0A8hzJlewvVSEtSJEFsIJ9mCuQuy/view) |
| Champion Challenge | DSC05693.jpg | Multiple real matches on the event stage; players and playmats remain visible. | [Drive original](https://drive.google.com/file/d/1TZQ97X2yM5XKXSo7nHIbTLjp9MTbZ7q_/view) |
| 30+ TCG vendors | DSC05818.jpg | A tighter elevated view fills the frame with visitors while preserving the stage and vendor context. | [Drive original](https://drive.google.com/file/d/1yuk3WfcNAfQzFVkpGd2iXVbVmQEUHb2G/view) |

The initial selection used four sampled contact sheets from the prior 400-photo Remotion inventory. The vendor image was then selected from the existing local 634-photo inventory in `work/photo-review-2026-09-13/` by comparing the elevated hall sequence around DSC05815–DSC05818. This is not a claim that every original was individually inspected. The photographs show the activity; they do not independently establish the recipient's prize, match results, or the vendor count. The 30+ count and the three activity themes are retained from the existing event description.

DSC05999.jpg and the earlier DSC06029.jpg remain in `/Users/gavin/Documents/ChatGPT/remotion/flagship-taiwan-recap/work/source-photos/`. DSC05693.jpg and DSC05818.jpg were fetched from the same Drive folder and are kept in `work/source-photos/taiwan-2026/`. For DSC05818, the Drive connector confirmed the JPEG metadata and 3,428,499-byte size but returned only an authenticated file reference without a local workspace path. The original Drive download URL supplied the same 3,428,499-byte JPEG; this direct download was the required materialization fallback. No replacement image or generated image was used.

The adopted vendor photograph, DSC05818.jpg, is retained in `work/source-photos/taiwan-2026/`. Its 6865 × 4577 original is resized proportionally. The vendor card keeps the full 3:2 frame at desktop, tablet and mobile widths.

## Output and ownership

Only resized WebP derivatives belong in `src/assets/taiwan-recap/`. Original photographs are not copied to `public/` or bundled into the site. EXIF orientation is applied before conversion, metadata is omitted, and the original 3:2 composition is retained. Pillow uses Lanczos resizing and WebP method 6, with quality 84 for gifts/challenge and 82 for the vendor overview.

| Derivative | Dimensions | Bytes |
| --- | --- | ---: |
| taiwan-2026-gifts-720.webp | 720 × 480 | 61,720 |
| taiwan-2026-gifts-1280.webp | 1280 × 853 | 164,504 |
| taiwan-2026-challenge-720.webp | 720 × 480 | 56,970 |
| taiwan-2026-challenge-1280.webp | 1280 × 853 | 147,740 |
| taiwan-2026-vendors-840.webp | 840 × 560 | 97,620 |
| taiwan-2026-vendors-1680.webp | 1680 × 1120 | 279,238 |

The three smaller variants total 216,310 bytes; the three larger variants total 591,482 bytes. The browser selects a size using `srcset`, viewport width and device pixel ratio. Vite emits content-hashed files; per-file limits are in `src/flagship/data/artwork-budget.json`.

- `src/config/taiwanRecapMedia.ts` owns responsive sources. The existing Taiwan loading gate preloads these exact sources instead of the three old concept images.
- `src/flagship/taiwan/data/highlights.ts` owns photo placement. Original preview visuals stay in `src/data/eventHighlights.ts` for other editions.
- `src/i18n/taiwanArchiveContent.ts` and `taiwanArchiveFaq.ts` own the completed-event copy. Original event copy remains available to the separate Korea preview.
- `EventHighlightsGrid` and `highlights.css` place readable text outside the photographs, with two cards followed by one wide card on desktop and one column on mobile.
- The Taiwan header, event pass and mobile actions lead to the recap or official updates. The completed registration embed and calendar action are removed from the mounted Taiwan page; historical date, partners and venue are retained.
- `TaiwanRecapClosing` closes with thanks and the official updates link.

This change is local. A review build is not a production deployment. No original photos or existing project artifacts were deleted, and no temporary test scripts were added.

## Local validation

- `npm run typecheck`, `npm run build:art-review`, and `git diff --check` pass.
- Codex in-app browser: desktop 1440 × 1000 and mobile 390 × 844; Traditional Chinese and English.
- Confirmed three decoded real photographs, working highlight anchors, language switching, and the completed-event FAQ category.
- No horizontal page overflow at the checked widths; mobile image/content rectangles do not overlap.
- A fresh compiled-page load at `http://127.0.0.1:4176/taiwan/` had no app warnings/errors or framework overlay. No Luma registration links remain on the mounted page.
- The build's named-media audit passes. The existing separately loaded world chunk remains above Vite's 500 KB warning threshold; this task does not change the world runtime.
- No browser test scripts or screenshot files were created in the repository. Existing shared review-build output remains available for the local preview.
