import { ArrowUp, ArrowUpRight } from "iconoir-react";
import { ChapterHomeLink } from "../../components/ChapterHomeLink";
import { organizer } from "../../../data/partners";
import { thailandEvent } from "../data/event";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";

export function ThailandFooter({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  return <footer className="th-footer"><div className="th-wrap">
    <div className="th-footer-brand">
      <p className="th-footer-title" data-th-reveal="0">{words.footer}</p>
      <img className="th-footer-organizer" data-th-reveal="100" src={organizer.src}
        alt={organizer.name} width="1450" height="250" loading="lazy" decoding="async" />
    </div>
    <div className="th-footer-links" data-th-reveal="160"><ChapterHomeLink /><a href={thailandEvent.updatesUrl} target="_blank" rel="noreferrer">{words.social}<ArrowUpRight /></a><a href="#top" aria-label={c.back}><ArrowUp /></a></div>
    <div className="th-footer-bottom"><span>© 2026 FLAGSHIP CARD SHOW</span><span>THAILAND · BANGKOK</span></div>
  </div></footer>;
}
