import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle,
  NavArrowLeft,
  WarningTriangle,
} from "iconoir-react";
import { useLocale } from "../../i18n/LocaleProvider";
import { reservationSlotLabel } from "../../reservations/reservationFormatting";
import type {
  ReservationErrorCode,
  ReservationSlot,
} from "../../reservations/types";

const focusableSelector =
  'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])';

export function ReservationConfirmationDialog({
  open,
  email,
  slot,
  submitError,
  submitting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  email: string;
  slot: ReservationSlot | null;
  submitError: ReservationErrorCode | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (source: DOMRect) => void;
}) {
  const { content, locale } = useLocale();
  const copy = content.tickets;
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const submittingRef = useRef(submitting);
  const closeRef = useRef(onClose);
  submittingRef.current = submitting;
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => confirmRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submittingRef.current) {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (open && submitting) dialogRef.current?.focus();
  }, [open, submitting]);

  if (!open || !slot) return null;

  return createPortal(
    <div
      className="reservation-dialog-backdrop"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !submitting
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="reservation-dialog"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="reservation-dialog__signal" aria-hidden="true">
          <WarningTriangle />
        </div>
        <span>{copy.statusEyebrow}</span>
        <h3 id={titleId}>{copy.reviewTitle}</h3>
        <p id={descriptionId}>{copy.reviewDescription}</p>
        <dl>
          <div>
            <dt>{copy.reviewGmail}</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>{copy.reviewSlot}</dt>
            <dd>{reservationSlotLabel(slot, locale)}</dd>
          </div>
        </dl>
        {submitError ? (
          <p className="reservation-submit-error" role="alert">
            <WarningTriangle aria-hidden="true" />
            {copy.errors[submitError]}
          </p>
        ) : null}
        <div className="reservation-dialog__actions">
          <button
            className="reservation-button reservation-button--secondary"
            type="button"
            disabled={submitting}
            onClick={onClose}
          >
            <NavArrowLeft aria-hidden="true" />
            {copy.back}
          </button>
          <button
            ref={confirmRef}
            className="reservation-button reservation-button--primary reservation-dialog__confirm"
            type="button"
            disabled={submitting || slot.status !== "available"}
            onClick={() => {
              if (confirmRef.current) {
                onConfirm(confirmRef.current.getBoundingClientRect());
              }
            }}
          >
            {submitting ? (
              <span className="reservation-button__spinner" aria-hidden="true" />
            ) : (
              <CheckCircle aria-hidden="true" />
            )}
            {submitting ? copy.submitting : copy.submit}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
