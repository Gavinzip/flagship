import { Map, MapPin, Train } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { ActionLink } from "./ActionLink";
import { CalendarButton } from "./CalendarButton";
import { EnergyFrame } from "./EnergyFrame";
import { SectionHeading } from "./SectionHeading";

export function VenueSection() {
  const { content } = useLocale();

  return (
    <section className="section section--venue" id="venue">
      <div className="site-shell">
        <SectionHeading
          title={content.venue.title}
          english={content.venue.english}
        />

        <EnergyFrame className="venue-frame" data-reveal>
          <div className="venue-media">
            <iframe
              src={event.mapEmbedUrl}
              title={content.venue.mapTitle}
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span>{content.venue.mapRoute}</span>
          </div>

          <div className="venue-details">
            <MapPin aria-hidden="true" className="venue-details__pin" />
            <h3>{content.event.venue}</h3>
            <p className="venue-details__room">{event.room}</p>
            <a
              className="venue-address"
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {content.event.address}
            </a>

            <div className="venue-transit">
              <Train aria-hidden="true" />
              <div>
                <strong>{content.venue.transitTitle}</strong>
                <span>{content.event.transit}</span>
              </div>
            </div>

            <ol className="venue-route" aria-label={content.venue.routeLabel}>
              {content.venue.routeSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <div className="venue-actions">
              <ActionLink href={event.mapUrl} target="_blank" rel="noreferrer">
                <Map aria-hidden="true" width={22} height={22} />
                {content.venue.directions}
              </ActionLink>
              <CalendarButton />
            </div>
          </div>
        </EnergyFrame>
      </div>
    </section>
  );
}
