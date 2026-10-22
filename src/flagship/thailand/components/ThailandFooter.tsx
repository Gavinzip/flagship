import { ArrowUp } from "iconoir-react";
import { OrganizerCredits } from "../../components/OrganizerCredits";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";

export function ThailandFooter({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  return <footer id="footer" className="th-footer"><div className="th-wrap">
    <div className="th-footer-brand">
      <p className="th-footer-title" data-th-reveal="0">{words.footer}</p>
    </div>
    <div className="th-footer-links" data-th-reveal="160"><a href="#top" aria-label={c.back}><ArrowUp /></a></div>
    <div className="th-footer-credits"><OrganizerCredits /></div>
    <div className="th-footer-bottom"><span>© 2026 FLAGSHIP CARD SHOW</span><span>THAILAND · BANGKOK</span></div>
  </div></footer>;
}
