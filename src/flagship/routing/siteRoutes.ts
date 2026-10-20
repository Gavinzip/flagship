import { editionLanguage } from "../data/editionLanguage";
import type { SiteLanguage } from "../data/copy";
import { isEditionId, type EditionId } from "../data/editions";

export type SitePage = "home" | EditionId;
export type SiteLocation = { page: SitePage | "not-found"; language: SiteLanguage };

export function siteHref(page: SitePage, language: SiteLanguage, hash = "") {
  const resolved = isEditionId(page) ? editionLanguage(page, language) : language;
  const path = page === "home" ? "/" : `/${page}/`;
  return `${path}?lang=${resolved}${hash ? `#${hash}` : ""}`;
}

/** Paths identify pages; old edition query links remain valid entry points. */
export function readSiteLocation(url: URL): SiteLocation {
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const legacy = path === "/" ? url.searchParams.get("edition") : null;
  const country = path.slice(1);
  const page = isEditionId(country) ? country : isEditionId(legacy) ? legacy : path === "/" && !legacy ? "home" : "not-found";
  const requested = url.searchParams.get("lang");
  const language = requested === "ko" || requested === "zh-TW" || requested === "th" ? requested : "en";
  return { page, language: isEditionId(page) ? editionLanguage(page, language) : language };
}
