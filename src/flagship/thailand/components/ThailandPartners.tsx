import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { thailandEvent } from "../data/event";
import { thailandPartnerCopy, thailandPartnerLineup } from "../data/partners";
import { EventText } from "../../motion/EventText";
import { ThailandPartnerLight } from "./ThailandPartnerLight";

export function ThailandPartners({ language }: { language: SiteLanguage }) {
  const copy = thailandPartnerCopy[language];
  const { organizer, mainSponsor, pendingSlots } = thailandPartnerLineup;
  return <section id="vendors" className="th-partners th-section" aria-labelledby="th-partners-title">
    <ThailandPartnerLight />
    <div className="th-wrap">
      <div className="th-partners-heading"><h2 id="th-partners-title"><EventText key={copy.title} text={copy.title} /></h2><span className="th-eyebrow">PARTNERS</span></div>
      <div className="th-main-partners">
        <figure className="th-main-partner" data-th-reveal="0">
          <figcaption>{copy.organizer}</figcaption>
          <div className="th-partner-mark th-partner-mark--organizer">
            <img src={organizer.src} alt={organizer.name} width="1450" height="250" loading="lazy" decoding="async" />
            <img className="th-partner-icon" src={organizer.src} alt="" aria-hidden="true" width="1450" height="250" loading="lazy" decoding="async" />
          </div>
        </figure>
        <figure className="th-main-partner" data-th-reveal="80">
          <figcaption>{copy.mainSponsor}</figcaption>
          <div className="th-partner-mark"><img src={mainSponsor.src} alt={mainSponsor.name} width="960" height="349" loading="lazy" decoding="async" /></div>
        </figure>
      </div>
      <div className="th-partner-pending" data-th-reveal="120">
        <h3>{copy.pendingTitle}</h3>
        <ul aria-label={copy.pendingTitle}>{pendingSlots.map(id => <li key={id}>{copy.comingSoon}</li>)}</ul>
        <div className="th-partner-updates"><p>{copy.pendingNote}</p><a className="th-text-link" href={thailandEvent.updatesUrl} target="_blank" rel="noreferrer">{copy.updates}<ArrowUpRight /></a></div>
      </div>
    </div>
  </section>;
}
