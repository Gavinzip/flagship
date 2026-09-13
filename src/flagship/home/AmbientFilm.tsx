import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "iconoir-react";
import { staticAssetUrl } from "../../lib/staticAssets";
const heroFilm = staticAssetUrl("flagship/brand-hero-film.mp4");
import { homeMedia } from "./homeMedia";
import type { HomeCopy } from "./homeCopy";

/** The real poster renders immediately. Playback has explicit user, visibility and motion state. */
export function AmbientFilm({ copy: c }: { copy: HomeCopy }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [started, setStarted] = useState(!paused);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { if (media.matches) setPaused(true); };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element || !started) return;
    let visible = true;
    const sync = () => {
      if (paused || !visible || document.hidden) element.pause();
      else element.play().catch(() => setPaused(true));
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); element.pause(); };
  }, [paused, started]);
  return <>
    <video ref={video} className="brand-hero-video" src={started ? heroFilm : undefined} poster={homeMedia.crowd} muted loop playsInline preload={started ? "auto" : "none"} aria-hidden="true" onError={() => setFailed(true)} />
    <button className="brand-ambient-control" aria-label={failed ? c.videoRetry : paused ? c.play : c.pause} aria-pressed={paused} onClick={() => {
      if (failed) { setFailed(false); video.current?.load(); setStarted(true); setPaused(false); return; }
      setStarted(true); setPaused(!paused);
    }}>{paused ? <Play /> : <Pause />}<span>{failed ? c.videoError : "TAIWAN / 2026"}</span></button>
  </>;
}
