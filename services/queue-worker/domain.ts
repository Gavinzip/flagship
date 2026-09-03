export const QUEUE_NUMBER_MIN = 0;
export const QUEUE_NUMBER_MAX = 9_999;
export const QUEUE_HOLD_MINUTES_DEFAULT = 20;
export const QUEUE_HOLD_MINUTES_MIN = 1;
export const QUEUE_HOLD_MINUTES_MAX = 180;

export type QueueRange = {
  rangeStart: number;
  rangeEnd: number;
};

export type QueueCall = QueueRange & {
  holdMinutes: number;
};

export type QueueSnapshot = QueueCall & {
  /** Deprecated rolling-deploy field for clients from the single-number release. */
  currentNumber: number;
  revision: number;
  updatedAt: string | null;
  expiresAt: string | null;
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

export function isQueueHoldMinutes(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= QUEUE_HOLD_MINUTES_MIN &&
    value <= QUEUE_HOLD_MINUTES_MAX
  );
}

export function isQueueCall(value: unknown): value is QueueCall {
  if (!value || typeof value !== "object") return false;
  const call = value as Record<string, unknown>;
  return isQueueRange(value) && isQueueHoldMinutes(call.holdMinutes);
}

export function isQueueRangeActive(range: QueueRange) {
  return range.rangeStart > QUEUE_NUMBER_MIN;
}

export function formatQueueRange(range: QueueRange) {
  return `${range.rangeStart}\u2013${range.rangeEnd}`;
}

export function calculateQueueExpiresAt(
  range: QueueRange,
  updatedAt: string,
  holdMinutes: number,
) {
  if (!isQueueRangeActive(range)) return null;
  return new Date(
    Date.parse(updatedAt) + holdMinutes * 60_000,
  ).toISOString();
}

export function getQueueRemainingSeconds(
  snapshot: QueueSnapshot,
  now = Date.now(),
) {
  if (!isQueueRangeActive(snapshot) || !snapshot.expiresAt) return null;
  return Math.max(0, Math.ceil((Date.parse(snapshot.expiresAt) - now) / 1_000));
}

export function formatQueueCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const minuteLabel = String(minutes).padStart(2, "0");
  const clock = `${minuteLabel}:${String(seconds).padStart(2, "0")}`;
  return hours > 0 ? `${hours}:${clock}` : clock;
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

  const hasValidExpiration = isQueueRangeActive(value as QueueRange)
    ? typeof snapshot.expiresAt === "string" &&
      Number.isFinite(Date.parse(snapshot.expiresAt)) &&
      typeof snapshot.updatedAt === "string" &&
      Date.parse(snapshot.expiresAt) > Date.parse(snapshot.updatedAt)
    : snapshot.expiresAt === null;

  return (
    isQueueCall(value) &&
    snapshot.currentNumber === snapshot.rangeEnd &&
    hasQueueSnapshotMetadata(snapshot) &&
    hasValidExpiration
  );
}

export function normalizeQueueCallInput(value: unknown): QueueCall | null {
  const range = normalizeQueueRangeInput(value);
  if (!range || !value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const holdMinutes =
    input.holdMinutes === undefined
      ? QUEUE_HOLD_MINUTES_DEFAULT
      : input.holdMinutes;
  if (!isQueueHoldMinutes(holdMinutes)) return null;
  return { ...range, holdMinutes };
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

  const holdMinutes = isQueueHoldMinutes(snapshot.holdMinutes)
    ? snapshot.holdMinutes
    : QUEUE_HOLD_MINUTES_DEFAULT;
  const updatedAt = snapshot.updatedAt as string | null;
  let expiresAt: string | null = null;

  if (isQueueRangeActive(range)) {
    if (!updatedAt) return null;
    expiresAt =
      typeof snapshot.expiresAt === "string" &&
      Number.isFinite(Date.parse(snapshot.expiresAt)) &&
      Date.parse(snapshot.expiresAt) > Date.parse(updatedAt)
        ? snapshot.expiresAt
        : calculateQueueExpiresAt(range, updatedAt, holdMinutes);
  }

  return {
    ...range,
    holdMinutes,
    currentNumber: range.rangeEnd,
    revision: snapshot.revision as number,
    updatedAt,
    expiresAt,
  };
}
