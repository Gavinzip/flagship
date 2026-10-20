// Periodic deterministic value noise: no texture seams at the antimeridian.
function hash(x: number, y: number, period: number) {
  let n =
    (Math.imul(((x % period) + period) % period, 374761393) +
      Math.imul(y, 668265263) +
      20260907) |
    0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
export function noise(x: number, y: number, period = 64) {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  let u = x - ix,
    v = y - iy;
  u = u * u * (3 - 2 * u);
  v = v * v * (3 - 2 * v);
  const a = hash(ix, iy, period),
    b = hash(ix + 1, iy, period),
    c = hash(ix, iy + 1, period),
    d = hash(ix + 1, iy + 1, period);
  return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
}
export function terrain(u: number, v: number) {
  return (
    noise(u * 32, v * 16, 32) * 0.47 +
    noise(u * 96, v * 48, 96) * 0.28 +
    noise(u * 256, v * 128, 256) * 0.16 +
    noise(u * 768, v * 384, 768) * 0.09
  );
}
