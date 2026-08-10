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

export type ResponsiveMedia = {
  src: string;
  srcSet: string;
  sizes: string;
};

export type SiteImagePreload = {
  label: string;
  src: string;
  srcSet?: string;
  sizes?: string;
};

export const media = Object.fromEntries(
  Object.entries(mediaPaths).map(([key, path]) => [key, staticAssetUrl(path)]),
) as Record<MediaKey, string>;

function responsiveImage(
  src: string,
  candidates: readonly (readonly [path: string, width: number])[],
  sizes: string,
): ResponsiveMedia {
  return {
    src,
    srcSet: candidates
      .map(([path, width]) => `${staticAssetUrl(path)} ${width}w`)
      .join(", "),
    sizes,
  };
}

export const responsiveMedia = {
  flagshipLogo: responsiveImage(
    media.flagshipLogo,
    [
      ["flagship-logo-360.webp", 360],
      ["flagship-logo-600.webp", 600],
      [mediaPaths.flagshipLogo, 900],
    ],
    "(max-width: 620px) 92vw, 650px",
  ),
  floorPlan: responsiveImage(
    media.floorPlan,
    [
      ["floor-plan-public-1200.webp", 1200],
      ["floor-plan-public-1800.webp", 1800],
      [mediaPaths.floorPlan, 3600],
    ],
    "(max-width: 960px) 100vw, 1435px",
  ),
  heroFloatingCard: responsiveImage(
    media.heroFloatingCard,
    [
      ["hero-floating-card-640.webp", 640],
      ["hero-floating-card-1024.webp", 1024],
      [mediaPaths.heroFloatingCard, 1576],
    ],
    "(max-width: 620px) 92vw, (max-width: 960px) 76vw, 47vw",
  ),
} as const satisfies Record<string, ResponsiveMedia>;

const responsivePreloads: Partial<Record<MediaKey, ResponsiveMedia>> = {
  flagshipLogo: responsiveMedia.flagshipLogo,
  floorPlan: responsiveMedia.floorPlan,
  heroFloatingCard: responsiveMedia.heroFloatingCard,
};

export const siteImagePreloads = Object.freeze(
  Object.keys(mediaPaths).map((key) => {
    const mediaKey = key as MediaKey;
    const responsive = responsivePreloads[mediaKey];

    return {
      label: media[mediaKey],
      src: media[mediaKey],
      ...(responsive
        ? { srcSet: responsive.srcSet, sizes: responsive.sizes }
        : {}),
    } satisfies SiteImagePreload;
  }),
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
