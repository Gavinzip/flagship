import { useCallback, useMemo, useRef, useState } from "react";
import { RESERVATION_ERROR } from "../../shared/reservations/domain";
import { normalizeGmail } from "../../shared/reservations/gmail";
import { createReservation, ReservationApiError } from "./reservationApi";
import { useReservationAvailability } from "./ReservationAvailabilityProvider";
import type {
  ReservationErrorCode,
  ReservationReceipt,
  ReservationSlot,
} from "./types";

export type ReservationFlowStep = "select" | "success";
export type ReservationFieldError = "email" | "slot" | null;
export type ReservationConfirmation = {
  receipt: ReservationReceipt;
  slot: ReservationSlot;
};

function reservationAttemptKey(email: string, slotId: string) {
  const normalizedEmail = normalizeGmail(email);
  return normalizedEmail ? `${normalizedEmail}::${slotId}` : null;
}

export function useReservationFlow() {
  const availability = useReservationAvailability();
  const [step, setStep] = useState<ReservationFlowStep>("select");
  const [email, setEmail] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [company, setCompany] = useState("");
  const [fieldError, setFieldError] = useState<ReservationFieldError>(null);
  const [submitError, setSubmitError] =
    useState<ReservationErrorCode | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmation, setConfirmation] =
    useState<ReservationConfirmation | null>(null);
  const [rejectedAttemptKeys, setRejectedAttemptKeys] = useState<string[]>([]);
  const submissionInFlight = useRef(false);

  const selectedSlot = useMemo(
    () =>
      availability.slots.find((slot) => slot.id === selectedSlotId) || null,
    [availability.slots, selectedSlotId],
  );
  const rejectedSlotIds = useMemo(() => {
    const normalizedEmail = normalizeGmail(email);
    if (!normalizedEmail) return [];
    const prefix = `${normalizedEmail}::`;
    return rejectedAttemptKeys
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length));
  }, [email, rejectedAttemptKeys]);

  const updateEmail = (value: string) => {
    setEmail(value);
    setSubmitError(null);
    if (fieldError === "email") setFieldError(null);
  };

  const selectSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
    if (fieldError === "slot") setFieldError(null);
  };

  const requestConfirmation = () => {
    const normalizedEmail = normalizeGmail(email);
    if (!normalizedEmail) {
      setFieldError("email");
      return;
    }
    if (!selectedSlot || selectedSlot.status !== "available") {
      setFieldError("slot");
      return;
    }
    setFieldError(null);
    setSubmitError(null);
    setConfirmationOpen(true);
  };

  const submit = async (): Promise<ReservationConfirmation | null> => {
    if (submissionInFlight.current) return null;
    if (!selectedSlot || selectedSlot.status !== "available") {
      setFieldError("slot");
      setConfirmationOpen(false);
      return null;
    }

    submissionInFlight.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const receipt = await createReservation({
        email,
        slotId: selectedSlot.id,
        company,
      });
      const nextConfirmation = { receipt, slot: selectedSlot };
      setConfirmation(nextConfirmation);
      setConfirmationOpen(false);
      void availability.refresh();
      return nextConfirmation;
    } catch (error) {
      const code =
        error instanceof ReservationApiError
          ? error.code
          : RESERVATION_ERROR.serverError;
      setSubmitError(code);
      if (
        code === RESERVATION_ERROR.slotClosed ||
        code === RESERVATION_ERROR.slotFull ||
        code === RESERVATION_ERROR.invalidSlot ||
        code === RESERVATION_ERROR.reservationUnavailable
      ) {
        if (
          code === RESERVATION_ERROR.slotFull ||
          code === RESERVATION_ERROR.reservationUnavailable
        ) {
          const attemptKey = reservationAttemptKey(email, selectedSlot.id);
          if (attemptKey) {
            setRejectedAttemptKeys((current) =>
              current.includes(attemptKey) ? current : [...current, attemptKey],
            );
          }
        }
        setConfirmationOpen(false);
        setSelectedSlotId("");
        void availability.refresh();
      }
      return null;
    } finally {
      submissionInFlight.current = false;
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("select");
    setEmail("");
    setSelectedSlotId("");
    setCompany("");
    setFieldError(null);
    setSubmitError(null);
    setConfirmation(null);
    setConfirmationOpen(false);
    setRejectedAttemptKeys([]);
  };
  const closeConfirmation = useCallback(() => {
    if (!submitting) setConfirmationOpen(false);
  }, [submitting]);
  const completeSuccess = useCallback(() => setStep("success"), []);

  return {
    ...availability,
    step,
    email,
    selectedSlotId,
    selectedSlot,
    company,
    fieldError,
    submitError,
    submitting,
    confirmationOpen,
    confirmation,
    rejectedSlotIds,
    updateEmail,
    selectSlot,
    setCompany,
    requestConfirmation,
    closeConfirmation,
    submit,
    completeSuccess,
    reset,
  };
}
