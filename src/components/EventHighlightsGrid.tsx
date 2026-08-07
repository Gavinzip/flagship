import type { CSSProperties } from "react";
import { WarningTriangle } from "iconoir-react";
import { eventHighlightVisuals } from "../data/eventHighlights";
import { useLocale } from "../i18n/LocaleProvider";
import { GlareSweep } from "./GlareSweep";
import { SpotlightCard } from "./SpotlightCard";

type RevealStyle = CSSProperties & {
  "--highlight-image-position": string;
  "--reveal-index": number;
};

export function EventHighlightsGrid() {
  const { content } = useLocale();
  const highlights = content.highlights.items.map((item) => ({
    ...item,
    ...eventHighlightVisuals.find(({ number }) => number === item.number)!,
  }));

  return (
    <>
      <nav className="event-highlights-index" aria-label={content.highlights.indexLabel}>
        {highlights.map((highlight) => (
          <a href={`#highlight-${highlight.number}`} key={highlight.number}>
            <span>{highlight.number}</span>
            <strong>{highlight.title}</strong>
          </a>
        ))}
      </nav>

      <ol className="event-highlights" aria-label={content.highlights.listLabel}>
        {highlights.map((highlight, index) => {
          const revealStyle: RevealStyle = {
            "--highlight-image-position": highlight.imagePosition,
            "--reveal-index": index,
          };

          return (
            <li
              className={`event-highlights__item event-highlights__item--${highlight.layout}`}
              data-reveal
              id={`highlight-${highlight.number}`}
              key={highlight.number}
              style={revealStyle}
            >
              <SpotlightCard
                className="event-highlight-card"
                spotlightColor="rgba(126, 195, 255, 0.2)"
                spotlightSize={420}
              >
                <div className="event-highlight-card__media">
                  <img
                    src={highlight.image}
                    alt={highlight.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span
                    className="event-highlight-card__shade"
                    aria-hidden="true"
                  />
                  <GlareSweep />
                </div>

                <div className="event-highlight-card__content">
                  <header className="event-highlight-card__identity">
                    <span
                      className="event-highlight-card__number"
                      aria-hidden="true"
                    >
                      {highlight.number}
                    </span>
                    <span className="event-highlight-card__label">
                      EVENT HIGHLIGHT
                    </span>
                  </header>

                  <div className="event-highlight-card__copy">
                    <span>{highlight.english}</span>
                    <h3
                      className={
                        "singleLineTitle" in highlight
                          ? "event-highlight-card__title--single-line"
                          : undefined
                      }
                    >
                      {highlight.title}
                    </h3>
                    <p>{highlight.description}</p>
                  </div>

                  <ul
                    className="event-highlight-card__points"
                    aria-label={content.highlights.pointsLabel(highlight.title)}
                  >
                    {highlight.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  {"notice" in highlight ? (
                    <p className="event-highlight-card__notice">
                      <WarningTriangle aria-hidden="true" />
                      <span>{highlight.notice}</span>
                    </p>
                  ) : null}
                </div>
              </SpotlightCard>
            </li>
          );
        })}
      </ol>
    </>
  );
}
