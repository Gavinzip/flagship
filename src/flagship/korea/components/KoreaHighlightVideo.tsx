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
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inViewport, setInViewport] = useState(false);
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
    const target = frame.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        setInViewport(entry.intersectionRatio >= 0.42);
        if (!entry.isIntersecting) setCanPlay(false);
      },
      { rootMargin: "220px 0px", threshold: [0, 0.42] },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

    if (!nearViewport || !inViewport || reducedMotion) {
      element.pause();
      return;
    }

    void element.play().catch(() => undefined);
  }, [inViewport, nearViewport, reducedMotion]);

  return (
    <div
      ref={frame}
      className={`kr-highlight-media${canPlay && !reducedMotion ? " is-ready" : ""}`}
    >
      {nearViewport && !reducedMotion && (
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
      {nearViewport && (
        <img
          className="kr-highlight-poster"
          src={visual.poster}
          alt={alt}
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
