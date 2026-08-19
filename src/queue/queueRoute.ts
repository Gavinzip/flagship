export const PUBLIC_QUEUE_PATH = "/now-serving";
export const ADMIN_QUEUE_PATH = "/queue-admin";
export const JOIN_QUEUE_PATH = "/join-queue";
export const QUEUE_QR_PATH = "/queue-qr";

export type QueuePageMode = "public" | "admin" | "join" | "qr";

const QUEUE_ROUTE_BY_MODE = {
  admin: { analytics: false, path: ADMIN_QUEUE_PATH },
  join: { analytics: false, path: JOIN_QUEUE_PATH },
  public: { analytics: true, path: PUBLIC_QUEUE_PATH },
  qr: { analytics: false, path: QUEUE_QR_PATH },
} as const satisfies Record<QueuePageMode, {
  analytics: boolean;
  path: string;
}>;

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function getQueuePageMode(pathname: string): QueuePageMode | null {
  const normalized = normalizePath(pathname);
  const modes = Object.keys(QUEUE_ROUTE_BY_MODE) as QueuePageMode[];
  return (
    modes.find((mode) => QUEUE_ROUTE_BY_MODE[mode].path === normalized) ?? null
  );
}

export function shouldInstallQueueAnalytics(mode: QueuePageMode | null) {
  if (!mode) return true;
  return QUEUE_ROUTE_BY_MODE[mode].analytics;
}

function readQueueToken(hash: string) {
  const token = new URLSearchParams(hash.replace(/^#/, "")).get("token");
  return token?.trim() ?? "";
}

export function readQueueAdminToken(hash: string) {
  return readQueueToken(hash);
}

export function readQueueJoinToken(hash: string) {
  return readQueueToken(hash);
}

export function buildQueueJoinUrl(origin: string, joinToken: string) {
  const url = new URL(JOIN_QUEUE_PATH, origin);
  url.hash = new URLSearchParams({ token: joinToken }).toString();
  return url.toString();
}
