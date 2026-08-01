import { Calendar } from "iconoir-react";
import { event } from "../data/event";
import { InteractiveLink } from "./InteractiveLink";

export function CalendarButton() {
  return (
    <InteractiveLink
      className="calendar-button"
      href={`/${event.calendarFilename}`}
      download
    >
      <Calendar aria-hidden="true" width={23} height={23} />
      <span>加入行事曆</span>
    </InteractiveLink>
  );
}
