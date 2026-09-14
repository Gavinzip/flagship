import { ArrowDown } from "iconoir-react";
import { HeroArtwork } from "../../components/HeroArtwork";
import { TiltedCard } from "../../motion/TiltedCard";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaHero({ c }: { c: KoreaPageCopy }) {
  return (
    <section className="kr-hero" aria-labelledby="kr-title">
      <div className="kr-hero-scene kr-wrap">
        <div className="kr-hero-art" aria-hidden="true">
          <HeroArtwork />
          <span className="kr-hero-coordinates">37.5665° N · 126.9780° E</span>
        </div>

        <div className="kr-event-card-stack">
          <TiltedCard className="kr-event-card-tilt">
            <article className="kr-event-card">
              <header className="kr-event-card-header">
                <span>FLAGSHIP KOREA</span>
                <span>SEOUL · 2026</span>
              </header>
              <div className="kr-event-card-copy">
                <h1 id="kr-title">{c.headline}</h1>
                <p>{c.intro}</p>
              </div>
              <dl className="kr-event-card-facts">
                <div>
                  <dt>{c.date}</dt>
                  <dd>{c.koreaEvent.date}</dd>
                </div>
                <div>
                  <dt>{c.time}</dt>
                  <dd>{c.koreaEvent.time}</dd>
                </div>
                <div className="kr-event-card-venue">
                  <dt>{c.venue}</dt>
                  <dd>
                    {c.koreaEvent.venue}
                    <small>{c.koreaEvent.venueDetail}</small>
                  </dd>
                </div>
              </dl>
              <div className="kr-event-card-registration">
                <span>{c.registration}</span>
                <strong>{c.registrationNote}</strong>
              </div>
              <a className="kr-button" href="#highlights">
                {c.explore}
                <ArrowDown />
              </a>
            </article>
          </TiltedCard>
        </div>
      </div>
    </section>
  );
}
