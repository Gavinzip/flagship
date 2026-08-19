import {
  isQueueSnapshot,
  isQueueTicket,
  type QueueTicket,
  type QueueSnapshot,
} from "../../shared/queue/domain";

const configuredBaseUrl = import.meta.env.VITE_QUEUE_API_BASE_URL?.trim();

if (!configuredBaseUrl) {
  throw new Error("VITE_QUEUE_API_BASE_URL is required.");
}

const apiBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

export class QueueApiError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = "QueueApiError";
  }
}

async function readErrorCode(response: Response) {
  try {
    const payload = (await response.json()) as { code?: unknown };
    if (typeof payload.code === "string") return payload.code;
  } catch {
    // An invalid error payload remains a server error for the UI.
  }
  return "QUEUE_SERVER_ERROR";
}

async function readSnapshot(response: Response) {
  const payload: unknown = await response.json();
  if (!isQueueSnapshot(payload)) throw new QueueApiError("INVALID_QUEUE_STATE");
  return payload;
}

async function readTicket(response: Response) {
  const payload: unknown = await response.json();
  if (!isQueueTicket(payload)) throw new QueueApiError("INVALID_QUEUE_TICKET");
  return payload;
}

export async function fetchQueueSnapshot(signal?: AbortSignal) {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/api/queue/state`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal,
    });
  } catch {
    throw new QueueApiError("QUEUE_NETWORK_ERROR");
  }

  if (!response.ok) throw new QueueApiError(await readErrorCode(response));
  return readSnapshot(response);
}

export async function updateQueueNumber(
  currentNumber: number,
  adminToken: string,
) {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/api/queue/state`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentNumber }),
    });
  } catch {
    throw new QueueApiError("QUEUE_NETWORK_ERROR");
  }

  if (!response.ok) throw new QueueApiError(await readErrorCode(response));
  return readSnapshot(response);
}

export async function fetchQueueTicket(ticketId: string, signal?: AbortSignal) {
  let response: Response;

  try {
    response = await fetch(
      `${apiBaseUrl}/api/queue/tickets/${encodeURIComponent(ticketId)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal,
      },
    );
  } catch {
    throw new QueueApiError("QUEUE_NETWORK_ERROR");
  }

  if (!response.ok) throw new QueueApiError(await readErrorCode(response));
  return readTicket(response);
}

export async function issueQueueTicket(
  ticketId: string,
  joinToken: string,
  signal?: AbortSignal,
): Promise<QueueTicket> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/api/queue/tickets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${joinToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId }),
      signal,
    });
  } catch {
    throw new QueueApiError("QUEUE_NETWORK_ERROR");
  }

  if (!response.ok) throw new QueueApiError(await readErrorCode(response));
  return readTicket(response);
}

function webSocketUrl() {
  const url = new URL(`${apiBaseUrl}/api/queue/events`);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  return url.toString();
}

export function openQueueSocket(
  onSnapshot: (snapshot: QueueSnapshot) => void,
) {
  const socket = new WebSocket(webSocketUrl());

  socket.addEventListener("message", (event) => {
    if (event.data === "pong" || typeof event.data !== "string") return;

    try {
      const payload = JSON.parse(event.data) as {
        type?: unknown;
        snapshot?: unknown;
      };
      if (
        (payload.type === "queue.snapshot" || payload.type === "queue.updated") &&
        isQueueSnapshot(payload.snapshot)
      ) {
        onSnapshot(payload.snapshot);
      }
    } catch {
      // Ignore malformed push messages and keep the verified connection open.
    }
  });

  return socket;
}
