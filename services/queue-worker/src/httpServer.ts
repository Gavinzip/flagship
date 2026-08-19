import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import {
  isQueueNumber,
  isQueueTicketId,
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
} from "../domain.js";
import type { QueueWorkerConfig } from "./config.js";
import {
  QueueTicketLimitError,
  RedisQueueRepository,
} from "./redisQueueRepository.js";
import { hasBearerAccess } from "./security.js";
import { QueueEventHub } from "./sseHub.js";

const API_PREFIX = "/api/queue";
const MAX_BODY_BYTES = 256;

class InvalidBodyError extends Error {}

function corsHeaders(request: IncomingMessage, config: QueueWorkerConfig) {
  const origin = request.headers.origin;
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };

  if (origin && config.allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type";
    headers["Access-Control-Max-Age"] = "600";
    headers.Vary = "Origin";
  }

  return headers;
}

function isAllowedOrigin(request: IncomingMessage, config: QueueWorkerConfig) {
  const origin = request.headers.origin;
  return !origin || config.allowedOrigins.has(origin);
}

function json(
  request: IncomingMessage,
  response: ServerResponse,
  config: QueueWorkerConfig,
  body: unknown,
  status = 200,
) {
  response.writeHead(status, {
    ...corsHeaders(request, config),
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request: IncomingMessage) {
  const contentType = request.headers["content-type"]?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    throw new InvalidBodyError("INVALID_CONTENT_TYPE");
  }

  const contentLength = Number(request.headers["content-length"] ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    throw new InvalidBodyError("REQUEST_TOO_LARGE");
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      throw new InvalidBodyError("REQUEST_TOO_LARGE");
    }
    chunks.push(buffer);
  }

  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object") throw new Error();
    return parsed as Record<string, unknown>;
  } catch {
    throw new InvalidBodyError("INVALID_REQUEST");
  }
}

export function createQueueHttpServer(
  config: QueueWorkerConfig,
  repository: RedisQueueRepository,
  events: QueueEventHub,
) {
  return createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://queue.internal");

    try {
      if (!isAllowedOrigin(request, config)) {
        json(request, response, config, { code: "ORIGIN_NOT_ALLOWED" }, 403);
        return;
      }

      if (request.method === "OPTIONS") {
        response.writeHead(204, corsHeaders(request, config));
        response.end();
        return;
      }

      if (url.pathname === `${API_PREFIX}/health` && request.method === "GET") {
        const [ready] = await Promise.all([
          repository.ping(),
          repository.readSnapshot(),
        ]);
        json(
          request,
          response,
          config,
          { status: ready ? "ok" : "not_ready" },
          ready ? 200 : 503,
        );
        return;
      }

      if (url.pathname === `${API_PREFIX}/state` && request.method === "GET") {
        json(request, response, config, await repository.readSnapshot());
        return;
      }

      if (url.pathname === `${API_PREFIX}/state` && request.method === "PUT") {
        if (!hasBearerAccess(request, config.adminToken)) {
          json(
            request,
            response,
            config,
            { code: "QUEUE_ADMIN_UNAUTHORIZED" },
            401,
          );
          return;
        }
        const input = await readJson(request);
        if (!isQueueNumber(input.currentNumber)) {
          json(
            request,
            response,
            config,
            {
              code: "INVALID_QUEUE_NUMBER",
              minimum: QUEUE_NUMBER_MIN,
              maximum: QUEUE_NUMBER_MAX,
            },
            400,
          );
          return;
        }
        json(
          request,
          response,
          config,
          await repository.updateSnapshot(input.currentNumber),
        );
        return;
      }

      if (url.pathname === `${API_PREFIX}/events` && request.method === "GET") {
        response.writeHead(200, {
          ...corsHeaders(request, config),
          "Content-Type": "text/event-stream; charset=utf-8",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        });
        response.flushHeaders();
        if (!events.add(response)) return;
        events.sendSnapshot(response, await repository.readSnapshot());
        return;
      }

      if (
        url.pathname === `${API_PREFIX}/tickets` &&
        request.method === "POST"
      ) {
        if (!hasBearerAccess(request, config.joinToken)) {
          json(
            request,
            response,
            config,
            { code: "QUEUE_JOIN_UNAUTHORIZED" },
            401,
          );
          return;
        }
        const input = await readJson(request);
        if (!isQueueTicketId(input.ticketId)) {
          json(
            request,
            response,
            config,
            { code: "INVALID_QUEUE_TICKET_ID" },
            400,
          );
          return;
        }
        const result = await repository.issueTicket(input.ticketId);
        json(request, response, config, result.ticket, result.created ? 201 : 200);
        return;
      }

      if (
        url.pathname.startsWith(`${API_PREFIX}/tickets/`) &&
        request.method === "GET"
      ) {
        let ticketId = "";
        try {
          ticketId = decodeURIComponent(
            url.pathname.slice(`${API_PREFIX}/tickets/`.length),
          );
        } catch {
          json(
            request,
            response,
            config,
            { code: "INVALID_QUEUE_TICKET_ID" },
            400,
          );
          return;
        }
        if (!isQueueTicketId(ticketId)) {
          json(
            request,
            response,
            config,
            { code: "INVALID_QUEUE_TICKET_ID" },
            400,
          );
          return;
        }
        const ticket = await repository.readTicket(ticketId);
        json(
          request,
          response,
          config,
          ticket ?? { code: "QUEUE_TICKET_NOT_FOUND" },
          ticket ? 200 : 404,
        );
        return;
      }

      json(request, response, config, { code: "NOT_FOUND" }, 404);
    } catch (error) {
      if (error instanceof InvalidBodyError) {
        const status =
          error.message === "INVALID_CONTENT_TYPE"
            ? 415
            : error.message === "REQUEST_TOO_LARGE"
              ? 413
              : 400;
        json(request, response, config, { code: error.message }, status);
        return;
      }
      if (error instanceof QueueTicketLimitError) {
        json(
          request,
          response,
          config,
          { code: "QUEUE_TICKET_LIMIT_REACHED" },
          409,
        );
        return;
      }
      console.error("Queue request failed", error);
      if (!response.headersSent) {
        if (
          url.pathname === `${API_PREFIX}/health` &&
          request.method === "GET"
        ) {
          json(request, response, config, { status: "not_ready" }, 503);
        } else {
          json(request, response, config, { code: "QUEUE_SERVER_ERROR" }, 500);
        }
      } else {
        response.end();
      }
    }
  });
}
