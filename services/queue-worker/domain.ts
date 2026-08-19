export const QUEUE_NUMBER_MIN = 0;
export const QUEUE_NUMBER_MAX = 9_999;

export type QueueRange = {
  rangeStart: number;
  rangeEnd: number;
};

export type QueueSnapshot = QueueRange & {
  /** Deprecated rolling-deploy field for clients from the single-number release. */
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

export function isQueueRange(value: unknown): value is QueueRange {
  if (!value || typeof value !== "object") return false;
  const range = value as Record<string, unknown>;

  if (!isQueueNumber(range.rangeStart) || !isQueueNumber(range.rangeEnd)) {
    return false;
  }

  if (range.rangeStart === QUEUE_NUMBER_MIN) {
    return range.rangeEnd === QUEUE_NUMBER_MIN;
  }

  return range.rangeStart <= range.rangeEnd;
}

export function isQueueRangeActive(range: QueueRange) {
  return range.rangeStart > QUEUE_NUMBER_MIN;
}

export function formatQueueRange(range: QueueRange) {
  return `${range.rangeStart}\u2013${range.rangeEnd}`;
}

function hasQueueSnapshotMetadata(value: Record<string, unknown>) {
  return (
    typeof value.revision === "number" &&
    Number.isInteger(value.revision) &&
    value.revision >= 0 &&
    (value.updatedAt === null ||
      (typeof value.updatedAt === "string" &&
        Number.isFinite(Date.parse(value.updatedAt))))
  );
}

export function isQueueSnapshot(value: unknown): value is QueueSnapshot {
  if (!value || typeof value !== "object") return false;
  const snapshot = value as Record<string, unknown>;

  return (
    isQueueRange(value) &&
    snapshot.currentNumber === snapshot.rangeEnd &&
    hasQueueSnapshotMetadata(snapshot)
  );
}

export function normalizeQueueRangeInput(value: unknown): QueueRange | null {
  if (isQueueRange(value)) return value;
  if (!isLegacyQueueRangeInput(value)) return null;
  return {
    rangeStart: value.currentNumber,
    rangeEnd: value.currentNumber,
  };
}

export function isLegacyQueueRangeInput(
  value: unknown,
): value is { currentNumber: number } {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return (
    input.rangeStart === undefined &&
    input.rangeEnd === undefined &&
    isQueueNumber(input.currentNumber)
  );
}

export function normalizeQueueSnapshot(value: unknown): QueueSnapshot | null {
  if (isQueueSnapshot(value)) return value;
  if (!value || typeof value !== "object") return null;
  const snapshot = value as Record<string, unknown>;
  const range = normalizeQueueRangeInput(value);
  if (!range || !hasQueueSnapshotMetadata(snapshot)) return null;

  return {
    ...range,
    currentNumber: range.rangeEnd,
    revision: snapshot.revision as number,
    updatedAt: snapshot.updatedAt as string | null,
  };
}
