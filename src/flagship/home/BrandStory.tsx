import { MetalBorder } from "./ui/MetalBorder";
import { ArrowUpRight } from "iconoir-react";
import { HomeReveal } from "./motion/HomeReveal";
import type { HomeCopy } from "./homeCopy";
import { homeMedia } from "./homeMedia";

export function BrandStory({ copy: c }: { copy: HomeCopy }) {
  return <section id="about" className="brand-section brand-story brand-container" aria-labelledby="brand-about-title">
    <HomeReveal className="brand-story-media"><figure>
      <img src={homeMedia.story} width="1600" height="1067" loading="lazy" alt={c.aboutAlt} />
      <figcaption>{c.aboutCaption}<span>TAIWAN / 2026</span></figcaption>
    </figure></HomeReveal>
    <div className="brand-story-text">
      <HomeReveal className="brand-section-label"><span>01</span><span>ABOUT FLAGSHIP</span></HomeReveal>
      <HomeReveal delay={0.06}><h2 id="brand-about-title">{c.aboutTitle.map(line => <span key={line}>{line}</span>)}</h2></HomeReveal>
      <HomeReveal className="brand-prose" delay={0.12}>{c.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</HomeReveal>
    <a className="brand-story-next ip-metal-control" href="#editions"><MetalBorder />{c.explore}<ArrowUpRight /></a>
    </div>
  </section>;
}
