import { ArrowUp, Calendar, MapPin } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";

export function Footer() {
  const { content } = useLocale();

  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__inner">
        <img
          src={media.flagshipLogo}
          width="900"
          height="493"
          alt="Flagship Card Show Taiwan"
        />

        <div className="footer-meta">
          <Calendar aria-hidden="true" />
          <div>
            <strong>
              {event.date} <span>{event.weekday}</span>
            </strong>
            <p>
              {event.startTime}—{event.endTime}
            </p>
          </div>
        </div>

        <div className="footer-meta">
          <MapPin aria-hidden="true" />
          <div>
            <strong>{content.event.venue}</strong>
            <p>{event.room}</p>
          </div>
        </div>

        <a className="back-to-top" href="#top">
          <ArrowUp aria-hidden="true" />
          <span>{content.footer.backToTop}</span>
        </a>
      </div>
    </footer>
  );
}
