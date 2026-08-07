import { Calendar } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { InteractiveLink } from "./InteractiveLink";

export function CalendarButton() {
  const { content, locale } = useLocale();

  return (
    <InteractiveLink
      className="calendar-button"
      href={`/${locale === "en" ? event.calendarEnglishFilename : event.calendarFilename}`}
      download
    >
      <Calendar aria-hidden="true" width={23} height={23} />
      <span>{content.calendar.label}</span>
    </InteractiveLink>
  );
}
