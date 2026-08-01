import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile,
} from "node:fs/promises";
import { constants } from "node:fs";
import { basename, extname, relative, resolve, sep } from "node:path";

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const MEDIA_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".mp3",
  ".mp4",
  ".ogg",
  ".png",
  ".svg",
  ".webm",
  ".webp",
]);
const CONVERSION_CANDIDATE_EXTENSIONS = new Set([
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
]);
const ICON_NAME = /(apple-touch-icon|favicon|icon|manifest)/i;
const CONTENT_TYPES = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

const [command = "audit", ...rawOptions] = process.argv.slice(2);
const options = parseOptions(rawOptions);
const projectRoot = resolve(options.project || process.cwd());
const publicRoot = resolve(projectRoot, options["public-dir"] || "public");
const assetRoot = resolve(projectRoot, options["asset-dir"] || "public/assets");
const releaseFile = resolve(
  projectRoot,
  options["release-file"] || "src/generated/staticAssetRelease.ts",
);

if (!["audit", "publish", "verify", "assert-build"].includes(command)) {
  throw new Error(`Unknown command: ${command}`);
}

if (command === "assert-build") {
  await assertBuild();
  process.exit(0);
}

const sourceCorpus = await buildSourceCorpus();
const files = await collectFiles(assetRoot);
const inventory = await buildInventory(files, sourceCorpus);

if (command === "audit") {
  printAudit(inventory);
  process.exit(0);
}

if (inventory.conversionCandidates.length) {
  throw new Error(
    `Convert these content images to WebP before publishing: ${inventory.conversionCandidates.join(", ")}`,
  );
}

if (command === "publish") {
  const bucket = requiredOption("bucket");
  if (options["dry-run"]) {
    console.log(
      `Dry run: ${inventory.files.length} objects would publish to r2://${bucket}/${inventory.release}/`,
    );
    process.exit(0);
  }

  await publish(bucket, inventory);
  await writeReleaseFile(inventory);
  console.log(
    `Published ${inventory.files.length} immutable objects to r2://${bucket}/${inventory.release}/`,
  );
  process.exit(0);
}

await verify(inventory);

function parseOptions(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      throw new Error(`Unexpected argument: ${value}`);
    }

    const equalsIndex = value.indexOf("=");
    const key = value.slice(2, equalsIndex === -1 ? undefined : equalsIndex);
    if (equalsIndex !== -1) {
      result[key] = value.slice(equalsIndex + 1);
      continue;
    }

    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      result[key] = true;
      continue;
    }

    result[key] = next;
    index += 1;
  }
  return result;
}

async function collectFiles(directory) {
  try {
    await access(directory, constants.R_OK);
  } catch {
    throw new Error(`Directory is not readable: ${directory}`);
  }

  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const filePath = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(filePath);
      if (entry.isFile() && !entry.name.startsWith(".")) return [filePath];
      return [];
    }),
  );
  return nested.flat().sort((left, right) => left.localeCompare(right));
}

async function buildSourceCorpus() {
  const sourceFiles = [
    ...(await collectFiles(resolve(projectRoot, "src"))),
    resolve(projectRoot, "index.html"),
    resolve(projectRoot, "vite.config.ts"),
  ].filter((filePath) =>
    [".css", ".html", ".js", ".json", ".ts", ".tsx"].includes(
      extname(filePath).toLowerCase(),
    ),
  );

  const chunks = await Promise.all(
    sourceFiles.map(async (filePath) => {
      try {
        return await readFile(filePath, "utf8");
      } catch {
        return "";
      }
    }),
  );

  return chunks.join("\n");
}

