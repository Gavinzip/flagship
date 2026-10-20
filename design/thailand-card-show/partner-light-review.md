# Partner lighting — 2026-10-20

Gavin explicitly requested a light effect for the partner section using ReactSkills. This supersedes the previous plain-black-only treatment while keeping the black base, original sponsor logos, layout and copy. Local review only; no user visual acceptance implied.

## Source and integration

- Read ReactSkills and its MCP/source-retrieval instructions. MCP returned NOT_CONFIGURED because @react-bits is absent in its active registry profile. Used the authorized official shadcn4.22.0 CLI `view https://reactbits.dev/r/LightRays-TS-CSS.json` to retrieve the same component, not a different effect. This does not repair the MCP configuration.
- Live registry response retained under work/references/react-bits-light-rays-2026-10-20; SHA-25687c3a9ed3e881ca8c49fe035610c9c729e9e95c93a1fc22a25eb8eec06e78454. Current upstream MIT plus Commons Clause license verified byte-identical to the adjacent preserved license. No archive overwritten.
- Actual native WebGL2 implementation in src/flagship/motion/react-bits/light-rays, with CSS and provenance. No dependency added. Host composition/settings are separate in ThailandPartnerLight; section layering/mask/mobile crop in editorial-partner-light.css.
- Single top-center warm-gold fan, speed0.28, reduced glow/haze, downward fade, no mouse-follow/shadow or click pulse. No brand-type pattern added back into partners. Foreground is above the noninteractive aria-hidden light layer.
- Mount delayed until approaching partners; upstream intersection/page visibility pause retained. Added an early offscreen-frame guard. Resize, context restoration and resource cleanup retained. Reduced-motion preference and live preference changes freeze the same shader effect rather than substituting another graphic. Invalid color throws; WebGL initialization failure is explicitly logged with no alternate rendering substitution.

## Review

IAB1194×1000 and390×844 visually reviewed. Desktop has a soft gold fan behind heading/logos and fades above the pending partners; mobile crop keeps the dark base. No overflow. All three organizer/sponsor images fully loaded at expected source dimensions. Mobile menu navigation reaches partners and closes; partner update link receives keyboard focus normally; light layer pointer-events:none and aria-hidden=true. Console warning/error list empty.

Rendering workload: one full-screen triangle, no added texture/media dependency; observed canvas886×608=538688 pixels at desktop and405×675=273375 at mobile. Source caps pixel budget and DPR; section is isolated. Tool read-only browser evaluation does not expose requestAnimationFrame timing or reduced-motion emulation, so no FPS benchmark or interactive OS preference test is claimed. Reduced-motion stop/dynamic listener and offscreen/hidden cleanup paths were source-reviewed.

`pnpm build:art-review` and `git diff --check` pass. Edition JS129.08kB / gzip40.90kB, about+5.61kB gzip over the prior114.57kB edition bundle. Main JS495.02kB / gzip160.11kB unchanged. Named media17 /4103894 bytes unchanged, within existing budgets. No source/concept media shipped; no new image, fallback renderer, test/harness file, deletion, push, publication or deployment.

Review screenshots:
- work/screenshots/thailand-partners-light-rays-2026-10-20.png
- work/screenshots/thailand-partners-light-rays-mobile-2026-10-20.png

Viewport restored and local preview retained on partners for Gavin's review.

## Superseding boundary/color correction

Gavin rejected the visible horizontal cut above partners and excessive yellow. Root cause: the negative top inset put the light layer's transparent start above the section, while overflow:hidden clipped it after its fade had already become visible. The foreground/section backgrounds were confirmed identical; this was a layer/mask clipping defect.

The partner section now permits the decorative layer to extend72px into the preceding spacer (52px on mobile); the parent site's horizontal overflow:clip remains. A longer, initially very faint upper mask blends across that boundary. Shader color changed from#ffdf8b to#f4f0e6, atmosphere0, glow0.08, intensity1.05 and opacity0.55, keeping the actual rays but removing the yellow wash. Original layout, logos and headline colors remain.

IAB1194px desktop and390px mobile visually inspected with the recap/partner boundary in frame: no visible horizontal cutoff, soft neutral light and no horizontal overflow. Source geometry confirms the layer begins above partners and is no longer clipped there. Existing console warning/error check empty. Review build/media budget and diff checks pass. No new fallback, dependency, assets, test files, deletion, push or deployment. Updated screenshots: work/screenshots/thailand-partner-light-soft-boundary-2026-10-20.png and thailand-partner-light-soft-boundary-mobile-2026-10-20.png. Visual acceptance remains pending.

## Left-side interactive light

Gavin requested left-side rays and interaction. Changed origin to left, tilt-12°, rayLength1.8 and fadeDistance1.05, retaining the warm-white palette and soft cross-section fade. Enabled actual upstream mouse steering (influence0.32), cursor shadows and click pulses. The existing passive listeners allow all page links and scrolling to work normally. Steering now uses pointer presence as well as position, so it eases back when the cursor leaves the light region. Pointer-down updates position for touch/click before spawning a pulse; the existing touch release and reduced-motion stop remain.

IAB1194×900: clicked the heading/pending row, then native viewport positions245,610 and925,240 without changing scroll. Observed moving/brightening ray fans and the click wave at a fixed partnerTop70px. Single canvas, pointer-events:none, no horizontal overflow or console warning/error. IAB390×844: left light visible, preceding recap/partner transition remains smooth, no horizontal overflow; this viewport test is not a physical touchscreen test. Review build and diff checks pass. No new fallback, dependency, media, test files, deletion, push or deployment. Screenshot: work/screenshots/thailand-partner-light-left-interactive-2026-10-20.png and mobile counterpart. Final visual acceptance remains pending.

Gavin clarified the origin should be the top-left corner. Updated origin to top-left and tilt-28° so rays fall diagonally down/right; existing mouse/shadow/click interaction, warm-white color and fade remain. IAB1194×900 native click825,565 confirmed visible response;390×844 retains one canvas and no overflow. Review build/diff pass. Screenshot: work/screenshots/thailand-partner-light-top-left-2026-10-20.png and mobile counterpart. No fallback, test files, deletion, push or deployment; visual acceptance pending.
