import { Clock, HomeSimpleDoor, WhiteFlag } from "iconoir-react";
import { event } from "../data/event";
import { CalendarButton } from "./CalendarButton";
import { EnergyFrame } from "./EnergyFrame";
import { HudScan } from "./HudScan";
import { SectionHeading } from "./SectionHeading";

export function ScheduleSection() {
  return (
    <section className="section section--schedule" id="schedule">
      <HudScan className="hud-scan--schedule" />
      <div className="site-shell">
        <div className="schedule-heading-row">
          <SectionHeading
            title="節目表"
            english="SCHEDULE"
            description="入場、舞台活動和散場時間，都會更新在這裡。"
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
              <p>開放入場</p>
            </div>

            <div className="schedule-status">
              <span className="schedule-point__icon">
                <Clock aria-hidden="true" />
              </span>
              <strong>完整舞台時程即將公布</strong>
              <p>挑戰賽、互動活動與抽獎時段將陸續更新</p>
            </div>

            <div className="schedule-point schedule-point--end">
              <span className="schedule-point__icon">
                <WhiteFlag aria-hidden="true" />
              </span>
              <strong>{event.endTime}</strong>
              <p>活動結束</p>
            </div>
          </div>
        </EnergyFrame>
      </div>
    </section>
  );
}
