import type { CityId } from "../config/worldSpec";
import type { ReturnFrame } from "./returnRig";
export type GeographicAnchor = { x: number; y: number };
export type WorldEntryBridge = {
  prepare: (city: CityId) => void;
  flyTo: (city: CityId, signal: AbortSignal) => Promise<GeographicAnchor>;
  depart: (signal: AbortSignal, advance: (progress: number) => void) => Promise<void>;
  retreat: (city: CityId, signal: AbortSignal, advance: (frame: ReturnFrame) => void) => Promise<void>;
  release: () => void;
  restore: () => void;
};
