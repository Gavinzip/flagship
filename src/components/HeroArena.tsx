import { media } from "../config/media";
import { EventPass } from "./EventPass";
import { HeroIntro } from "./HeroIntro";
import { HudScan } from "./HudScan";

export function HeroArena() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__backdrop"
        src={media.heroArena}
        width="1536"
        height="1024"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <img
        className="hero__arena-frame"
        src={media.arenaFrame}
        width="1536"
        height="1024"
        alt=""
        aria-hidden="true"
      />
      <HudScan />

      <div className="site-shell hero__inner">
        <HeroIntro />
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
