import type { CSSProperties } from "react";
import { EventPass } from "./EventPass";
import { HudScan } from "./HudScan";

export function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__backdrop"
        src="/assets/hero-arena.webp"
        width="1536"
        height="1024"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <img
        className="hero__arena-frame"
        src="/assets/arena-frame.webp"
        width="1536"
        height="1024"
        alt=""
        aria-hidden="true"
      />
      <HudScan />

      <div className="site-shell hero__inner">
        <div
          className="hero__intro entry-item"
          style={{ "--entry-index": 1 } as CSSProperties}
        >
          <img
            className="hero__logo"
            src="/assets/flagship-logo.webp"
            width="900"
            height="493"
            alt="Flagship Card Show Taiwan"
          />
          <p className="hero__eyebrow">MORE THAN TABLES · CONNECTING PLAY CULTURE</p>
          <h1>
            <span className="hero__title-kicker">
              <span>台灣年度</span>
              <small>TAIWAN · 2026</small>
            </span>
            <span className="hero__title-main">旗艦卡牌盛會</span>
          </h1>
        </div>

        <EventPass />
      </div>

      <span className="hero__edge-label hero__edge-label--left" aria-hidden="true">
        MORE THAN TABLES
      </span>
      <span className="hero__edge-label hero__edge-label--right" aria-hidden="true">
        CONNECTING PLAY CULTURE
      </span>
    </section>
  );
}
