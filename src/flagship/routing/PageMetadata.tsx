import { useEffect } from "react";
import site from "../../config/site.json";
import { taiwanArchiveContent as siteContent } from "../../i18n/taiwanArchiveContent";
import { homeCopy } from "../home/homeCopy";
import { homeMedia } from "../home/homeMedia";
import { koreaPageCopy } from "../korea/data/copy";
import koreaEmblem from "../assets/korea-emblem.webp";
import { staticAssetUrl } from "../../lib/staticAssets";
import { useSiteNavigation } from "./SiteNavigation";

export function PageMetadata() {
  const { location: { page, language } } = useSiteNavigation();
  useEffect(() => {
    const title = page === "home" ? "FLAGSHIP Card Show — Collecting culture. Connecting people." : page === "taiwan" ? siteContent[language === "zh-TW" ? "zh-TW" : "en"].pageTitle : page === "korea" ? "FLAGSHIP Card Show — KOREA · Seoul 2026" : "Page not found — FLAGSHIP";
    const description = page === "home" ? homeCopy[language].aboutParagraphs[0] : page === "taiwan" ? siteContent[language === "zh-TW" ? "zh-TW" : "en"].metaDescription : page === "korea" ? koreaPageCopy[language].metaDescription : "The requested page could not be found.";
    const url = new URL(page === "home" || page === "not-found" ? "" : `${page}/`, site.url).href;
    const image = new URL(page === "home" ? homeMedia.masterLogo : page === "korea" ? koreaEmblem : staticAssetUrl("flagship-logo.webp"), site.url).href;
    document.title = title;
    document.documentElement.lang = language;
    const values: Record<string, string> = { 'meta[name="description"]': description, 'meta[property="og:title"]': title, 'meta[name="twitter:title"]': title, 'meta[property="og:description"]': description, 'meta[name="twitter:description"]': description, 'meta[property="og:url"]': url, 'meta[property="og:image"]': image, 'meta[name="twitter:image"]': image, 'meta[property="og:locale"]': { en: "en_US", "zh-TW": "zh_TW", ko: "ko_KR" }[language], 'meta[name="theme-color"]': page === "korea" ? "#edf1f6" : "#080a0e" };
    for (const [selector, value] of Object.entries(values)) document.querySelector(selector)?.setAttribute("content", value);
    const dimensions = page === "korea" ? [1400, 788] : page === "taiwan" ? [900, 493] : [1670, 941];
    document.querySelector('meta[property="og:image:width"]')?.setAttribute("content", String(dimensions[0]));
    document.querySelector('meta[property="og:image:height"]')?.setAttribute("content", String(dimensions[1]));
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute("content", title);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [page, language]);
  return null;
}
