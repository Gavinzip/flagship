import { ArrowUpRight, MapPin } from "iconoir-react";
import { Reveal } from "../../motion/Reveal";
import type { EventDefinition, EventPageCopy } from "../types";


export function EventVisit({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  return (
    <section id="venue" className="ev-section ev-visit">
      <div className="ev-wrap">
        <Reveal className="ev-section-title">
          <span>03 / {c.event.venue.english}</span>
          <span className="ev-section-korean" lang={definition.id === "korea" ? "ko" : "en"}>
            {definition.captions.venue}
          </span>
          <h2>{c.event.venue.title}</h2>
          <p>{c.visitNote}</p>
        </Reveal>
        <div className="ev-visit-layout">
          <div className="ev-map" data-reveal>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(definition.mapQuery)}&output=embed`}
              title={c.details.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="ev-visit-copy" data-reveal>
            <MapPin />
            <h3>{c.details.venue}</h3>
            <strong>{c.details.venueDetail}</strong>
            <dl className="ev-visit-facts">
              <div>
                <dt>{c.date}</dt>
                <dd>{c.details.date}</dd>
              </div>
              <div>
                <dt>{c.time}</dt>
                <dd>{c.details.time}</dd>
              </div>
            </dl>
            <a
              className="ev-button"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(definition.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              {c.details.directions}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
