import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(projectRoot, "dist/index.html");
const cspPath = resolve(projectRoot, "Caddyfile.csp");

function hashContent(algorithm, content) {
  return `${algorithm}-${createHash(algorithm).update(content).digest("base64")}`;
}

let html = await readFile(indexPath, "utf8");
const externalScriptPattern =
  /<script\b([^>]*?)\bsrc="(\/assets\/[^"]+\.js)"([^>]*)><\/script>/g;
const externalScripts = [...html.matchAll(externalScriptPattern)];

if (!externalScripts.length) {
  throw new Error("No production JavaScript entry was found for CSP hashing.");
}

const scriptHashes = [];

for (const match of externalScripts) {
  const [element, beforeSource, source, afterSource] = match;
  if (/\bintegrity=/.test(element)) {
    throw new Error(`The script already has an integrity attribute: ${source}`);
  }

  const scriptContent = await readFile(resolve(projectRoot, `dist${source}`));
  const integrity = hashContent("sha384", scriptContent);
  scriptHashes.push(integrity);

  const crossOrigin = /\bcrossorigin(?:=|\s|>)/.test(element)
    ? ""
    : ' crossorigin="anonymous"';
  const securedElement = `<script${beforeSource}src="${source}"${afterSource}${crossOrigin} integrity="${integrity}"></script>`;
  html = html.replace(element, securedElement);
}

const inlineScripts = [
  ...html.matchAll(/<script\b(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi),
];

for (const [, attributes, content] of inlineScripts) {
  if (!/\btype="application\/ld\+json"/.test(attributes)) {
    throw new Error("An executable inline script was found in dist/index.html.");
  }
  scriptHashes.push(hashContent("sha256", content));
}

const directives = [
  "default-src 'self'",
  `script-src 'self' ${scriptHashes.map((hash) => `'${hash}'`).join(" ")} 'strict-dynamic' https://www.googletagmanager.com`,
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "img-src 'self' data: https://flagship-cardshow-media.tree-gavin.workers.dev https://www.google-analytics.com https://region1.google-analytics.com",
  "style-src-elem 'self'",
  "style-src-attr 'unsafe-inline'",
  "font-src 'self' data:",
  "media-src 'self' https://flagship-cardshow-media.tree-gavin.workers.dev",
  "frame-src https://lu.ma https://luma.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://lu.ma https://luma.com",
  "frame-ancestors 'none'",
  "require-trusted-types-for 'script'",
  "trusted-types flagship goog#html",
  "upgrade-insecure-requests",
];

await writeFile(indexPath, html, "utf8");
await writeFile(
  cspPath,
  `header Content-Security-Policy "${directives.join("; ")}"\n`,
  "utf8",
);

console.log(
  `Generated strict CSP with ${scriptHashes.length} script hash${scriptHashes.length === 1 ? "" : "es"}.`,
);