async function buildInventory(filePaths, corpus) {
  const entries = await Promise.all(
    filePaths.map(async (filePath) => {
      const relativeToPublic = relative(publicRoot, filePath)
        .split(sep)
        .join("/");
      if (
        relativeToPublic.startsWith("../") ||
        relativeToPublic === ".."
      ) {
        throw new Error(`${filePath} is outside ${publicRoot}`);
      }

      const extension = extname(filePath).toLowerCase();
      const buffer = await readFile(filePath);
      const fileStat = await stat(filePath);
      const assetName = basename(filePath);
      return {
        dimensions: readImageDimensions(buffer, extension),
        extension,
        filePath,
        hash: createHash("sha256").update(buffer).digest("hex"),
        references: countOccurrences(corpus, assetName),
        relativeToPublic,
        size: fileStat.size,
      };
    }),
  );

  const releaseHash = createHash("sha256");
  for (const entry of entries) {
    releaseHash.update(entry.relativeToPublic);
    releaseHash.update("\0");
    releaseHash.update(entry.hash);
    releaseHash.update("\0");
  }

  const contentHash = releaseHash.digest("hex");
  return {
    contentHash,
    conversionCandidates: entries
      .filter(
        (entry) =>
          CONVERSION_CANDIDATE_EXTENSIONS.has(entry.extension) &&
          !ICON_NAME.test(basename(entry.filePath)),
      )
      .map((entry) => entry.relativeToPublic),
    files: entries,
    release: `r${contentHash.slice(0, 20)}`,
    totalBytes: entries.reduce((total, entry) => total + entry.size, 0),
  };
}

function readImageDimensions(buffer, extension) {
  if (
    extension === ".png" &&
    buffer.length >= 24 &&
    buffer.toString("ascii", 1, 4) === "PNG"
  ) {
    return `${buffer.readUInt32BE(16)}×${buffer.readUInt32BE(20)}`;
  }

  if (
    extension !== ".webp" ||
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return "—";
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8X" && dataOffset + 10 <= buffer.length) {
      const width = 1 + buffer.readUIntLE(dataOffset + 4, 3);
      const height = 1 + buffer.readUIntLE(dataOffset + 7, 3);
      return `${width}×${height}`;
    }

    if (chunkType === "VP8L" && dataOffset + 5 <= buffer.length) {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      const width = 1 + (bits & 0x3fff);
      const height = 1 + ((bits >> 14) & 0x3fff);
      return `${width}×${height}`;
    }

    if (chunkType === "VP8 " && dataOffset + 10 <= buffer.length) {
      const signature = buffer.indexOf(
        Buffer.from([0x9d, 0x01, 0x2a]),
        dataOffset,
      );
      if (signature !== -1 && signature + 7 <= buffer.length) {
        const width = buffer.readUInt16LE(signature + 3) & 0x3fff;
        const height = buffer.readUInt16LE(signature + 5) & 0x3fff;
        return `${width}×${height}`;
      }
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  return "—";
}

function countOccurrences(source, value) {
  let count = 0;
  let cursor = 0;
  while ((cursor = source.indexOf(value, cursor)) !== -1) {
    count += 1;
    cursor += value.length;
  }
  return count;
}

function printAudit(inventory) {
  console.log(
    `Static assets: ${inventory.files.length} files, ${formatBytes(inventory.totalBytes)}, release ${inventory.release}`,
  );
  console.log("File\tDimensions\tSize\tReferences");
  for (const file of inventory.files) {
    console.log(
      `${file.relativeToPublic}\t${file.dimensions}\t${formatBytes(file.size)}\t${file.references}`,
    );
  }
  console.log(
    inventory.conversionCandidates.length
      ? `Needs WebP conversion: ${inventory.conversionCandidates.join(", ")}`
      : "Web format check: passed (the application icon is the only intentional PNG).",
  );
}

async function publish(bucket, inventory) {
  let completed = 0;
  const queue = [...inventory.files];
  const concurrency = Math.min(4, queue.length || 1);
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const entry = queue.shift();
      const objectKey = `${inventory.release}/${entry.relativeToPublic}`;
      await runWrangler([
        "--yes",
        "wrangler@latest",
        "r2",
        "object",
        "put",
        `${bucket}/${objectKey}`,
        "--file",
        entry.filePath,
        "--content-type",
        CONTENT_TYPES[entry.extension] || "application/octet-stream",
        "--cache-control",
        IMMUTABLE_CACHE_CONTROL,
        "--remote",
      ]);
      completed += 1;
      console.log(
        `Uploaded ${completed}/${inventory.files.length}: ${objectKey}`,
      );
    }
  });
  await Promise.all(workers);
}

async function runWrangler(args, attempt = 1) {
  try {
    await runWranglerOnce(args);
  } catch (error) {
    const message = String(error?.message || error);
    const retryable =
      /\b(429|500|502|503|504)\b|ECONNRESET|ETIMEDOUT|fetch failed/i.test(
        message,
      );
    if (!retryable || attempt >= 3) throw error;

    const delayMs = attempt * 1500;
    console.warn(
      `Transient Cloudflare upload error; retrying in ${delayMs}ms (attempt ${attempt + 1}/3).`,
    );
    await new Promise((resolvePromise) =>
      setTimeout(resolvePromise, delayMs),
    );
    await runWrangler(args, attempt + 1);
  }
}

