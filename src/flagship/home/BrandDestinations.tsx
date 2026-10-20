import { editions } from "../data/editions";
import { ArrowUpRight } from "iconoir-react";
import { SiteLink } from "../routing/SiteNavigation";
import type { HomeCopy } from "./homeCopy";

/** Paired chapter entrances inherit the emblem's dark ribbon and colored edge. */
export function BrandDestinations({ copy: c }: { copy: HomeCopy }) {
  return <nav className="brand-hero-destinations" aria-label={c.editionsTitle}>
    <SiteLink page="taiwan" className="brand-destination brand-destination-taiwan">
      <span className="brand-destination-index">{editions.taiwan.number}</span>
      <span><small>{c.taiwanStatus}</small><strong>TAIWAN</strong></span><ArrowUpRight />
    </SiteLink>
    <SiteLink page="thailand" className="brand-destination brand-destination-thailand">
      <span className="brand-destination-index">{editions.thailand.number}</span>
      <span><small>{c.thailandStatus}</small><strong>THAILAND</strong></span><ArrowUpRight />
    </SiteLink>
  </nav>;
}
