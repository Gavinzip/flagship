export const PUBLIC_QUEUE_PATH = "/now-serving";
export const ADMIN_QUEUE_PATH = "/queue-admin";
export const JOIN_QUEUE_PATH = "/join-queue";

export type QueuePageMode = "public" | "admin" | "join";

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function getQueuePageMode(pathname: string): QueuePageMode | null {
  const normalized = normalizePath(pathname);
  if (normalized === PUBLIC_QUEUE_PATH) return "public";
  if (normalized === ADMIN_QUEUE_PATH) return "admin";
  if (normalized === JOIN_QUEUE_PATH) return "join";
  return null;
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
