import { HomeReveal } from "./motion/HomeReveal";
import { SiteLink } from "../routing/SiteNavigation";
import type { HomeCopy } from "./homeCopy";
import { StellarActionContent } from "./ui/StellarActionContent";
import { RecapMediaStack } from "./RecapMediaStack";

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
      <HomeReveal className="brand-recap-visual" delay={0.12}>
        <div className="brand-recap-archive">
          <span className="brand-recap-ghost" aria-hidden="true">TAIWAN / 2026</span>
          <RecapMediaStack copy={c} onWatch={onWatch} />
          <div className="brand-recap-meta" aria-label={c.recapArchiveLabel}>
            <span>{c.recapArchiveLabel}</span>
            <span>{c.recapLocation}</span>
            <span>2026.09.05</span>
          </div>
          <p className="brand-photo-caption">{c.recapCaption}</p>
        </div>
      </HomeReveal>
    </div>
  </section>;
}
