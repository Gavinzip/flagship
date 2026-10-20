import { useEffect, useRef, useState } from "react";
import type { EventHighlightMedia } from "../data/highlightMedia";
import { useViewportVideo } from "../hooks/useViewportVideo";

type EventHighlightVideoProps = {
  visual: EventHighlightMedia;
  alt: string;
  playback?: "hover" | "viewport";
  active?: boolean;
};

export function EventHighlightVideo({
  visual,
  alt,
  playback = "hover",
  active = true,
}: EventHighlightVideoProps) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const inViewport = useViewportVideo(container, playback === "viewport" && active);
  const previewActive = active && !reducedMotion && (playback === "viewport" ? inViewport : isHovered);

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

    if (!previewActive) {
      element.pause();
      return;
    }

    let cancelled = false;
    void element.play().catch((error: unknown) => {
      if (!cancelled && !(error instanceof DOMException && error.name === "AbortError")) {
        console.error("[FLAGSHIP] Highlight playback failed.", error);
      }
    });
    return () => {
      cancelled = true;
      element.pause();
    };
  }, [previewActive]);

  const startPreview = (pointerType: string) => {
    if (playback !== "hover" || pointerType !== "mouse" || reducedMotion) return;
    setCanPlay(false);
    setIsHovered(true);
  };

  const stopPreview = () => {
    if (playback !== "hover") return;
    video.current?.pause();
    setCanPlay(false);
    setIsHovered(false);
  };

  return (
    <div
      ref={container}
      className={`ev-highlight-media${canPlay && previewActive ? " is-ready" : ""}`}
      onPointerEnter={(event) => startPreview(event.pointerType)}
      onPointerLeave={stopPreview}
    >
      {(playback === "viewport" || isHovered) && !reducedMotion && (
        <video
          ref={video}
          className="ev-highlight-video"
          src={visual.src}
          muted
          loop
          playsInline
          preload={playback === "viewport" ? "none" : "metadata"}
          aria-hidden="true"
          onPlaying={() => setCanPlay(true)}
          onPause={() => setCanPlay(false)}
        />
      )}
      <img
        className="ev-highlight-poster"
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
