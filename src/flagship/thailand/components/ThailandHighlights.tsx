import { EventHighlightVideo } from "../../event/components/EventHighlightVideo";
import { eventHighlightMedia } from "../../event/data/highlightMedia";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { EventText } from "../../motion/EventText";

export function ThailandHighlights({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  return <section className="th-highlights th-section" id="highlights" aria-labelledby="th-film-title">
    <div className="th-wrap">
      <div className="th-section-heading">
        <h2 id="th-film-title"><EventText key={words.filmTitle} text={words.filmTitle} /></h2>
        <p>{words.filmIntro}</p><small>{words.filmSource}</small>
      </div>
      <div className="th-highlight-grid">
        {c.event.highlights.items.map((item, index) => <article className={`th-highlight${index === 0 ? " th-highlight--lead" : ""}`} key={item.number}>
          <div className="th-highlight-visual">
            <EventHighlightVideo visual={eventHighlightMedia[index]} alt={item.alt} />
          </div>
          <div className="th-highlight-copy"><div className="th-highlight-title"><span className="th-eyebrow">{item.number} / {item.english}</span><h3>{item.title}</h3></div><p>{item.description}</p></div>
        </article>)}
      </div>
      <p className="th-film-hint">{words.playHint}</p>
    </div>
  </section>;
}
