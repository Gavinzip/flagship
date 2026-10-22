import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Xmark } from "iconoir-react";
import { motion, useReducedMotion } from "motion/react";
import type { floorPlanCopy } from "../data/floorPlanCopy";
import plan from "../../assets/thailand/thailand-proposed-floorplan.webp";

type Copy = typeof floorPlanCopy[keyof typeof floorPlanCopy];

/** Native dialog provides focus trapping and Escape. The image remains a scrollable document. */
export function ThailandFloorPlanDialog({ open, close, copy, returnFocus }: { open: boolean; close: () => void; copy: Copy; returnFocus: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => { if (open && !dialog.current?.open) { setZoom(1); dialog.current?.showModal(); } }, [open]);
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || zoom === 1) return;
    drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
    event.currentTarget.scrollTop = drag.current.top + drag.current.y - event.clientY;
  }
  function fit() { setZoom(1); viewport.current?.scrollTo({ left: 0, top: 0 }); }
  return <motion.dialog ref={dialog} className="th-floor-dialog" aria-labelledby="th-floor-dialog-title" aria-describedby="th-floor-dialog-note"
    initial={false} animate={{ opacity: open ? 1 : 0, y: open || reduced ? 0 : 12, scale: open || reduced ? 1 : .985 }}
    transition={{ duration: reduced ? 0 : open ? .3 : .18, ease: [ .22, 1, .36, 1 ] }}
    onAnimationComplete={() => { if (!open && dialog.current?.open) { dialog.current.close(); returnFocus(); } }}
    onCancel={event => { event.preventDefault(); close(); }} onClose={() => { if (open) close(); }}
    onClick={event => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); }}>
    <div className="th-floor-dialog-heading"><div><span className="th-eyebrow">FLAGSHIP THAILAND / B2</span><h3 id="th-floor-dialog-title">{copy.title}</h3></div><button className="th-floor-icon" onClick={close} aria-label={copy.close}><Xmark /></button></div>
    <div className="th-floor-toolbar"><span className="th-floor-status">{copy.status}</span><div><button onClick={() => setZoom(value => Math.max(1, value - (value > 2 ? 1 : .5)))} disabled={zoom === 1} aria-label={copy.zoomOut}>−</button><output aria-live="polite">{Math.round(zoom * 100)}%</output><button onClick={() => setZoom(value => Math.min(6, value + (value < 2 ? .5 : 1)))} disabled={zoom === 6} aria-label={copy.zoomIn}>+</button><button className="th-floor-fit" onClick={fit}>{copy.fit}</button></div></div>
    <div ref={viewport} className="th-floor-viewport" data-zoomed={zoom > 1} tabIndex={0} aria-label={copy.pan}
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
      <div className="th-floor-canvas" style={{ width: `${zoom * 100}%` }}><img src={plan} alt={copy.alt} width="2598" height="1298" loading="lazy" draggable={false} /></div>
    </div>
    <div className="th-floor-dialog-caption"><span>{copy.pan}</span><p id="th-floor-dialog-note">{copy.note}</p></div>
  </motion.dialog>;
}
