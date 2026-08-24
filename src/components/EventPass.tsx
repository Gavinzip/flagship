import type { CSSProperties } from "react";
import { Calendar, Clock, MapPin, Train } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { CalendarButton } from "./CalendarButton";
import { LumaCheckoutLink } from "./LumaCheckoutLink";
import { SpotlightCard } from "./SpotlightCard";

type EventPassContentProps = {
  showTransit?: boolean;
};

export function EventPassContent({
  showTransit = false,
}: EventPassContentProps = {}) {
  const { content } = useLocale();

  return (
    <>
      <header className="event-pass__header">
        <span>EVENT PASS</span>
        <span>FLAGSHIP · TAIWAN 2026</span>
      </header>

      <dl className="event-pass__meta">
        <div className="event-pass__item event-pass__item--date">
          <dt>
            <Calendar aria-hidden="true" />
            <span>{content.eventPass.dateLabel}</span>
          </dt>
          <dd>
            <strong>{event.date}</strong>
            <small>{event.weekday}</small>
          </dd>
        </div>
        <div className="event-pass__item event-pass__item--time">
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
        <div className="event-pass__item event-pass__item--place">
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

      {showTransit ? (
        <p className="event-pass__transit">
          <Train aria-hidden="true" />
          <span>ACCESS</span>
          <strong>{content.event.transit}</strong>
        </p>
      ) : null}

      <div className="event-pass__actions">
        <LumaCheckoutLink
          checkoutTarget="challenge"
          href={event.challengeRegistrationUrl}
        >
          {content.challengeRegistration.label}
        </LumaCheckoutLink>
        <CalendarButton />
      </div>
    </>
  );
}

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
        <EventPassContent />
      </SpotlightCard>
    </div>
  );
}
