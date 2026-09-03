import type { CSSProperties } from "react";
import {
  formatQueueRange,
  formatQueueCountdown,
  isQueueRangeActive,
  type QueueSnapshot,
} from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import {
  formatQueueUpdatedAt,
  queueCopy,
} from "../../queue/queueCopy";
import { useQueueCountdown } from "../../queue/useQueueCountdown";
import type { QueueConnectionStatus } from "../../queue/useQueueRealtime";

type QueueLiveDisplayProps = {
  connectionStatus: QueueConnectionStatus;
  locale: Locale;
  snapshot: QueueSnapshot | null;
};

function numberStateLabel(
  snapshot: QueueSnapshot | null,
  connectionStatus: QueueConnectionStatus,
  locale: Locale,
) {
  const content = queueCopy[locale];
  if (snapshot) return isQueueRangeActive(snapshot) ? null : content.waiting;
  return connectionStatus === "offline"
    ? content.unavailableNumber
    : content.loadingNumber;
}

function connectionLabel(status: QueueConnectionStatus, locale: Locale) {
  const content = queueCopy[locale];
  if (status === "live") return content.connected;
  if (status === "connecting") return content.connecting;
  return content.offline;
}

function rangeDisplayDensity(snapshot: QueueSnapshot) {
  const length = formatQueueRange(snapshot).length;
  if (length > 7) return "dense";
  return length > 5 ? "compact" : "standard";
}

export function QueueLiveDisplay({
  connectionStatus,
  locale,
  snapshot,
}: QueueLiveDisplayProps) {
  const content = queueCopy[locale];
  const remainingSeconds = useQueueCountdown(snapshot);
  const hasActiveRange = snapshot ? isQueueRangeActive(snapshot) : false;
  const holdExpired = hasActiveRange && remainingSeconds === 0;
  const updatedAt = formatQueueUpdatedAt(snapshot?.updatedAt ?? null, locale);
  const emptyLabel = numberStateLabel(snapshot, connectionStatus, locale);
  const footerState = snapshot
    ? updatedAt
      ? `${content.lastUpdated} ${updatedAt}`
      : content.neverUpdated
    : connectionStatus === "offline"
      ? content.unavailableState
      : content.loadingState;

  return (
    <section className="queue-live-panel">
      <div
        className="queue-live-panel__topline entry-item"
        style={{ "--entry-index": 1 } as CSSProperties}
      >
        <p>{content.eyebrow}</p>
        <span className={`queue-connection queue-connection--${connectionStatus}`}>
          <i aria-hidden="true" />
          {connectionLabel(connectionStatus, locale)}
        </span>
      </div>

      <div
        className="queue-callout entry-item"
        style={{ "--entry-index": 2 } as CSSProperties}
      >
        <p className="queue-callout__label">{content.current}</p>
        <div className="queue-callout__number-row">
          <div
            className="queue-number"
            aria-live="polite"
            aria-atomic="true"
            aria-busy={snapshot === null}
          >
            {snapshot && isQueueRangeActive(snapshot) ? (
              <span
                key={snapshot.revision}
                className="queue-number__value"
                data-display-density={rangeDisplayDensity(snapshot)}
              >
                {formatQueueRange(snapshot)}
              </span>
            ) : (
              <span
                className={
                  snapshot
                    ? "queue-number__waiting"
                    : "queue-number__status"
                }
              >
                {emptyLabel}
              </span>
            )}
          </div>
          {snapshot && isQueueRangeActive(snapshot) && content.numberSuffix ? (
            <span className="queue-callout__suffix">{content.numberSuffix}</span>
          ) : null}
        </div>
        {snapshot && hasActiveRange && remainingSeconds !== null ? (
          <div className="queue-callout__hold" data-expired={holdExpired}>
            <span>{holdExpired ? content.holdExpired : content.holdRemaining}</span>
            <strong>{formatQueueCountdown(remainingSeconds)}</strong>
            <small>{content.holdWindow(snapshot.holdMinutes)}</small>
          </div>
        ) : null}
        <p className="queue-callout__guidance" aria-live="polite">
          {(holdExpired ? content.expiredGuidance : content.guidance).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>

      <div
        className="queue-live-panel__footer entry-item"
        style={{ "--entry-index": 3 } as CSSProperties}
      >
        <span>TAIPEI · 2026</span>
        <span>{footerState}</span>
      </div>
    </section>
  );
}
