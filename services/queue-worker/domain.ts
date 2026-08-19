export const QUEUE_NUMBER_MIN = 0;
export const QUEUE_NUMBER_MAX = 9_999;

export type QueueSnapshot = {
  currentNumber: number;
  revision: number;
  updatedAt: string | null;
};

export function isQueueNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= QUEUE_NUMBER_MIN &&
    value <= QUEUE_NUMBER_MAX
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
