import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import event from "./src/config/event.json";

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

function eventAssets(): Plugin {
  const ogDescription = `${event.date} ${event.weekday} · ${event.startTime}—${event.endTime} · ${event.venue} ${event.room}`;
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
    image: "/assets/hero-arena.webp",
    description: event.description,
  };

  return {
    name: "flagship-event-assets",
    configResolved() {
      const calendar = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Flagship Card Show Taiwan//Event//ZH-TW",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${event.calendarUid}`,
        `DTSTAMP:${formatUtcStamp(event.publishedAt)}`,
        `DTSTART:${toUtcStamp(event.dateIso, event.startTime)}`,
        `DTEND:${toUtcStamp(event.dateIso, event.endTime)}`,
        `SUMMARY:${escapeCalendarText(event.name)}`,
        `LOCATION:${escapeCalendarText(`${event.venue} ${event.room}, ${event.address}`)}`,
        `DESCRIPTION:${escapeCalendarText(event.description)}`,
        "END:VEVENT",
        "END:VCALENDAR",
        "",
      ].map(foldCalendarLine).join("\r\n");

      const publicDir = new URL("./public/", import.meta.url);
      mkdirSync(publicDir, { recursive: true });
      writeFileSync(new URL(event.calendarFilename, publicDir), calendar, "utf8");
    },
    transformIndexHtml(html) {
      return html
        .replaceAll("__EVENT_TITLE__", event.name)
        .replaceAll("__EVENT_META_DESCRIPTION__", event.metaDescription)
        .replaceAll("__EVENT_OG_DESCRIPTION__", ogDescription)
        .replace(
          "__EVENT_STRUCTURED_DATA__",
          JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        );
    },
  };
}

export default defineConfig({
  root: projectRoot,
  plugins: [eventAssets(), react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
  },
});
