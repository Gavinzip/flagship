import { createHash, timingSafeEqual } from "node:crypto";
import type { IncomingMessage } from "node:http";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function hasBearerAccess(request: IncomingMessage, expected: string) {
  const authorization = request.headers.authorization ?? "";
  const received = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  return Boolean(
    received && timingSafeEqual(digest(received), digest(expected)),
  );
}
