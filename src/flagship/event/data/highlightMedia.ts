import { staticAssetUrl } from "../../../lib/staticAssets";

export type EventHighlightMedia = {
  src: string;
  poster: string;
};

// These five quiet, 480p previews come from the FLAGSHIP TAIWAN 2026 event.
// Keep the original immutable CDN keys; these Taiwan clips also support Thailand.
const recapHighlightAsset = (name: string) =>
  staticAssetUrl(`flagship/korea-highlights/${name}`);

export const eventHighlightMedia: readonly EventHighlightMedia[] = [
  {
    src: recapHighlightAsset("01-gather-around-cards-480p.web.mp4"),
    poster: recapHighlightAsset("01-gather-around-cards-poster.webp"),
  },
  {
    src: recapHighlightAsset("02-collector-community-480p.web.mp4"),
    poster: recapHighlightAsset("02-collector-community-poster.webp"),
  },
  {
    src: recapHighlightAsset("03-brand-experiences-collectibles-480p.web.mp4"),
    poster: recapHighlightAsset("03-brand-experiences-collectibles-poster.webp"),
  },
  {
    src: recapHighlightAsset("04-on-site-atmosphere-480p.web.mp4"),
    poster: recapHighlightAsset("04-on-site-atmosphere-poster.webp"),
  },
  {
    src: recapHighlightAsset("05-card-show-floor-480p.web.mp4"),
    poster: recapHighlightAsset("05-card-show-floor-poster.webp"),
  },
];
