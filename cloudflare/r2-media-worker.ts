interface Env {
  MEDIA: {
    get(key: string): Promise<R2ObjectBody | null>;
    head(key: string): Promise<R2Object | null>;
  };
}

interface R2Object {
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
}

interface R2ObjectBody extends R2Object {
  body: ReadableStream;
}

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const RELEASED_ASSET_KEY = /^r[a-f0-9]{20}\/assets\/[a-zA-Z0-9._/-]+$/;

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

    const object =
      method === "HEAD" ? await env.MEDIA.head(key) : await env.MEDIA.get(key);
    if (!object) return notFound();

    const headers = new Headers(sharedHeaders());
    object.writeHttpMetadata(headers);
    headers.set("Cache-Control", IMMUTABLE_CACHE_CONTROL);
    headers.set("ETag", object.httpEtag);

    return new Response(
      method === "HEAD" ? null : (object as R2ObjectBody).body,
      { headers },
    );
  },
};
