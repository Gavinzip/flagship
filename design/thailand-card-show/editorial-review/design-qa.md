# Thailand content and playback correction — 2026-10-20

final result: superseded by atmosphere-review; the red/blue-panel design was rejected

The previous inner-page pass was rejected by Gavin. Its selected-film player changed Korea's automatic preview behavior, hid four full descriptions, removed the embedded map, and confined red/blue to the artwork. This revision corrects those choices. It is a local review, not user acceptance or a release.

## Source of truth

- Supplied deck, slides 11 and 13: FLAGSHIP Thailand identity, red/blue secondary colors, Nov 28–29 2026, 13:00–20:00, QSNCC Event Hall B2; planned 100+ tables and 4–6 exhibitor booths; expected 3,000–4,000 visitors; Binance Hall 3 on Level G.
- QSNCC official directions, verified 2026-10-20: https://www.qsncc.com/th/visit/how-to-get-here/ . MRT Blue Line station Exit 3 connects directly to QSNCC; venue address and parking/lift access are from that page. No parking price or journey time was invented.
- Venue photo: https://www.qsncc.com/th/plan/venue-space/level-b2/ . This is a real official B2 photo.
- The entrance background was generated using viewed deck slides 11/13 as references. It is an illustration, not a photo extracted from the deck. It is still review-only. The five moving clips are actual Taiwan 2026 footage.

## Corrective changes

1. Thailand now reuses `EventHighlightVideo`, the same component Korea uses: mouse entry starts muted looping playback, mouse exit pauses and unmounts the video. Reduced-motion behavior is preserved. The manual selected-film player and its playback state were removed.
2. All five descriptions are visible together, with Thailand-specific programme copy maintained separately from Korea. The descriptions cover collecting/community, planned vendor tables, planned brand booths, event atmosphere and the two-day Bangkok destination. Future schedules, brands and admission remain explicitly unconfirmed.
3. Yellow stays dominant. Complete navy/red content panels extend the deck's secondary colors through the highlights and access guide. There are no single-edge decorative accent stripes. The map uses its real normal colors.
4. Venue now includes the official photo, date/time/B2, both events' floor locations, three transport/arrival explanations, a loaded embedded Google map, readable address, external map link and official travel-guide link.
5. Expected visitors are restored as a clearly labeled forecast below the planned table/booth counts. The FAQ directly renders its Thailand-owned items rather than hiding inherited items by array index.
6. Transit copy, highlight copy and official venue constants are in focused data files. `ThailandAccess` separates map/transport UI from the venue overview; highlights and venue have their own scoped CSS files.

## Browser verification

- Local built preview: http://127.0.0.1:5176/thailand/?lang=zh-TW&theme=dark . Browser actions and screenshots used IAB/CUA.
- Desktop 1194×853 and 1448×1086; mobile 390×844.
- All five video sources started on pointer entry, with muted=true and loop=true. Clips 1, 2, 3 and 5 reached readyState 4; clip 4 reached readyState 3 with currentTime=0.409 and continued loading. Clip 1 advanced from 0.317 to 9.145 seconds. Moving to another clip left only that clip mounted; navigating to Venue left zero highlight video elements.
- All five titles and descriptions are present without selection controls. Final shortened Chinese titles were verified in the built page.
- Google Maps loaded the real QSNCC map on desktop and mobile, with the venue name and MRT route visible. It is not a static stand-in or link-only substitute.
- Mobile menu opens, section selection closes it, and animation completion is awaited before captures. zh-TW/en/ko each showed five highlights, three route explanations and document width=viewport width=390; no horizontal overflow was found in highlight, route or map containers.
- The admission FAQ expanded with the correct ticket-announcement text. The map and official sources point to QSNCC. No Korea registration link is shown.
- Final desktop document width=1448; no broken mounted images; venue yellow computes to rgb(240,185,11), transit panels to navy rgb(14,31,72), charcoal rgb(21,24,31), red rgb(101,25,44).
- No browser warning/error was observed in the checked local session. Outer globe and geographic transition source files were not changed in this correction.

## Build and delivery

- `pnpm build:art-review` passed TypeScript, Vite, separate route metadata, strict CSP generation and review asset checks.
- `git diff --check` passed.
- Review build: 13 named hashed media assets, 3,690,286 B. Generated PNG candidates and concepts remain excluded. Existing CDN videos were reused; no new video payload was added.
- No unit-test files or temporary test harnesses were created. Saved screenshots below are review deliverables.
- No new fallback, new generated image, asset promotion/deletion, Git push or production deployment was introduced.

## Actual review captures

Directory: `work/screenshots/thailand-content-2026-10-20/`

- `desktop-highlights.png`, `desktop-red-blue.png`: full descriptions and complete red/blue panels.
- `desktop-venue.png`, `desktop-transit-map.png`: venue, transport, live map and address.
- `desktop-event-facts.png`: planned metrics and expected visitors.
- `mobile-highlights.png`, `mobile-venue.png`, `mobile-transit.png`, `mobile-map.png`: readable narrow-screen sections.

The earlier four generated candidates remain pending selection and were neither promoted nor deleted. Gavin must still review this inner page. The accepted outer globe/entry direction remains preserved.

## User-provided Seoul photography — 2026-10-20 follow-up

Reviewed 303 JPGs, shortlisted eight and integrated three real photographs in an explicitly labeled BNB Seoul Super Meetup recap. The scene covers booth interaction, graded cards and a collector at Renaiss. It appears after the five existing films, with its own navigation link. All originals and unused photographs remain untouched. The added page images total 277,754 B, bringing the review build to 16 named hashed media assets / 3,968,040 B. No original JPG or reserve enters the build. Desktop/mobile and all three language variants were checked; source ledger, reasons and evidence are in `work/photo-review/2026-10-20-korea/README.md` and `qa.md`. Visual approval is still pending; no push/deployment.
