# Thailand card hero — 2026-10-20

Superseded hero implementation: Gavin subsequently selected candidate 1 and rejected the simplified result below. Current selected design and faithful restoration are recorded in `../candidate-one-review/`. The former omission of gold texture, diagonal light and reflective ground is revoked, not an accepted adaptation.

Scope: opening hero only, explicitly requested after Gavin rejected the empty yellow layout. This is an implementation reference for review, not user acceptance. Keep outer globe/entry, header behavior, all downstream sections and existing automatic film playback unchanged.

## References and design system

- Working hero concept: `work/generated-images/2026-10-20-thailand-card-hero/01-card-hero-concept.png`, native 1536×1024. A complete hero with a dark header, native black type at left and one dominant red/black/blue gold-framed card fan at right.
- Organizer PPT slide 11 supplies the exact three-card motif, gold bevels, red/blue materials and original selected emblem. Slide 13 supplies venue identity, not background decoration.
- Official visual examples additionally reviewed: Binance 2024 main-stage campaign, 2025 featured-speaker poster, 2025 livestream schedule, and 2025 eighth-anniversary campaign. Saved with source links under `work/references/binance-campaigns-2026-10-20/`. Apply their oversized type, single-object composition and clear logistics hierarchy; do not copy their globe, people, rewards or branding claims.
- The hero uses a native yellow tonal field sampled from the working concept (#ffd834 highlight, #fccc24 base, #f6ba14 outer tone); downstream yellow stays #f4c62e. Near-black #0b0d10 header and type. Gold frames, red and blue belong to the three card faces. No random colored surfaces, edge stripes, globe, venue scenery, fog or floating-card cloud. There is no tint/overlay on the artwork.
- H1: existing Barlow Condensed 900, italic, two lines; 86–144px desktop, compact line height. Date remains strong Arial Black, italic. Existing UI body, CTA controls and iconoir arrows retain their native construction.
- Large card fan and original emblem form one artwork group. The fan is a separate transparent image; original emblem remains unchanged in front. The group has one restrained entrance animation with reduced-motion support. No UI content-card containers.
- Grid: left copy about 48%, right artwork about 52%, original max-width/gutters. Mobile stacks an explicitly sized art group above the centered exact copy, with no text/art collisions or horizontal overflow.

## Copy and asset lock

Keep header labels and every existing hero string: CARD SHOW; THAILAND; 28–29 NOV 2026; QSNCC · EVENT HALL B2, BANGKOK; localized 13:00 — 20:00 ICT; tracking CTA; localized explore link; ticket-unannounced note. No eyebrow, invented metric, booking claim, or extra partner copy.

Concept image is never used as UI. Standalone asset `02-gold-card-fan.png` was generated from the concept and supplied emblem with genuine alpha, then compressed without visual edits into review-only WebP in the same candidate directory. Original emblem is reused by the existing shared component. Two candidates remain pending user retention; neither is promoted/deleted. Production build remains gated.

Intentional adaptations from the working concept: keep the exact original emblem instead of generated lettering; retain current header/intro structure and factual wording; omit the concept's speed-streak background and reflective floor so the three-card subject itself supplies depth. These adaptations implement the user's explicit constraints. Native UI is independently rendered and checked before handoff.
