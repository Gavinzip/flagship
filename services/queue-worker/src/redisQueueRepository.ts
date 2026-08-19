import { createClient, type RedisClientType } from "redis";
import {
  isQueueSnapshot,
  type QueueSnapshot,
} from "../domain.js";

const STATE_KEY = "flagship:queue:state";
const INITIALIZED_KEY = "flagship:queue:initialized";
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

function parseSnapshot(value: string | null) {
  if (!value) throw new Error("Redis queue state is missing.");
  const parsed: unknown = JSON.parse(value);
  if (!isQueueSnapshot(parsed)) throw new Error("Redis queue state is invalid.");
  return parsed;
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
}
