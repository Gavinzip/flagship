import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import event from "./src/config/event.json";
import brand from "./src/config/brand.json";
import site from "./src/config/site.json";
import worldMaterialReview from "./src/flagship/world/config/materials-review.json";
import artworkReview from "./src/flagship/data/artwork-review.json";
import { STATIC_ASSET_RELEASE } from "./src/generated/staticAssetRelease";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const canonicalUrl = new URL(site.url).href;

function buildRobots() {
  if (!site.indexable) return "User-agent: *\nDisallow: /\n";
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", canonicalUrl)}\n`;
}

function buildLlms() {
  return `# ${brand.name}\n\n> ${brand.description}\n\n## Current chapter: Korea\n\n- Date, venue, exhibitors and ticketing: not yet announced.\n- Do not use Taiwan registration links for Korea.\n\n## Past edition: Taiwan 2026\n\n- Date: ${event.dateIso} (event concluded)\n- Venue: ${event.englishVenue}, ${event.room}\n- Archive: ${canonicalUrl}taiwan/\n\n## Official links\n\n- Website: ${canonicalUrl}\n- Organizer: ${brand.organizerUrl}\n`;
}

function buildSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${canonicalUrl}</loc>\n  </url>\n  <url><loc>${canonicalUrl}taiwan/</loc></url>\n  <url><loc>${canonicalUrl}korea/</loc></url>\n</urlset>\n`;
}

const publicTextAssets = {
  "robots.txt": buildRobots(),
  "llms.txt": buildLlms(),
  "sitemap.xml": buildSitemap(),
} as const;

function toUtcStamp(date: string, time: string) {
  return new Date(`${date}T${time}:00${event.timezone}`)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function formatUtcStamp(value: string) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeCalendarText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldCalendarLine(line: string) {
  let folded = "";
  let bytesOnLine = 0;

  for (const character of line) {
    const characterBytes = Buffer.byteLength(character, "utf8");
    if (bytesOnLine + characterBytes > 75) {
      folded += "\r\n ";
      bytesOnLine = 1;
    }
    folded += character;
    bytesOnLine += characterBytes;
  }

  return folded;
}

function buildCalendar(locale: "zh-TW" | "en") {
  const isEnglish = locale === "en";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Flagship Card Show Taiwan//Event//${locale}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.calendarUid}`,
    `DTSTAMP:${formatUtcStamp(event.publishedAt)}`,
    `DTSTART:${toUtcStamp(event.dateIso, event.startTime)}`,
    `DTEND:${toUtcStamp(event.dateIso, event.endTime)}`,
    `SUMMARY:${escapeCalendarText(event.name)}`,
    `LOCATION:${escapeCalendarText(
      isEnglish
        ? `${event.englishVenue} ${event.room}, ${event.englishAddress}`
        : `${event.venue} ${event.room}, ${event.address}`,
    )}`,
    `DESCRIPTION:${escapeCalendarText(
      isEnglish ? event.englishDescription : event.description,
    )}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(foldCalendarLine)
    .join("\r\n");
}

function productionAssetResolver(mode: string, rawCdnBase: string) {
  if (mode !== "production") {
    return (path: string) => path;
  }

  const cdnBase = rawCdnBase.trim().replace(/\/+$/, "");
  if (!cdnBase || STATIC_ASSET_RELEASE === "unpublished") {
    throw new Error(
      "Production static assets are unpublished. Set VITE_STATIC_ASSET_CDN_BASE_URL and publish the immutable R2 release first.",
    );
  }

  const origin = new URL(cdnBase);
  if (origin.protocol !== "https:") {
    throw new Error("VITE_STATIC_ASSET_CDN_BASE_URL must use HTTPS.");
  }

  return (path: string) =>
    `${origin.toString().replace(/\/$/, "")}/${STATIC_ASSET_RELEASE}${path}`;
}

function analyticsMeasurementId(mode: string, rawMeasurementId: string) {
  if (!site.analyticsEnabled) return "";
  const measurementId = rawMeasurementId.trim();

  if (mode !== "production" && !measurementId) {
    return "";
  }

  if (!/^G-[A-Z0-9]+$/.test(measurementId)) {
    throw new Error(
      "VITE_GA_MEASUREMENT_ID must be a valid GA4 measurement ID.",
    );
  }

  return measurementId;
}

function firstPartyApiBaseUrl(
  mode: string,
  rawApiBaseUrl: string,
  variableName: string,
) {
  const apiBaseUrl = rawApiBaseUrl.trim().replace(/\/+$/, "");

  if (!apiBaseUrl) {
    throw new Error(`${variableName} is required.`);
  }

  const origin = new URL(apiBaseUrl);
  if (mode === "production" && origin.protocol !== "https:") {
    throw new Error(`${variableName} must use HTTPS in production.`);
  }

  return apiBaseUrl;
}

function eventAssets(
  assetUrl: (path: string) => string,
  measurementId: string,
): Plugin {
  const ogDescription = brand.description;
  const calendar = buildCalendar("zh-TW");
  const englishCalendar = buildCalendar("en");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: canonicalUrl,
    description: brand.description,
    inLanguage: ["en", "ko", "zh-TW"],
    publisher: {
      "@type": "Organization",
      name: brand.organizerName,
      url: brand.organizerUrl,
    },
  };

  return {
    name: "flagship-event-assets",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split("?", 1)[0].replace(/^\//, "");
        const source = pathname
          ? publicTextAssets[pathname as keyof typeof publicTextAssets]
          : undefined;

        if (!source) {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader(
          "Content-Type",
          pathname?.endsWith(".xml")
            ? "application/xml; charset=utf-8"
            : "text/plain; charset=utf-8",
        );
        response.end(source);
      });
    },
    configResolved(config) {
      if (config.command !== "serve") return;
      const publicDir = new URL("./public/", import.meta.url);
      mkdirSync(publicDir, { recursive: true });
      writeFileSync(
        new URL(event.calendarFilename, publicDir),
        calendar,
        "utf8",
      );
      writeFileSync(
        new URL(event.calendarEnglishFilename, publicDir),
        englishCalendar,
        "utf8",
      );
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: event.calendarFilename,
        source: calendar,
      });
      this.emitFile({
        type: "asset",
        fileName: event.calendarEnglishFilename,
        source: englishCalendar,
      });
      for (const [filename, source] of Object.entries(publicTextAssets)) {
        this.emitFile({
          type: "asset",
          fileName: filename,
          source,
        });
      }
    },
    transformIndexHtml: {
      order: "post",
      handler(html, context) {
        // Use the emitted filename so shared previews follow the same immutable asset as the site.
        const socialImagePath = context.bundle
          ? Object.keys(context.bundle).find((filename) =>
              /^assets\/flagship-master-[a-zA-Z0-9_-]+\.webp$/.test(filename),
            )
          : "/src/flagship/assets/brand/flagship-master.webp";
        if (!socialImagePath) {
          throw new Error(
            "The approved Flagship master logo is missing from the production bundle.",
          );
        }
        const assetCdnOrigin = new URL(
          assetUrl("/assets/app-icon.png"),
          canonicalUrl,
        ).origin;

        return html
          .replaceAll("__SITE_ROBOTS__", site.indexable ? "index,follow" : "noindex,nofollow")
          .replaceAll("__EVENT_TITLE__", brand.seoTitle)
          .replaceAll("__EVENT_META_DESCRIPTION__", brand.description)
          .replaceAll("__EVENT_OG_DESCRIPTION__", ogDescription)
          .replaceAll("__EVENT_CANONICAL_URL__", canonicalUrl)
          .replaceAll(
            "__SOCIAL_IMAGE_URL__",
            new URL(socialImagePath, canonicalUrl).href,
          )
          .replaceAll("__GA_MEASUREMENT_ID__", measurementId)
          .replaceAll("__ASSET_CDN_ORIGIN__", assetCdnOrigin)
          .replaceAll("/__ASSET_APP_ICON__", assetUrl("/assets/app-icon.png"))
          .replaceAll("__ASSET_APP_ICON__", assetUrl("/assets/app-icon.png"))
          .replace(
            "__EVENT_STRUCTURED_DATA__",
            JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          );
      },
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const artReviewBuild = process.env.FLAGSHIP_ART_REVIEW_BUILD === "1";
  if (command === "build" && !artReviewBuild && worldMaterialReview.status !== "approved") throw new Error("World material candidates need user selection and promotion out of work/ before release.");
  if (
    command === "build" &&
    !artReviewBuild &&
    artworkReview.status !== "approved"
  ) {
    throw new Error(
      "FLAGSHIP artwork is awaiting user selection. Review candidates 1, 2 and 4 locally; approve and move the selected optimized assets out of work/ before building a release.",
    );
  }
  if (command === "build" && !artReviewBuild) {
    const artworkModule = readFileSync(
      `${projectRoot}/src/flagship/data/artwork.ts`,
      "utf8",
    );
    if (/from\s+["'][^"']*\/work\//.test(artworkModule)) {
      throw new Error(
        "Selected artwork must be moved to the maintained assets directory before a production build.",
      );
    }
  }
  const environment = loadEnv(mode, projectRoot, "VITE_");
  const assetUrl = productionAssetResolver(
    mode,
    environment.VITE_STATIC_ASSET_CDN_BASE_URL || "",
  );
  const measurementId = analyticsMeasurementId(
    mode,
    environment.VITE_GA_MEASUREMENT_ID || "",
  );
  firstPartyApiBaseUrl(
    mode,
    environment.VITE_QUEUE_API_BASE_URL || "",
    "VITE_QUEUE_API_BASE_URL",
  );

  return {
    root: projectRoot,
    plugins: [eventAssets(assetUrl, measurementId), react()],
    build: {
      outDir: artReviewBuild ? "work/site-review-build" : "dist",
      copyPublicDir: false,
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
