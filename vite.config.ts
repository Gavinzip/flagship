import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import event from "./src/config/event.json";
import { STATIC_ASSET_RELEASE } from "./src/generated/staticAssetRelease";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const canonicalUrl = "https://tcgflagship.com/";

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", canonicalUrl)}\n`;
}

function buildLlms() {
  return `# ${event.name}\n\n> Taiwan's annual flagship trading card show, held at ${event.englishVenue} in Taipei.\n\n## Event\n\n- Date: ${event.dateIso}\n- Time: ${event.startTime}-${event.endTime} (UTC${event.timezone})\n- Venue: ${event.englishVenue}, ${event.room}\n- Address: ${event.englishAddress}\n\n## Official links\n\n- Website: ${canonicalUrl}\n- Calendar: ${new URL(event.calendarEnglishFilename, canonicalUrl)}\n`;
}

function buildSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${canonicalUrl}</loc>\n  </url>\n</urlset>\n`;
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
  ].map(foldCalendarLine).join("\r\n");
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

function reservationApiBaseUrl(mode: string, rawApiBaseUrl: string) {
  const apiBaseUrl = rawApiBaseUrl.trim().replace(/\/+$/, "");

  if (!apiBaseUrl) {
    throw new Error("VITE_RESERVATION_API_BASE_URL is required.");
  }

  const origin = new URL(apiBaseUrl);
  if (mode === "production" && origin.protocol !== "https:") {
    throw new Error("VITE_RESERVATION_API_BASE_URL must use HTTPS in production.");
  }

  return apiBaseUrl;
}

function eventAssets(
  assetUrl: (path: string) => string,
  measurementId: string,
): Plugin {
  const ogDescription = `${event.date} ${event.weekday} · ${event.startTime}—${event.endTime} · ${event.venue} ${event.room}`;
  const calendar = buildCalendar("zh-TW");
  const englishCalendar = buildCalendar("en");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: `${event.dateIso}T${event.startTime}:00${event.timezone}`,
    endDate: `${event.dateIso}T${event.endTime}:00${event.timezone}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${event.venue} ${event.room}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.streetAddress,
        addressLocality: event.addressLocality,
        addressRegion: event.addressRegion,
        addressCountry: event.addressCountry,
      },
    },
    image: assetUrl("/assets/hero-arena.webp"),
    description: event.description,
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
      writeFileSync(new URL(event.calendarFilename, publicDir), calendar, "utf8");
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
    transformIndexHtml(html) {
      const heroStageUrl = assetUrl("/assets/hero-floating-stage.webp");
      const assetCdnOrigin = new URL(heroStageUrl, canonicalUrl).origin;
      const flagshipLogoSrcSet = [
        ["/assets/flagship-logo-360.webp", 360],
        ["/assets/flagship-logo-600.webp", 600],
        ["/assets/flagship-logo.webp", 900],
      ]
        .map(([path, width]) => `${assetUrl(String(path))} ${width}w`)
        .join(", ");

      return html
        .replaceAll("__EVENT_TITLE__", event.seoTitle)
        .replaceAll("__EVENT_META_DESCRIPTION__", event.metaDescription)
        .replaceAll("__EVENT_OG_DESCRIPTION__", ogDescription)
        .replaceAll("__EVENT_CANONICAL_URL__", canonicalUrl)
        .replaceAll("__GA_MEASUREMENT_ID__", measurementId)
        .replaceAll("__ASSET_CDN_ORIGIN__", assetCdnOrigin)
        .replaceAll("__ASSET_APP_ICON__", assetUrl("/assets/app-icon.png"))
        .replaceAll(
          "__ASSET_FLAGSHIP_LOGO__",
          assetUrl("/assets/flagship-logo.webp"),
        )
        .replaceAll("__ASSET_FLAGSHIP_LOGO_SRCSET__", flagshipLogoSrcSet)
        .replaceAll("__ASSET_HERO_STAGE__", heroStageUrl)
        .replace(
          "__EVENT_STRUCTURED_DATA__",
          JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        );
    },
  };
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, projectRoot, "VITE_");
  const assetUrl = productionAssetResolver(
    mode,
    environment.VITE_STATIC_ASSET_CDN_BASE_URL || "",
  );
  const measurementId = analyticsMeasurementId(
    mode,
    environment.VITE_GA_MEASUREMENT_ID || "",
  );
  reservationApiBaseUrl(
    mode,
    environment.VITE_RESERVATION_API_BASE_URL || "",
  );

  return {
    root: projectRoot,
    plugins: [eventAssets(assetUrl, measurementId), react()],
    build: {
      copyPublicDir: false,
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
