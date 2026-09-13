import type { SiteLanguage } from "./copy";
import type { EditionId } from "./editions";

/** Taiwan intentionally retains the original page's Chinese/English language set. */
export function editionLanguage(
  edition: EditionId,
  language: SiteLanguage,
): SiteLanguage {
  return edition === "taiwan" && language === "ko" ? "en" : language;
}
