# Thailand / Binance direction — implementation spec

Later hero revision: `../card-hero-review/design-spec.md` supersedes this document's hero composition only. Gavin requested a card-led hero after rejecting the empty yellow poster; downstream section design remains as described here.

Gavin explicitly authorized implementing the Binance direction on 2026-10-20. These generated layout studies implement that selected direction; they are local working references, not user-accepted deliverables. The page must still be visually reviewed by Gavin. Image retention remains a separate choice.

## Surface and composition

1. `01-hero-concept.png`: existing black header; complete yellow hero poster. Left native `CARD SHOW / THAILAND`, date, venue, time, tracking CTA and explore link. Right original selected Thailand emblem at natural aspect. Gavin subsequently instructed removing the interior globe because the outer globe already provides entry navigation; the hero now uses a native yellow background without that artwork. Dark intro band with existing headline/intro and three planned/expected figures.
2. `02-highlights-concept.png`: near-black; centered large gold title, short intro and source. Large cinematic first film with open two-column caption; four smaller films in two columns. No text-card backgrounds, number overlays or outer frames. Keep shared Korea-style pointer-triggered playback unchanged. Exact existing item titles/descriptions remain, including planning and unannounced-programme qualifiers.
3. `04-seoul-recap-concept.png`: gold heading and native intro, three original user-supplied Seoul photos in the existing mosaic, correct source labels. Images remain authentic; do not consume generated photo recreations.
4. Venue/transport: preserve accepted complete yellow content region, QSNCC official image, floor distinction, directions, address, route descriptions and real map. Its existing functional layout is the reference, not a generated concept.
5. `03-partners-faq-concept.png`: centered gold partners title; open Renaiss/Vinci logo columns, three open coming-soon slots; neutral dividers only. FAQ on slightly lighter dark, left gold title and native accordion rows. Complete yellow footer with black display headline and real links.

## Design system

- Near-black #0b0d10, secondary #111419; yellow #f4c62e. White #f8f8f4 and gray #b8babf. Red/blue are in original emblem, cards, film and photos; no arbitrary red/blue UI blocks or single-edge accents.
- Latin hero: Arial Black/Arial, 900, 70–108px at desktop. Section type uses Barlow Condensed and a locally served Noto Sans TC 900 subset for Chinese, 54–72px; body 15–17px/1.8. Native UI controls 12–15px deliberately specified. The subset is 52,692 B; provenance/license are beside the font, and `node scripts/update-thailand-display-font.mjs` refreshes it after Chinese-copy additions.
- Main gutter: 56px at 1280, max 1280px content. Media area max 1120px. Mobile gutter 20px. Native semantic headings; no decorative labels above hero H1.
- ArrowUpRight, ArrowDown, Plus/Minus and route icons use existing iconoir-react stroked geometry. No fake player chrome. Motion limited to original emblem reveal and native hover feedback, with reduced-motion preserved.
- Dark open sections, full yellow hero/venue/footer regions. Only neutral complete dividers where needed. No card frames around sponsors or video captions.

## Above-the-fold copy lock

Header retains existing five navigation labels, FLAGSHIP home, existing ticket CTA and language selector. Hero visible copy: `CARD SHOW`, `THAILAND`, `28–29 NOV 2026`, `QSNCC · EVENT HALL B2, BANGKOK`, `13:00 — 20:00 ICT`, localized existing tracking CTA/explore/ticket note. The visible English event title is authorized event identity; accessible H1 includes Flagship and 2026. No price or booking claim. Intro preserves its existing headline/body and three planned/expected labels.

## Assets, implementation and deviations

No newly generated artwork is consumed by the page after the user-directed interior globe removal. All five candidates and the unused halftone WebP remain preserved in work, pending the user's retention choice; no concept screenshot becomes UI. The original selected emblem, CDN films/posters, original Seoul review derivatives, official venue image and original partner logos are reused. Existing typed data/components remain separated from styles. Outer globe/entry files are outside this change.

Native dimensions of each concept are recorded during QA. The interior hero intentionally omits the concept's globe following Gavin's explicit correction. Header uses the existing simple FLAGSHIP home link rather than Image Gen's altered small logo. Exact factual copy and natural source photo/video crops take precedence over generated text/photo variations; source image overlays are not invented. Venue/access retains the accepted structure. These are intentional reference-to-product adaptations, not claims of user acceptance.
