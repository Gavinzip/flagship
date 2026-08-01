import { OpenNewWindow } from "iconoir-react";
import { event } from "../data/event";
import { SectionHeading } from "./SectionHeading";

export function TicketSection() {
  return (
    <section className="section section--tickets" id="tickets">
      <div className="site-shell">
        <SectionHeading
          title="活動票券"
          english="TICKETS & REGISTRATION"
          description="票種、名額與報名狀態以 Luma 顯示為準。"
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
                <span>EVENT REGISTRATION</span>
                <strong>透過 Luma 查看票券</strong>
              </div>
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noreferrer"
              >
                在 Luma 開啟
                <OpenNewWindow aria-hidden="true" />
              </a>
            </header>

            <iframe
              src={`https://luma.com/embed/event/${event.lumaEventId}/simple`}
              title="Flagship Card Show Taiwan 活動票券與報名"
              loading="lazy"
              allow="fullscreen; payment"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
