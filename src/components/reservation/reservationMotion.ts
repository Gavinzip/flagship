export const reservationFlightFragments = [
  { delay: 0, duration: 980, spread: 0, kind: "core" },
  { delay: 38, duration: 1_040, spread: -16, kind: "streak" },
  { delay: 76, duration: 930, spread: 12, kind: "spark" },
  { delay: 112, duration: 1_080, spread: -27, kind: "streak" },
  { delay: 148, duration: 960, spread: 25, kind: "spark" },
  { delay: 184, duration: 1_100, spread: -8, kind: "core" },
  { delay: 222, duration: 980, spread: 34, kind: "streak" },
  { delay: 258, duration: 1_060, spread: -38, kind: "spark" },
  { delay: 296, duration: 940, spread: 7, kind: "spark" },
  { delay: 334, duration: 1_120, spread: 19, kind: "streak" },
  { delay: 370, duration: 990, spread: -21, kind: "spark" },
  { delay: 406, duration: 1_080, spread: 42, kind: "core" },
  { delay: 442, duration: 1_000, spread: -46, kind: "streak" },
  { delay: 476, duration: 1_090, spread: 29, kind: "spark" },
  { delay: 506, duration: 960, spread: -31, kind: "spark" },
  { delay: 532, duration: 1_040, spread: 14, kind: "streak" },
  { delay: 552, duration: 1_020, spread: -11, kind: "spark" },
  { delay: 570, duration: 1_030, spread: 3, kind: "core" },
] as const;

const flightArrivalTimes = reservationFlightFragments.map(
  ({ delay, duration }) => delay + duration,
);

export const reservationFlightArrivalWindow = {
  startMs: Math.min(...flightArrivalTimes),
  endMs: Math.max(...flightArrivalTimes),
} as const;

export const reservationFlightArrivalDurationMs =
  reservationFlightArrivalWindow.endMs - reservationFlightArrivalWindow.startMs;

if (reservationFlightArrivalDurationMs <= 0) {
  throw new Error("Reservation flight arrival window must have duration.");
}

export const reservationCapacityMotion = {
  originDurationMs: 760,
  meterGrowDelayMs: reservationFlightArrivalWindow.startMs,
  meterGrowDurationMs: reservationFlightArrivalDurationMs,
  successDelayMs: 4_000,
  reducedSuccessDelayMs: 650,
} as const;
