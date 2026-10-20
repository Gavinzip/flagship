import { ArrowUpRight } from "iconoir-react";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { thailandEvent } from "../data/event";
import type { VisitCopy } from "../data/visitCopy";
import { ThailandAccess } from "./ThailandAccess";
import { EventText } from "../../motion/EventText";
import { ThailandVenueGallery } from "./ThailandVenueGallery";

export function ThailandVenue({ c, words, visit }: { c: EventPageCopy; words: EditorialCopy; visit: VisitCopy }) {
  return <section id="venue" className="th-venue th-section" aria-labelledby="th-venue-title">
    <div className="th-wrap">
      <span className="th-eyebrow">02 / VENUE & ACCESS</span><h2 id="th-venue-title"><EventText key={words.venueTitle} text={words.venueTitle} /></h2>
      <div className="th-venue-layout">
        <ThailandVenueGallery words={words} />
        <div className="th-venue-copy">
          <h3>QSNCC</h3><strong>EVENT HALL · LEVEL B2</strong>
          <p>{c.details.venueDetail}</p>
          <dl><div><dt>{c.date}</dt><dd>{words.heroDate}</dd></div><div><dt>{c.time}</dt><dd>{c.details.time}</dd></div></dl>
          <p className="th-transit">{words.transit}</p>
          <a className="th-button th-button--black" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(thailandEvent.mapQuery)}`} target="_blank" rel="noreferrer">{c.details.directions}<ArrowUpRight /></a>
        </div>
      </div>
      <div className="th-shared-venue"><p>{words.venueContext}</p><div><span>FLAGSHIP CARD SHOW<strong>EVENT HALL · B2</strong></span><span>BINANCE BLOCKCHAIN WEEK<strong>EXHIBITION HALL 3 · G</strong></span></div></div>
      <ThailandAccess visit={visit} />
    </div>
  </section>;
}
