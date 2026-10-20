# Poster fragments and scene composition

**Current handoff (2026-09-14):** Korea assets are indexed in [the shared Korea asset folder](../design/korea-card-show/README.md), with stable IDs 01–12 and a [thumbnail gallery](../design/korea-card-show/index.html). `data/artwork-review.json` records 09–11 as the three selected 2048 × 1152 scroll plates; the pending-selection paragraphs below describe the earlier September 11 review. See [the current page findings and implementation record](../design/korea-card-show/page-review.md).

The 2026-09-11 user correction rejects a single fixed poster repeated behind the whole site and a white reading overlay. The new composition derives separate visual layers from the original supplied Korea poster. Collectible Con remains a content-only reference; its style is not part of this composition.

## Visual sequence

1. **Sky opening**: sky extension, original supplied logo, and independent empty-holder cutouts. Hero information sits below the logo without a glass slab.
2. **Card-frame close-up**: a separate transparent holder on the right, brand introduction on the left. The centre is empty. Mobile stacks the text and object.
3. **Card-show experience**: existing Taiwan event visuals have a defined image area, adjacent readable copy and four tabs.
4. **Global editions**: original Taiwan and Korea event art in independently selectable chapter cards; more-country copy stays non-specific.
5. **Korea skyline**: a separately composed city panorama places the skyline on the lower/right side. Desktop information occupies the clear left sky; on mobile the skyline moves below the information.
6. **Waterfront close-up**: a separate reflection/paving detail follows the community text. FAQ and footer continue its blue palette.

No fixed world image or whole-page reading veil is mounted. CSS alpha masks blend only the local outer image joins into sampled sky colours; the image centres retain their detail. The original logo and Taiwan site are unchanged. The previous 3D holder is no longer mounted; this is an intentional art-direction change, not a render-error fallback.

## Asset provenance and pending selection

Built-in imagegen edited the user's original 1600 × 893 poster as its reference. These are generated extensions/extractions, not a claim of pixel-exact extraction of every scene object. The separately supplied original logo is not regenerated.

All candidates remain in `work/generated-images/2026-09-11-poster-fragments/`:

| No. | File | Purpose | Original dimensions |
|---|---|---|---|
| 1 | `01-sky.png` | Sky opening | 1672 × 941 |
| 2 | `02-seoul-waterfront.png` | Korea information panorama | 1672 × 941 |
| 3 | `03-open-card-holder.png` | Independent transparent foreground frame | 1024 × 1536 |
| 4 | `04-river-reflections.png` | Water and promenade close-up | 1672 × 941 |

Exact generation prompts are in `prompts.json` in the same directory. Candidate 3 has an RGBA channel with a fully transparent centre. Native-resolution WebP review encodes preserve alpha; no resizing or content edits were applied during encoding. The PNG sources and the original generated-image cache files are retained. Nothing was deleted or promoted into final assets. An asynchronous selection question was presented to the user. No answer is assumed.

`artwork-review.json` continues to block production builds while selection is pending. It also records the previous review round rather than overwriting its history.

## Ownership

- `PosterScene.tsx`: one scene image per section, eager sky and lazy lower scenes.
- `CardFrameArtwork.tsx`: independent alpha artwork and bounded React Motion float; stops offscreen, under reduced motion, or when paused.
- `BrandIntroduction.tsx`: brand narrative and frame close-up.
- `poster-scenes.css`: section-specific composition and responsive art direction.
- `materials.css`: controls and small content surfaces.
- `world.css`: header atmosphere and ticker visibility only; the old world backdrop component was removed.
- `data/artwork.ts`: explicit candidate mapping.

The old holder source remains available as project history; the app does not load its WebGL module. No new dependency or fallback was introduced.

## High-density Korea emblem edge repair

The supplied Korea emblem is a 1672 × 941 black-background PNG. The earlier page loaded a reduced 1400 × 788 opaque WebP and clipped it at runtime with a 3,381-point, pixel-stepped SVG outline. That combination retained black matte pixels and magnified the one-pixel staircase on light backgrounds.

`scripts/prepare-korea-emblem.py` now derives a 3344 × 1882 transparent WebP from the preserved supplied source in `design/source-artwork/`. It simplifies only the exterior matte, moves the matte one source pixel inside the black background fringe, and supersamples the alpha edge. The RGB artwork, aspect ratio, internal black areas, lettering and colours are not redrawn or recoloured. The old opaque WebP and outline remain available as source history; the outline is used only by the preparation script and is no longer mounted in the browser.

The deterministic edge audit is in `outputs/audits/2026-09-11-korea-emblem-edge/`. At the alpha boundary, the share of pixels below the dark-edge threshold changed from 21.23% to 4.19%. The before/after crop is stored beside the JSON report. The repaired WebP is 565,228 bytes at quality 92; it replaces the old 103,338-byte display derivative. The review build contains 1,945,528 bytes across six hashed WebP files, within the updated named and total budgets.

## Verification

The review build passes TypeScript, Vite, CSP/SRI and named asset checks. Six hashed WebP assets total 1,483,772 bytes. The new scene derivatives account for 1,130,406 bytes; original chapter artwork accounts for the remainder. Main JS is about 486 KB / 154 KB gzip, CSS about 154 KB / 31 KB gzip. There is no lazy 3D chunk in the active build. No raw PNG candidate is copied into the build.

Local browser checks covered 1440 × 900, 1237 × 863, 390 × 844 and 320 × 740, including Chinese, English and Korean. No horizontal overflow was observed. All four experience tabs were exercised, including the narrow Korean labels. FAQ selection opens one answer and closes the previous answer. Pausing returns all three independent holder images to `transform: none`; animation was restored afterward.

Switching to Taiwan displayed the original Taiwan event page with zero Korea poster scenes, then switching back restored Korea. All three environmental scene images loaded at 1672 × 941; no broken loaded image or browser warning/error was reported. Hero foreground holders are contained inside the artwork scene so they cannot overlap the metadata row at desktop or mobile sizes. The viewport override was reset after checking.

Screenshots are in `outputs/screenshots/2026-09-11-poster-composition/`: `00-desktop-full-page.png`, `01-desktop-home.png`, `02-desktop-brand.png`, `03-desktop-city.png`, `04-mobile-city.png`, `05-mobile-home.png`, `06-desktop-waterfront.png`, and `07-desktop-editions.png`. No temporary test files were created. OS reduced-motion emulation and physical-device GPU testing were not repeated; the existing shared reduced-motion guard remains in the React component.

This is a local review, not a pushed or deployed release, and not a claim of user acceptance.
