import { ArrowUpRight } from "iconoir-react";
import { organizer } from "../../../data/partners";
import { organizerAffiliations } from "../../data/organizerAffiliations";
import { officialLinks } from "../../data/editions";
import { affiliationLinks, affiliationMedia } from "../../home/affiliations/affiliationMedia";
import "../styles/affiliation-banner.css";

function TapeUnit({ duplicate = false }: { duplicate?: boolean }) {
  const { chain, backer } = organizerAffiliations;
  return <div className="th-affiliation-unit" aria-hidden={duplicate || undefined} inert={duplicate || undefined}>
    <a className="th-affiliation-event" href={affiliationLinks.bbw} target="_blank" rel="noreferrer" aria-label="Side event · Binance Blockchain Week Bangkok 2026">
      <strong>SIDE EVENT</strong><span className="th-affiliation-divider" aria-hidden="true">//</span>
      <span className="th-affiliation-bbw"><img src={affiliationMedia.bbwWordmark} width="1920" height="1080" alt="Binance Blockchain Week" /></span>
      <span className="th-affiliation-date"><b>BANGKOK 2026</b><span>NOV 28–29 · QSNCC</span></span>
    </a>
    <span className="th-affiliation-divider" aria-hidden="true">//</span>
    <div className="th-affiliation-organizer">
      <span className="th-affiliation-role">ORGANIZED BY</span>
      <div className="th-affiliation-marks"><a href={officialLinks.website} target="_blank" rel="noreferrer"><img className="th-affiliation-renaiss" src={organizer.src} width="1450" height="250" alt={organizer.name} /></a>
        <a className="th-affiliation-chain" href={chain.href} target="_blank" rel="noreferrer"><span>Built on</span><img src={chain.src} width="1388" height="244" alt={chain.name} /></a>
      </div>
    </div>
    <span className="th-affiliation-divider" aria-hidden="true">//</span>
    <a className="th-affiliation-backer" href={backer.href} target="_blank" rel="noreferrer"><span className="th-affiliation-role">BACKED BY</span><img src={backer.src} width="1033" height="248" alt={backer.name} /></a>
    <ArrowUpRight className="th-affiliation-arrow" aria-hidden="true" />
  </div>;
}

/** One yellow tape below the header; every affiliation stays inside the same track. */
export function ThailandAffiliationBanner() {
  return <aside className="th-affiliation-banner" aria-label="Side event · Organized by Renaiss Protocol · Built on BNB Chain · Backed by YZi Labs">
    <div className="th-affiliation-viewport" tabIndex={0} aria-label="Event and organizer affiliations"><div className="th-affiliation-track"><TapeUnit /><TapeUnit duplicate /></div></div>
  </aside>;
}
