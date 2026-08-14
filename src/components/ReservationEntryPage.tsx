import { useEffect } from "react";
import { responsiveMedia } from "../config/media";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { LanguageSelector } from "./LanguageSelector";
import { TicketSection } from "./TicketSection";
import { RESERVATION_DEMO_GMAIL } from "../reservations/reservationDemo";
import { RESERVATION_ENTRY_PATH } from "../reservations/reservationRoute";
import { useReservationAvailability } from "../reservations/ReservationAvailabilityProvider";

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
  const { mode } = useReservationAvailability();
  const demoMode = mode === "demo";
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
          <div className="reservation-entry-header__tools">
            <span>INVITED EARLY-BIRD GUESTS</span>
            <div className="reservation-entry-header__controls">
              <a
                className={`reservation-demo-toggle${demoMode ? " is-active" : ""}`}
                href={
                  demoMode
                    ? RESERVATION_ENTRY_PATH
                    : `${RESERVATION_ENTRY_PATH}?demo=1`
                }
                aria-current={demoMode ? "page" : undefined}
                aria-label={
                  demoMode
                    ? locale === "zh-TW"
                      ? "離開示範模式"
                      : "Exit demo mode"
                    : locale === "zh-TW"
                      ? "開啟示範模式"
                      : "Open demo mode"
                }
              >
                <i aria-hidden="true" />
                DEMO
              </a>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="reservation-entry-main">
        <div className="reservation-entry-intro site-shell entry-item">
          <div className="reservation-entry-intro__primary">
            <p className="reservation-entry-intro__eyebrow">
              FLAGSHIP 2026 · EARLY-BIRD ACCESS
            </p>
            <h1>{content.tickets.pageHeading}</h1>
            <p className="reservation-entry-intro__description">
              {content.tickets.description}
            </p>
          </div>
          <div className="reservation-entry-intro__details">
            <div className="reservation-entry-intro__meta">
              <span>{event.date} · {event.weekday}</span>
              <span>{event.startTime}—{event.endTime}</span>
              <span>{content.event.venue} · {event.room}</span>
            </div>
            {demoMode ? (
              <aside
                className="reservation-entry-demo"
                aria-label={locale === "zh-TW" ? "示範模式" : "Demo mode"}
              >
                <span>DEMO MODE</span>
                <p>
                  {locale === "zh-TW"
                    ? "這是獨立示範資料，不會送出或占用正式名額。測試 Gmail："
                    : "This isolated demo sends no data and uses no live capacity. Test Gmail: "}
                  <code>{RESERVATION_DEMO_GMAIL}</code>
                </p>
              </aside>
            ) : null}
          </div>
        </div>
        <TicketSection />
      </main>
    </div>
  );
}
