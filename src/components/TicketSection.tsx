import { OpenNewWindow } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { SectionHeading } from "./SectionHeading";

export function TicketSection() {
  const { content } = useLocale();

  return (
    <section className="section section--tickets" id="tickets">
      <div className="site-shell">
        <SectionHeading
          title={content.tickets.title}
          english={content.tickets.english}
          description={content.tickets.description}
        />

        <div className="ticket-embed energy-frame" data-reveal>
          <span
            className="energy-frame__rail energy-frame__rail--top"
            aria-hidden="true"
          />
          <span
            className="energy-frame__rail energy-frame__rail--bottom"
            aria-hidden="true"
          />

          <div className="ticket-embed__inner energy-frame__inner">
            <header className="ticket-embed__toolbar">
              <div>
                <span>{content.tickets.toolbarTitle}</span>
                <strong>{content.tickets.toolbarDescription}</strong>
              </div>
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noreferrer"
              >
                {content.tickets.openOnLuma}
                <OpenNewWindow aria-hidden="true" />
              </a>
            </header>

            <iframe
              src={`https://luma.com/embed/event/${event.lumaEventId}/simple`}
              title={content.tickets.iframeTitle}
              allow="fullscreen; payment"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
