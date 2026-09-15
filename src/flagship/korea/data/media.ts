import { staticAssetUrl } from "../../../lib/staticAssets";

export type KoreaHighlightMedia = {
  src: string;
  poster: string;
};

// These five quiet, 480p previews come from the FLAGSHIP TAIWAN 2026 event.
// They are hosted as immutable CDN media, rather than bundled into the Korea
// page, because they are used as an atmosphere preview for the Seoul edition.
const koreaHighlightAsset = (name: string) =>
  staticAssetUrl(`flagship/korea-highlights/${name}`);

export const koreaHighlightMedia: readonly KoreaHighlightMedia[] = [
  {
    src: koreaHighlightAsset("01-gather-around-cards-480p.web.mp4"),
    poster: koreaHighlightAsset("01-gather-around-cards-poster.webp"),
  },
  {
    src: koreaHighlightAsset("02-collector-community-480p.web.mp4"),
    poster: koreaHighlightAsset("02-collector-community-poster.webp"),
  },
  {
    src: koreaHighlightAsset("03-brand-experiences-collectibles-480p.web.mp4"),
    poster: koreaHighlightAsset("03-brand-experiences-collectibles-poster.webp"),
  },
  {
    src: koreaHighlightAsset("04-on-site-atmosphere-480p.web.mp4"),
    poster: koreaHighlightAsset("04-on-site-atmosphere-poster.webp"),
  },
  {
    src: koreaHighlightAsset("05-card-show-floor-480p.web.mp4"),
    poster: koreaHighlightAsset("05-card-show-floor-poster.webp"),
  },
];
