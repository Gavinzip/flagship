import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, ".vercel/output");
const stage = process.env.FLAGSHIP_DEPLOYMENT_STAGE ??
  (process.env.VERCEL_ENV === "production" ? "production" : "pilot");

if (!["pilot", "production"].includes(stage)) {
  throw new Error("FLAGSHIP_DEPLOYMENT_STAGE must be pilot or production.");
}

// Use the CSP generated from this exact build, including its script hashes.
const caddyCsp = await readFile(join(root, "Caddyfile.csp"), "utf8");
const csp = caddyCsp.match(/^header Content-Security-Policy "([^"\r\n]+)"\s*$/)?.[1];
if (!csp) throw new Error("The build did not produce a valid CSP.");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, "dist"), join(output, "static"), { recursive: true });

const headers = {
  "Cache-Control": "no-cache",
  "Content-Security-Policy": csp,
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

if (stage === "pilot") {
  headers["X-Robots-Tag"] = "noindex, nofollow, noarchive";
  // Every direct edition entry inherits analytics metadata from the main HTML.
  // The pilot must not send QA traffic to the production GA property.
  for (const page of ["index.html", "thailand/index.html", "taiwan/index.html"]) {
    const indexPath = join(output, "static", page);
    const html = await readFile(indexPath, "utf8");
    if (!/<meta name="ga-measurement-id" content="[^"]*"\s*\/>/.test(html)) {
      throw new Error(`Cannot locate analytics metadata for the isolated pilot: ${page}`);
    }
    await writeFile(indexPath, html.replace(
      /(<meta name="ga-measurement-id" content=")[^"]*("\s*\/>)/,
      "$1$2",
    ));
  }
}

const config = {
  version: 3,
  routes: [
    { src: "/(.*)", headers, continue: true },
    {
      src: "/queue-admin/?",
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" },
      continue: true,
    },
    {
      src: "/assets/[^/]+-[A-Za-z0-9_-]{8,}\\.(?:js|css|webp|woff2?)$",
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      continue: true,
    },
    { src: "/korea(?:/.*)?", status: 404, headers: { "Cache-Control": "no-store" } },
    { src: "/(thailand|taiwan)/?", dest: "/$1/index.html" },
    { handle: "filesystem" },
    // A missing asset is an error, not the existing SPA document route.
    { src: "/assets/(.*)", status: 404, headers: { "Cache-Control": "no-store" } },
    { src: "/(.*)", dest: "/index.html" },
  ],
};

await writeFile(join(output, "config.json"), `${JSON.stringify(config, null, 2)}\n`);

async function audit(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const name = `${prefix}${entry.name}`;
    if (entry.isSymbolicLink()) throw new Error(`Unexpected deployment symlink: ${name}`);
    if (entry.isDirectory()) files.push(...await audit(path, `${name}/`));
    else {
      if (!/\.(?:html|js|css|webp|woff2?|txt|xml|ics)$/.test(name)) {
        throw new Error(`Unexpected static deployment file: ${name}`);
      }
      files.push({ name, bytes: (await readFile(path)).byteLength });
    }
  }
  return files;
}

const files = await audit(join(output, "static"));
console.log(JSON.stringify({ stage, staticFiles: files.length,
  totalBytes: files.reduce((total, file) => total + file.bytes, 0),
  largest: files.toSorted((a, b) => b.bytes - a.bytes).slice(0, 5),
}));
