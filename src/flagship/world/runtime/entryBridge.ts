import type { CityId } from "../config/worldSpec";
export type GeographicAnchor = { x: number; y: number };
export type WorldEntryBridge = {
  prepare: (city: CityId) => void;
  flyTo: (city: CityId, signal: AbortSignal) => Promise<GeographicAnchor>;
  depart: (signal: AbortSignal, advance: (progress: number) => void) => Promise<void>;
  restore: () => void;
};
