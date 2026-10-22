# QSNCC venue explorer photograph

- Runtime file: `qsncc-venue-aerial-2560.webp`.
- Source: the retained 6000 × 3547 QSNCC photograph in `work/source-references/qsncc-alignment-search-2026-10-21/03-ocaji-renovation.jpg`.
- Published project page: https://www.ocaji.or.jp/en/overseascontract/project/decision/tabid233.html
- Original image URL and retrieval record are preserved in the source folder's `sources.json`.
- Processing: a 3360 × 1890 crop around the building (source rectangle 1320,1280–4680,3170), proportional downsize to 2560 × 1440 and WebP compression. No generative reconstruction, painted floors or embedded labels. The source photograph is unchanged.
- Location reference: the organizer's annotated venue slide supplied as `CleanShot 2026-10-21 at 19.57.17@2x.png`. It highlights BBW on the long left facade and FLAGSHIP on a short, lower section of the right wing. The previous central-atrium B2 overlay was incorrect and has been removed.
- Photo, facade areas, logo anchors, connector paths and target dots share the 2560 × 1440 coordinate system in `data/venueDiagram.ts`; responsive layouts scale this same geometry without cropping the photograph or relocating the target areas.
- Yellow facade areas illustrate the organizer-provided relationship on a different viewpoint of the same building; they do not define an operational entrance or surveyed hall footprint. Floor labels remain Hall 3 / G and Event Hall / B2, as confirmed by the user.
