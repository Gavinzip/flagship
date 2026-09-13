import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode, type AnchorHTMLAttributes } from "react";
import type { SiteLanguage } from "../data/copy";
import { readSiteLocation, siteHref, type SiteLocation, type SitePage } from "./siteRoutes";

import { EditionTransitionContext } from "./transition/EditionTransitionContext";

type Navigation = {
  location: SiteLocation;
  navigate: (page: SitePage, language?: SiteLanguage, hash?: string) => void;
  setLanguage: (language: SiteLanguage) => void;
};
const Context = createContext<Navigation | null>(null);

// The published IP uses the selected dark galaxy, including links from old previews.
function preserveAppearance(href: string) {
  const url = new URL(href, window.location.origin);
  url.searchParams.set("theme", "dark");
  return `${url.pathname}${url.search}${url.hash}`;
}


export function SiteNavigationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(() => readSiteLocation(new URL(window.location.href)));
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const sync = () => {
      setLocation(readSiteLocation(new URL(window.location.href)));
      setRevision(value => value + 1);
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  useLayoutEffect(() => {
    if (location.page === "not-found") return;
    const hash = window.location.hash.slice(1);
    const canonical = preserveAppearance(siteHref(location.page, location.language, hash));
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== canonical) window.history.replaceState(null, "", canonical);
  }, [location]);
  useLayoutEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.page, revision]);
  const navigate: Navigation["navigate"] = (page, language = location.language, hash = "") => {
    const href = preserveAppearance(siteHref(page, language, hash));
    if (href === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      setRevision(value => value + 1);
      return;
    }
    window.history.pushState(null, "", href);
    setLocation(readSiteLocation(new URL(window.location.href)));
    setRevision(value => value + 1);
  };
  return <Context.Provider value={{ location, navigate, setLanguage: language => {
    if (location.page === "not-found") return;
    window.history.pushState(null, "", preserveAppearance(siteHref(location.page, language, window.location.hash.slice(1))));
    setLocation(readSiteLocation(new URL(window.location.href)));
  } }}>{children}</Context.Provider>;
}

export function useSiteNavigation() {
  const value = useContext(Context);
  if (!value) throw new Error("Site navigation requires SiteNavigationProvider.");
  return value;
}

export function SiteLink({ page, hash, children, onClick, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { page: SitePage; hash?: string }) {
  const { location, navigate } = useSiteNavigation();
  const transition = useContext(EditionTransitionContext);
  return <a {...props} href={preserveAppearance(siteHref(page, location.language, hash))} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank" || props.download) return;
    event.preventDefault();
    if(location.page === "home" && (page === "korea" || page === "taiwan") && transition) transition.enter(page,()=>navigate(page,location.language,hash));
    else navigate(page, location.language, hash);
  }}>{children}</a>;
}
