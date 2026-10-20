import land from "../scene/protocol/data/land.json";

export const landRings = land;

/** Shared geographic mask for the physical Earth, particle surface and editorial globe. */
export function drawLand(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.beginPath();
  for (const ring of landRings) {
    ring.forEach(([longitude, latitude], index) => {
      const x = (longitude + 180) / 360 * width;
      const y = (90 - latitude) / 180 * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
  }
  ctx.fill("evenodd");
}
