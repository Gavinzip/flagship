import { EventHighlightVideo } from "../../event/components/EventHighlightVideo";
import { eventHighlightMedia } from "../../event/data/highlightMedia";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { EventText } from "../../motion/EventText";
import { useEditionPresented } from "../../routing/EditionPresentationContext";

export function ThailandHighlights({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  const presented = useEditionPresented();
  return <section className="th-highlights th-section" id="highlights" aria-labelledby="th-film-title">
    <div className="th-wrap">
      <div className="th-section-heading">
        <h2 id="th-film-title"><EventText key={words.filmTitle} text={words.filmTitle} /></h2>
        <p data-th-reveal="70">{words.filmIntro}</p><small data-th-reveal="130">{words.filmSource}</small>
      </div>
      <div className="th-highlight-grid">
        {c.event.highlights.items.map((item, index) => <article className={`th-highlight${index === 0 ? " th-highlight--lead" : ""}`} key={item.number}>
          <div className="th-highlight-visual" data-th-reveal="0">
            <EventHighlightVideo visual={eventHighlightMedia[index]} alt={item.alt} playback="viewport" active={presented} />
          </div>
          <div className="th-highlight-copy"><div className="th-highlight-title"><span className="th-eyebrow" data-th-reveal="50">{item.number} / {item.english}</span><h3 data-th-reveal="100">{item.title}</h3></div><p data-th-reveal="160">{item.description}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
