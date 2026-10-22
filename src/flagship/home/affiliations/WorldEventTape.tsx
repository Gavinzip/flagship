import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { affiliationCopy } from "./affiliationCopy";
import { affiliationLinks, affiliationMedia } from "./affiliationMedia";
import "./world-event-tape.css";

/** A single linked caution tape; repeated visual units share one accessible label. */
export function WorldEventTape({ language }: { language: SiteLanguage }) {
  const copy = affiliationCopy[language];
  return (
    <div id="blockchain" className="world-event-tape">
      <a className="world-event-tape-link" href={affiliationLinks.bbw} target="_blank" rel="noreferrer" aria-label={`${copy.label} · ${copy.context} ${copy.officialEvent}`}>
        <span className="world-event-tape-track" aria-hidden="true">
          {[0, 1, 2, 3].map(index => <span className="world-event-tape-unit" key={index}>
            <strong>SIDE EVENT</strong>
            <span className="world-event-tape-divider">//</span>
            <span className="world-event-tape-mark"><img src={affiliationMedia.bbwWordmark} width="1920" height="1080" alt="" /></span>
            <span className="world-event-tape-date"><b>BANGKOK 2026</b><span>NOV 28–29 · QSNCC</span></span>
            <ArrowUpRight />
          </span>)}
        </span>
      </a>
    </div>
  );
}
