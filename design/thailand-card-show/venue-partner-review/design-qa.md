# Venue exterior and black-background detail — 2026-10-20

Gavin requested QSNCC exterior imagery and more considered black-background detail, supplying the proposal's slide 13 and two Binance campaign references. This is a focused refinement of the existing page and its supplied references; no new AI scene or concept image was generated. Final visual acceptance remains Gavin's decision.

## Implementation and reference comparison

- Uses QSNCC's real official exterior photograph, showing the curved facade, QSNCC sign and arrival plaza in the same reference angle as the proposal. Primary gallery image is the exterior; the existing Event Hall B2 interior remains visible as a smaller supporting photograph, with separate clear captions and official source links.
- Selected source: official exterior gallery's `Exterior2.jpg`, downloaded without retouching. Original preserved at `work/references/qsncc-exterior-2026-10-20/03-official-exterior.jpg`. Runtime derivative: `src/flagship/assets/thailand/qsncc-exterior-1280.webp`, 1280×698, 101330 bytes, Sharp resize/WebP quality86 only.
- Official gallery/source inventory is retained in `work/references/qsncc-exterior-2026-10-20/sources.json`. Other downloaded official views remain reference files; none were deleted. These are official photographs, not AI-generated candidates.
- Partner background keeps the black base. Three cropped, angled FLAGSHIP/CARD SHOW/THAILAND word rows use roughly 4.7% white, with a vertical mask fading them behind lower content; two restrained warm radial glows add corner depth. This follows the supplied low-contrast brand-type and corner-light references without copying Binance text/branding.
- Existing yellow heading, sponsor hierarchy, original partner logos, provisional lineup and unrevealed slots remain. No interior globe, extra card-scene illustration, one-sided colored stripe, new claim or UI control is introduced.
- Decoration is a separate aria-hidden, pointer-events-none component and responsive stylesheet. Foreground content remains independent at a higher layer; mobile crop and text scale are explicit. All details are static; no animation loop/RAF or new library is added.
- Venue gallery, photos/attribution and partner decoration are separate small components/styles. Existing maps, travel directions, event date/time, hero, globe and partner-before-venue order remain intact.

## Browser review

Used IAB, not external browser automation. Inspected supplied Binance screenshot with `view_image`, then native 1194×900 screenshots of partners and venue with `view_image`. Compared: black/low-contrast type relationship; warm corner light; yellow header hierarchy; sponsor logo clarity and scale; background crop and fade; real building/photo framing; exterior/interior captions; unchanged controls/navigation. The focused implementation follows the supplied references with the explicit FLAGSHIP substitutions above. No known material clipping/visual defect remains in inspected states; this does not imply user acceptance.

Desktop: both gallery images load at their expected natural dimensions (1280×698, 1500×1000). Exterior points to official exterior gallery; interior points to official B2 venue page. Partner logos and actual names remain foreground content.

390px: exterior350px wide, interior110px wide; both load. No horizontal overflow for Traditional Chinese, English or Korean. Background is clipped within partners; decorative content has aria-hidden=true and pointer-events=none. Typography, captions and language/menu navigation remain usable. Final browser warning/error log empty. Restored viewport and Traditional Chinese; preview left on venue.

Screenshots retained as review deliverables:
- `work/screenshots/thailand-partners-detail-2026-10-20.png`
- `work/screenshots/thailand-partners-detail-mobile-2026-10-20.png`
- `work/screenshots/thailand-venue-exterior-2026-10-20.png`
- `work/screenshots/thailand-venue-exterior-mobile-2026-10-20.png`

`pnpm build:art-review` and `git diff --check` pass. Main JS495.02kB / gzip160.11kB; edition JS114.32kB / gzip35.22kB. Named media17, 4103894 bytes, within budgets. No source/concept image added to public/dist; only the optimized selected official photo is imported. No fallback, test/harness file, generated-candidate deletion, Git push, CDN upload or deployment. Earlier pending AI candidates remain unchanged.

## Superseding placement correction — 2026-10-20

Gavin found the branded decoration behind sponsors too busy and explicitly pointed to the introduction/event-figure/highlights opening as its destination. Moved the single decorative layer there; partners now have background-image:none and zero decoration nodes. Split the existing introduction from the hero into its own component, preserving every copy string and statistic. An isolated wrapper joins intro/highlights visually; the atmospheric layer has bounded height and fades before the film content. Components/styles were renamed to opening-specific names; no partner decoration remains. Venue exterior/interior and section order remain intact.

IAB1194×1000 and390×844: exactly one opening layer, zero partner layers, no horizontal overflow. Real highlight preview remains paused=false/readyState4 after pointer input. Final browser error/warning log empty; viewport restored and preview left at the intro. `view_image` inspected both opening and clean-partner screenshots. Build and diff checks pass; no fallback, test files, image generation, deletion, push or deployment. Screenshot deliverables: `thailand-opening-detail-2026-10-20.png`, `thailand-opening-detail-mobile-2026-10-20.png`, `thailand-partners-clean-2026-10-20.png` under work/screenshots. User visual acceptance remains pending.

## Lower-highlight continuity correction — 2026-10-20

Gavin pointed out the lower highlight rows remained visually empty. The original atmosphere was restricted to a short, fading layer at the top. The same decorative component now covers the whole intro/highlights wrapper: the opening treatment stays localized, while a separate lower word pattern repeats the existing three campaign phrases. Two intersecting masks soften the center behind copy and fade the top/bottom; restrained edge light continues through the lower rows. The lead padding drops from34px to24px and desktop row gap from52px to38px. Mobile retains a36px row gap and uses a smaller crop of the same pattern. No new scene, image, animation or dependency.

IAB1194×1000: inspected the lead-to-second-row transition and final two highlights; the faint pattern continues through every row and fades before Seoul recap. IAB390×844: inspected the second/third highlight transition, with clear foreground copy and no horizontal overflow. Partners still have zero decorative layers and background-image:none. Pointer-triggered video remains paused=false/readyState4; console warning/error list empty. Review build/media budgets and git diff --check pass. Screenshots: `work/screenshots/thailand-highlights-continuity-2026-10-20.png`, `work/screenshots/thailand-highlights-continuity-mobile-2026-10-20.png`, `work/screenshots/thailand-highlights-continuity-end-2026-10-20.png`. Viewport restored; preview retained for review. No fallback, test files, generated assets, deletion, push or deployment. Visual acceptance remains Gavin's decision.
