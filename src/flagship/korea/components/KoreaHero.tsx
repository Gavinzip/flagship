import { ArrowDown } from "iconoir-react";
import { event } from "../../../data/event";
import { HeroArtwork } from "../../components/HeroArtwork";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaHero({ c }: { c: KoreaPageCopy }) {
  return (
    <section className="kr-hero" aria-labelledby="kr-title">
      <div className="kr-hero-scene">
        <HeroArtwork />
      </div>
      <div className="kr-hero-body kr-wrap">
        <div>
          <h1 id="kr-title">{c.headline}</h1>
          <p>{c.intro}</p>
        </div>
        <a className="kr-button" href="#highlights">
          {c.explore}
          <ArrowDown />
        </a>
      </div>
      <div className="kr-event-pass kr-wrap">
        <span className="kr-pass-label">
          <strong>EVENT REFERENCE</strong>
          {c.source}
        </span>
        <dl>
          <div>
            <dt>{c.date}</dt>
            <dd>
              {event.date} <small>{event.weekday}</small>
            </dd>
          </div>
          <div>
            <dt>{c.time}</dt>
            <dd>
              {event.startTime} — {event.endTime}
            </dd>
          </div>
          <div>
            <dt>{c.venue}</dt>
            <dd>
              {c.event.event.venue}
              <small>{event.room}</small>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
