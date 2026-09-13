# Cross-country content and readable poster environment

Historical revision: the user rejected this visual approach. Its content remains, but the fixed backdrop and reading field described below are superseded by [flagship-poster-composition.md](flagship-poster-composition.md).

The user asked for FLAGSHIP to communicate an event brand that spans countries. Collectible Con was explicitly supplied as a content reference only; its visual style was rejected. The user's button screenshot also identified a diagonal highlight crossing the label and a busy background competing with text.

## Content scope

Reviewed [Collectible Con](https://collectiblecon.xyz/) on 2026-09-11 for its coverage of collectible categories, exhibitors/trading, live activities and visitor information. No design, imagery, branding, partner list or literal copy was imported. Its dates, venue, exhibitor counts, free admission, on-site grading and guests are not FLAGSHIP facts and were not reused.

The Chinese, English and Korean brand copy now explains the journey from Taiwan to Korea and more countries. The existing four experiences describe collecting, trading, play and community with concrete examples. Categories and programs are explicitly subject to each edition's announcements. The global edition section has a “More to come” note without naming unannounced destinations. Nine FAQ entries cover the brand, categories, Korea information, registration, local programs, newcomers, visitor preparation, exhibitor involvement and Taiwan history.

Taiwan continues to open the original Taiwan website. Its original event copy, assets and styling were not changed in this pass.

## Reading and material ownership

- `FlagshipSite.tsx` groups the body sections in one `.fs-reading-world` layer.
- `materials.css` supplies a continuous sky-blue reading field: a gradual vertical entrance and horizontal detail reduction through the content area. The footer carries the same field. The original backdrop file and hero remain unchanged. There are no elliptical masks, new backgrounds or image filters.
- Individual prose blocks no longer have separate glass boxes. Headings have no white readability shadows. Detailed information panels have a stable, near-opaque cool-blue face.
- `GlareSurface.tsx` moves a masked **edge** reflection by changing its background position. The centre is excluded from the mask, including during pointer movement. Pause/reduced motion use the centred edge highlight.
- Primary buttons use a solid `#153d63` face and white labels. The diagonal reflection pseudo-element is removed in normal, hover and focus states. Computed contrast is 11.17:1 normally and 8.55:1 on hover (`#204f79`). Secondary buttons use a pale face with dark text.
- Edition-card sheen is also masked to the rim. The empty 3D holder was not altered in this revision.
- Tab numbers do not shrink or wrap, including the narrow Korean layout.

No new dependency, fallback, generated raster image or temporary test file was introduced. Existing pending artwork selections and source files remain untouched.

## Local verification

`npm run build:art-review` passes TypeScript, Vite, CSP/SRI and named asset budgets. Main JS: 488.75 KB / 154.81 KB gzip. CSS: 147.18 KB / 30.22 KB gzip. Existing lazy 3D: 556.66 KB / 141.67 KB gzip, with its existing >500 KB warning. The three WebP files are unchanged at 877,324 bytes combined.

Responsive checks include 1440 × 900, 390 × 844 and 320 × 740. Chinese, English and Korean copy was inspected, four experience tabs were exercised, and the new FAQ answer was opened. No horizontal page overflow was observed; Korean tab numbers stay on one line at 320px. All loaded images inspected before returning to the top were valid; images below the viewport remain lazy-loaded by design. Taiwan switching displayed the original page without the Korea reading field, and switching back returned to Korea at the top. Pausing centred the edge reflection at `50% 50%`; the DOM confirmed the exclude mask and absence of the button highlight. Browser warning/error logs were empty. The viewport override was reset and animation restored after verification.

Screenshots are in `outputs/screenshots/2026-09-11-reading-world/`. This is a local review build, not a pushed or deployed release, and does not imply user acceptance.
