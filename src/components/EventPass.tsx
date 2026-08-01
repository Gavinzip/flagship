import type { CSSProperties } from "react";
import { Calendar, Clock, MapPin } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";
import { ActionLink } from "./ActionLink";
import { CalendarButton } from "./CalendarButton";
import { SpotlightCard } from "./SpotlightCard";

export function EventPass() {
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
              <span>DATE</span>
            </dt>
            <dd>
              <strong>{event.date}</strong>
              <small>{event.weekday}</small>
            </dd>
          </div>
          <div>
            <dt>
              <Clock aria-hidden="true" />
              <span>TIME</span>
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
              <span>PLACE</span>
            </dt>
            <dd>
              <strong>{event.venue}</strong>
              <small>{event.room}</small>
            </dd>
          </div>
        </dl>

        <div className="event-pass__actions">
          <ActionLink href="#highlights">查看活動資訊</ActionLink>
          <CalendarButton />
        </div>
      </SpotlightCard>
    </div>
  );
}
