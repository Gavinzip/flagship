import { CheckCircle } from "iconoir-react";
import { useLocale } from "../../i18n/LocaleProvider";
import { reservationSlotLabel } from "../../reservations/reservationFormatting";
import type { ReservationConfirmation } from "../../reservations/useReservationFlow";

export function ReservationSuccessState({
  confirmation,
  onReset,
}: {
  confirmation: ReservationConfirmation;
  onReset: () => void;
}) {
  const { content, locale } = useLocale();
  const copy = content.tickets;
  const { receipt, slot } = confirmation;

  return (
    <div className="reservation-success" aria-live="polite">
      <div className="reservation-success__halo" aria-hidden="true">
        <CheckCircle />
      </div>
      <span>{copy.successEyebrow}</span>
      <h3>{copy.successTitle}</h3>
      <p>{copy.successDescription}</p>
      <dl>
        <div>
          <dt>{copy.reviewGmail}</dt>
          <dd>{receipt.email}</dd>
        </div>
        <div>
          <dt>{copy.reviewSlot}</dt>
          <dd>{reservationSlotLabel(slot, locale)}</dd>
        </div>
        <div>
          <dt>{copy.ticketCountLabel}</dt>
          <dd>{copy.ticketCount(receipt.ticketCount)}</dd>
        </div>
        <div>
          <dt>{copy.successReference}</dt>
          <dd>{receipt.reservationId}</dd>
        </div>
      </dl>
      <button
        className="reservation-button reservation-button--secondary"
        type="button"
        onClick={onReset}
      >
        {copy.registerAnother}
      </button>
    </div>
  );
}
