export const koreaDeckEvent = {
  date: {
    "zh-TW": "2026.09.29（二）",
    en: "2026.09.29 TUE",
    ko: "2026.09.29 (화)",
  },
  time: "13:00 — 20:00",
  venue: "TEX+FA HALL",
  venueDetail: {
    "zh-TW": "首爾江南區 · Textile Center Building 3F",
    en: "Textile Center Building 3F · Gangnam-gu, Seoul",
    ko: "서울 강남구 · Textile Center Building 3층",
  },
  mapQuery: "TEX+FA HALL Textile Center Building Gangnam-gu Seoul",
  vendorTables: "20",
  exhibitorBooths: "5",
  expectedFootfall: "1,000–2,000",
} as const;

export function koreaDeckMapEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(koreaDeckEvent.mapQuery)}&output=embed`;
}

export function koreaDeckMapUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(koreaDeckEvent.mapQuery)}`;
}
