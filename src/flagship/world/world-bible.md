# FLAGSHIP — one galaxy, many gatherings

The global IP website introduces the lasting FLAGSHIP brand, connects collectors, players, stores and partners, and opens the existing regional event sites. The entire IP page shares one continuous galaxy backdrop, including the story, editions, experiences, sponsor and footer. Both light and dark appearances retain recognisable stellar dust lanes and red/blue brand light. The galaxy and globe belong only to the global IP page; neither remains after entry into a regional site.

## IP navigation

The IP home keeps its compact navigation visible from the opening globe through the final section. It provides direct access to the globe, brand story, experience, partners, and Taiwan recap without obscuring the regional entry controls. Appearance and language controls are kept in a compact footer preferences module. Each regional site retains its original navigation. Canvas resize is deferred into the render frame and followed immediately by drawing, so the expanding entry canvas does not expose a cleared buffer.

## Original globe

The 11 vendored Protocol modules remain unchanged from the original project. Their procedural albedo, relief, roughness, AO, coastlines and network are retained. A small material wrapper grades the original warm surface toward silver/blue; neutral key, blue fill, crimson rim, the original atmosphere shell and a thin haze integrate it with the galaxy. No NASA or generated Earth material is used. The rejected material reference files are preserved in work/references/2026-09-12-earth/superseded-material/.

## Interaction and camera

Opening: the large Earth faces Korea immediately, with the latest edition's title, geographic marker and entry link visible. The same area introduces regional navigation and offers Taiwan as the previous edition. Horizontal drag, horizontal wheel, edition buttons and focused arrow keys turn to that edition. Only the selected city's marker appears. There is no separate globe introduction or repeated edition-card section below. Vertical scroll remains native: a short camera approach releases the sticky globe into the IP story on the same galaxy background. Section boundaries have no divider lines.

Coordinates: Seoul 126.978 E / 37.5665 N and Taipei 121.5654 E / 25.033 N. Seoul identifies the country chapter, not a confirmed event venue. Globe radius 1; lens 36 degrees. Opening distance 3.85, arrival 3.55, selection travel peak at least 4.0. Selection settles at the current scroll position's camera distance, including switches at the very top. Entry advances to 2.55, then to 1.14 at the surface; only geographic selection may retreat to make room for a turn. Responsive camera fitting applies before the close-up.

## Geographic entry

The route provider borrows the actual mounted world through a typed bridge. A 1.25-second approach enlarges the scene region and rotates toward the destination while its route loads behind it. The 1.25-second push advances the same globe camera to 1.14. The regional route never scales as a page plane. The rejected September 13 whole-page projection is removed.

Korea restores the user-approved September 12 handoff: a 120 px original emblem starts at the projected geographic location and joins the native hero emblem; the existing hero artwork grows from 0.68 to 1 on the departure render clock. The globe resolves during progress 0.58–0.86 with close-up blur. This approved branch must not be redesigned to solve a Taiwan layout issue.

Taiwan uses a separate taiwanHandoff module on the same departure render clock as Korea. Both retain the approved 1.25-second approach plus 1.25-second push. Taiwan has no post-push settlement or independent animation timer. The original emblem grows to full native size during progress 0–0.68; its centre moves from Taipei toward its measured final hero centre during progress 0.1–1, finishing with the globe push. Supporting copy and event pass reveal upward by 20 px during the shared reveal window, ending at progress 1. No whole-page scaling is used. Native logo proportions and final layout remain intact.

When entering Taiwan from the globe, SiteBoot still waits for actual image/font readiness but skips its hidden 620 ms loading-screen exit animation. The globe already covers that exit. Direct Taiwan visits preserve the original loading-screen exit. The original emblem target is hidden only while the transfer image carries the seam; styles restore on completion or abort. Reduced motion uses the departure rig's immediate final progress. This revision remains pending user review.

The world is disposed after handoff. Reduced motion resolves immediately to the original page.

## IP controls

controls.css owns IP entrance, recap, city-arrow and experience-tab controls. Prior visual rules for these controls were removed from the older world/material/theme sheets. Flat high-contrast surfaces, one cut corner, a fine red/blue edge and directional arrow motion replace rounded circles, metallic gradients and inset shadows. Appearance selection uses a simple underline in the footer. Existing country sites retain their original controls.

