import { ArrowDown, ArrowUpRight, Pause, Play } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { Reveal } from "../motion/Reveal";
import { HeroArtwork } from "./HeroArtwork";
import { PosterScene } from "./PosterScene";
import { CardFrameArtwork } from "./CardFrameArtwork";

export function EditionHero() {
  const { content: c, edition, paused, setPaused } = useFlagship();
  const korea = edition.id === "korea";
  return (
    <section className="fs-hero" aria-labelledby="fs-hero-title">
      <PosterScene scene="sky" />
      <div className="fs-hero-scene">
        <CardFrameArtwork className="fs-hero-frame fs-hero-frame-left" />
        <CardFrameArtwork className="fs-hero-frame fs-hero-frame-right" />
        <HeroArtwork />
      </div>
      <div className="fs-hero-details fs-wrap">
        <Reveal className="fs-hero-information">
          <div className="fs-hero-statement">
            <p>COLLECT. TRADE. PLAY. CONNECT.</p>
            <span>{c.heroLine}</span>
          </div>
          <div className="fs-hero-chapter">
            <span>{korea ? c.nextStop : c.archive}</span>
            <h1 id="fs-hero-title">
              {edition.country}
              <small>/{edition.number}</small>
            </h1>
          </div>
          <dl className="fs-hero-facts">
            <div>
              <dt>{c.date}</dt>
              <dd>{edition.date ?? c.tba}</dd>
            </div>
            <div>
              <dt>{c.venue}</dt>
              <dd>{korea ? c.cityTba : "TAIPEI · CLAPPER STUDIO"}</dd>
            </div>
          </dl>
          <a className="fs-button" href="#show-info">
            {c.details}
            <ArrowUpRight />
          </a>
        </Reveal>
        <div className="fs-hero-footer">
          <a className="fs-scroll-link" href="#experience">
            <ArrowDown />
            {c.scroll}
          </a>
          <a
            className="fs-organizer"
            href="https://www.renaiss.xyz/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{c.organizer}</span>
            <span className="fs-organizer-name">renaiss Protocol</span>
          </a>
          <button
            className="fs-motion-toggle"
            aria-label={paused ? c.resumeMotion : c.motion}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play /> : <Pause />}
          </button>
        </div>
      </div>
    </section>
  );
}
