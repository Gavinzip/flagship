import { staticAssetUrl } from "../../lib/staticAssets";

/** Current Korea artwork, including three full 2K scroll panels. */
export const artwork = {
  sky: staticAssetUrl("flagship/korea-sky.webp"),
  city: staticAssetUrl("flagship/korea-city.webp"),
  frame: staticAssetUrl("flagship/korea-card-frame.webp"),
  river: staticAssetUrl("flagship/korea-river.webp"),
  scrollSky2k: staticAssetUrl("flagship/09-korea-scroll-sky.webp"),
  scrollCity2k: staticAssetUrl("flagship/10-korea-scroll-city.webp"),
  scrollGround2k: staticAssetUrl("flagship/11-korea-scroll-ground.webp"),
} as const;
