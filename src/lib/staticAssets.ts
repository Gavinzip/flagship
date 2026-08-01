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
  const assetPath = normalizeAssetPath(path);

  if (import.meta.env.DEV) {
    return assetPath;
  }

  if (!configuredCdnBase || STATIC_ASSET_RELEASE === "unpublished") {
    throw new Error(
      "Static asset CDN is not configured. Publish an asset release and set VITE_STATIC_ASSET_CDN_BASE_URL before a production build.",
    );
  }

  return `${configuredCdnBase}/${STATIC_ASSET_RELEASE}${assetPath}`;
}

export function staticAssetCssUrl(path: string) {
  return `url("${staticAssetUrl(path)}")`;
}
