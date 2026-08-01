import { ArrowUp, Calendar, MapPin } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";

export function Footer() {
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
            <strong>{event.venue}</strong>
            <p>{event.room}</p>
          </div>
        </div>

        <a className="back-to-top" href="#top">
          <ArrowUp aria-hidden="true" />
          <span>返回頂端</span>
        </a>
      </div>
    </footer>
  );
}
