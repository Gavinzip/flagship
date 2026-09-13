import { ArrowUpRight } from "iconoir-react";
import { SiteLink } from "../routing/SiteNavigation";
import type { HomeCopy } from "./homeCopy";

/** Paired chapter entrances inherit the emblem's dark ribbon and colored edge. */
export function BrandDestinations({ copy: c }: { copy: HomeCopy }) {
  return <nav className="brand-hero-destinations" aria-label={c.editionsTitle}>
    <SiteLink page="taiwan" className="brand-destination brand-destination-taiwan">
      <span className="brand-destination-index">01</span>
      <span><small>{c.taiwanStatus}</small><strong>TAIWAN</strong></span><ArrowUpRight />
    </SiteLink>
    <SiteLink page="korea" className="brand-destination brand-destination-korea">
      <span className="brand-destination-index">02</span>
      <span><small>{c.koreaStatus}</small><strong>KOREA</strong></span><ArrowUpRight />
    </SiteLink>
  </nav>;
}
