import type { CSSProperties } from "react";
import { Calendar, Clock, MapPin } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { CalendarButton } from "./CalendarButton";
import { SpotlightCard } from "./SpotlightCard";
import { TicketLink } from "./TicketLink";

export function EventPass() {
  const { content } = useLocale();

  return (
    <div
      className="hero__pass entry-item"
      style={{ "--entry-index": 3 } as CSSProperties}
    >
      <SpotlightCard
        className="event-pass"
        spotlightColor="rgba(128, 202, 255, 0.42)"
        spotlightSize={230}
      >
        <span className="event-pass__face" aria-hidden="true" />
        <img
          className="event-pass__frame"
          src={media.eventPassFrame}
          width="1200"
          height="900"
          alt=""
          aria-hidden="true"
        />
        <header className="event-pass__header">
          <span>EVENT PASS</span>
          <span>FLAGSHIP · TAIWAN 2026</span>
        </header>

        <dl className="event-pass__meta">
          <div>
            <dt>
              <Calendar aria-hidden="true" />
              <span>{content.eventPass.dateLabel}</span>
            </dt>
            <dd>
              <strong>{event.date}</strong>
              <small>{event.weekday}</small>
            </dd>
          </div>
          <div>
            <dt>
              <Clock aria-hidden="true" />
              <span>{content.eventPass.timeLabel}</span>
            </dt>
            <dd>
              <strong>
                {event.startTime}—{event.endTime}
              </strong>
            </dd>
          </div>
          <div>
            <dt>
              <MapPin aria-hidden="true" />
              <span>{content.eventPass.placeLabel}</span>
            </dt>
            <dd>
              <strong>{content.event.venue}</strong>
              <small>{event.room}</small>
            </dd>
          </div>
        </dl>

        <div className="event-pass__actions">
          <TicketLink>{content.header.ticketLabel}</TicketLink>
          <CalendarButton />
        </div>
      </SpotlightCard>
    </div>
  );
}
