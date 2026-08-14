import type {
  ReservationErrorCode,
  ReservationSlotStatus,
} from "../../shared/reservations/domain";

export type {
  ReservationErrorCode,
  ReservationSlotStatus,
} from "../../shared/reservations/domain";

export type ReservationSlot = {
  id: string;
  label: { zh: string; en: string };
  startAt: string;
  endAt: string;
  cutoffAt: string;
  capacity: number;
  remaining: number;
  status: ReservationSlotStatus;
};

export type AvailabilityResponse = {
  serverTime: string;
  timezone: "Asia/Taipei";
  slots: ReservationSlot[];
};

export type ReservationReceipt = {
  reservationId: string;
  email: string;
  slotId: string;
  ticketCount: number;
  createdAt: string;
};

export type ReservationInput = {
  email: string;
  slotId: string;
  company: string;
};
