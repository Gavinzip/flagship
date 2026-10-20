import { drawLand } from "./landAtlas";

let cached: { land: string; ocean: string } | undefined;

/** A fixed Bangkok-facing projection. One SVG path per tone avoids thousands of DOM nodes. */
export function goldGlobePaths() {
  if (cached) return cached;
  const width = 1024, height = 512;
  const mask = document.createElement("canvas");
  mask.width = width;
  mask.height = height;
  const context = mask.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("The Thailand background's geographic mask could not be created.");
  drawLand(context, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const land: string[] = [], ocean: string[] = [];
  const latitude = 14 * Math.PI / 180, longitude = 100.5 * Math.PI / 180;
  for (let y = -492; y <= 492; y += 6) {
    for (let x = -492; x <= 492; x += 6) {
      const nx = x / 500, ny = -y / 500;
      if (nx * nx + ny * ny >= .998) continue;
      const nz = Math.sqrt(1 - nx * nx - ny * ny);
      const lat = Math.asin(ny * Math.cos(latitude) + nz * Math.sin(latitude));
      const lon = longitude + Math.atan2(nx, nz * Math.cos(latitude) - ny * Math.sin(latitude));
      const px = Math.floor(((lon / Math.PI * 180 + 540) % 360) / 360 * width);
      const py = Math.min(height - 1, Math.floor((90 - lat / Math.PI * 180) / 180 * height));
      const isLand = pixels[(py * width + px) * 4 + 3] > 128;
      const size = isLand ? 3.3 : 1.4;
      (isLand ? land : ocean).push(`M${(x + 500).toFixed(1)} ${(y + 500).toFixed(1)}h${size}v${size}h-${size}z`);
    }
  }
  cached = { land: land.join(""), ocean: ocean.join("") };
  return cached;
}
