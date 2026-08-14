import { ReservationFlow } from "./ReservationFlow";

export function TicketSection() {
  return (
    <section className="section section--tickets" id="tickets">
      <div className="site-shell">
        <div className="reservation-panel energy-frame" data-reveal>
          <span
            className="energy-frame__rail energy-frame__rail--top"
            aria-hidden="true"
          />
          <span
            className="energy-frame__rail energy-frame__rail--bottom"
            aria-hidden="true"
          />

          <div className="reservation-panel__inner energy-frame__inner">
            <ReservationFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
