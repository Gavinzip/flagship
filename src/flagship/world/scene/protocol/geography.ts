import { Vector3 } from "three";
import land from "./data/land.json";
export const landRings = land;
export function geoPoint(longitude: number, latitude: number, radius = 1) {
  const phi = (latitude * Math.PI) / 180,
    theta = (longitude * Math.PI) / 180;
  return new Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(theta),
  );
}
export function drawLand(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.beginPath();
  for (const ring of landRings) {
    ring.forEach(([lon, lat], i) => {
      const x = ((lon + 180) / 360) * w,
        y = ((90 - lat) / 180) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
  }
  ctx.fill("evenodd");
}
