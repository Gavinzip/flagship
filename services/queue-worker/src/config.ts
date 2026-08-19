export type QueueWorkerConfig = {
  port: number;
  redisUrl: string;
  adminToken: string;
  allowedOrigins: ReadonlySet<string>;
};

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function port() {
  const raw = process.env.PORT?.trim() || "8080";
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > 65_535) {
    throw new Error("PORT must be an integer from 1 to 65535.");
  }
  return value;
}

function origins() {
  const entries = required("ALLOWED_ORIGINS")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (entries.length === 0) throw new Error("ALLOWED_ORIGINS cannot be empty.");

  for (const entry of entries) {
    const parsed = new URL(entry);
    if (
      parsed.origin !== entry ||
      !["http:", "https:"].includes(parsed.protocol)
    ) {
      throw new Error(`Invalid allowed origin: ${entry}`);
    }
  }

  return new Set(entries);
}

export function loadConfig(): QueueWorkerConfig {
  const adminToken = required("QUEUE_ADMIN_TOKEN");

  if (adminToken.length < 32) {
    throw new Error("QUEUE_ADMIN_TOKEN must contain at least 32 characters.");
  }

  return {
    port: port(),
    redisUrl: required("REDIS_URL"),
    adminToken,
    allowedOrigins: origins(),
  };
}
