import { ArrowUp, ArrowUpRight, Plus } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { officialLinks } from "../data/editions";
import { BrandMark } from "./BrandMark";
import { BlurText, Reveal } from "../motion/Reveal";
import { PosterScene } from "./PosterScene";

export function CommunitySection() {
  const { content: c } = useFlagship();
  return (
    <section className="fs-community">
      <PosterScene scene="river" />
      <div className="fs-wrap">
        <Reveal>
          <p className="fs-eyebrow">{c.togetherEyebrow}</p>
          <h2>
            <BlurText text={c.togetherTitle} />
          </h2>
        </Reveal>
        <Reveal className="fs-community-copy">
          <p>{c.togetherBody}</p>
          <a
            className="fs-button fs-button-light"
            href={officialLinks.website}
            target="_blank"
            rel="noreferrer"
          >
            {c.togetherCta}
            <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
export function QuestionsSection() {
  const { content: c } = useFlagship();
  return (
    <section
      id="questions"
      className="fs-questions fs-wrap fs-section"
      aria-labelledby="fs-faq-title"
    >
      <Reveal>
        <p className="fs-eyebrow">04 / {c.faqEyebrow}</p>
        <h2 id="fs-faq-title">
          <BlurText text={c.faqTitle} />
        </h2>
      </Reveal>
      <div className="fs-faq-list">
        {c.faqs.map(([question, answer], i) => (
          <details key={i} name="flagship-faq">
            <summary>
              <span>0{i + 1}</span>
              <h3>{question}</h3>
              <Plus />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function SiteFooter() {
  const { content: c } = useFlagship();
  return (
    <footer className="fs-footer">
      <div className="fs-wrap fs-scene-content">
        <div className="fs-footer-top">
          <p>{c.footerDescription}</p>
          <a className="fs-back" href="#top" aria-label={c.back}>
            <ArrowUp />
          </a>
        </div>
        <a className="fs-footer-emblem" href="#top" aria-label="FLAGSHIP home">
          <BrandMark />
        </a>
        <div className="fs-footer-bottom">
          <span>{c.rights}</span>
          <span>{c.footerLine}</span>
          <div>
            <a href={officialLinks.updates} target="_blank" rel="noreferrer">
              {c.official}
              <ArrowUpRight />
            </a>
            <a href={officialLinks.website} target="_blank" rel="noreferrer">
              {c.brandSite}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
