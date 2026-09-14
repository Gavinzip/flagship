import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { loadEnv } from "vite";

const { values } = parseArgs({ options: { dist: { type: "string", default: "dist" } } });
const root = process.cwd();
const site = JSON.parse(await readFile(resolve(root, "src/config/site.json"), "utf8"));
const siteUrl = new URL(site.url).href;
const dist = resolve(root, values.dist);
const html = await readFile(resolve(dist, "index.html"), "utf8");
const event = JSON.parse(await readFile(resolve(root, "src/config/event.json"), "utf8"));
const brand = JSON.parse(await readFile(resolve(root, "src/config/brand.json"), "utf8"));
const releaseSource = await readFile(resolve(root, "src/generated/staticAssetRelease.ts"), "utf8");
const release = releaseSource.match(/STATIC_ASSET_RELEASE(?:\s*:\s*string)?\s*=\s*["']([^"']+)["']/)?.[1];
const cdn = loadEnv("production", root, "VITE_").VITE_STATIC_ASSET_CDN_BASE_URL.replace(/\/$/, "");
const files = await readdir(resolve(dist, "assets"));
const koreaImage = files.find(name => /^korea-emblem-[\w-]+\.webp$/.test(name) && !name.startsWith("korea-emblem-alpha-"));
if (!koreaImage || !release) throw new Error("Cannot generate event metadata without the published Taiwan release and Korea emblem.");
const escape = text => String(text).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const pages = {
  korea: { title: "FLAGSHIP Card Show — KOREA · Seoul 2026", description: "FLAGSHIP Korea takes place at TEX+FA HALL in Seoul on 29 September 2026, from 1–8 PM. Ticket and lineup updates will follow.", image: new URL(`assets/${koreaImage}`, siteUrl).href, theme: "#edf3fa" },
  taiwan: { title: "FLAGSHIP Taiwan 2026｜活動回顧", description: "Revisit FLAGSHIP Taiwan, held on September 5, 2026. Real photographs capture on-site surprises, Champion Challenge matches and 30+ TCG vendors.", image: `${cdn}/${release}/assets/flagship-logo.webp`, theme: "#090a0e" },
};
for (const [page, data] of Object.entries(pages)) {
  const url = new URL(`${page}/`, siteUrl).href;
  let result = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(data.title)}</title>`);
  const replacements = { description: data.description, "og:title": data.title, "twitter:title": data.title, "og:description": data.description, "twitter:description": data.description, "og:url": url, "og:image": data.image, "twitter:image": data.image, "og:image:alt": data.title, "twitter:image:alt": data.title, "og:image:width": page === "taiwan" ? "900" : "1400", "og:image:height": page === "taiwan" ? "493" : "788", "theme-color": data.theme };
  for (const [name, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`(<meta\\b[^>]*(?:name|property)="${name}"[^>]*content=")[^"]*(")`, "g");
    result = result.replace(pattern, (_, before, after) => `${before}${escape(value)}${after}`);
  }
  result = result.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
  result = result.replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g, "");
  const structured = { "@context": "https://schema.org", "@type": "WebPage", name: data.title, description: data.description, url, isPartOf: { "@type": "WebSite", name: brand.name, url: siteUrl } };
  result = result.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)[\s\S]*?(<\/script>)/, (_, before, after) => `${before}${JSON.stringify(structured).replaceAll("<", "\\u003c")}${after}`);
  await mkdir(resolve(dist, page), { recursive: true });
  await writeFile(resolve(dist, page, "index.html"), result);
}
console.log("Generated separate Korea and Taiwan HTML metadata for direct links and social previews.");
