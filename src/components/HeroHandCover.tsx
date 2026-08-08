import { media } from "../config/media";
import { FloatingEventPass } from "./FloatingEventPass";
import { HeroIntro } from "./HeroIntro";

export function HeroHandCover() {
  return (
    <section className="hero hero--hand" id="top" data-cover="hand">
      <img
        className="hero-hand__scene"
        src={media.heroFloatingStage}
        width="1512"
        height="844"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />

      <img
        className="hero-hand__atmosphere"
        src={media.heroTaipeiOverlay}
        width="1672"
        height="941"
        alt=""
        aria-hidden="true"
      />

      <div className="hero-hand__layout">
        <HeroIntro className="hero-hand__intro" />
        <FloatingEventPass />
      </div>
    </section>
  );
}
