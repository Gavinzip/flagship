import { isQueueTicketId } from "../../shared/queue/domain";

const QUEUE_TICKET_STORAGE_KEY = "flagship.queue-ticket.v1";

export class QueueTicketStorageError extends Error {
  constructor(
    readonly code:
      | "QUEUE_TICKET_STORAGE_INVALID"
      | "QUEUE_TICKET_STORAGE_UNAVAILABLE",
  ) {
    super(
      code === "QUEUE_TICKET_STORAGE_INVALID"
        ? "Saved queue ticket data is invalid."
        : "Queue ticket storage is unavailable.",
    );
    this.name = "QueueTicketStorageError";
  }
}

export function readStoredQueueTicketId() {
  try {
    const value = window.localStorage.getItem(QUEUE_TICKET_STORAGE_KEY);
    if (value === null) return null;
    if (!isQueueTicketId(value)) {
      throw new QueueTicketStorageError("QUEUE_TICKET_STORAGE_INVALID");
    }
    return value;
  } catch (error) {
    if (error instanceof QueueTicketStorageError) throw error;
    throw new QueueTicketStorageError("QUEUE_TICKET_STORAGE_UNAVAILABLE");
  }
}

export function getOrCreateQueueTicketId() {
  const existing = readStoredQueueTicketId();
  if (existing) return existing;

  if (typeof crypto.randomUUID !== "function") {
    throw new QueueTicketStorageError("QUEUE_TICKET_STORAGE_UNAVAILABLE");
  }

  const ticketId = crypto.randomUUID();
  try {
    window.localStorage.setItem(QUEUE_TICKET_STORAGE_KEY, ticketId);
  } catch {
    throw new QueueTicketStorageError("QUEUE_TICKET_STORAGE_UNAVAILABLE");
  }
  return ticketId;
}
