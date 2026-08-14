import type { CSSProperties } from "react";
import { useLocale } from "../../i18n/LocaleProvider";
import type { ReservationSlot } from "../../reservations/types";
import { reservationCapacityMotion } from "./reservationMotion";

export type CapacityCelebration = {
  slotId: string;
  previousRemaining: number;
  ticketCount: number;
};

type MeterTimelineStyle = CSSProperties & {
  "--meter-grow-delay": string;
  "--meter-grow-duration": string;
};

function percentage(value: number, capacity: number) {
  if (capacity <= 0) return 0;
  return Math.max(0, Math.min(100, (value / capacity) * 100));
}

export function ReservationCapacityMeter({
  slot,
  celebration,
  meterRef,
}: {
  slot: ReservationSlot;
  celebration: CapacityCelebration | null;
  meterRef: (node: HTMLSpanElement | null) => void;
}) {
  const { content } = useLocale();
  const copy = content.tickets;
  const occupied = Math.max(0, slot.capacity - slot.remaining);
  const isReceiving = celebration?.slotId === slot.id;
  const occupiedBefore = isReceiving
    ? Math.max(0, slot.capacity - celebration.previousRemaining)
    : occupied;
  const occupiedAfter = isReceiving
    ? Math.min(slot.capacity, occupiedBefore + celebration.ticketCount)
    : occupied;
  const displayedOccupied = isReceiving ? occupiedBefore : occupied;
  const displayedRemaining = isReceiving
    ? celebration.previousRemaining
    : slot.remaining;
  const meterStyle = isReceiving
    ? ({
        "--meter-from": `${percentage(occupiedBefore, slot.capacity)}%`,
        "--meter-to": `${percentage(occupiedAfter, slot.capacity)}%`,
      } as CSSProperties)
    : { width: `${percentage(occupied, slot.capacity)}%` };
  const timelineStyle = isReceiving
    ? ({
        "--meter-grow-delay": `${reservationCapacityMotion.meterGrowDelayMs}ms`,
        "--meter-grow-duration": `${reservationCapacityMotion.meterGrowDurationMs}ms`,
      } as MeterTimelineStyle)
    : undefined;

  return (
    <>
      <span
        ref={meterRef}
        className={`reservation-slot__meter${isReceiving ? " is-receiving" : ""}`}
        style={timelineStyle}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={slot.capacity}
        aria-valuenow={displayedOccupied}
        aria-valuetext={`${copy.registered(displayedOccupied)}，${copy.remaining(displayedRemaining)}`}
      >
        <i style={meterStyle} aria-hidden="true" />
      </span>
      <span className="reservation-slot__meter-legend" aria-hidden="true">
        <span>{copy.registered(displayedOccupied)}</span>
        <span>{copy.capacity(slot.capacity)}</span>
      </span>
    </>
  );
}
