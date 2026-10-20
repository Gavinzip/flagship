import type { SiteLanguage } from "./copy";

export const siteLanguages: readonly { value: SiteLanguage; label: string; short: string }[] = [
  { value: "zh-TW", label: "繁體中文", short: "繁中" },
  { value: "en", label: "English", short: "EN" },
  { value: "ko", label: "한국어", short: "한국어" },
  { value: "th", label: "ไทย", short: "ไทย" },
];

export const languageLabels: Record<SiteLanguage, { label: string; change: string }> = {
  "zh-TW": { label: "語言", change: "切換語言" },
  en: { label: "Language", change: "Change language" },
  ko: { label: "언어", change: "언어 변경" },
  th: { label: "ภาษา", change: "เปลี่ยนภาษา" },
};

export type ArchiveLanguage = Exclude<SiteLanguage, "th">;
