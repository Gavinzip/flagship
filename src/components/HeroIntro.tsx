import type { CSSProperties } from "react";
import { media } from "../config/media";
import { useLocale } from "../i18n/LocaleProvider";

type HeroIntroProps = {
  className?: string;
};

export function HeroIntro({ className = "" }: HeroIntroProps) {
  const { content } = useLocale();

  return (
    <div
      className={`hero__intro entry-item${className ? ` ${className}` : ""}`}
      style={{ "--entry-index": 1 } as CSSProperties}
    >
      <img
        className="hero__logo"
        src={media.flagshipLogo}
        width="900"
        height="493"
        alt="Flagship Card Show Taiwan"
      />
      <p className="hero__eyebrow">{content.hero.eyebrow}</p>
      <h1>
        <span className="hero__title-kicker">
          <span>{content.hero.titleKicker}</span>
          <small>TAIWAN · 2026</small>
        </span>
        <span className="hero__title-main">{content.hero.title}</span>
      </h1>

    </div>
  );
}
