import { ArrowUpRight } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { BlurText, Reveal } from "../motion/Reveal";
import { CardFrameArtwork } from "./CardFrameArtwork";

export function BrandIntroduction() {
  const { content: c } = useFlagship();
  return (
    <section
      className="fs-manifesto fs-wrap"
      aria-labelledby="fs-manifesto-title"
    >
      <Reveal className="fs-manifesto-copy">
        <p className="fs-eyebrow">{c.identityEyebrow}</p>
        <h2 id="fs-manifesto-title">
          <BlurText text={c.identityTitle.join("\n")} />
        </h2>
        <h3>{c.identityBody}</h3>
        <p>{c.identityDescription}</p>
        <a className="fs-text-link" href="#editions">
          {c.allEditions}
          <ArrowUpRight />
        </a>
      </Reveal>
      <Reveal className="fs-manifesto-visual" delay={0.1}>
        <CardFrameArtwork />
        <span className="fs-fragment-caption">
          ONE CARD. A WORLD OF CONNECTIONS.
        </span>
      </Reveal>
    </section>
  );
}
