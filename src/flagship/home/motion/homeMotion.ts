/** One motion vocabulary for the IP shell; geographic entry keeps its own clock. */
export const homeMotion = {
  ease: [0.16, 1, 0.3, 1] as const,
  reveal: 0.56,
  change: 0.42,
  response: 0.2,
  selection: { type: "spring", stiffness: 420, damping: 34 } as const,
};