function runWranglerOnce(args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn("npx", args, {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    child.once("error", rejectPromise);
    child.once("close", (code) => {
      if (code === 0) {
        resolvePromise();
      } else {
        rejectPromise(
          new Error(`wrangler upload failed (${code}): ${output.trim()}`),
        );
      }
    });
  });
}

async function writeReleaseFile(inventory) {
  const source = [
    "// Generated by scripts/r2-static-assets.mjs. Do not edit by hand.",
    `export const STATIC_ASSET_RELEASE: string = "${inventory.release}";`,
    `export const STATIC_ASSET_CONTENT_HASH: string = "${inventory.contentHash}";`,
    `export const STATIC_ASSET_FILE_COUNT: number = ${inventory.files.length};`,
    "",
  ].join("\n");
  await mkdir(resolve(releaseFile, ".."), { recursive: true });
  await writeFile(releaseFile, source, "utf8");
}

async function verify(inventory) {
  const base = normalizeAssetBase(requiredOption("base"));
  const failures = [];
  await Promise.all(
    inventory.files.map(async (entry) => {
      const response = await fetchWithRetry(
        `${base}/${inventory.release}/${entry.relativeToPublic}`,
      );
      const cacheControl = response.headers.get("cache-control") || "";
      const contentType = response.headers.get("content-type") || "";
      const remoteHash = response.ok
        ? createHash("sha256")
            .update(Buffer.from(await response.arrayBuffer()))
            .digest("hex")
        : "";
      if (
        !response.ok ||
        !cacheControl.includes("immutable") ||
        contentType !== CONTENT_TYPES[entry.extension] ||
        remoteHash !== entry.hash
      ) {
        failures.push(
          `${entry.relativeToPublic}: HTTP ${response.status}, Cache-Control: ${cacheControl || "[missing]"}, Content-Type: ${contentType || "[missing]"}, Byte hash: ${remoteHash === entry.hash ? "matched" : "mismatched"}`,
        );
      }
    }),
  );

  if (failures.length) {
    throw new Error(`CDN verification failed:\n${failures.join("\n")}`);
  }
  console.log(
    `Verified ${inventory.files.length} CDN objects at ${base}/${inventory.release}/ byte-for-byte with immutable cache headers and exact content types.`,
  );
}

async function fetchWithRetry(url, attempt = 1) {
  const response = await fetch(url);
  const retryable = response.status === 404 || response.status >= 500;
  if (!retryable || attempt >= 3) return response;

  await new Promise((resolvePromise) =>
    setTimeout(resolvePromise, attempt * 650),
  );
  return fetchWithRetry(url, attempt + 1);
}

async function assertBuild() {
  const distDirectory = resolve(projectRoot, options.dist || "dist");
  const distFiles = await collectFiles(distDirectory);
  const copiedMedia = distFiles.filter((filePath) =>
    MEDIA_EXTENSIONS.has(extname(filePath).toLowerCase()),
  );
  if (copiedMedia.length) {
    throw new Error(
      `Build still contains local media files:\n${copiedMedia.map((filePath) => relative(projectRoot, filePath)).join("\n")}`,
    );
  }

  const textFiles = distFiles.filter((filePath) =>
    [".css", ".html", ".js"].includes(extname(filePath).toLowerCase()),
  );
  const text = (
    await Promise.all(textFiles.map((filePath) => readFile(filePath, "utf8")))
  ).join("\n");
  if (
    /["'(]\/assets\/[^"')]+\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp)/i.test(
      text,
    )
  ) {
    throw new Error("Build still contains a local /assets media URL.");
  }
  if (/__ASSET_[A-Z_]+__/.test(text)) {
    throw new Error("Build left an unresolved static asset HTML token.");
  }

  console.log(
    "Build asset check passed: production media is CDN-only and no offloaded image was copied into dist.",
  );
}

function requiredOption(name) {
  const value = options[name];
  if (!value || value === true) throw new Error(`--${name} is required`);
  return value;
}

function normalizeAssetBase(value) {
  const url = new URL(String(value).trim());
  if (url.protocol !== "https:") {
    throw new Error("Use an HTTPS static-asset origin.");
  }
  return url.toString().replace(/\/$/, "");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}
