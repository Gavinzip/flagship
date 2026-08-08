import { staticAssetCssUrl, staticAssetUrl } from "../lib/staticAssets";

const mediaPaths = {
  appIcon: "app-icon.png",
  arenaFrame: "arena-frame.webp",
  eventCrowd: "event-crowd.webp",
  eventPassFrame: "event-pass-frame.webp",
  eventPassSurface: "event-pass-surface.webp",
  flagshipLogo: "flagship-logo.webp",
  floorPlan: "floor-plan-public.webp",
  heroArena: "hero-arena.webp",
  heroFloatingCard: "hero-floating-card-hd.webp",
  heroFloatingStage: "hero-floating-stage.webp",
  heroTaipeiOverlay: "hero-taipei-overlay.webp",
  highlightChampionChallenge: "highlight-champion-challenge.webp",
  highlightEntryGift: "highlight-entry-gift.webp",
  highlightPlayers: "highlight-players.webp",
  highlightRareCard: "highlight-rare-card.webp",
  highlightRareShowcase: "highlight-rare-showcase.webp",
  highlightTcgVendors: "highlight-tcg-vendors.webp",
  sectionHighlightsArena: "section-highlights-arena.webp",
  sectionScheduleStage: "section-schedule-stage.webp",
  sectionVendorsGallery: "section-vendors-gallery.webp",
  sectionVenueArrival: "section-venue-arrival.webp",
  venueClapper: "venue-clapper.webp",
} as const;

type MediaKey = keyof typeof mediaPaths;

export const media = Object.fromEntries(
  Object.entries(mediaPaths).map(([key, path]) => [key, staticAssetUrl(path)]),
) as Record<MediaKey, string>;

export const siteImageUrls = Object.freeze(
  Array.from(new Set(Object.values(media))),
);

const cssAssetVariables = {
  "--asset-event-pass-surface": staticAssetCssUrl(mediaPaths.eventPassSurface),
  "--asset-section-highlights": staticAssetCssUrl(
    mediaPaths.sectionHighlightsArena,
  ),
  "--asset-section-schedule": staticAssetCssUrl(
    mediaPaths.sectionScheduleStage,
  ),
  "--asset-section-vendors": staticAssetCssUrl(
    mediaPaths.sectionVendorsGallery,
  ),
  "--asset-section-venue": staticAssetCssUrl(mediaPaths.sectionVenueArrival),
} as const;

export function installStaticAssetCssVariables(
  target: HTMLElement = document.documentElement,
) {
  for (const [name, value] of Object.entries(cssAssetVariables)) {
    target.style.setProperty(name, value);
  }
}
