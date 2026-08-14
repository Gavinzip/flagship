import { Clock, RefreshDouble, WarningTriangle } from "iconoir-react";
import { useLocale } from "../../i18n/LocaleProvider";

export function ReservationAvailabilityState({
  loading,
  error,
  empty,
  onRetry,
}: {
  loading: boolean;
  error: boolean;
  empty: boolean;
  onRetry: () => void;
}) {
  const copy = useLocale().content.tickets;

  if (loading) {
    return (
      <div className="reservation-state" role="status">
        <span className="reservation-state__spinner" aria-hidden="true" />
        <strong>{copy.loadingTitle}</strong>
        <p>{copy.loadingDescription}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservation-state reservation-state--error" role="alert">
        <WarningTriangle aria-hidden="true" />
        <strong>{copy.unavailableTitle}</strong>
        <p>{copy.unavailableDescription}</p>
        <button type="button" onClick={onRetry}>
          <RefreshDouble aria-hidden="true" />
          {copy.retry}
        </button>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="reservation-state" role="status">
        <Clock aria-hidden="true" />
        <strong>{copy.emptyTitle}</strong>
        <p>{copy.emptyDescription}</p>
      </div>
    );
  }

  return null;
}
