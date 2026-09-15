import { ArrowUpRight, MapPin } from "iconoir-react";
import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";
import { koreaDeckMapEmbedUrl, koreaDeckMapUrl } from "../data/koreaDeck";

export function KoreaVisit({ c }: { c: KoreaPageCopy }) {
  return (
    <section id="venue" className="kr-section kr-visit">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>03 / {c.event.venue.english}</span>
          <span className="kr-section-korean" lang="ko">
            도시에서 현장까지
          </span>
          <h2>{c.event.venue.title}</h2>
          <p>{c.visitNote}</p>
        </Reveal>
        <div className="kr-visit-layout">
          <div className="kr-map" data-reveal>
            <iframe
              src={koreaDeckMapEmbedUrl()}
              title={c.koreaEvent.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="kr-visit-copy" data-reveal>
            <MapPin />
            <h3>{c.koreaEvent.venue}</h3>
            <strong>{c.koreaEvent.venueDetail}</strong>
            <dl className="kr-visit-facts">
              <div>
                <dt>{c.date}</dt>
                <dd>{c.koreaEvent.date}</dd>
              </div>
              <div>
                <dt>{c.time}</dt>
                <dd>{c.koreaEvent.time}</dd>
              </div>
            </dl>
            <a
              className="kr-button"
              href={koreaDeckMapUrl()}
              target="_blank"
              rel="noreferrer"
            >
              {c.koreaEvent.directions}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
