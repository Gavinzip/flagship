import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { EventArtwork } from "../types";
import { GoldGlobeGraphic } from "../../world/art/GoldGlobeGraphic";

/** The camera travels through one country-specific environment as the page scrolls. */
export function EventEnvironment({ artwork }: { artwork: EventArtwork }) {
  if (artwork.kind === "halftone") return <div className="ev-environment ev-environment--halftone" aria-hidden="true">
    <div className="ev-gold-world"><GoldGlobeGraphic /></div>
    <div className="ev-gold-world-shade" />
  </div>;
  return <PanoramaEnvironment artwork={artwork} />;
}

function PanoramaEnvironment({ artwork }: { artwork: Extract<EventArtwork, { kind: "panorama" }> }) {
  const reduced = useReducedMotion();
  const world = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const element = world.current;
      if (!element) return;
      const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const travel = Math.max(0, element.getBoundingClientRect().height - innerHeight);
      const progress = reduced ? 0.5 : Math.max(0, Math.min(1, scrollY / distance));
      element.style.setProperty("--ev-scene-y", `${-travel * progress}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    if (world.current) observer.observe(world.current);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reduced]);
  return <div className="ev-environment" aria-hidden="true">
    <div ref={world} className="ev-environment-world" data-continuous={artwork.continuous}>
      {artwork.panels.map((src, i) => <img key={src} className="ev-environment-scene ev-environment-panel" src={src} alt="" width={artwork.width} height={artwork.height} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />)}
    </div>
    <div className="ev-environment-light" />
  </div>;
}
