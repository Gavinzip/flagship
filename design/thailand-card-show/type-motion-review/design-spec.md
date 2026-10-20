# Thailand typography and motion refinement — 2026-10-20

Request: keep candidate 1 of the clean card background, but improve the large-poster typography and overall motion using actual React Bits research and the installed text-animation skills. This is a local implementation for Gavin to review; file retention of new concepts and visual acceptance are separate.

## Reference and boundaries

- Current implementation reference: `work/generated-images/2026-10-20-thailand-type-motion/02-editorial-type-concept.png`. This is the agent's working refinement, not a user-approved new baseline. Candidate 1 in that same round is the preceding uppercase study; both are retained pending choice.
- Previously selected campaign art remains fixed. Three foil cards, yellow/gold texture, diagonal streaks and floor reflection are unchanged. The original separate emblem and its measured transition target retain their composition coordinates. No interior globe or new background ornaments.
- Existing header/nav labels, date, venue, time, CTA, explore link and ticket note remain. Only the title capitalization changes from `CARD SHOW / THAILAND` to `Card Show / Thailand`. No invented hero eyebrow, badges or claims. Information architecture, partners, maps and videos remain.

## Type system

- Upright Arial/Helvetica title: Card Show 4.5vw/500, Thailand 8.2vw/600, with a .055em optical tightening on Thailand. At 1194px, Thailand is 97.908px, versus the former 127.49px condensed italic 900 title.
- Hero copy top inset 11.8vw; date 2.9vw/600, metadata 1.45vw/500. Existing hero aspect ratio, CTA geometry, image plane and logo placement retained.
- Section headlines use neutral sans at 600 rather than the custom 900 poster font; introductory heading is upright 500 without flanking bars. Highlight subheads and closing text follow the same upright hierarchy. Numeric event facts retain their distinct figure weight.
- At <=1000px the card art remains above the centered native text. At 390px title hierarchy is 30px / 62.4px; metadata, CTA and note fit without horizontal overflow.

## Actual React Bits integration

Research: official Split Text, Blur Text and Animated Content documentation, with the live Blur Text demo and current TS-CSS registry inspected. Selected BlurText for the nonzero blur/slide/character reveal; existing Motion dependency avoids adding GSAP or another runtime. See `src/flagship/motion/react-bits/README.md` for provenance and local changes.

MCP `@react-bits` lookup returned NOT_CONFIGURED. Direct official registry URL returned item metadata successfully. Official shadcn 4.22.0 CLI `view` retrieved the current actual TS-CSS source. This is a disclosed source-retrieval backup, not a tool-configuration repair and not a runtime visual fallback. The local historical snapshot was not overwritten. License is MIT + Commons Clause, retained alongside the component.

## Motion contract

- `EditionPresentationContext` exposes the existing admission/transfer state: animation releases only when direct admission is hidden and no geographic transition retains the world. No timer guesses, DOM visibility polling or loading fallback.
- Main title is revealed by letters at 30ms stagger, with a .16s offset for Thailand, a 16px travel and 8px blur resolving over .56s. Initial opacity .12, never 0 in the selected effect. No looping.
- Date, venue, actions and note use .30/.38/.46/.54s offsets and .68s resolve duration after presentation. Visible final frames remain native text.
- Section headings reveal once on entering the viewport. Chinese and Korean letters can wrap; English is grouped by words. Screen readers receive one text string and animated duplicates are aria-hidden.
- CTA uses a 1px full-perimeter gold trace on hover/focus and a small arrow movement. Video panels gain a 1.025 hover scale; their existing hover auto-play contract is preserved.
- Reduced motion and the text pause flag render final static text, removing blur/travel. CSS reduced-motion rules stop informational reveals, CTA trace and image scale. Timers and observers clean up; completed letter layers release will-change. No persistent RAF added.
