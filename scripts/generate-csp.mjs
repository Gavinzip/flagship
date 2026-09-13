import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { loadEnv } from "vite";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    dist: { type: "string", default: "dist" },
    output: { type: "string", default: "Caddyfile.csp" },
  },
});
const distDirectory = resolve(projectRoot, values.dist);
const indexPath = resolve(distDirectory, "index.html");
const cspPath = resolve(projectRoot, values.output);
const productionEnvironment = loadEnv("production", projectRoot, "VITE_");
const assetCdnOrigin = new URL(
  productionEnvironment.VITE_STATIC_ASSET_CDN_BASE_URL,
).origin;
const queueApiUrl = new URL(productionEnvironment.VITE_QUEUE_API_BASE_URL);
const queueApiOrigin = queueApiUrl.origin;

function hashContent(algorithm, content) {
  return `${algorithm}-${createHash(algorithm).update(content).digest("base64")}`;
}

const scriptHashes = new Set();
const securedPages = [];
const integrityBySource = new Map();
// Every split ES module needs an integrity-bearing preload under hash-based CSP.
// Dynamic imports do not carry an integrity attribute of their own.
for (const filename of await readdir(resolve(distDirectory, "assets"))) {
  if (!filename.endsWith(".js")) continue;
  const source = `/assets/${filename}`;
  const integrity = hashContent("sha384", await readFile(resolve(distDirectory, `.${source}`)));
  integrityBySource.set(source, integrity);
  scriptHashes.add(integrity);
}
for (const relativePath of ["index.html", "korea/index.html", "taiwan/index.html"]) {
  const htmlPath = resolve(distDirectory, relativePath);
  let html = await readFile(htmlPath, "utf8");
  const externalScripts = [...html.matchAll(/<script\b([^>]*?)\bsrc="(\/assets\/[^"]+\.js)"([^>]*)><\/script>/g)];
  if (!externalScripts.length) throw new Error(`No JavaScript entry found in ${htmlPath}.`);
  for (const match of externalScripts) {
    const [element, beforeSource, source, afterSource] = match;
    if (/\bintegrity=/.test(element)) throw new Error(`Script already secured: ${source}`);
    let integrity = integrityBySource.get(source);
    if (!integrity) {
      integrity = hashContent("sha384", await readFile(resolve(distDirectory, `.${source}`)));
      integrityBySource.set(source, integrity);
    }
    scriptHashes.add(integrity);
    const crossOrigin = /\bcrossorigin(?:=|\s|>)/.test(element) ? "" : ' crossorigin="anonymous"';
    html = html.replace(element, `<script${beforeSource}src="${source}"${afterSource}${crossOrigin} integrity="${integrity}"></script>`);
  }
  for (const [, attributes, content] of html.matchAll(/<script\b(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\btype="application\/ld\+json"/.test(attributes)) throw new Error(`Executable inline script in ${htmlPath}.`);
    scriptHashes.add(hashContent("sha256", content));
  }
  const entrySources = new Set(externalScripts.map(match => match[2]));
  const modulePreloads = [...integrityBySource]
    .filter(([source]) => !entrySources.has(source))
    .map(([source, integrity]) => `<link rel="modulepreload" href="${source}" crossorigin="anonymous" integrity="${integrity}" />`)
    .join("\n    ");
  html = html.replace("</head>", `    ${modulePreloads}\n  </head>`);
  securedPages.push({ path: htmlPath, html });
}

const directives = [
  "default-src 'self'",
  `script-src 'self' ${[...scriptHashes].map((hash) => `'${hash}'`).join(" ")} 'strict-dynamic' https://www.googletagmanager.com`,
  `connect-src 'self' ${queueApiOrigin} https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com`,
  `img-src 'self' data: ${assetCdnOrigin} https://www.google-analytics.com https://region1.google-analytics.com`,
  "style-src-elem 'self'",
  "style-src-attr 'unsafe-inline'",
  "font-src 'self' data:",
  `media-src 'self' ${assetCdnOrigin}`,
  "frame-src https://lu.ma https://luma.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://lu.ma https://luma.com",
  "frame-ancestors 'none'",
  "require-trusted-types-for 'script'",
  "trusted-types flagship goog#html",
  "upgrade-insecure-requests",
];

await Promise.all(securedPages.map(page => writeFile(page.path, page.html, "utf8")));
await writeFile(
  cspPath,
  `header Content-Security-Policy "${directives.join("; ")}"\n`,
  "utf8",
);

console.log(
  `Generated strict CSP with ${scriptHashes.size} script hash${scriptHashes.size === 1 ? "" : "es"}.`,
);
