interface Env {
  MEDIA: {
    get(
      key: string,
      options?: { range?: { offset: number; length: number } },
    ): Promise<R2ObjectBody | null>;
    head(key: string): Promise<R2Object | null>;
  };
}

interface R2Object {
  httpEtag: string;
  size: number;
  writeHttpMetadata(headers: Headers): void;
}

interface R2ObjectBody extends R2Object {
  body: ReadableStream;
}

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const RELEASED_ASSET_KEY = /^r[a-f0-9]{20}\/assets\/[a-zA-Z0-9._/-]+$/;

type ByteRange = {
  offset: number;
  end: number;
  length: number;
};

function sharedHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Timing-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
  };
}

function notFound() {
  return new Response("Asset not found", {
    status: 404,
    headers: {
      ...sharedHeaders(),
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function parseByteRange(value: string | null, size: number) {
  if (!value) return null;

  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || size <= 0) return "invalid" as const;

  const [, startValue, endValue] = match;
  if (!startValue && !endValue) return "invalid" as const;

  if (!startValue) {
    const suffixLength = Number(endValue);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return "invalid" as const;
    }
    const length = Math.min(suffixLength, size);
    return { offset: size - length, end: size - 1, length } satisfies ByteRange;
  }

  const offset = Number(startValue);
  const requestedEnd = endValue ? Number(endValue) : size - 1;
  if (
    !Number.isSafeInteger(offset) ||
    !Number.isSafeInteger(requestedEnd) ||
    offset < 0 ||
    offset >= size ||
    requestedEnd < offset
  ) {
    return "invalid" as const;
  }

  const end = Math.min(requestedEnd, size - 1);
  return { offset, end, length: end - offset + 1 } satisfies ByteRange;
}

function rangeNotSatisfiable(size: number) {
  return new Response(null, {
    status: 416,
    headers: {
      ...sharedHeaders(),
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
      "Content-Range": `bytes */${size}`,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const method = request.method.toUpperCase();
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...sharedHeaders(),
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          ...sharedHeaders(),
          Allow: "GET, HEAD, OPTIONS",
          "Cache-Control": "no-store",
        },
      });
    }

    const url = new URL(request.url);
    let key: string;
    try {
      key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    } catch {
      return notFound();
    }

    if (!RELEASED_ASSET_KEY.test(key) || key.includes("..")) {
      return notFound();
    }

    const metadata = await env.MEDIA.head(key);
    if (!metadata) return notFound();

    const range = parseByteRange(request.headers.get("Range"), metadata.size);
    if (range === "invalid") return rangeNotSatisfiable(metadata.size);

    const object =
      method === "HEAD"
        ? metadata
        : range
          ? await env.MEDIA.get(key, {
              range: { offset: range.offset, length: range.length },
            })
          : await env.MEDIA.get(key);
    if (!object) return notFound();

    const headers = new Headers(sharedHeaders());
    object.writeHttpMetadata(headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", IMMUTABLE_CACHE_CONTROL);
    headers.set("ETag", object.httpEtag);
    if (range) {
      headers.set("Content-Length", String(range.length));
      headers.set("Content-Range", `bytes ${range.offset}-${range.end}/${metadata.size}`);
    }

    return new Response(
      method === "HEAD" ? null : (object as R2ObjectBody).body,
      { headers, status: range ? 206 : 200 },
    );
  },
};
