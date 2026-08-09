import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import event from "./src/config/event.json";
import { STATIC_ASSET_RELEASE } from "./src/generated/staticAssetRelease";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

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
    },
    transformIndexHtml(html) {
      return html
        .replaceAll("__EVENT_TITLE__", event.name)
        .replaceAll("__EVENT_META_DESCRIPTION__", event.metaDescription)
        .replaceAll("__EVENT_OG_DESCRIPTION__", ogDescription)
        .replaceAll("__GA_MEASUREMENT_ID__", measurementId)
        .replaceAll("__ASSET_APP_ICON__", assetUrl("/assets/app-icon.png"))
        .replaceAll(
          "__ASSET_FLAGSHIP_LOGO__",
          assetUrl("/assets/flagship-logo.webp"),
        )
        .replaceAll("__ASSET_HERO_ARENA__", assetUrl("/assets/hero-arena.webp"))
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
