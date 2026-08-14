import type {
  AvailabilityResponse,
  ReservationErrorCode,
  ReservationInput,
  ReservationReceipt,
} from "./types";
import {
  RESERVATION_ERROR,
  RESERVATION_ERROR_CODES,
} from "../../shared/reservations/domain";

const configuredBaseUrl = import.meta.env.VITE_RESERVATION_API_BASE_URL?.trim();

if (!configuredBaseUrl) {
  throw new Error("VITE_RESERVATION_API_BASE_URL is required.");
}

const apiBaseUrl = configuredBaseUrl.replace(/\/+$/, "");
const reservationErrorCodes = new Set<ReservationErrorCode>(
  RESERVATION_ERROR_CODES,
);

export class ReservationApiError extends Error {
  constructor(readonly code: ReservationErrorCode) {
    super(code);
    this.name = "ReservationApiError";
  }
}

async function readErrorCode(response: Response): Promise<ReservationErrorCode> {
  try {
    const payload = (await response.json()) as { code?: string };
    if (payload.code && reservationErrorCodes.has(payload.code as ReservationErrorCode)) {
      return payload.code as ReservationErrorCode;
    }
  } catch {
    // The status code below still produces a safe, user-facing server error.
  }
  return RESERVATION_ERROR.serverError;
}

function isReservationReceipt(
  value: unknown,
  expectedSlotId: string,
): value is ReservationReceipt {
  if (!value || typeof value !== "object") return false;
  const receipt = value as Record<string, unknown>;
  return (
    typeof receipt.reservationId === "string" &&
    receipt.reservationId.length > 0 &&
    typeof receipt.email === "string" &&
    receipt.email.length > 0 &&
    receipt.slotId === expectedSlotId &&
    receipt.ticketCount === 1 &&
    typeof receipt.createdAt === "string" &&
    Number.isFinite(Date.parse(receipt.createdAt))
  );
}

export async function fetchAvailability(signal?: AbortSignal) {
  const response = await fetch(`${apiBaseUrl}/api/early-bird/slots`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal,
  });

  if (!response.ok) throw new ReservationApiError(await readErrorCode(response));
  return (await response.json()) as AvailabilityResponse;
}

export async function createReservation(input: ReservationInput) {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/api/early-bird/reservations`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ReservationApiError(RESERVATION_ERROR.networkError);
  }

  if (!response.ok) {
    throw new ReservationApiError(await readErrorCode(response));
  }
  if (response.status !== 201) {
    throw new ReservationApiError(RESERVATION_ERROR.serverError);
  }

  let receipt: unknown;
  try {
    receipt = await response.json();
  } catch {
    throw new ReservationApiError(RESERVATION_ERROR.serverError);
  }
  if (!isReservationReceipt(receipt, input.slotId)) {
    throw new ReservationApiError(RESERVATION_ERROR.serverError);
  }

  return receipt;
}
