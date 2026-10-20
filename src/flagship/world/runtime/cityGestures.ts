/** Horizontal intent changes editions; vertical touch/wheel always remains native scroll. */
export function observeCityGestures(
  host: HTMLElement,
  enabled: () => boolean,
  step: (direction: -1 | 1) => void,
) {
  let start: { x: number; y: number; id: number } | null = null;
  let wheelTotal = 0,
    lastWheel = 0,
    lockedUntil = 0;
  const down = (event: PointerEvent) => {
    if (!enabled() || (event.target as HTMLElement).closest("a,button")) return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const up = (event: PointerEvent) => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x,
      dy = event.clientY - start.y;
    start = null;
    if (enabled() && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4)
      step(dx < 0 ? 1 : -1);
  };
  const cancel = () => {
    start = null;
  };
  const wheel = (event: WheelEvent) => {
    if (!enabled() || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.4)
      return;
    event.preventDefault();
    const now = performance.now();
    if (now < lockedUntil) return;
    if (now - lastWheel > 180) wheelTotal = 0;
    lastWheel = now;
    wheelTotal += event.deltaX;
    if (Math.abs(wheelTotal) > 55) {
      step(wheelTotal > 0 ? 1 : -1);
      wheelTotal = 0;
      lockedUntil = now + 850;
    }
  };
  const key = (event: KeyboardEvent) => {
    if (
      !enabled() ||
      event.target !== host ||
      !["ArrowLeft", "ArrowRight"].includes(event.key)
    )
      return;
    event.preventDefault();
    step(event.key === "ArrowRight" ? 1 : -1);
  };
  host.addEventListener("pointerdown", down);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", cancel);
  host.addEventListener("wheel", wheel, { passive: false });
  host.addEventListener("keydown", key);
  return () => {
    host.removeEventListener("pointerdown", down);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", cancel);
    host.removeEventListener("wheel", wheel);
    host.removeEventListener("keydown", key);
  };
}
