# Korea glass and polished-edge material pass

This records an earlier, superseded material pass. The current composition is documented in [flagship-poster-composition.md](flagship-poster-composition.md): independent poster fragments replace the fixed backdrop, reading field, and mounted 3D holder. The implementation and measurements below describe the historical pass only.

The user requested stronger glass/metal character while retaining the light poster environment. This revision replaces flat pale-blue panels with coated glass, narrow polished edges, and silver controls. The supplied logo, background image and original Taiwan page are unchanged.

## ReactSkills references

The installed ReactSkills index routes this work to GlassSurface, GlareHover and TiltedCard. The named child SKILL.md files were not present under the local skill/plugin roots. The official React Bits source was reviewed directly:

- [GlareHover TS component](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/GlareHover/GlareHover.tsx) and its CSS: diagonal highlight treatment.
- [GlassSurface](https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/GlassSurface/GlassSurface.jsx): separate surface lighting from readable content.
- The [upstream license](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) is retained in `docs/licenses/react-bits.txt` (MIT + Commons Clause).

This is a site-specific implementation informed by those references, not a claim that the upstream SVG distortion component has been installed. The official GlassSurface browser-detection/fallback branches are not imported. There is no new error fallback, generated raster image, HDR download, or dependency.

## Ownership

- `motion/GlareSurface.tsx`: spring-driven diagonal reflection on hero details, show information, FAQ and footer. Decorative reflection is outside document flow and cannot intercept input; actual content stays above it. Pointer motion is mouse-only and respects the shared pause/reduced-motion state.
- `motion/TiltedCard.tsx`: existing bounded edition-card tilt, brighter reflected highlight, and shared pause support.
- `styles/materials.css`: translucent faces, 1.5px masked chrome outlines, narrow inner edge, silver controls, local 1px backdrop blur and 2px on small badges. The full world background has no blur or opacity reduction. This simulates coated glass; it does not claim physically accurate optical refraction.
- `styles/reading.css`: spacing, typography and responsive content layout; material tokens have moved to `materials.css`.
- `scene/cardHolderSpec.ts`, `createCardHolder.ts`, `createCardScene.ts`: clear-coated acrylic rim, polished roughness and contrasted studio reflections. Geometry and the empty centre remain unchanged. Two dark studio strips affect the precomputed reflection map, not the live scene draw count.

## Local verification

`npm run build:art-review` passes TypeScript, Vite, CSP/SRI and named asset budgets. Main JS is approximately 484 KB / 154 KB gzip; lazy 3D is 557 KB / 142 KB gzip; CSS is 146 KB / 30 KB gzip. The existing >500 KB lazy-chunk warning is still present. Three WebP images remain 877,324 bytes in total.

Browser inspection confirms the card scene renders with 9 calls, 4,856 triangles, 9 geometries and 2 textures. DPR remains capped at 1.5 and the animation target at 40 FPS. CPU timings are not physical-mobile GPU measurements.

Visual checks covered 1440 × 900, 390 × 844 and 320 × 740 viewports, with no horizontal page overflow. All four experience tabs displayed and changed their selected state; the FAQ opened and closed. A real mouse move changed the glass reflection from a negative offset to +23.36%. Pausing returned reflection and tilt transforms to neutral and held the 3D scene at one rendered frame. Footer text retained its existing responsive visibility.

Switching to Taiwan displayed the original Taiwan event page and removed the Korea canvas. Switching back restored Korea. The browser reported no warning/error logs, and all inspected images loaded. OS reduced-motion simulation, physical mobile GPU testing and forced context loss were not repeated in this pass.

Screenshots are saved in `outputs/screenshots/2026-09-11-glass-metal/`: `01-desktop-home.png`, `02-desktop-information.png`, and `03-mobile-home.png`. The viewport override was reset after responsive checks. No temporary test files were created. This is local visual work, with no push, deployment, asset selection, or user acceptance implied.
