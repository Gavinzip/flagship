import { Clock, HomeSimpleDoor, WhiteFlag } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { CalendarButton } from "./CalendarButton";
import { EnergyFrame } from "./EnergyFrame";
import { HudScan } from "./HudScan";
import { SectionHeading } from "./SectionHeading";

export function ScheduleSection() {
  const { content } = useLocale();

  return (
    <section className="section section--schedule" id="schedule">
      <HudScan className="hud-scan--schedule" />
      <div className="site-shell">
        <div className="schedule-heading-row">
          <SectionHeading
            title={content.schedule.title}
            english={content.schedule.english}
          />
          <CalendarButton />
        </div>

        <EnergyFrame className="schedule-frame" accent="red" data-reveal>
          <div className="schedule-timeline">
            <div className="schedule-point schedule-point--start">
              <span className="schedule-point__icon">
                <HomeSimpleDoor aria-hidden="true" />
              </span>
              <strong>{event.startTime}</strong>
              <p>{content.schedule.entryOpen}</p>
            </div>

            <div className="schedule-status">
              <span className="schedule-point__icon">
                <Clock aria-hidden="true" />
              </span>
              <strong>{content.schedule.comingSoon}</strong>
              <p>{content.schedule.comingSoonDescription}</p>
            </div>

            <div className="schedule-point schedule-point--end">
              <span className="schedule-point__icon">
                <WhiteFlag aria-hidden="true" />
              </span>
              <strong>{event.endTime}</strong>
              <p>{content.schedule.eventEnds}</p>
            </div>
          </div>
        </EnergyFrame>
      </div>
    </section>
  );
}
