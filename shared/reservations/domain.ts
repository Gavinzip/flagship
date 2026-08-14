export const RESERVATION_ERROR = {
  invalidGmail: "INVALID_GMAIL",
  invalidSlot: "INVALID_SLOT",
  slotClosed: "SLOT_CLOSED",
  slotFull: "SLOT_FULL",
  reservationUnavailable: "RESERVATION_UNAVAILABLE",
  serverError: "SERVER_ERROR",
  networkError: "NETWORK_ERROR",
} as const;

export type ReservationErrorCode =
  (typeof RESERVATION_ERROR)[keyof typeof RESERVATION_ERROR];

export const RESERVATION_ERROR_CODES = Object.values(RESERVATION_ERROR);

export type ReservationSlotStatus = "available" | "full" | "closed";

export function getReservationSlotStatus(
  slot: { cutoffAt: string; startAt: string; remaining: number },
  nowMs: number,
): ReservationSlotStatus {
  const cutoffMs = Date.parse(slot.cutoffAt);
  const startMs = Date.parse(slot.startAt);
  if (!Number.isFinite(cutoffMs) || !Number.isFinite(startMs)) return "closed";
  if (Math.min(cutoffMs, startMs) <= nowMs) return "closed";
  if (slot.remaining <= 0) return "full";
  return "available";
}
