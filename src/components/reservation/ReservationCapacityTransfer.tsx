import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  reservationCapacityMotion,
  reservationFlightArrivalDurationMs,
  reservationFlightArrivalWindow,
  reservationFlightFragments,
} from "./reservationMotion";

export type CapacityTransferPlan = {
  source: DOMRect;
  target: DOMRect;
  startProgress: number;
  targetProgress: number;
};

type FlightStyle = CSSProperties & {
  "--travel-x": string;
  "--travel-y": string;
  "--flight-angle": string;
  "--flight-delay": string;
  "--flight-duration": string;
};

type TransferStyle = CSSProperties & {
  "--transfer-origin-duration": string;
};

function clampProgress(progress: number) {
  return Math.max(0, Math.min(1, progress));
}

export function ReservationCapacityTransfer({
  plan,
  onComplete,
}: {
  plan: CapacityTransferPlan;
  onComplete: () => void;
}) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  const geometry = useMemo(() => {
    const startX = plan.source.left + plan.source.width / 2;
    const startY = plan.source.top + plan.source.height / 2;
    const endY = plan.target.top + plan.target.height / 2;
    const startProgress = clampProgress(plan.startProgress);
    const targetProgress = clampProgress(plan.targetProgress);
    const finalEndX = plan.target.left + plan.target.width * targetProgress;
    const deltaX = finalEndX - startX;
    const deltaY = endY - startY;
    const distance = Math.max(1, Math.hypot(deltaX, deltaY));
    const perpendicularX = -deltaY / distance;
    const perpendicularY = deltaX / distance;
    const flights = reservationFlightFragments.map((fragment) => {
      const originX = startX + perpendicularX * fragment.spread;
      const originY = startY + perpendicularY * fragment.spread;
      const arrivalRatio = clampProgress(
        (fragment.delay +
          fragment.duration -
          reservationFlightArrivalWindow.startMs) /
          reservationFlightArrivalDurationMs,
      );
      const arrivalProgress =
        startProgress + (targetProgress - startProgress) * arrivalRatio;
      const arrivalX = plan.target.left + plan.target.width * arrivalProgress;
      const travelX = arrivalX - originX;
      const travelY = endY - originY;

      return {
        originX,
        originY,
        travelX,
        travelY,
        angle: Math.atan2(travelY, travelX),
      };
    });

    return {
      startX,
      startY,
      flights,
    };
  }, [
    plan.source,
    plan.startProgress,
    plan.target,
    plan.targetProgress,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => completeRef.current(),
      reducedMotion
        ? reservationCapacityMotion.reducedSuccessDelayMs
        : reservationCapacityMotion.successDelayMs,
    );
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return createPortal(
    <div
      className={`reservation-transfer${reducedMotion ? " is-reduced" : ""}`}
      style={
        {
          "--transfer-origin-duration": `${reservationCapacityMotion.originDurationMs}ms`,
        } as TransferStyle
      }
      aria-hidden="true"
    >
      {!reducedMotion ? (
        <>
          <span
            className="reservation-transfer__origin"
            style={{ left: geometry.startX, top: geometry.startY }}
          />
          {reservationFlightFragments.map((fragment, index) => {
            const flight = geometry.flights[index];
            return (
              <i
                className={`reservation-transfer__fragment reservation-transfer__fragment--${fragment.kind}`}
                key={`${fragment.kind}-${index}`}
                style={
                  {
                    left: flight.originX,
                    top: flight.originY,
                    "--travel-x": `${flight.travelX}px`,
                    "--travel-y": `${flight.travelY}px`,
                    "--flight-angle": `${flight.angle}rad`,
                    "--flight-delay": `${fragment.delay}ms`,
                    "--flight-duration": `${fragment.duration}ms`,
                  } as FlightStyle
                }
              />
            );
          })}
        </>
      ) : null}
    </div>,
    document.body,
  );
}
