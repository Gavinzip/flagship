# Thailand editorial page — local review, 2026-10-20

## Scope and reference hierarchy

Gavin accepted the outer globe and its geographic entry animation for continued use, and rejected the inner page. Preserve that outer scene, camera and routing. Redesign only the Thailand event surface.

1. Organizer deck: `work/references/thailand-docsend/slide-11.png` and `slide-13.png`. Gold FLAGSHIP Thailand identity; red/blue shards and physical banners; real convention hall; Nov 28–29, 1–8 PM, QSNCC Event Hall B2. Planned tables and booths stay explicitly planned.
2. Official reference, inspected in IAB: https://www.binanceblockchainweek.com/event/Bangkok2026/Home . Event identity, broad yellow/black surfaces, direct time/location, clear action, calm content rhythm. Do not copy its ticket price, speaker directory or sponsorship claims.
3. Actual B2 venue photography: https://www.qsncc.com/th/plan/venue-space/level-b2/ . The browser-loaded original was saved through the image element; direct command-line CDN requests returned 403. The source was retrieved through the visible official page, without substituting a different venue.

## Visual system

- Surfaces: charcoal `#0b0d10`, full yellow content sections `#f0b90b`, white `#f8f8f4`, muted `#b8babf`. Navy/red secondary surfaces extend from the emblem and entrance banners into the complete highlight and access panels.
- Typography: existing Barlow Condensed for Latin display; native Arial/PingFang TC/Microsoft JhengHei for clear Chinese. No extra font payload. Body 13–16px, main headings 36–78px, date 39–64px, metrics 74–120px.
- Shape: open editorial composition; complete media/text panels with no global globe wallpaper, side accent stripes, decorative single-edge color strips, invented metrics or ornamental badges. Yellow is a meaningful complete content region, not an accent bar.
- Header: existing accessible home control and regional language/menu behavior; four section anchors and ticket-updates CTA. An operational return link is retained instead of the mock's decorative small emblem.
- Hero: image 01 as scene, original selected emblem as foreground, native date/time/venue/action, bottom edge fade for legibility. Native ticket status remains visible; no fabricated registration link.
- Introduction: yellow field, supplied headline/intro, planned 100+ tables and 4–6 booths, with 3,000–4,000 expected visitors clearly labeled as a forecast.
- Films: all five full media/text panels visible together, with independent Thailand programme descriptions and explicit Taiwan provenance. Playback uses the exact shared Korea hover-preview component: muted, looping, playsInline, pauses/unmounts on mouse leave, and respects reduced motion. Existing underexposed footage receives a small consistent brightness/contrast correction, not a dark overlay. Concept photos are replaced by actual event footage.
- Venue: real official B2 image, location/date/time, both events' floors from deck slide 13, MRT Exit 3, taxi/car and B2 arrival guidance, address, live embedded Google Maps plus external Maps and official travel-guide links. Visitor travel details verified against https://www.qsncc.com/th/visit/how-to-get-here/ on 2026-10-20. Binance is factual same-date/venue context, not a sponsor or shared-ticket claim.
- Partners/FAQ/footer: real organizer, official updates, five useful questions and functional home link; no invented partner wall.
- Responsive: 390×844 and desktop reference-size checks. Grid `minmax(0,1fr)` is required in the hero so intrinsic emblem width cannot enlarge the mobile track.

## Asset handling

All four generated PNGs remain in `work/generated-images/2026-10-20-thailand-editorial/` pending user selection. 01 is the only new raster used in the page; 02–04 are retained early layout references, never shipped as UI. The user rejected the first inner implementation; the current media/access layout follows their corrective requirements rather than treating those concepts as accepted targets. WebP derivatives: entrance 214,406 B; official venue 89,896 B. Both are named `reviewOnly` assets in the local build budget. Original supplied emblem remains unchanged.

No image was deleted or promoted, no previous candidate was removed, and no push or deployment was performed. Normal release builds remain blocked until selection/promotion/CDN delivery. Local preview and internal QA are not user visual acceptance.
