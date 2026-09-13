import { MetalBorder } from "./ui/MetalBorder";
import { HomeReveal } from "./motion/HomeReveal";
import { SiteLink } from "../routing/SiteNavigation";
import { homeMedia } from "./homeMedia";
import type { HomeCopy } from "./homeCopy";
import { StellarActionContent } from "./ui/StellarActionContent";

export function BrandRecap({ copy: c, onWatch }: { copy: HomeCopy; onWatch: () => void }) {
  return <section id="recap" className="brand-section brand-container brand-recap" aria-labelledby="brand-recap-title">
    <HomeReveal className="brand-section-label"><span>04</span><span>OUR FIRST CHAPTER</span></HomeReveal>
    <div className="brand-recap-layout">
      <HomeReveal delay={0.06}>
        <h2 id="brand-recap-title">{c.recapTitle.map(line => <span key={line}>{line}</span>)}</h2>
        <p>{c.recapBody}</p>
        <div className="brand-recap-actions">
          <button className="brand-primary-link stellar-action" onClick={onWatch}><StellarActionContent play>{c.viewRecap}</StellarActionContent></button>
          <SiteLink page="taiwan" className="stellar-action stellar-action--secondary"><StellarActionContent>{c.taiwanCta}</StellarActionContent></SiteLink>
        </div>
      </HomeReveal>
      <HomeReveal delay={0.12}><button className="brand-recap-poster ip-metal-control" onClick={onWatch} aria-label={c.viewRecap}><MetalBorder /><img src={homeMedia.recapPoster} width="1200" height="675" alt="FLAGSHIP Taiwan 2026" loading="lazy" /><span className="brand-recap-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 11 7-11 7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span></button><p className="brand-photo-caption">{c.recapCaption}</p></HomeReveal>
    </div>
  </section>;
}
