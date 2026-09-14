import { journeyPose } from "./journeyPose";
import type { GlobePose } from "./flightRig";
import type { CityId } from "../config/worldSpec";

/** The exact globe pose that began a country journey. */
export type WorldEntryOrigin = {
  pose: GlobePose;
  anchor: { x: number; y: number };
  /** The outer world's exact scroll state before the country journey began. */
  progress: number;
  scrollY: number;
};

/** Direct country URLs begin their return from the world opening pose. */
export function directEntryOrigin(city: CityId): WorldEntryOrigin {
  return {
    pose: journeyPose(0, city),
    anchor: { x: innerWidth / 2, y: innerHeight / 2 },
    progress: 0,
    scrollY: 0,
  };
}
