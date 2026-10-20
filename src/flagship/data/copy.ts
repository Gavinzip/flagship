import { en, type SiteCopy } from "./locales/en";
import { ko } from "./locales/ko";
import { th } from "./locales/th";
import { zh } from "./locales/zh-TW";

export type SiteLanguage = "en" | "ko" | "zh-TW" | "th";
export type { SiteCopy };
export const copy: Record<SiteLanguage, SiteCopy> = { en, ko, th, "zh-TW": zh };
