import { MathUtils } from "three";
import { worldSpec, type CityId } from "../config/worldSpec";
import type { GlobePose } from "./flightRig";

/** Start at the selected edition; vertical scroll gently approaches the same place. */
export function journeyPose(progress: number, city: CityId): GlobePose {
  const blend = MathUtils.smoothstep(
    progress,
    worldSpec.journey.approachStart,
    worldSpec.journey.arrival,
  );
  const target = worldSpec.cities[city];
  return {
    longitude: target.longitude,
    latitude: target.latitude,
    distance: MathUtils.lerp(
      worldSpec.opening.distance,
      worldSpec.arrivalDistance,
      blend,
    ),
  };
}

export function cityIllumination(alignment: number) {
  return 1 - MathUtils.smoothstep(alignment, 0.5, 4);
}
