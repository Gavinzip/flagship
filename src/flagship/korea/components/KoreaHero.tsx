import { ArrowDown, ArrowUpRight } from "iconoir-react";
import { HeroArtwork } from "../../components/HeroArtwork";
import { TiltedCard } from "../../motion/TiltedCard";
import { officialLinks } from "../../data/editions";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaHero({ c }: { c: KoreaPageCopy }) {
  return (
    <section className="kr-hero" aria-labelledby="kr-title">
      <div className="kr-hero-scene kr-wrap">
        <div className="kr-hero-art" aria-hidden="true">
          <HeroArtwork />
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
              <div className="kr-event-card-actions">
                <a
                  className="kr-button kr-event-card-ticket"
                  href="https://luma.com/5qs2r3xi"
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.ticketCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <div className="kr-event-card-links">
                  <a href="#highlights">
                    {c.explore}
                    <ArrowDown aria-hidden="true" />
                  </a>
                  <a
                    href={officialLinks.flagshipX}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.officialUpdates}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </TiltedCard>
        </div>
      </div>
    </section>
  );
}
