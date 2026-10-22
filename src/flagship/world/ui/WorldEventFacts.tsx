import type { SiteLanguage } from "../../data/copy";
import { thailandEvent } from "../../thailand/data/event";
import { worldEventCopy } from "./worldEventCopy";
import "./world-event-facts.css";

/** The same confirmed event details serve the opening and its geographic card. */
export function WorldEventFacts({ language, compact = false }: { language: SiteLanguage; compact?: boolean }) {
  const copy = worldEventCopy(language);
  return <span className={`world-event-facts world-event-facts--${compact ? "marker" : "intro"}`} role="group" aria-label={copy.information}>
    <span className="world-event-date">
      <span><time dateTime={thailandEvent.startDate}>{copy.dateStart}</time>–<time dateTime={thailandEvent.endDate}>{copy.dateEnd}</time></span>
      <span className="world-event-weekdays">{copy.weekdays}</span>
    </span>
    <span className="world-event-time">
      <strong>{thailandEvent.time}</strong>
      {!compact && <span className="world-event-note">{copy.daily}</span>}
    </span>
    <span className="world-event-venue">
      <strong>{thailandEvent.venue}</strong>
      {!compact && <span className="world-event-note">{copy.venue}</span>}
    </span>
  </span>;
}
