import { RESERVATION_ERROR } from "../../shared/reservations/domain";
import { normalizeGmail } from "../../shared/reservations/gmail";
import { ReservationApiError } from "./reservationApi";
import type {
  AvailabilityResponse,
  ReservationInput,
  ReservationReceipt,
  ReservationSlot,
} from "./types";

export const RESERVATION_DEMO_GMAIL = "flagship.demo@gmail.com";

function getCanonicalDemoGmail() {
  const email = normalizeGmail(RESERVATION_DEMO_GMAIL);
  if (!email) {
    throw new Error("The configured reservation demo Gmail is invalid.");
  }
  return email;
}

const canonicalDemoGmail = getCanonicalDemoGmail();

const DEMO_RESPONSE_DELAY_MS = 420;

const initialSlots: readonly ReservationSlot[] = [
  {
    id: "demo-morning",
    label: { zh: "第一入場梯次", en: "Entry session 1" },
    startAt: "2026-09-05T04:00:00.000Z",
    endAt: "2026-09-05T05:00:00.000Z",
    cutoffAt: "2026-09-05T03:45:00.000Z",
    capacity: 200,
    remaining: 188,
    status: "available",
  },
  {
    id: "demo-midday",
    label: { zh: "第二入場梯次", en: "Entry session 2" },
    startAt: "2026-09-05T05:00:00.000Z",
    endAt: "2026-09-05T06:00:00.000Z",
    cutoffAt: "2026-09-05T04:45:00.000Z",
    capacity: 120,
    remaining: 109,
    status: "available",
  },
  {
    id: "demo-afternoon",
    label: { zh: "第三入場梯次", en: "Entry session 3" },
    startAt: "2026-09-05T06:00:00.000Z",
    endAt: "2026-09-05T07:00:00.000Z",
    cutoffAt: "2026-09-05T05:45:00.000Z",
    capacity: 400,
    remaining: 384,
    status: "available",
  },
];

function copySlots(slots: readonly ReservationSlot[]) {
  return slots.map((slot) => ({
    ...slot,
    label: { ...slot.label },
  }));
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(3, local.length - visible.length))}@${domain}`;
}

function demoDelay() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, DEMO_RESPONSE_DELAY_MS);
  });
}

export type ReservationDemoSession = {
  fetchAvailability: (signal?: AbortSignal) => Promise<AvailabilityResponse>;
  createReservation: (input: ReservationInput) => Promise<ReservationReceipt>;
  reset: () => void;
};

export function createReservationDemoSession(): ReservationDemoSession {
  let slots = copySlots(initialSlots);
  const registeredEmails = new Set<string>();

  return {
    async fetchAvailability(signal) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
      return {
        serverTime: new Date().toISOString(),
        timezone: "Asia/Taipei",
        slots: copySlots(slots),
      };
    },

    async createReservation(input) {
      await demoDelay();

      const email = normalizeGmail(input.email);
      if (!email) {
        throw new ReservationApiError(RESERVATION_ERROR.invalidGmail);
      }
      if (
        email !== canonicalDemoGmail ||
        registeredEmails.has(email)
      ) {
        throw new ReservationApiError(
          RESERVATION_ERROR.reservationUnavailable,
        );
      }
      if (input.company) {
        throw new ReservationApiError(
          RESERVATION_ERROR.reservationUnavailable,
        );
      }

      const slotIndex = slots.findIndex((slot) => slot.id === input.slotId);
      if (slotIndex < 0) {
        throw new ReservationApiError(RESERVATION_ERROR.invalidSlot);
      }
      const slot = slots[slotIndex];
      if (slot.status !== "available" || slot.remaining <= 0) {
        throw new ReservationApiError(RESERVATION_ERROR.slotFull);
      }

      slots = slots.map((current, index) =>
        index === slotIndex
          ? { ...current, remaining: current.remaining - 1 }
          : current,
      );
      registeredEmails.add(email);

      return {
        reservationId: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        email: maskEmail(email),
        slotId: slot.id,
        ticketCount: 1,
        createdAt: new Date().toISOString(),
      };
    },

    reset() {
      slots = copySlots(initialSlots);
      registeredEmails.clear();
    },
  };
}
