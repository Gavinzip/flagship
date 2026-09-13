import { MetalBorder } from "./ui/MetalBorder";
import { useEffect, useRef, useState } from "react";
import { Xmark } from "iconoir-react";
import { motion, useReducedMotion } from "motion/react";
import { homeMotion } from "./motion/homeMotion";
import { staticAssetUrl } from "../../lib/staticAssets";
const recapFilm = staticAssetUrl("flagship/brand-recap-video.mp4");
import { homeMedia } from "./homeMedia";
import type { HomeCopy } from "./homeCopy";

/** Native dialog owns focus trapping, Escape and returning focus to its opener. */
export function RecapDialog({ open, close, copy: c }: { open: boolean; close: () => void; copy: HomeCopy }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open) { setFailed(false); setShowVideo(true); if (!element.open) element.showModal(); }
    else video.current?.pause();
  }, [open]);
  return <motion.dialog ref={dialog} className="brand-film-dialog" data-state={open ? "open" : "closing"}
    initial={false}
    animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.985 }}
    transition={{ duration: reduced ? 0 : open ? 0.32 : 0.18, ease: homeMotion.ease }}
    onAnimationComplete={() => { if (!open) { dialog.current?.close(); setShowVideo(false); } }}
    aria-labelledby="brand-film-title" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { if (open) close(); }} onClick={event => {
    if (event.target === dialog.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }
  }}>
    <div className="brand-film-top"><span id="brand-film-title">{c.recapCaption}</span><button className="ip-metal-control" aria-label={c.closeFilm} onClick={close}><MetalBorder /><Xmark /></button></div>
    {showVideo && <video ref={video} src={recapFilm} controls playsInline autoPlay preload="metadata" poster={homeMedia.community} onError={() => setFailed(true)} aria-label={c.viewRecap} />}
    {failed && <div className="brand-film-error" role="alert"><p>{c.videoError}</p><button className="ip-metal-control" onClick={() => { setFailed(false); video.current?.load(); }}><MetalBorder />{c.videoRetry}</button></div>}
  </motion.dialog>;
}
