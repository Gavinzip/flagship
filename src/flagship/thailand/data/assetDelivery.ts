import { staticAssetReleaseUrl } from "../../../lib/staticAssets";
import { STATIC_ASSET_RELEASE as THAILAND_ASSET_RELEASE } from "../../../generated/thailandAssetRelease";

/** Only the retained artwork and selected official/user photographs are published here. */
export function thailandAssetUrl(filename: string) {
  return staticAssetReleaseUrl(`flagship/thailand/${filename}`, THAILAND_ASSET_RELEASE);
}
