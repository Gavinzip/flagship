import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

// Manual asset maintenance: run after adding Chinese Thailand display copy.
// Runtime pages serve the resulting font locally and never call Google Fonts.
const root = fileURLToPath(new URL("../", import.meta.url));
const dataDirectory = resolve(root, "src/flagship/thailand/data");
const files = (await readdir(dataDirectory)).filter(name => name.endsWith(".ts")).sort();
const source = (await Promise.all(files.map(name => readFile(resolve(dataDirectory, name), "utf8")))).join("\n");
const matches = source.match(/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]/gu);
if (!matches) throw new Error("No Traditional Chinese copy found for the display font.");
const glyphs = [...new Set(matches)].sort().join("");
const cssUrl = new URL("https://fonts.googleapis.com/css2");
cssUrl.searchParams.set("family", "Noto Sans TC:wght@900");
cssUrl.searchParams.set("text", glyphs);
const response = await fetch(cssUrl, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" } });
if (!response.ok) throw new Error(`Google Fonts CSS failed: ${response.status}`);
const css = await response.text();
const fontSource = /src:\s*url\(([^)]+)\)\s*format\(['"]woff2['"]\)/u.exec(css);
if (!fontSource) throw new Error(`Expected one WOFF2 source in the subset response: ${css.slice(0, 300)}`);
const fontResponse = await fetch(fontSource[1]);
if (!fontResponse.ok) throw new Error(`Display font download failed: ${fontResponse.status}`);
const font = Buffer.from(await fontResponse.arrayBuffer());
if (font.subarray(0, 4).toString() !== "wOF2") throw new Error("Downloaded display font is not WOFF2.");
const licenseUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/OFL.txt";
const licenseResponse = await fetch(licenseUrl);
if (!licenseResponse.ok) throw new Error(`Font license download failed: ${licenseResponse.status}`);
const directory = resolve(root, "src/flagship/assets/thailand");
await writeFile(resolve(directory, "thailand-display-tc.woff2"), font);
await writeFile(resolve(directory, "NotoSansTC-OFL.txt"), await licenseResponse.text());
await writeFile(resolve(directory, "display-font-source.json"), `${JSON.stringify({ family: "Noto Sans TC", weight: 900, source: cssUrl.href, license: licenseUrl, copyFiles: files, glyphCount: glyphs.length, glyphs, bytes: font.length, sha256: createHash("sha256").update(font).digest("hex") }, null, 2)}\n`);
console.log(`Thailand display font: ${glyphs.length} glyphs, ${font.length} bytes.`);
