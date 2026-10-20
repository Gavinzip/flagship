import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useViewportVideo } from "../../event/hooks/useViewportVideo";
import { useEditionPresented } from "../../routing/EditionPresentationContext";
import { thailandArtwork } from "../data/artwork";

/** A silent, native 15-second loop from the requested Taiwan recap segment. */
export function ThailandHeroFilm() {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const presented = useEditionPresented();
  const visible = useViewportVideo(host, true);
  const reduced = useReducedMotion();
  const shouldPlay = presented && visible && !reduced;

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!shouldPlay) {
      element.pause();
      return;
    }
    let cancelled = false;
    void element.play().catch((error: unknown) => {
      if (!cancelled && !(error instanceof DOMException && error.name === "AbortError")) {
        console.error("[FLAGSHIP] Thailand hero playback failed.", error);
      }
    });
    return () => {
      cancelled = true;
      element.pause();
    };
  }, [shouldPlay]);

  return <div ref={host} className="th-hero-media">
    <video ref={video} className="th-hero-film" src={thailandArtwork.heroFilm}
      poster={thailandArtwork.heroPoster} muted loop playsInline preload="metadata" aria-hidden="true" />
  </div>;
}
