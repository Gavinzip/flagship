import { createClient, type RedisClientType } from "redis";
import {
  normalizeQueueSnapshot,
  type QueueRange,
  type QueueSnapshot,
} from "../domain.js";

const STATE_KEY = "flagship:queue:state";
const INITIALIZED_KEY = "flagship:queue:initialized";
export const QUEUE_UPDATES_CHANNEL = "flagship:queue:updates";

export class LegacyQueueUpdateConflictError extends Error {
  constructor() {
    super("A legacy single-number update cannot replace an active range.");
    this.name = "LegacyQueueUpdateConflictError";
  }
}

const DEFAULT_SNAPSHOT: QueueSnapshot = {
  rangeStart: 0,
  rangeEnd: 0,
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
else
  local previous = cjson.decode(state)
  if previous.rangeStart == nil and previous.rangeEnd == nil and previous.currentNumber ~= nil then
    local migrated = {
      rangeStart = tonumber(previous.currentNumber),
      rangeEnd = tonumber(previous.currentNumber),
      currentNumber = tonumber(previous.currentNumber),
      revision = tonumber(previous.revision),
      updatedAt = previous.updatedAt
    }
    state = cjson.encode(migrated)
    redis.call('SET', KEYS[1], state)
  end
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
if ARGV[4] == 'legacy' and previous.rangeStart ~= nil and previous.rangeEnd ~= nil and tonumber(previous.rangeStart) ~= tonumber(previous.rangeEnd) then
  return redis.error_reply('LEGACY_QUEUE_UPDATE_CONFLICT')
end
local snapshot = {
  rangeStart = tonumber(ARGV[1]),
  rangeEnd = tonumber(ARGV[2]),
  currentNumber = tonumber(ARGV[2]),
  revision = previous_revision + 1,
  updatedAt = ARGV[3]
}
local encoded = cjson.encode(snapshot)
redis.call('SET', KEYS[1], encoded)
redis.call('PUBLISH', KEYS[2], encoded)
return encoded
`;

function parseSnapshot(value: string | null) {
  if (!value) throw new Error("Redis queue state is missing.");
  const parsed: unknown = JSON.parse(value);
  const snapshot = normalizeQueueSnapshot(parsed);
  if (!snapshot) throw new Error("Redis queue state is invalid.");
  return snapshot;
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

  async updateSnapshot(range: QueueRange, source: "range" | "legacy" = "range") {
    let value: unknown;
    try {
      value = await this.client.eval(UPDATE_STATE_SCRIPT, {
        keys: [STATE_KEY, QUEUE_UPDATES_CHANNEL],
        arguments: [
          String(range.rangeStart),
          String(range.rangeEnd),
          new Date().toISOString(),
          source,
        ],
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("LEGACY_QUEUE_UPDATE_CONFLICT")
      ) {
        throw new LegacyQueueUpdateConflictError();
      }
      throw error;
    }
    if (typeof value !== "string") {
      throw new Error("Redis state script returned an invalid result.");
    }
    return parseSnapshot(value);
  }
}
