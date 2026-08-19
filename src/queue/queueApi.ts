import {
  isQueueSnapshot,
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

export function openQueueEvents(
  onSnapshot: (snapshot: QueueSnapshot) => void,
) {
  const events = new EventSource(`${apiBaseUrl}/api/queue/events`);

  const acceptEvent = (event: MessageEvent<string>) => {
    if (typeof event.data !== "string") return;

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
  };

  events.addEventListener("queue.snapshot", acceptEvent as EventListener);
  events.addEventListener("queue.updated", acceptEvent as EventListener);
  return events;
}
