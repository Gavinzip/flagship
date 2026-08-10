import {
  type CSSProperties,
  type PointerEvent,
  useRef,
} from "react";
import { responsiveMedia } from "../config/media";
import { useLocale } from "../i18n/LocaleProvider";
import { EventPassContent } from "./EventPass";
import { SpotlightCard } from "./SpotlightCard";

type FloatingCardStyle = CSSProperties & {
  "--card-rotate-x": string;
  "--card-rotate-y": string;
};

const restingTransform: FloatingCardStyle = {
  "--card-rotate-x": "0deg",
  "--card-rotate-y": "0deg",
};

export function FloatingEventPass() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { content } = useLocale();

  const updateTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--card-rotate-x", `${(-y * 3.2).toFixed(2)}deg`);
    card.style.setProperty("--card-rotate-y", `${(x * 4).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  };

  return (
    <div
      className="hero-hand__card"
      ref={cardRef}
      style={restingTransform}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      onMouseLeave={resetTilt}
      role="group"
      aria-label={content.hero.coverVisualAlt}
    >
      <img
        className="hero-hand__card-echo hero-hand__card-echo--rear"
        {...responsiveMedia.heroFloatingCard}
        width="1576"
        height="1020"
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-hand__card-echo hero-hand__card-echo--near"
        {...responsiveMedia.heroFloatingCard}
        width="1576"
        height="1020"
        alt=""
        aria-hidden="true"
      />
      <SpotlightCard
        className="hero-hand__card-face"
        spotlightColor="rgba(126, 186, 255, 0.16)"
        spotlightSize={390}
      >
        <img
          className="hero-hand__card-image"
          {...responsiveMedia.heroFloatingCard}
          width="1576"
          height="1020"
          alt=""
          aria-hidden="true"
        />
        <div className="event-pass event-pass--floating">
          <EventPassContent showTransit />
        </div>
      </SpotlightCard>
    </div>
  );
}
