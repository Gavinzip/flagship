import {
  ArrowRight,
  Clock,
  Mail,
  ShieldCheck,
  WarningTriangle,
} from "iconoir-react";
import { useLocale } from "../../i18n/LocaleProvider";
import {
  formatReservationDateTime,
  formatReservationTime,
  reservationSlotStatusLabel,
} from "../../reservations/reservationFormatting";
import type {
  ReservationErrorCode,
  ReservationSlot,
} from "../../reservations/types";
import type { ReservationFieldError } from "../../reservations/useReservationFlow";
import {
  ReservationCapacityMeter,
  type CapacityCelebration,
} from "./ReservationCapacityMeter";

function AvailabilityCount({ count }: { count: number }) {
  return (
    <span className="reservation-slot__count" aria-live="polite">
      <span key={count}>{count}</span>
    </span>
  );
}

export function ReservationSelectStep({
  instanceId,
  slots,
  email,
  selectedSlotId,
  company,
  fieldError,
  submitError,
  rejectedSlotIds,
  celebration,
  locked,
  onEmailChange,
  onSlotChange,
  onCompanyChange,
  onContinue,
  onMeterRef,
}: {
  instanceId: string;
  slots: ReservationSlot[];
  email: string;
  selectedSlotId: string;
  company: string;
  fieldError: ReservationFieldError;
  submitError: ReservationErrorCode | null;
  rejectedSlotIds: string[];
  celebration: CapacityCelebration | null;
  locked: boolean;
  onEmailChange: (value: string) => void;
  onSlotChange: (slotId: string) => void;
  onCompanyChange: (value: string) => void;
  onContinue: () => void;
  onMeterRef: (slotId: string, node: HTMLSpanElement | null) => void;
}) {
  const { content, locale } = useLocale();
  const copy = content.tickets;
  const emailId = `reservation-email-${instanceId}`;
  const emailHintId = `reservation-email-hint-${instanceId}`;
  const emailErrorId = `reservation-email-error-${instanceId}`;
  const companyId = `reservation-company-${instanceId}`;

  return (
    <form
      className={`reservation-form${locked ? " is-locked" : ""}`}
      aria-busy={locked}
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
      noValidate
    >
      <div className="reservation-field">
        <label htmlFor={emailId}>{copy.gmailLabel}</label>
        <div
          className={`reservation-input${fieldError === "email" ? " is-invalid" : ""}`}
        >
          <Mail aria-hidden="true" />
          <input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.gmailPlaceholder}
            value={email}
            disabled={locked}
            aria-invalid={fieldError === "email"}
            aria-describedby={`${emailHintId}${fieldError === "email" ? ` ${emailErrorId}` : ""}`}
            onChange={(event) => onEmailChange(event.target.value)}
          />
        </div>
        <small id={emailHintId}>{copy.gmailHint}</small>
        {fieldError === "email" ? (
          <p className="reservation-field__error" id={emailErrorId}>
            {copy.invalidGmail}
          </p>
        ) : null}
      </div>

      <div className="reservation-field reservation-field--slots">
        <span className="reservation-field__label">{copy.slotsLabel}</span>
        <div
          className="reservation-slots"
          role="radiogroup"
          aria-label={copy.slotsLabel}
        >
          {slots.map((slot) => {
            const rejected = rejectedSlotIds.includes(slot.id);
            const available =
              slot.status === "available" && !rejected && !locked;
            const selected = slot.id === selectedSlotId;
            const displayRemaining =
              celebration?.slotId === slot.id
                ? celebration.previousRemaining
                : slot.remaining;
            return (
              <label
                className={`reservation-slot reservation-slot--${slot.status}${rejected ? " is-rejected" : ""}${selected ? " is-selected" : ""}`}
                key={slot.id}
              >
                <input
                  type="radio"
                  name={`reservation-slot-${instanceId}`}
                  value={slot.id}
                  checked={selected}
                  disabled={!available}
                  onChange={() => onSlotChange(slot.id)}
                />
                <span className="reservation-slot__glare" aria-hidden="true" />
                <span className="reservation-slot__topline">
                  <strong>
                    {locale === "zh-TW" ? slot.label.zh : slot.label.en}
                  </strong>
                  <em>
                    {rejected
                      ? copy.slotRejected
                      : reservationSlotStatusLabel(slot.status, copy)}
                  </em>
                </span>
                <span className="reservation-slot__time">
                  <Clock aria-hidden="true" />
                  {formatReservationTime(slot.startAt, locale)}–
                  {formatReservationTime(slot.endAt, locale)}
                </span>
                <span className="reservation-slot__meta">
                  <span>
                    {locale === "zh-TW" ? "剩餘 " : null}
                    <AvailabilityCount count={displayRemaining} />
                    {locale === "zh-TW" ? " 名" : " remaining"}
                  </span>
                  <span>
                    {copy.closesAt(
                      formatReservationDateTime(slot.cutoffAt, locale),
                    )}
                  </span>
                </span>
                <ReservationCapacityMeter
                  slot={slot}
                  celebration={celebration}
                  meterRef={(node) => onMeterRef(slot.id, node)}
                />
              </label>
            );
          })}
        </div>
        {fieldError === "slot" ? (
          <p className="reservation-field__error">{copy.selectSlot}</p>
        ) : null}
      </div>

      <div className="reservation-honeypot" aria-hidden="true">
        <label htmlFor={companyId}>Company</label>
        <input
          id={companyId}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          disabled={locked}
          onChange={(event) => onCompanyChange(event.target.value)}
        />
      </div>

      {submitError ? (
        <p className="reservation-submit-error" role="alert">
          <WarningTriangle aria-hidden="true" />
          {copy.errors[submitError]}
        </p>
      ) : null}
      <button
        className="reservation-button reservation-button--primary"
        type="submit"
        disabled={locked}
      >
        {copy.continue}
        <ArrowRight aria-hidden="true" />
      </button>
      <p className="reservation-privacy">
        <ShieldCheck aria-hidden="true" />
        {copy.privacy}
      </p>
    </form>
  );
}
