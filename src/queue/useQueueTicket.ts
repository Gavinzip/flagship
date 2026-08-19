import { useEffect, useState } from "react";
import type { QueueTicket } from "../../shared/queue/domain";
import {
  fetchQueueTicket,
  issueQueueTicket,
  QueueApiError,
} from "./queueApi";
import {
  getOrCreateQueueTicketId,
  QueueTicketStorageError,
  readStoredQueueTicketId,
} from "./queueTicketStorage";

export type QueueTicketStatus =
  | "loading"
  | "ready"
  | "missing-token"
  | "storage-error"
  | "error";

type UseQueueTicketOptions = {
  joinToken?: string;
};

export function useQueueTicket({
  joinToken = "",
}: UseQueueTicketOptions) {
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const [status, setStatus] = useState<QueueTicketStatus>("loading");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;

    const load = async () => {
      setStatus("loading");
      setErrorCode(null);

      let ticketId: string | null;
      try {
        ticketId = readStoredQueueTicketId();
      } catch (error) {
        if (!disposed && error instanceof QueueTicketStorageError) {
          setErrorCode(error.code);
          setStatus("storage-error");
        }
        return;
      }

      if (!ticketId && !joinToken) {
        if (!disposed) setStatus("missing-token");
        return;
      }

      if (!ticketId) {
        try {
          ticketId = getOrCreateQueueTicketId();
        } catch (error) {
          if (!disposed && error instanceof QueueTicketStorageError) {
            setErrorCode(error.code);
            setStatus("storage-error");
          }
          return;
        }
      }

      try {
        const existing = await fetchQueueTicket(ticketId, controller.signal);
        if (!disposed) {
          setTicket(existing);
          setStatus("ready");
        }
        return;
      } catch (error) {
        if (controller.signal.aborted) return;
        if (
          !(error instanceof QueueApiError) ||
          error.code !== "QUEUE_TICKET_NOT_FOUND"
        ) {
          if (!disposed) {
            setErrorCode(
              error instanceof QueueApiError
                ? error.code
                : "QUEUE_TICKET_SERVER_ERROR",
            );
            setStatus("error");
          }
          return;
        }
      }

      if (!joinToken) {
        if (!disposed) setStatus("missing-token");
        return;
      }

      try {
        const issued = await issueQueueTicket(
          ticketId,
          joinToken,
          controller.signal,
        );
        if (!disposed) {
          setTicket(issued);
          setStatus("ready");
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        if (!disposed) {
          setErrorCode(
            error instanceof QueueApiError
              ? error.code
              : "QUEUE_TICKET_SERVER_ERROR",
          );
          setStatus("error");
        }
      }
    };

    void load();

    return () => {
      disposed = true;
      controller.abort();
    };
  }, [attempt, joinToken]);

  return {
    errorCode,
    retry: () => setAttempt((value) => value + 1),
    status,
    ticket,
  };
}
