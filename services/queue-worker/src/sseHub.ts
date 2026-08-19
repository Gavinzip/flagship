import type { ServerResponse } from "node:http";
import type { RedisClientType } from "redis";
import { isQueueSnapshot, type QueueSnapshot } from "../domain.js";
import { QUEUE_UPDATES_CHANNEL } from "./redisQueueRepository.js";

function eventPayload(
  type: "queue.snapshot" | "queue.updated",
  snapshot: QueueSnapshot,
) {
  return `id: ${snapshot.revision}\nevent: ${type}\ndata: ${JSON.stringify({ type, snapshot })}\n\n`;
}

export class QueueEventHub {
  private readonly clients = new Set<ServerResponse>();
  private readonly subscriber: RedisClientType;
  private readonly heartbeat: NodeJS.Timeout;

  constructor(redisClient: RedisClientType) {
    this.subscriber = redisClient.duplicate();
    this.subscriber.on("error", (error) => {
      console.error("Redis queue subscription error", error);
    });
    this.subscriber.on("reconnecting", () => this.disconnectClients());
    this.subscriber.on("end", () => this.disconnectClients());
    this.heartbeat = setInterval(
      () => this.broadcastRaw(": heartbeat\n\n"),
      20_000,
    );
    this.heartbeat.unref();
  }

  async connect() {
    await this.subscriber.connect();
    await this.subscriber.subscribe(QUEUE_UPDATES_CHANNEL, (message) => {
      try {
        const snapshot: unknown = JSON.parse(message);
        if (!isQueueSnapshot(snapshot)) {
          throw new Error("Queue update payload failed validation.");
        }
        this.broadcastRaw(eventPayload("queue.updated", snapshot));
      } catch (error) {
        console.error("Redis queue update was ignored", error);
      }
    });
  }

  add(response: ServerResponse) {
    if (!this.subscriber.isReady) {
      response.end();
      return false;
    }
    this.clients.add(response);
    response.on("close", () => this.clients.delete(response));
    return true;
  }

  sendSnapshot(response: ServerResponse, snapshot: QueueSnapshot) {
    if (this.clients.has(response)) {
      response.write(eventPayload("queue.snapshot", snapshot));
    }
  }

  async close() {
    clearInterval(this.heartbeat);
    this.disconnectClients();
    if (this.subscriber.isOpen) await this.subscriber.close();
  }

  private broadcastRaw(payload: string) {
    for (const response of this.clients) response.write(payload);
  }

  private disconnectClients() {
    for (const response of this.clients) response.end();
    this.clients.clear();
  }
}
