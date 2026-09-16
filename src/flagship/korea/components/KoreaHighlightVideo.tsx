import { useEffect, useRef, useState } from "react";
import type { KoreaHighlightMedia } from "../data/media";

type KoreaHighlightVideoProps = {
  visual: KoreaHighlightMedia;
  alt: string;
};

export function KoreaHighlightVideo({
  visual,
  alt,
}: KoreaHighlightVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(query.matches);
    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

    if (!isHovered || reducedMotion) {
      element.pause();
      return;
    }

    void element.play().catch(() => undefined);
  }, [isHovered, reducedMotion]);

  const startPreview = (pointerType: string) => {
    if (pointerType !== "mouse" || reducedMotion) return;
    setCanPlay(false);
    setIsHovered(true);
  };

  const stopPreview = () => {
    video.current?.pause();
    setCanPlay(false);
    setIsHovered(false);
  };

  return (
    <div
      className={`kr-highlight-media${canPlay && isHovered ? " is-ready" : ""}`}
      onPointerEnter={(event) => startPreview(event.pointerType)}
      onPointerLeave={stopPreview}
    >
      {isHovered && !reducedMotion && (
        <video
          ref={video}
          className="kr-highlight-video"
          src={visual.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={() => setCanPlay(true)}
        />
      )}
      <img
        className="kr-highlight-poster"
        src={visual.poster}
        alt={alt}
        width="1280"
        height="720"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
