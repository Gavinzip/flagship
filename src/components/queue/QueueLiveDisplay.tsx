import type { CSSProperties } from "react";
import type { QueueSnapshot } from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import {
  formatQueueUpdatedAt,
  queueCopy,
} from "../../queue/queueCopy";
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
  if (snapshot) return snapshot.currentNumber === 0 ? content.waiting : null;
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

function numberDisplayDensity(currentNumber: number) {
  return String(currentNumber).length > 3 ? "compact" : "standard";
}

export function QueueLiveDisplay({
  connectionStatus,
  locale,
  snapshot,
}: QueueLiveDisplayProps) {
  const content = queueCopy[locale];
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
            {snapshot && snapshot.currentNumber > 0 ? (
              <span
                key={snapshot.revision}
                className="queue-number__value"
                data-display-density={numberDisplayDensity(snapshot.currentNumber)}
              >
                {snapshot.currentNumber}
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
          {snapshot && snapshot.currentNumber > 0 && content.numberSuffix ? (
            <span className="queue-callout__suffix">{content.numberSuffix}</span>
          ) : null}
        </div>
        <div className="queue-callout__rule" aria-hidden="true">
          <i />
        </div>
        <p className="queue-callout__guidance">{content.guidance}</p>
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
