import type { CSSProperties } from "react";
import type { QueueTicket } from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import { queueCopy } from "../../queue/queueCopy";
import type { QueueTicketStatus } from "../../queue/useQueueTicket";

type QueueTicketPanelProps = {
  errorCode: string | null;
  locale: Locale;
  onRetry: () => void;
  status: QueueTicketStatus;
  ticket: QueueTicket | null;
};

function ticketErrorCopy(errorCode: string | null, locale: Locale) {
  const content = queueCopy[locale];
  if (errorCode === "QUEUE_TICKET_LIMIT_REACHED") {
    return {
      title: content.ticketLimitTitle,
      description: content.ticketLimitDescription,
    };
  }
  if (
    errorCode === "QUEUE_JOIN_UNAUTHORIZED" ||
    errorCode === "QUEUE_JOIN_NOT_CONFIGURED"
  ) {
    return {
      title: content.invalidJoinTitle,
      description: content.invalidJoinDescription,
    };
  }
  return {
    title: content.ticketErrorTitle,
    description: content.ticketErrorDescription,
  };
}

export function QueueTicketPanel({
  errorCode,
  locale,
  onRetry,
  status,
  ticket,
}: QueueTicketPanelProps) {
  const content = queueCopy[locale];
  const errorCopy = ticketErrorCopy(errorCode, locale);

  return (
    <aside
      className="queue-ticket-panel entry-item"
      style={{ "--entry-index": 1 } as CSSProperties}
    >
      <div className="queue-ticket-panel__heading">
        <p>{content.joinEyebrow}</p>
        <span>{status === "ready" ? content.ticketIssued : "QR ACCESS"}</span>
      </div>
      <h1>{content.joinHeading}</h1>
      <p className="queue-ticket-panel__description">{content.joinDescription}</p>

      <div className="queue-ticket-panel__pass" aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" ? (
          <p className="queue-ticket-panel__status">{content.issuingTicket}</p>
        ) : null}
        {status === "ready" && ticket ? (
          <>
            <span className="queue-ticket-panel__number" key={ticket.number}>
              {ticket.number}
            </span>
            {content.numberSuffix ? (
              <span className="queue-ticket-panel__suffix">{content.numberSuffix}</span>
            ) : null}
          </>
        ) : null}
        {status === "missing-token" ? (
          <div className="queue-ticket-panel__message">
            <h2>{content.scanRequiredTitle}</h2>
            <p>{content.scanRequiredDescription}</p>
          </div>
        ) : null}
        {status === "storage-error" ? (
          <div className="queue-ticket-panel__message">
            <h2>
              {errorCode === "QUEUE_TICKET_STORAGE_INVALID"
                ? content.storedTicketInvalidTitle
                : content.storageErrorTitle}
            </h2>
            <p>
              {errorCode === "QUEUE_TICKET_STORAGE_INVALID"
                ? content.storedTicketInvalidDescription
                : content.storageErrorDescription}
            </p>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="queue-ticket-panel__message">
            <h2>{errorCopy.title}</h2>
            <p>{errorCopy.description}</p>
            <button type="button" onClick={onRetry}>
              {content.retryTicket}
            </button>
          </div>
        ) : null}
      </div>

      {status === "ready" ? (
        <p className="queue-ticket-panel__reminder">{content.ticketReminder}</p>
      ) : null}
    </aside>
  );
}
