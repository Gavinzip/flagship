import { loadConfig } from "./config.js";
import { createQueueHttpServer } from "./httpServer.js";
import { RedisQueueRepository } from "./redisQueueRepository.js";
import { QueueEventHub } from "./sseHub.js";

const config = loadConfig();
const repository = new RedisQueueRepository(config.redisUrl);

await repository.connect();

const events = new QueueEventHub(repository.client);
await events.connect();

const server = createQueueHttpServer(config, repository, events);
server.listen(config.port, "0.0.0.0", () => {
  console.log(`Queue worker listening on port ${config.port}`);
});

let shuttingDown = false;
async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Queue worker received ${signal}; shutting down.`);
  const serverClosed = new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  await events.close();
  await serverClosed;
  await repository.close();
  process.exit(0);
}

function requestShutdown(signal: string) {
  void shutdown(signal).catch((error) => {
    console.error("Queue worker shutdown failed", error);
    process.exit(1);
  });
}

process.on("SIGTERM", () => requestShutdown("SIGTERM"));
process.on("SIGINT", () => requestShutdown("SIGINT"));
