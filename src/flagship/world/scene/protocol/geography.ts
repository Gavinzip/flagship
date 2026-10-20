import { Vector3 } from "three";
export { landRings, drawLand } from "../../art/landAtlas";
export function geoPoint(longitude: number, latitude: number, radius = 1) {
  const phi = (latitude * Math.PI) / 180,
    theta = (longitude * Math.PI) / 180;
  return new Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(theta),
  );
}
