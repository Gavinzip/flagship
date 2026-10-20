import { MathUtils } from "three";
import { worldSpec, type CityId } from "../config/worldSpec";

export type GlobePose = {
  longitude: number;
  latitude: number;
  distance: number;
};
export type GlobeFlight = {
  from: GlobePose;
  city: CityId;
  elapsed: number;
  duration: number;
  toDistance: number;
  entering: boolean;
};

/** Geography turns while the camera makes room, then the lens advances toward the actual coordinate. */
export function sampleFlight(flight: GlobeFlight, dt: number) {
  flight.elapsed = Math.min(flight.duration, flight.elapsed + dt);
  const t = flight.duration ? flight.elapsed / flight.duration : 1;
  const turn = MathUtils.smootherstep(t, 0, 0.72);
  const city = worldSpec.cities[flight.city];
  // Entering never retreats. The selection orbit can still make room for a turn.
  if (flight.entering) {
    return {
      longitude: MathUtils.lerp(flight.from.longitude, city.longitude, turn),
      latitude: MathUtils.lerp(flight.from.latitude, city.latitude, turn),
      distance: MathUtils.lerp(
        flight.from.distance,
        Math.min(flight.from.distance, flight.toDistance),
        MathUtils.smootherstep(t, 0, 1),
      ),
    };
  }
  const peak = Math.max(flight.from.distance, 4.0);
  const distance =
    t < 0.32
      ? MathUtils.lerp(
          flight.from.distance,
          peak,
          MathUtils.smootherstep(t, 0, 0.32),
        )
      : MathUtils.lerp(
          peak,
          flight.toDistance,
          MathUtils.smootherstep(t, 0.32, 1),
        );
  return {
    longitude: MathUtils.lerp(flight.from.longitude, city.longitude, turn),
    latitude: MathUtils.lerp(flight.from.latitude, city.latitude, turn),
    distance,
  };
}
