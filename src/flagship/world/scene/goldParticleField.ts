import { drawLand, geoPoint } from "./protocol/geography";

/** Closer samples and smaller points preserve a crisp dot pattern during the camera zoom. */
export const goldParticleSpec = {
  spacingDegrees: 0.42,
  landPointSize: 1.2,
  oceanPointSize: 0.7,
} as const;

/** Evenly spaced geographic samples; the same coastline data drives both Earth materials. */
export function goldParticleField() {
  const width = 1024, height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("The particle globe's geographic mask could not be created.");
  context.fillStyle = "white";
  drawLand(context, width, height);
  const mask = context.getImageData(0, 0, width, height).data;
  const positions: number[] = [], land: number[] = [], seeds: number[] = [];
  const step = goldParticleSpec.spacingDegrees;
  for (let latitude = -87; latitude <= 87; latitude += step) {
    const count = Math.max(12, Math.round(360 * Math.cos(latitude * Math.PI / 180) / step));
    for (let column = 0; column < count; column++) {
      const longitude = -180 + (column / count) * 360;
      const x = Math.min(width - 1, Math.floor((longitude + 180) / 360 * width));
      const y = Math.min(height - 1, Math.floor((90 - latitude) / 180 * height));
      positions.push(...geoPoint(longitude, latitude, 1.006).toArray());
      land.push(mask[(y * width + x) * 4 + 3] / 255);
      seeds.push((Math.sin(longitude * 12.9898 + latitude * 78.233) * 43758.5453) % 1);
    }
  }
  return { positions, land, seeds };
}
