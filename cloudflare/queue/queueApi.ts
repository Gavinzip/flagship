import type { QueueSnapshot } from "../../shared/queue/domain";

export interface QueueEnv {
  QUEUE_ADMIN_TOKEN: string;
  QUEUE_JOIN_TOKEN: string;
  QUEUE_ROOM: DurableObjectNamespace;
}

const QUEUE_API_PREFIX = "/api/queue";

function room(env: QueueEnv) {
  return env.QUEUE_ROOM.getByName("flagship-now-serving");
}

function queueRequest(path: string, request: Request, body?: string) {
  const headers = new Headers(request.headers);
  headers.delete("Authorization");
  headers.delete("Origin");

  return new Request(`https://queue.internal${path}`, {
    method: request.method,
    headers,
    body,
  });
}

async function safeTokenEqual(received: string, expected: string) {
  const encoder = new TextEncoder();
  const [receivedDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(received)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const receivedBytes = new Uint8Array(receivedDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let mismatch = receivedBytes.length ^ expectedBytes.length;

  for (let index = 0; index < expectedBytes.length; index += 1) {
    mismatch |= receivedBytes[index] ^ expectedBytes[index];
  }

  return mismatch === 0;
}

async function hasBearerAccess(request: Request, expectedToken: string) {
  const expected = expectedToken?.trim();
  const authorization = request.headers.get("Authorization") ?? "";
  const received = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  return Boolean(expected && received && (await safeTokenEqual(received, expected)));
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function forwardState(request: Request, env: QueueEnv) {
  if (request.method === "GET") {
    return room(env).fetch(queueRequest("/state", request));
  }

  if (request.method !== "PUT") return null;
  if (!env.QUEUE_ADMIN_TOKEN?.trim()) {
    return json({ code: "QUEUE_ADMIN_NOT_CONFIGURED" }, 503);
  }
  if (!(await hasBearerAccess(request, env.QUEUE_ADMIN_TOKEN))) {
    return json({ code: "QUEUE_ADMIN_UNAUTHORIZED" }, 401);
  }

  const contentType = request.headers.get("Content-Type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return json({ code: "INVALID_CONTENT_TYPE" }, 415);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 256) {
    return json({ code: "INVALID_REQUEST" }, 413);
  }

  return room(env).fetch(queueRequest("/state", request, body));
}

async function forwardTickets(request: Request, env: QueueEnv, ticketId?: string) {
  if (request.method === "GET" && ticketId) {
    return room(env).fetch(
      queueRequest(`/tickets/${encodeURIComponent(ticketId)}`, request),
    );
  }

  if (request.method !== "POST" || ticketId) return null;
  if (!env.QUEUE_JOIN_TOKEN?.trim()) {
    return json({ code: "QUEUE_JOIN_NOT_CONFIGURED" }, 503);
  }
  if (!(await hasBearerAccess(request, env.QUEUE_JOIN_TOKEN))) {
    return json({ code: "QUEUE_JOIN_UNAUTHORIZED" }, 401);
  }

  const contentType = request.headers.get("Content-Type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return json({ code: "INVALID_CONTENT_TYPE" }, 415);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 256) {
    return json({ code: "INVALID_REQUEST" }, 413);
  }

  return room(env).fetch(queueRequest("/tickets", request, body));
}

async function health(request: Request, env: QueueEnv) {
  const response = await room(env).fetch(queueRequest("/state", request));
  if (!response.ok) return json({ status: "not_ready" }, 503);

  const snapshot = await response.json<QueueSnapshot>();
  return json({
    status: "ok",
    adminConfigured: Boolean(env.QUEUE_ADMIN_TOKEN?.trim()),
    joinConfigured: Boolean(env.QUEUE_JOIN_TOKEN?.trim()),
    snapshot,
  });
}

export async function handleQueueApi(request: Request, env: QueueEnv) {
  const url = new URL(request.url);

  if (url.pathname === `${QUEUE_API_PREFIX}/events` && request.method === "GET") {
    return room(env).fetch(queueRequest("/events", request));
  }

  if (url.pathname === `${QUEUE_API_PREFIX}/health` && request.method === "GET") {
    return health(request, env);
  }

  if (url.pathname === `${QUEUE_API_PREFIX}/state`) {
    return forwardState(request, env);
  }

  if (url.pathname === `${QUEUE_API_PREFIX}/tickets`) {
    return forwardTickets(request, env);
  }
  if (url.pathname.startsWith(`${QUEUE_API_PREFIX}/tickets/`)) {
    const ticketId = decodeURIComponent(
      url.pathname.slice(`${QUEUE_API_PREFIX}/tickets/`.length),
    );
    return forwardTickets(request, env, ticketId);
  }

  return null;
}
