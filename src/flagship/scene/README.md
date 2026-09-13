# Open card-holder scene

Retired from the active page by the [poster-fragment composition](../../../docs/flagship-poster-composition.md). This source is retained as history; Korea currently mounts an independent transparent artwork layer instead and does not load this WebGL module. The contract and measurements below describe the earlier implementation.

## Visual contract

A small, thin, empty holder floats in the same daylight environment as the rest of the Korea site. The previous thick graphite core and broad chrome face were rejected. The current object has a clear acrylic rail, a narrow polished outer edge, a fine inner edge, small blue inlays, and four tiny fasteners. The window has a real geometric opening. It contains no card art, crystals, jewels, opaque face, or fogged pane.

This is a decorative approximation informed by the full poster, not an exact reconstruction of a manufactured product. The supplied FLAGSHIP emblem remains a separate, unchanged image.

## Ownership

- `cardHolderSpec.ts`: proportions, materials, neutral pose, and performance limits.
- `createCardHolder.ts`: rounded rings, inlays, fasteners, and disposal. Each hole radius follows its rail width so thin corners do not self-intersect and triangulate across the opening.
- `createCardScene.ts`: camera, authored PMREM reflection studio, warm-up, visibility, render loop, and GPU lifecycle.
- `../components/CollectionArtwork.tsx`: React admission, deferred import, retry, reduced motion, and ownership.

The model is decorative; content and navigation remain semantic HTML. Korea owns this canvas; switching to the restored original Taiwan site disposes it. Language changes do not recreate the scene. No external HDR, texture, or model is loaded.

## Materials and motion

The outer edge uses a metallic-roughness material with bright and dark studio reflection strips. The acrylic rail uses clear-coated MeshPhysicalMaterial with alpha transparency; this is not a physically refracted pane, and the centre is genuinely open geometry. The scene has no bloom, shadows, full-screen post-processing, or opaque background. Dimensions and rail widths remain unchanged in the glass/metal material pass.

The daylight page composition is stable across scroll. Only the object has a slow bounded float/rotation and fine-pointer response. The scene stops offscreen, while hidden, when paused, or under reduced motion. The neutral pose renders once when paused. Resizing retains the same renderer.

## Performance and failure handling

DPR is capped at 1.5, with a 40 FPS target. Current geometry: 9 draw calls, 4,856 triangles, 9 geometries, 2 textures. `data-render-stats` exposes CPU submission timings, not physical-device GPU performance.

The lazy module has a 15-second initialization limit and an explicit error/retry state. Compile and first render complete before admission. Abort, unmount, and retry dispose geometries, materials, environment, renderer, RAF, events, and observers. Errors are not disguised with a static image or another visual fallback.

Local QA checked resizing, actual rendering, pause, and switching to the original Taiwan page and back. Slow-network injection, forced WebGL/context loss, and OS reduced-motion simulation were not repeated in this visual revision.

Primary references: [MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html), [ExtrudeGeometry](https://threejs.org/docs/pages/ExtrudeGeometry.html).
