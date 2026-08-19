import { createClient, type RedisClientType } from "redis";
import {
  isQueueSnapshot,
  isQueueTicket,
  QUEUE_NUMBER_MAX,
  type QueueSnapshot,
  type QueueTicket,
} from "../domain.js";

const STATE_KEY = "flagship:queue:state";
const INITIALIZED_KEY = "flagship:queue:initialized";
const LAST_ISSUED_KEY = "flagship:queue:last-issued";
const TICKET_KEY_PREFIX = "flagship:queue:ticket:";
export const QUEUE_UPDATES_CHANNEL = "flagship:queue:updates";

const DEFAULT_SNAPSHOT: QueueSnapshot = {
  currentNumber: 0,
  revision: 0,
  updatedAt: null,
};

const INITIALIZE_SCRIPT = `
local state = redis.call('GET', KEYS[1])
local initialized = redis.call('GET', KEYS[2])

if initialized and not state then
  return redis.error_reply('QUEUE_STATE_MISSING')
end

if not state then
  state = ARGV[1]
  redis.call('SET', KEYS[1], state)
end

if not initialized then
  redis.call('SET', KEYS[2], '1')
end

return state
`;

const UPDATE_STATE_SCRIPT = `
local previous_json = redis.call('GET', KEYS[1])
if not previous_json then
  return redis.error_reply('QUEUE_STATE_MISSING')
end
local previous = cjson.decode(previous_json)
local previous_revision = tonumber(previous.revision)
if not previous_revision then
  return redis.error_reply('QUEUE_STATE_INVALID')
end
local snapshot = {
  currentNumber = tonumber(ARGV[1]),
  revision = previous_revision + 1,
  updatedAt = ARGV[2]
}
local encoded = cjson.encode(snapshot)
redis.call('SET', KEYS[1], encoded)
redis.call('PUBLISH', KEYS[2], encoded)
return encoded
`;

const ISSUE_TICKET_SCRIPT = `
local existing = redis.call('GET', KEYS[1])
if existing then
  return { 0, existing }
end

local snapshot_json = redis.call('GET', KEYS[2])
if not snapshot_json then
  return redis.error_reply('QUEUE_STATE_MISSING')
end
local snapshot = cjson.decode(snapshot_json)
local current_number = tonumber(snapshot.currentNumber)
if not current_number then
  return redis.error_reply('QUEUE_STATE_INVALID')
end
local last_issued = tonumber(redis.call('GET', KEYS[3]) or '0')
local next_number = math.max(current_number, last_issued) + 1

if next_number > tonumber(ARGV[3]) then
  return { -1, '' }
end

local ticket = {
  id = ARGV[1],
  number = next_number,
  issuedAt = ARGV[2]
}
local encoded = cjson.encode(ticket)
redis.call('SET', KEYS[1], encoded)
redis.call('SET', KEYS[3], tostring(next_number))
return { 1, encoded }
`;

export class QueueTicketLimitError extends Error {}

function parseSnapshot(value: string | null) {
  if (!value) throw new Error("Redis queue state is missing.");
  const parsed: unknown = JSON.parse(value);
  if (!isQueueSnapshot(parsed)) throw new Error("Redis queue state is invalid.");
  return parsed;
}

function parseTicket(value: string) {
  const parsed: unknown = JSON.parse(value);
  if (!isQueueTicket(parsed)) throw new Error("Redis queue ticket is invalid.");
  return parsed;
}

function parseScriptTuple(value: unknown) {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error("Redis ticket script returned an invalid result.");
  }
  const status = Number(value[0]);
  const body = value[1];
  if (!Number.isInteger(status) || typeof body !== "string") {
    throw new Error("Redis ticket script returned invalid fields.");
  }
  return { status, body };
}

export class RedisQueueRepository {
  readonly client: RedisClientType;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.on("error", (error) => {
      console.error("Redis queue connection error", error);
    });
  }

  async connect() {
    await this.client.connect();
    const value = await this.client.eval(INITIALIZE_SCRIPT, {
      keys: [STATE_KEY, INITIALIZED_KEY],
      arguments: [JSON.stringify(DEFAULT_SNAPSHOT)],
    });
    if (typeof value !== "string") {
      throw new Error("Redis queue initialization returned an invalid result.");
    }
    parseSnapshot(value);
  }

  async close() {
    if (this.client.isOpen) await this.client.close();
  }

  async ping() {
    return (await this.client.ping()) === "PONG";
  }

  async readSnapshot() {
    return parseSnapshot(await this.client.get(STATE_KEY));
  }

  async updateSnapshot(currentNumber: number) {
    const value = await this.client.eval(UPDATE_STATE_SCRIPT, {
      keys: [STATE_KEY, QUEUE_UPDATES_CHANNEL],
      arguments: [String(currentNumber), new Date().toISOString()],
    });
    if (typeof value !== "string") {
      throw new Error("Redis state script returned an invalid result.");
    }
    return parseSnapshot(value);
  }

  async issueTicket(ticketId: string) {
    const value = await this.client.eval(ISSUE_TICKET_SCRIPT, {
      keys: [`${TICKET_KEY_PREFIX}${ticketId}`, STATE_KEY, LAST_ISSUED_KEY],
      arguments: [ticketId, new Date().toISOString(), String(QUEUE_NUMBER_MAX)],
    });
    const result = parseScriptTuple(value);

    if (result.status === -1) throw new QueueTicketLimitError();
    if (result.status !== 0 && result.status !== 1) {
      throw new Error("Redis ticket script returned an unknown status.");
    }

    return { created: result.status === 1, ticket: parseTicket(result.body) };
  }

  async readTicket(ticketId: string): Promise<QueueTicket | null> {
    const value = await this.client.get(`${TICKET_KEY_PREFIX}${ticketId}`);
    return value ? parseTicket(value) : null;
  }
}
