import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { artwork } from "../../data/artwork";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Three full 16:9 plates move as one world from sky to ground. */
export function KoreaEnvironment() {
  const reduced = useReducedMotion();
  const world = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const element = world.current;
      if (!element) return;
      const scrollDistance = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const travel = Math.max(
        0,
        element.getBoundingClientRect().height - window.innerHeight,
      );
      const pageProgress = clamp(window.scrollY / scrollDistance);
      const cameraProgress = reduced ? 0.5 : pageProgress;
      element.style.setProperty(
        "--kr-scene-y",
        `${-travel * cameraProgress}px`,
      );
    };

    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    if (world.current) observer.observe(world.current);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  return (
    <div className="kr-environment" aria-hidden="true">
      <div ref={world} className="kr-environment-world">
        <img
          className="kr-environment-scene kr-environment-panel"
          src={artwork.scrollSky2k}
          alt=""
          width="2048"
          height="1152"
          fetchPriority="high"
          decoding="async"
        />
        <img
          className="kr-environment-scene kr-environment-panel"
          src={artwork.scrollCity2k}
          alt=""
          width="2048"
          height="1152"
          loading="eager"
          decoding="async"
        />
        <img
          className="kr-environment-scene kr-environment-panel"
          src={artwork.scrollGround2k}
          alt=""
          width="2048"
          height="1152"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="kr-environment-light" />
    </div>
  );
}
