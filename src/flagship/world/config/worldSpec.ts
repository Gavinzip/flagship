import type { EditionId } from "../../data/editions";
export type CityId = EditionId;
export const worldSpec = {
  radius: 1,
  camera: { fov: 36, minimumFrameDiameter: 2.22 },
  dpr: { desktop: 1.5, mobile: 1.25 },
  colors: {
    ocean: "#c9d9e8",
    land: "#f0ede5",
    coast: "#8cacc5",
    red: "#b82e4c",
    blue: "#225ed6",
  },
  cities: {
    thailand: { longitude: 100.5018, latitude: 13.7563, label: "BANGKOK", color: "#f0b90b" },
    taiwan: {
      longitude: 121.5654,
      latitude: 25.033,
      label: "TAIPEI",
      color: "#b82e4c",
    },
  },
  journey: {
    approachStart: 0,
    arrival: 0.85,
  },
  opening: { distance: 3.85 },
  arrivalDistance: 3.55,
} as const;
