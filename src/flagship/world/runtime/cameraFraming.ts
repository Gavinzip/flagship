import { worldSpec } from "../config/worldSpec";

export function cameraFitForSize(width: number, height: number) {
  const fittedDistance = worldSpec.camera.minimumFrameDiameter /
    (2 * Math.tan(worldSpec.camera.fov * Math.PI / 360) * Math.min(1, width / height));
  return Math.max(1, fittedDistance / worldSpec.arrivalDistance);
}
