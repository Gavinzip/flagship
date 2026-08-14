import { useEffect } from "react";
import { responsiveMedia } from "../config/media";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { LanguageSelector } from "./LanguageSelector";
import { TicketSection } from "./TicketSection";

const localDemoGmail = import.meta.env.DEV
  ? "flagship.tail.demo@gmail.com"
  : null;

function usePrivatePageMetadata(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousRobots = existingRobots?.content;
    const robots = existingRobots ?? document.createElement("meta");

    document.title = title;
    robots.name = "robots";
    robots.content = "noindex, nofollow, noarchive";
    if (!existingRobots) document.head.append(robots);

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== undefined) {
        existingRobots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, [title]);
}

export function ReservationEntryPage() {
  const { content, locale } = useLocale();
  usePrivatePageMetadata(
    `${content.tickets.title}｜FLAGSHIP Card Show Taiwan`,
  );

  return (
    <div className="reservation-entry-page" id="top">
      <header className="reservation-entry-header entry-item">
        <div className="site-shell reservation-entry-header__inner">
          <a
            href="/"
            aria-label={locale === "zh-TW" ? "返回活動網站" : "Back to event site"}
          >
            <img
              {...responsiveMedia.flagshipLogo}
              width="900"
              height="493"
              alt="Flagship Card Show Taiwan"
            />
          </a>
          <div>
            <span>INVITED EARLY-BIRD GUESTS</span>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="reservation-entry-main">
        <div className="reservation-entry-intro site-shell entry-item">
          <p>FLAGSHIP 2026 · EARLY-BIRD ACCESS</p>
          <h1>{content.tickets.title}</h1>
          <p className="reservation-entry-intro__description">
            {content.tickets.description}
          </p>
          <div className="reservation-entry-intro__meta">
            <span>{event.date} · {event.weekday}</span>
            <span>{event.startTime}—{event.endTime}</span>
            <span>{content.event.venue} · {event.room}</span>
          </div>
          {localDemoGmail ? (
            <aside className="reservation-entry-demo" aria-label="本機示範資料">
              <span>LOCAL DEMO</span>
              <p>
                本機示範 Gmail：<code>{localDemoGmail}</code>
              </p>
            </aside>
          ) : null}
        </div>
        <TicketSection />
      </main>
    </div>
  );
}
