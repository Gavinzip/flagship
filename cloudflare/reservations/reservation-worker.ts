import { normalizeGmail } from "../../shared/reservations/gmail";
import {
  getReservationSlotStatus,
  RESERVATION_ERROR,
} from "../../shared/reservations/domain";

interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
}

type SlotRow = {
  id: string;
  label_zh: string;
  label_en: string;
  start_at: string;
  end_at: string;
  cutoff_at: string;
  capacity: number;
  remaining: number;
};

type ReservationInput = {
  email?: unknown;
  slotId?: unknown;
  company?: unknown;
};

type ReservationInsertRow = { ticket_count: number };

const API_PREFIX = "/api/early-bird";
const MAX_BODY_BYTES = 2_048;
const SLOT_ID_PATTERN = /^[a-z0-9][a-z0-9-]{1,63}$/;

function allowedOrigins(env: Env) {
  return new Set(
    env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });

  if (origin && allowedOrigins(env).has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "600");
    headers.set("Vary", "Origin");
  }

  return headers;
}

function json(
  request: Request,
  env: Env,
  body: unknown,
  status = 200,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(request, env),
  });
}

function isAllowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  return !origin || allowedOrigins(env).has(origin);
}

async function listSlots(request: Request, env: Env) {
  const { results } = await env.DB.prepare(
    `SELECT
       slot.id,
       slot.label_zh,
       slot.label_en,
       slot.start_at,
       slot.end_at,
       slot.cutoff_at,
       slot.capacity,
       MAX(
         slot.capacity - COALESCE(SUM(reservation.ticket_count), 0),
         0
       ) AS remaining
     FROM reservation_slots AS slot
     LEFT JOIN early_bird_reservations AS reservation
       ON reservation.slot_id = slot.id
     WHERE slot.enabled = 1
     GROUP BY slot.id
     ORDER BY slot.display_order ASC`,
  ).all<SlotRow>();

  const serverTime = new Date().toISOString();
  const nowMs = Date.parse(serverTime);

  return json(request, env, {
    serverTime,
    timezone: "Asia/Taipei",
    slots: results.map((slot) => ({
      id: slot.id,
      label: { zh: slot.label_zh, en: slot.label_en },
      startAt: slot.start_at,
      endAt: slot.end_at,
      cutoffAt: slot.cutoff_at,
      capacity: slot.capacity,
      remaining: slot.remaining,
      status: getReservationSlotStatus(
        {
          cutoffAt: slot.cutoff_at,
          startAt: slot.start_at,
          remaining: slot.remaining,
        },
        nowMs,
      ),
    })),
  });
}

