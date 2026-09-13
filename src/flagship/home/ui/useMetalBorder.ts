import { useCallback, useRef, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const controlSelector = ".stellar-action, .ip-metal-control";

/** Cursor angle / edge proximity from football's components/BorderGlow.jsx.
 * One delegated handler for the IP shell; pointer updates never rerender React.
 */
export function useMetalBorder() {
  const active = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const clear = useCallback(() => {
    active.current?.classList.remove("is-metal-active");
    active.current?.style.setProperty("--metal-edge-proximity", "0");
    active.current = null;
  }, []);
  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || reduced) return;
    const control = event.target instanceof Element ? event.target.closest<HTMLElement>(controlSelector) : null;
    if (!control || control.matches(":disabled, [aria-disabled='true']") || control.closest("[inert]")) { clear(); return; }
    // The footer keeps its open typography; only its circular arrow receives the rim.
    const surface = control.querySelector<HTMLElement>("[data-metal-surface]") ?? control;
    if (surface !== active.current) { clear(); active.current = surface; }
    const rect = surface.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);
    const dx = x - rect.width / 2, dy = y - rect.height / 2;
    const scaleX = dx === 0 ? Infinity : rect.width / 2 / Math.abs(dx);
    const scaleY = dy === 0 ? Infinity : rect.height / 2 / Math.abs(dy);
    const edgeProximity = clamp(1 / Math.min(scaleX, scaleY), 0, 1) * 100;
    const radians = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx);
    const angle = ((radians * 180) / Math.PI + 450) % 360;
    surface.style.setProperty("--metal-cursor-angle", `${angle.toFixed(3)}deg`);
    surface.style.setProperty("--metal-edge-proximity", edgeProximity.toFixed(3));
    surface.classList.add("is-metal-active");
  }, [clear, reduced]);
  const onPointerOut = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (!(next instanceof Element) || !next.closest(controlSelector)?.contains(active.current)) clear();
  }, [clear]);
  return { onPointerMove, onPointerOut, onPointerLeave: clear, onPointerCancel: clear };
}
