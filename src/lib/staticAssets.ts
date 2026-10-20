import { STATIC_ASSET_RELEASE } from "../generated/staticAssetRelease";

const configuredCdnBase = String(
  import.meta.env.VITE_STATIC_ASSET_CDN_BASE_URL || "",
)
  .trim()
  .replace(/\/+$/, "");

function normalizeAssetPath(value: string) {
  const assetName = String(value)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^assets\//, "");

  if (!/^[a-zA-Z0-9._/-]+$/.test(assetName)) {
    throw new Error(`Invalid static asset path: ${value}`);
  }

  return `/assets/${assetName}`;
}

export function staticAssetUrl(path: string) {
  return staticAssetReleaseUrl(path, STATIC_ASSET_RELEASE);
}

/** Edition media can advance its own immutable release without republishing older editions. */
export function staticAssetReleaseUrl(path: string, release: string) {
  const assetPath = normalizeAssetPath(path);

  if (import.meta.env.DEV) {
    return assetPath;
  }

  if (!configuredCdnBase || release === "unpublished") {
    throw new Error(
      "Static asset CDN is not configured. Publish an asset release and set VITE_STATIC_ASSET_CDN_BASE_URL before a production build.",
    );
  }

  return `${configuredCdnBase}/${release}${assetPath}`;
}

export function staticAssetCssUrl(path: string) {
  return `url("${staticAssetUrl(path)}")`;
}
