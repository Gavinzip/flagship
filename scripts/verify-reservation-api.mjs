import { readFileSync } from "node:fs";

function readProductionEnv() {
  const values = new Map();
  for (const line of readFileSync(".env.production", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    values.set(trimmed.slice(0, separator), trimmed.slice(separator + 1));
  }
  return values;
}

const configuredUrl =
  process.env.VITE_RESERVATION_API_BASE_URL ||
  readProductionEnv().get("VITE_RESERVATION_API_BASE_URL");
const expectedOrigin = process.env.RESERVATION_SITE_ORIGIN || "https://tcgflagship.com";

if (!configuredUrl) throw new Error("Production reservation API URL is missing.");
const baseUrl = configuredUrl.replace(/\/+$/, "");

async function getJson(pathname) {
  const startedAt = performance.now();
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: { Accept: "application/json", Origin: expectedOrigin },
    cache: "no-store",
  });
  const elapsedMs = Math.round(performance.now() - startedAt);
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}: ${body}`);
  }
  if (response.headers.get("cache-control") !== "no-store") {
    throw new Error(`${pathname} must return Cache-Control: no-store.`);
  }
  if (response.headers.get("access-control-allow-origin") !== expectedOrigin) {
    throw new Error(`${pathname} did not allow ${expectedOrigin} through CORS.`);
  }
  return { payload: JSON.parse(body), elapsedMs };
}

const health = await getJson("/api/early-bird/health");
if (
  health.payload.status !== "ok" ||
  !Number.isFinite(Date.parse(health.payload.serverTime)) ||
  !health.payload.configuration ||
  health.payload.configuration.slots < 1 ||
  health.payload.configuration.eligibleGmails < 1 ||
  health.payload.configuration.capacity <
    health.payload.configuration.eligibleGmails
) {
  throw new Error("Reservation health response is invalid.");
}

const availability = await getJson("/api/early-bird/slots");
if (availability.payload.timezone !== "Asia/Taipei") {
  throw new Error("Reservation API timezone must be Asia/Taipei.");
}
if (!Array.isArray(availability.payload.slots) || !availability.payload.slots.length) {
  throw new Error("Reservation API has no production slots.");
}

for (const slot of availability.payload.slots) {
  if (
    typeof slot.id !== "string" ||
    !Number.isInteger(slot.capacity) ||
    !Number.isInteger(slot.remaining) ||
    slot.remaining < 0 ||
    slot.remaining > slot.capacity ||
    !["available", "full", "closed"].includes(slot.status) ||
    !Number.isFinite(Date.parse(slot.startAt)) ||
    !Number.isFinite(Date.parse(slot.endAt)) ||
    !Number.isFinite(Date.parse(slot.cutoffAt))
  ) {
    throw new Error(`Reservation slot ${slot.id || "<unknown>"} is invalid.`);
  }
}

console.log(
  JSON.stringify(
    {
      api: baseUrl,
      origin: expectedOrigin,
      healthMs: health.elapsedMs,
      slotsMs: availability.elapsedMs,
      slots: availability.payload.slots.length,
      totalCapacity: availability.payload.slots.reduce(
        (total, slot) => total + slot.capacity,
        0,
      ),
      totalRemaining: availability.payload.slots.reduce(
        (total, slot) => total + slot.remaining,
        0,
      ),
    },
    null,
    2,
  ),
);
