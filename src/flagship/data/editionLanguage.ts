import type { SiteLanguage } from "./copy";
import type { EditionId } from "./editions";

/** Archive pages expose only their published languages; Thailand and home support Thai. */
export function editionLanguage(edition: "taiwan", language: SiteLanguage): "en" | "zh-TW";
export function editionLanguage(edition: EditionId, language: SiteLanguage): SiteLanguage;
export function editionLanguage(
  edition: EditionId,
  language: SiteLanguage,
): SiteLanguage {
  if (edition === "taiwan") return language === "zh-TW" ? "zh-TW" : "en";
  return language;
}
