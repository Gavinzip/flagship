import { en, type SiteCopy } from "./locales/en";
import { ko } from "./locales/ko";
import { zh } from "./locales/zh-TW";

export type SiteLanguage = "en" | "ko" | "zh-TW";
export type { SiteCopy };
export const copy: Record<SiteLanguage, SiteCopy> = { en, ko, "zh-TW": zh };
