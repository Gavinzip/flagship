export const PUBLIC_QUEUE_PATH = "/now-serving";
export const ADMIN_QUEUE_PATH = "/queue-admin";

export type QueuePageMode = "public" | "admin";

const QUEUE_ROUTE_BY_MODE = {
  admin: { analytics: false, path: ADMIN_QUEUE_PATH },
  public: { analytics: true, path: PUBLIC_QUEUE_PATH },
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
