/** Retiming changes only the browser playback clock, never the original MP4. */
export const venuePlayback = {
  initialRate: 2,
  finalRate: 4.2,
  doorLightAt: 3.45,
} as const;

/** A continuous exponential acceleration keeps the descent moving from its first frame. */
export function venuePlaybackRate(sourceSeconds: number, duration: number) {
  if (!Number.isFinite(sourceSeconds) || !Number.isFinite(duration) || duration <= 0) {
    throw new Error("The venue film clock is invalid.");
  }
  const progress = Math.max(0, Math.min(1, sourceSeconds / duration));
  return venuePlayback.initialRate
    * Math.pow(venuePlayback.finalRate / venuePlayback.initialRate, progress);
}
