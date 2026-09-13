import type { SiteLanguage } from "../data/copy";

export type SitePage = "home" | "korea" | "taiwan";
export type SiteLocation = { page: SitePage | "not-found"; language: SiteLanguage };

export function siteHref(page: SitePage, language: SiteLanguage, hash = "") {
  const resolved = page === "taiwan" && language === "ko" ? "en" : language;
  const path = page === "home" ? "/" : `/${page}/`;
  return `${path}?lang=${resolved}${hash ? `#${hash}` : ""}`;
}

/** Paths identify pages; old edition query links remain valid entry points. */
export function readSiteLocation(url: URL): SiteLocation {
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const legacy = path === "/" ? url.searchParams.get("edition") : null;
  const page = path === "/korea" || legacy === "korea" ? "korea"
    : path === "/taiwan" || legacy === "taiwan" ? "taiwan"
    : path === "/" ? "home" : "not-found";
  const requested = url.searchParams.get("lang");
  const language = requested === "ko" || requested === "zh-TW" ? requested : "en";
  return { page, language: page === "taiwan" && language === "ko" ? "en" : language };
}
