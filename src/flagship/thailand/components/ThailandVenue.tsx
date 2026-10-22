import { ArrowUpRight } from "iconoir-react";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { thailandEvent } from "../data/event";
import type { VisitCopy } from "../data/visitCopy";
import { ThailandAccess } from "./ThailandAccess";
import { EventText } from "../../motion/EventText";
import { ThailandVenueGallery } from "./ThailandVenueGallery";
import { ThailandVenueExplorer } from "./ThailandVenueExplorer";
import type { SiteLanguage } from "../../data/copy";
import { venueExplorerCopy } from "../data/venueExplorerCopy";
import { ThailandFloorPlan } from "./ThailandFloorPlan";

const showTravelGuide = false;

export function ThailandVenue({ c, words, visit, language }: { c: EventPageCopy; words: EditorialCopy; visit: VisitCopy; language: SiteLanguage }) {
  return <section id="venue" className="th-venue th-section" aria-labelledby="th-venue-title">
    <div className="th-wrap">
      <span className="th-eyebrow">01 / SAME DATE. SAME VENUE.</span>
      <h2 id="th-venue-title" aria-label={words.venueTitle}>{venueExplorerCopy[language].heading.map(part => <span className="th-venue-title-part" key={part}><EventText text={part} /></span>)}</h2>
      <ThailandVenueExplorer language={language} />
      <div className="th-venue-layout">
        <ThailandVenueGallery words={words} />
        <div className="th-venue-copy">
          <h3 data-th-reveal="0">QSNCC</h3><strong data-th-reveal="60">EVENT HALL · LEVEL B2</strong>
          <p data-th-reveal="100">{c.details.venueDetail}</p>
          <dl data-th-reveal="140"><div><dt>{c.date}</dt><dd>{words.heroDate}</dd></div><div><dt>{c.time}</dt><dd>{c.details.time}</dd></div></dl>
          <p className="th-transit" data-th-reveal="180">{words.transit}</p>
          <a className="th-button th-button--black" data-th-reveal="220" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(thailandEvent.mapQuery)}`} target="_blank" rel="noreferrer">{c.details.directions}<ArrowUpRight /></a>
        </div>
      </div>
      <ThailandFloorPlan language={language} />
      {showTravelGuide && <ThailandAccess visit={visit} />}
    </div>
  </section>;
}
