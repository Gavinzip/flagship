import { ArrowDown, ArrowUpRight } from "iconoir-react";
import { HeroArtwork } from "../../components/HeroArtwork";
import { TiltedCard } from "../../motion/TiltedCard";
import { officialLinks } from "../../data/editions";
import type { EventDefinition, EventPageCopy } from "../types";

export function EventHero({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  return (
    <section className="ev-hero" aria-labelledby="ev-title">
      <div className="ev-hero-scene ev-wrap">
        <div className="ev-hero-art" aria-hidden="true">
          <HeroArtwork />
        </div>

        <div className="ev-event-card-stack">
          <TiltedCard className="ev-event-card-tilt">
            <article className="ev-event-card">
              <header className="ev-event-card-header">
                <span>FLAGSHIP {definition.country}</span>
                <span>{definition.city} · 2026</span>
              </header>
              <div className="ev-event-card-copy">
                <h1 id="ev-title">{c.headline}</h1>
                <p>{c.intro}</p>
              </div>
              <dl className="ev-event-card-facts">
                <div>
                  <dt>{c.date}</dt>
                  <dd>{c.details.date}</dd>
                </div>
                <div>
                  <dt>{c.time}</dt>
                  <dd>{c.details.time}</dd>
                </div>
                <div className="ev-event-card-venue">
                  <dt>{c.venue}</dt>
                  <dd>
                    {c.details.venue}
                    <small>{c.details.venueDetail}</small>
                  </dd>
                </div>
              </dl>
              <div className="ev-event-card-registration">
                <span>{c.registration}</span>
                <strong>{c.registrationNote}</strong>
              </div>
              <div className="ev-event-card-actions">
                <a
                  className="ev-button ev-event-card-ticket"
                  href={definition.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.ticketCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <div className="ev-event-card-links">
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