Cancellation restores the previous city, native scroll position and focus. Context loss rejects the pending flight, shows an explicit error, and allows a real scene rebuild on Retry. There is no fake globe or silent fallback. Reduced motion skips flights and spatial animation. The three motion modules separate selection, entry and scene departure from route readiness and destination composition.

## Assets and budget

Candidate 3 is the current galaxy preview: work/generated-images/2026-09-12-stellar-galaxy/. Its original and 251562-byte WebP remain there awaiting user selection; all earlier candidates remain untouched. Exact generation prompt and cache provenance are beside it. Review builds accept the derivative; the production approval gate remains active.

## Thailand gold detail — 2026-10-20

Gavin requested a denser dot pattern in the enlarged Thailand transition. `goldParticleSpec` keeps sampling and screen-space dot sizes together: geographic spacing0.42° (previously0.62°), land1.2px and ocean0.7px before existing camera/DPR scaling. The field contains233569 points instead of107179, about2.18× as many. Smaller dots retain individual separation during approach. Existing geography, single Points draw, mutation timing and entry/return camera remain. Typed point buffers total4671380 bytes; no texture/media dependency or second render loop is added.

One lazy renderer, on-demand RAF, hidden/offscreen pause, shader warmup, ResizeObserver and idempotent disposal. DPR caps: desktop 1.5, phone 1.25. No shadow maps or full-screen postprocessing. Six resident textures include the four original 2048 × 1024 procedural material maps; those four maps alone have about 42.7 MiB of conservative RGBA8 mip storage, not a measured GPU allocation. Opening 37 draw calls / 50972 triangles; selected edition 41 / 51518. CPU frame-submission timings do not establish hardware FPS.

## Evidence

Current matched-tempo revision: /Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-matched-tempo/. Prior full responsive continuity review remains in 2026-09-13-taiwan-continuity/. Korea restoration evidence remains in 2026-09-13-korea-restored/. Approved Korea reference: /Users/gavin/Documents/CodexArtifacts/flagship/2026-09-12-direct-zoom/korea-zoom-final.mp4. The 2026-09-13-spatial-entry videos are explicitly rejected history. Earlier reviews remain preserved. Local review only; no Git push or deployment.


## September 13 dark IP review

The IP homepage defaults to the dark galaxy; an explicit theme=light query retains the light appearance. The dark visual system is split by section under home/styles/dark. Ten documented rounds with five change groups each refine hierarchy, red/blue controls, real card-show photography, edition covers, experience tabs, partner and footer. The original globe and both geographic entry implementations are unchanged.

Heading transitions overlap directionally within one grid cell. World scroll progress updates the camera runtime without invalidating inherited styles across the brand root. Recording evidence uses native Chrome tab capture of the actual local review build. Full round notes, screenshots and recordings are in /Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-dark-ip-10-rounds/. The subsequent single-globe navigation and borderless flow review is in /Users/gavin/Documents/CodexArtifacts/flagship/2026-09-13-single-globe-flow/. This remains local review, not user acceptance or deployment.


## October 19 Thailand particle review

Thailand is the current edition. Selecting any edition retains the original physical Earth and galaxy. Only entering Thailand transforms them: the approach releases a geographic wave of 107,179 fine gold points from Bangkok, preserves subdued surface relief, and grades/dissolves the galaxy into a gold field. The surface push completes the mutation before revealing the regional page. Returning plays the same camera-driven blend backwards, restoring the original Earth and galaxy. `goldParticleField.ts` samples the original Protocol land rings; `goldMutation.ts` owns the surface materials and `ui/mutation.css` owns the background. Both use the existing on-demand camera clock, with no separate animation loop. The live globe adds two draw calls and no textures, respects reduced motion, and is disposed with the existing scene. Marker binding uses explicit city IDs, so adding a station cannot swap city labels through array ordering.

User reference: `design/thailand-card-show/references/` (three supplied Binance images, especially the Bangkok 26 gold particle globe). The destination continues the same land atlas in a large Bangkok-facing SVG halftone globe, split into two paths rather than thousands of nodes. This is code-native artwork, without a replacement image or additional WebGL renderer. The scenic and arena candidates remain retained and are not displayed. No one-sided decorative accent bars. Local review only; user visual acceptance and Git push remain separate gates.
