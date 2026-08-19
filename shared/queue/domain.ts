export const QUEUE_NUMBER_MIN = 0;
export const QUEUE_NUMBER_MAX = 9_999;
export const QUEUE_TICKET_NUMBER_MIN = 1;

export type QueueSnapshot = {
  currentNumber: number;
  revision: number;
  updatedAt: string | null;
};

export type QueueTicket = {
  id: string;
  number: number;
  issuedAt: string;
};

const QUEUE_TICKET_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isQueueNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= QUEUE_NUMBER_MIN &&
    value <= QUEUE_NUMBER_MAX
  );
}

export function isQueueTicketId(value: unknown): value is string {
  return typeof value === "string" && QUEUE_TICKET_ID_PATTERN.test(value);
}

export function isQueueTicket(value: unknown): value is QueueTicket {
  if (!value || typeof value !== "object") return false;
  const ticket = value as Record<string, unknown>;

  return (
    isQueueTicketId(ticket.id) &&
    typeof ticket.number === "number" &&
    Number.isInteger(ticket.number) &&
    ticket.number >= QUEUE_TICKET_NUMBER_MIN &&
    ticket.number <= QUEUE_NUMBER_MAX &&
    typeof ticket.issuedAt === "string" &&
    Number.isFinite(Date.parse(ticket.issuedAt))
  );
}

export function isQueueSnapshot(value: unknown): value is QueueSnapshot {
  if (!value || typeof value !== "object") return false;
  const snapshot = value as Record<string, unknown>;

  return (
    isQueueNumber(snapshot.currentNumber) &&
    typeof snapshot.revision === "number" &&
    Number.isInteger(snapshot.revision) &&
    snapshot.revision >= 0 &&
    (snapshot.updatedAt === null ||
      (typeof snapshot.updatedAt === "string" &&
        Number.isFinite(Date.parse(snapshot.updatedAt))))
  );
}
