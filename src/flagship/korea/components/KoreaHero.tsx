import { ArrowDown } from "iconoir-react";
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
        <a className="kr-button" href="#event-info">
          {c.explore}
          <ArrowDown />
        </a>
      </div>
      <div className="kr-event-pass kr-wrap">
        <dl>
          <div>
            <dt>{c.date}</dt>
            <dd>
              {c.koreaEvent.date}
            </dd>
          </div>
          <div>
            <dt>{c.time}</dt>
            <dd>
              {c.koreaEvent.time}
            </dd>
          </div>
          <div>
            <dt>{c.venue}</dt>
            <dd>
              {c.koreaEvent.venue}
              <small>{c.koreaEvent.venueDetail}</small>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
