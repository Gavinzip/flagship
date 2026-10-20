/** A small open acrylic holder with a thin polished rim, inspired by the poster. */
export const cardHolderSpec = {
  width: 2.78,
  height: 4.16,
  windowWidth: 2.59,
  windowHeight: 3.94,
  depth: 0.055,
  radius: 0.12,
  rotation: [0.08, -0.27, -0.12] as const,
  materials: {
    chrome: { color: "#eff4fa", metalness: 1, roughness: 0.065 },
    acrylic: {
      color: "#e6f5ff",
      metalness: 0,
      roughness: 0.025,
      clearcoat: 1,
      clearcoatRoughness: 0.045,
      ior: 1.49,
      reflectivity: 0.8,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    },
    blue: { color: "#397aca", metalness: 0.7, roughness: 0.16 },
  },
  performance: { maxDpr: 1.5, targetFps: 40, maxDrawCalls: 60 },
} as const;