async function readInput(request: Request): Promise<ReservationInput | null> {
  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (contentLength > MAX_BODY_BYTES) return null;

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return null;
    const input = JSON.parse(body) as ReservationInput;
    return input && typeof input === "object" ? input : null;
  } catch {
    return null;
  }
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(3, local.length - visible.length))}@${domain}`;
}

async function readGmailRequest(request: Request, env: Env) {
  if (!isAllowedOrigin(request, env)) {
    return json(request, env, { code: "ORIGIN_NOT_ALLOWED" }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return json(request, env, { code: "INVALID_CONTENT_TYPE" }, 415);
  }

  const input = await readInput(request);
  if (!input) return json(request, env, { code: "INVALID_REQUEST" }, 400);
  if (typeof input.company === "string" && input.company.trim()) {
    return json(request, env, { code: "INVALID_REQUEST" }, 400);
  }

  const email = normalizeGmail(input.email);
  if (!email) {
    return json(request, env, { code: RESERVATION_ERROR.invalidGmail }, 400);
  }

  return { email, input };
}

async function createReservation(request: Request, env: Env) {
  const parsed = await readGmailRequest(request, env);
  if (parsed instanceof Response) return parsed;

  const { email, input } = parsed;
  const slotId = typeof input.slotId === "string" ? input.slotId.trim() : "";
  if (!SLOT_ID_PATTERN.test(slotId)) {
    return json(request, env, { code: RESERVATION_ERROR.invalidSlot }, 400);
  }

  const reservationId = crypto.randomUUID();
  let inserted: ReservationInsertRow | null = null;

  try {
    inserted = await env.DB.prepare(
      `INSERT INTO early_bird_reservations (id, email, slot_id, ticket_count)
       SELECT ?, eligibility.email, slot.id, 1
       FROM reservation_slots AS slot
       JOIN early_bird_eligibility AS eligibility
         ON eligibility.email = ? COLLATE NOCASE
       WHERE slot.id = ?
         AND slot.enabled = 1
         AND unixepoch('now') < unixepoch(slot.cutoff_at)
         AND unixepoch('now') < unixepoch(slot.start_at)
         AND (
           SELECT COALESCE(SUM(existing.ticket_count), 0)
           FROM early_bird_reservations AS existing
           WHERE existing.slot_id = slot.id
         ) + 1 <= slot.capacity
       RETURNING ticket_count`,
    )
      .bind(reservationId, email, slotId)
      .first<ReservationInsertRow>();

    if (!inserted) {
      const slot = await env.DB.prepare(
        `SELECT 1 AS found
         FROM reservation_slots
         WHERE id = ? AND enabled = 1`,
      )
        .bind(slotId)
        .first<{ found: number }>();

      if (!slot) {
        return json(request, env, { code: RESERVATION_ERROR.invalidSlot }, 400);
      }

      return json(
        request,
        env,
        { code: RESERVATION_ERROR.reservationUnavailable },
        409,
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("UNIQUE constraint failed")) {
      return json(
        request,
        env,
        { code: RESERVATION_ERROR.reservationUnavailable },
        409,
      );
    }
    console.error("Reservation insert failed", error);
    return json(request, env, { code: RESERVATION_ERROR.serverError }, 500);
  }

  return json(
    request,
    env,
    {
      reservationId,
      email: maskEmail(email),
      slotId,
      ticketCount: inserted.ticket_count,
      createdAt: new Date().toISOString(),
    },
    201,
  );
}

async function health(request: Request, env: Env) {
  const readiness = await env.DB.prepare(
    `SELECT
       (SELECT COUNT(*) FROM reservation_slots WHERE enabled = 1) AS slots,
       (SELECT COALESCE(SUM(capacity), 0) FROM reservation_slots WHERE enabled = 1) AS capacity,
       (SELECT COUNT(*) FROM early_bird_eligibility) AS eligible_gmails,
       (SELECT COALESCE(SUM(source_ticket_count), 0) FROM early_bird_eligibility) AS eligible_source_tickets`,
  ).first<{
    slots: number;
    capacity: number;
    eligible_gmails: number;
    eligible_source_tickets: number;
  }>();

  const ready = Boolean(
    readiness &&
      readiness.slots > 0 &&
      readiness.eligible_gmails > 0 &&
      readiness.capacity >= readiness.eligible_gmails,
  );
  return json(
    request,
    env,
    {
      status: ready ? "ok" : "not_ready",
      serverTime: new Date().toISOString(),
      configuration: readiness
        ? {
            slots: readiness.slots,
            capacity: readiness.capacity,
            eligibleGmails: readiness.eligible_gmails,
            eligibleSourceTickets: readiness.eligible_source_tickets,
          }
        : null,
    },
    ready ? 200 : 503,
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin(request, env)) {
        return json(request, env, { code: "ORIGIN_NOT_ALLOWED" }, 403);
      }
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (url.pathname === `${API_PREFIX}/health` && request.method === "GET") {
      return health(request, env);
    }
    if (url.pathname === `${API_PREFIX}/slots` && request.method === "GET") {
      return listSlots(request, env);
    }
    if (url.pathname === `${API_PREFIX}/reservations` && request.method === "POST") {
      return createReservation(request, env);
    }

    return json(request, env, { code: "NOT_FOUND" }, 404);
  },
} satisfies ExportedHandler<Env>;
