import * as THREE from "three";
import { globeConfig } from "./config";
import { drawLand } from "./geography";
import { noise, terrain } from "./noise";
const colors = globeConfig.colors;
const W = 2048,
  H = 1024;
function context() {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Unable to create geographic material.");
  return ctx;
}
function texture(ctx: CanvasRenderingContext2D, color = false) {
  const t = new THREE.CanvasTexture(ctx.canvas);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
export function createEarthMaterial() {
  const mask = context();
  mask.fillStyle = "white";
  drawLand(mask, W, H);
  const land = mask.getImageData(0, 0, W, H).data;
  const albedo = context(),
    rough = context(),
    bump = context(),
    ao = context();
  const ac = albedo.createImageData(W, H),
    rc = rough.createImageData(W, H),
    bc = bump.createImageData(W, H),
    oc = ao.createImageData(W, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const k = (y * W + x) * 4,
        u = x / W,
        v = y / H,
        isLand = land[k + 3] > 127;
      const n = terrain(u, v),
        broad = noise(u * 12, v * 6, 12),
        micro = noise(u * 1536, v * 768, 1536);
      const lon = u * 360 - 180,
        lat = 90 - v * 180;
      const mountains = Math.exp(
        -(((lon - 85) / 27) ** 2) - ((lat - 32) / 7) ** 2,
      );
      const arid =
        Math.max(0, 1 - Math.abs(Math.abs(lat) - 26) / 20) * 0.5 + broad * 0.5;
      const tone = Math.min(
        1,
        Math.max(0, (arid * 0.45 + n * 0.55 - 0.22) * 1.85),
      );
      const rgb = isLand
        ? colors.landBase.map(
            (base, channel) => base + tone * colors.landRange[channel],
          )
        : colors.oceanBase.map(
            (base, channel) => base + n * colors.oceanRange[channel],
          );
      for (let c = 0; c < 3; c++) {
        ac.data[k + c] = Math.min(255, rgb[c] + mountains * (isLand ? 22 : 0));
        rc.data[k + c] = isLand ? 135 + n * 77 : 77 + n * 32;
        bc.data[k + c] = isLand
          ? 45 + n * 146 + mountains * (1 - Math.abs(micro * 2 - 1)) * 85
          : 75 + n * 11;
        oc.data[k + c] = isLand ? 230 + n * 25 : 255;
      }
      ac.data[k + 3] = rc.data[k + 3] = bc.data[k + 3] = oc.data[k + 3] = 255;
    }
  albedo.putImageData(ac, 0, 0);
  rough.putImageData(rc, 0, 0);
  bump.putImageData(bc, 0, 0);
  ao.putImageData(oc, 0, 0);
  return new THREE.MeshPhysicalMaterial({
    map: texture(albedo, true),
    roughnessMap: texture(rough),
    roughness: 1,
    bumpMap: texture(bump),
    bumpScale: 0.095,
    aoMap: texture(ao),
    aoMapIntensity: 0.6,
    metalness: 0.12,
    clearcoat: 0.12,
    clearcoatRoughness: 0.4,
  });
}
