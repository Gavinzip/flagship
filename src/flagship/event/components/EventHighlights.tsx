import { Reveal } from "../../motion/Reveal";
import type { EventDefinition, EventPageCopy } from "../types";
import { eventHighlightMedia } from "../data/highlightMedia";
import { EventHighlightVideo } from "./EventHighlightVideo";

export function EventHighlights({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  return (
    <section id="highlights" className="ev-section ev-highlights">
      <div className="ev-wrap">
        <Reveal className="ev-section-title">
          <span>01 / {c.event.highlights.english}</span>
          <span className="ev-section-korean" lang={definition.id === "korea" ? "ko" : "en"}>
            {definition.captions.highlights}
          </span>
          <h2>{c.event.highlights.title}</h2>
        </Reveal>
        <div className="ev-highlight-list">
          {c.event.highlights.items.map((item, i) => {
            const visual = eventHighlightMedia[i];
            return (
              <Reveal
                key={item.number}
                className={`ev-highlight ev-highlight-${i + 1}`}
                delay={i * 0.09}
              >
                <div className="ev-highlight-image">
                  <EventHighlightVideo visual={visual} alt={item.alt} />
                  <span className="ev-highlight-number">{item.number}</span>
                </div>
                <div className="ev-highlight-copy">
                  <span className="ev-label">{item.english}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
