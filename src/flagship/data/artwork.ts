import { staticAssetUrl } from "../../lib/staticAssets";

/** Current Korea artwork, promoted for the Test deployment on 2026-09-13. */
export const artwork = {
  sky: staticAssetUrl("flagship/korea-sky.webp"),
  city: staticAssetUrl("flagship/korea-city.webp"),
  frame: staticAssetUrl("flagship/korea-card-frame.webp"),
  river: staticAssetUrl("flagship/korea-river.webp"),
} as const;
