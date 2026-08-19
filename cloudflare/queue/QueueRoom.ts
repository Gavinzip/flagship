import {
  isQueueNumber,
  isQueueTicketId,
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
  type QueueTicket,
  type QueueSnapshot,
} from "../../shared/queue/domain";

const QUEUE_STATE_KEY = "queue-state";
const LAST_ISSUED_NUMBER_KEY = "queue-last-issued-number";
const QUEUE_TICKET_KEY_PREFIX = "queue-ticket:";

class QueueTicketLimitError extends Error {}

function queueTicketKey(id: string) {
  return `${QUEUE_TICKET_KEY_PREFIX}${id}`;
}

function defaultSnapshot(): QueueSnapshot {
  return {
    currentNumber: 0,
    revision: 0,
    updatedAt: null,
  };
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

export class QueueRoom implements DurableObject {
  constructor(private readonly state: DurableObjectState) {}

  private async readSnapshot() {
    return (
      (await this.state.storage.get<QueueSnapshot>(QUEUE_STATE_KEY)) ??
      defaultSnapshot()
    );
  }

  private broadcast(snapshot: QueueSnapshot) {
    const payload = JSON.stringify({ type: "queue.updated", snapshot });

    for (const socket of this.state.getWebSockets()) {
      try {
        socket.send(payload);
      } catch (error) {
        console.error("Queue WebSocket broadcast failed", error);
        socket.close(1011, "Broadcast failed");
      }
    }
  }

  private async openSocket() {
    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    this.state.acceptWebSocket(server);
    server.send(
      JSON.stringify({
        type: "queue.snapshot",
        snapshot: await this.readSnapshot(),
      }),
    );

    return new Response(null, { status: 101, webSocket: client });
  }

  private async update(request: Request) {
    let payload: { currentNumber?: unknown };

    try {
      payload = (await request.json()) as { currentNumber?: unknown };
    } catch {
      return json({ code: "INVALID_REQUEST" }, 400);
    }

    if (!isQueueNumber(payload.currentNumber)) {
      return json(
        {
          code: "INVALID_QUEUE_NUMBER",
          minimum: QUEUE_NUMBER_MIN,
          maximum: QUEUE_NUMBER_MAX,
        },
        400,
      );
    }

    const previous = await this.readSnapshot();
    const snapshot: QueueSnapshot = {
      currentNumber: payload.currentNumber,
      revision: previous.revision + 1,
      updatedAt: new Date().toISOString(),
    };

    await this.state.storage.put(QUEUE_STATE_KEY, snapshot);
    this.broadcast(snapshot);

    return json(snapshot);
  }

  private async issueTicket(request: Request) {
    let payload: { ticketId?: unknown };

    try {
      payload = (await request.json()) as { ticketId?: unknown };
    } catch {
      return json({ code: "INVALID_REQUEST" }, 400);
    }

    if (!isQueueTicketId(payload.ticketId)) {
      return json({ code: "INVALID_QUEUE_TICKET_ID" }, 400);
    }

    let result: { created: boolean; ticket: QueueTicket };

    try {
      result = await this.state.storage.transaction(async (transaction) => {
        const key = queueTicketKey(payload.ticketId as string);
        const existing = await transaction.get<QueueTicket>(key);
        if (existing) return { created: false, ticket: existing };

        const [snapshot, storedLastIssued] = await Promise.all([
          transaction.get<QueueSnapshot>(QUEUE_STATE_KEY),
          transaction.get<number>(LAST_ISSUED_NUMBER_KEY),
        ]);
        const nextNumber =
          Math.max(
            snapshot?.currentNumber ?? QUEUE_NUMBER_MIN,
            storedLastIssued ?? QUEUE_NUMBER_MIN,
          ) + 1;

        if (nextNumber > QUEUE_NUMBER_MAX) {
          throw new QueueTicketLimitError();
        }

        const nextTicket: QueueTicket = {
          id: payload.ticketId as string,
          number: nextNumber,
          issuedAt: new Date().toISOString(),
        };

        await transaction.put({
          [key]: nextTicket,
          [LAST_ISSUED_NUMBER_KEY]: nextNumber,
        });
        return { created: true, ticket: nextTicket };
      });
    } catch (error) {
      if (error instanceof QueueTicketLimitError) {
        return json({ code: "QUEUE_TICKET_LIMIT_REACHED" }, 409);
      }
      console.error("Queue ticket issuance failed", error);
      return json({ code: "QUEUE_TICKET_SERVER_ERROR" }, 500);
    }

    return json(result.ticket, result.created ? 201 : 200);
  }

  private async readTicket(id: string) {
    const ticket = await this.state.storage.get<QueueTicket>(queueTicketKey(id));
    if (!ticket) return json({ code: "QUEUE_TICKET_NOT_FOUND" }, 404);
    return json(ticket);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/events" && request.method === "GET") {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return json({ code: "WEBSOCKET_REQUIRED" }, 426);
      }
      return this.openSocket();
    }

    if (url.pathname === "/state" && request.method === "GET") {
      return json(await this.readSnapshot());
    }

    if (url.pathname === "/state" && request.method === "PUT") {
      return this.update(request);
    }

    if (url.pathname === "/tickets" && request.method === "POST") {
      return this.issueTicket(request);
    }

    if (url.pathname.startsWith("/tickets/") && request.method === "GET") {
      const ticketId = decodeURIComponent(url.pathname.slice("/tickets/".length));
      if (!isQueueTicketId(ticketId)) {
        return json({ code: "INVALID_QUEUE_TICKET_ID" }, 400);
      }
      return this.readTicket(ticketId);
    }

    return json({ code: "NOT_FOUND" }, 404);
  }

  webSocketMessage(socket: WebSocket, message: ArrayBuffer | string) {
    if (message === "ping") socket.send("pong");
  }

  webSocketClose(
    _socket: WebSocket,
    code: number,
    _reason: string,
    wasClean: boolean,
  ) {
    if (!wasClean) console.warn("Queue WebSocket closed unexpectedly", code);
  }

  webSocketError(socket: WebSocket, error: unknown) {
    console.error("Queue WebSocket error", error);
    socket.close(1011, "WebSocket error");
  }
}
