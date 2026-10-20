import type { CityId } from "../config/worldSpec";
import type { ReturnFrame } from "./returnRig";
import type { WorldEntryOrigin } from "./entryOrigin";
export type GeographicAnchor = { x: number; y: number };
export type GeographicArrival = GeographicAnchor & {
  origin: WorldEntryOrigin;
};
export type WorldEntryBridge = {
  prepare: (city: CityId) => void;
  flyTo: (city: CityId, signal: AbortSignal) => Promise<GeographicArrival>;
  depart: (signal: AbortSignal, advance: (progress: number) => void) => Promise<void>;
  retreat: (
    city: CityId,
    signal: AbortSignal,
    advance: (frame: ReturnFrame) => void,
    origin: WorldEntryOrigin,
  ) => Promise<void>;
  release: () => void;
  restore: () => void;
};
