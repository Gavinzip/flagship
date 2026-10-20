import { ArrowDown, ArrowUpRight } from "iconoir-react";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { thailandEvent } from "../data/event";
import { ThailandHeroArtwork } from "./ThailandHeroArtwork";
import { EventText } from "../../motion/EventText";
import { useEditionPresented } from "../../routing/EditionPresentationContext";

export function ThailandHero({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  const presented = useEditionPresented();
  return (
    <section className="ev-hero th-hero" aria-labelledby="th-title">
      <ThailandHeroArtwork />
      <div className="th-hero-layout th-wrap">
        <div className="th-hero-copy" data-presented={presented}>
          <h1 id="th-title" aria-label="FLAGSHIP Card Show Thailand 2026"><EventText text="Card Show" className="th-hero-title-kind" hero /><EventText text="Thailand" className="th-hero-title-place" hero delay={.16} /></h1>
          <p className="th-hero-date"><strong>{words.heroDate}</strong></p>
          <div className="th-hero-meta"><p>QSNCC · EVENT HALL B2, BANGKOK</p><p>{c.details.time}</p></div>
          <div className="th-hero-actions">
            <a className="th-button th-button--black" href={thailandEvent.updatesUrl} target="_blank" rel="noreferrer">{c.ticketCta}<ArrowUpRight /></a>
            <a className="th-text-link" href="#highlights">{words.explore}<ArrowDown /></a>
          </div>
          <p className="th-ticket-note">{c.registrationNote}</p>
        </div>
      </div>
    </section>
  );
}
