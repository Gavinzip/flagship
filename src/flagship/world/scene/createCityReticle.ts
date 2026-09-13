import * as T from "three";

/** Four fine arcs sit in the city's tangent plane, preserving globe perspective. */
export function createCityReticle(color: string) {
  const positions: number[] = [];
  const point = (angle: number, radius: number) => [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    const start = quadrant * Math.PI / 2 + .16;
    const sweep = Math.PI / 2 - .32;
    for (let step = 0; step < 16; step++) {
      const a = start + sweep * step / 16, b = start + sweep * (step + 1) / 16;
      const innerA = point(a, .034), outerA = point(a, .036);
      const innerB = point(b, .034), outerB = point(b, .036);
      positions.push(...innerA, ...outerA, ...outerB, ...innerA, ...outerB, ...innerB);
    }
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  const reticle = new T.Mesh(geometry, new T.MeshBasicMaterial({
    color, transparent: true, opacity: .6, side: T.DoubleSide,
    depthWrite: false, toneMapped: false,
  }));
  reticle.renderOrder = 12;
  return reticle;
}
