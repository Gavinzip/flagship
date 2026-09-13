import { ArrowDown } from "iconoir-react";
import type { HomeCopy } from "./homeCopy";
import { homeMedia } from "./homeMedia";
import { BrandBackdrop } from "./BrandBackdrop";
import { BrandDestinations } from "./BrandDestinations";

export function BrandHero({ copy: c, onWatch }: { copy: HomeCopy; onWatch: () => void }) {
  return <section className="brand-hero" aria-labelledby="brand-hero-title">
    <BrandBackdrop />
    <div className="brand-container brand-hero-content">
      <p className="brand-hero-eyebrow">COLLECT. TRADE. PLAY. CONNECT.</p>
      <img className="brand-hero-logo" src={homeMedia.masterLogo} width="1670" height="941" fetchPriority="high" alt="FLAGSHIP Card Show" />
      <div className="brand-hero-copy">
        <h1 id="brand-hero-title">{c.headline.map(line => <span key={line}>{line}</span>)}</h1>
        <p>{c.introduction}</p>
      </div>
      <BrandDestinations copy={c} />
      <button className="brand-watch-link" onClick={onWatch}><span className="brand-play-icon" aria-hidden="true">▶</span>{c.viewRecap}</button>
    </div>
    <div className="brand-hero-bottom brand-container">
      <a className="brand-hero-scroll" href="#about">{c.nav[0]}<ArrowDown /></a>
      <span className="brand-hero-signature">FLAGSHIP CARD SHOW</span>
    </div>
  </section>;
}
