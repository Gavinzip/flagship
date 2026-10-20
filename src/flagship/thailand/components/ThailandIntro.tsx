import type { EventPageCopy } from "../../event/types";
import { EventText } from "../../motion/EventText";
import { thailandEvent } from "../data/event";
import type { EditorialCopy } from "../data/editorialCopy";

export function ThailandIntro({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  return <section className="th-intro" aria-labelledby="th-intro-title">
    <div className="th-wrap th-intro-layout">
      <div className="th-intro-heading"><h2 id="th-intro-title"><EventText text={c.headline} /></h2><p data-th-reveal="80">{c.intro}</p></div>
      <dl className="th-stats">
        <div data-th-reveal="0"><dt>{words.tables}</dt><dd>{thailandEvent.plannedVendorTables}</dd></div>
        <div data-th-reveal="80"><dt>{words.booths}</dt><dd>{thailandEvent.plannedExhibitorBooths}</dd></div>
        <div className="th-visitors" data-th-reveal="160"><dt>{words.visitors}</dt><dd>{thailandEvent.expectedVisitors}</dd></div>
      </dl>
    </div>
  </section>;
}
