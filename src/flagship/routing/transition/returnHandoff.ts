import type { EditionId } from "../../data/editions";
import { nextPaint } from "./transferRuntime";
import { returningGlobeSize } from "../../world/runtime/cameraFraming";

const range = (value: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** The regional emblem travels back to its geographic point while the real camera retreats. */
export async function returnHandoff(
  edition: EditionId,
  mark: HTMLElement,
  signal: AbortSignal,
  retreat: (advance: (p: number) => void) => Promise<void>,
) {
  const world = document.querySelector<HTMLElement>(".brand-world-retainer");
  const route = document.querySelector<HTMLElement>(".edition-route-plane");
  const stage = world?.querySelector<HTMLElement>(".world-stage");
  const selector = edition === "taiwan" ? ".hero__logo" : ".fs-hero-artwork .fs-original-emblem";
  const target = route?.querySelector<HTMLElement>(selector);
  if (!world || !route || !stage || !target)
    throw new Error("The return journey is missing its regional or geographic target.");
  const from = target.getBoundingClientRect();
  if (!from.width || !from.height) throw new Error("The regional return emblem has no dimensions.");
  const inView = from.bottom > 0 && from.top < innerHeight;
  const previous = new Map([world, route, target, mark].map(node => [node, node.getAttribute("style")]));
  const restore = () => previous.forEach((style, node) => {
    if (style === null) node.removeAttribute("style");
    else node.setAttribute("style", style);
  });
  mark.style.cssText = `left:0;top:0;width:${from.width}px;height:${from.height}px;transform-origin:0 0;opacity:0;`;
  try {
    await retreat(p => {
      target.style.visibility = "hidden";
      // This callback shares the Three.js camera clock: no second animation can drift.
      const box = stage.getBoundingClientRect();
      const scale = mix(1, 90 / from.width, p);
      const x = mix(from.left + from.width / 2, box.left + box.width / 2, p);
      const y = mix(from.top + from.height / 2, box.top + box.height / 2, p);
      mark.style.transform = `translate(${x - from.width * scale / 2}px,${y - from.height * scale / 2}px) scale(${scale})`;
      mark.style.opacity = String(inView ? 1 - range(p, .42, .82) : 0);
      route.style.opacity = String(1 - range(p, 0, .48));
      route.style.translate = `0 ${-24 * p}px`;
      world.style.opacity = String(range(p, 0, .42));
    });
    return restore;
  } catch (error) {
    restore();
    throw error;
  }
}

/** Move the same canvas into the home layout with one resize, not a buffer allocation per frame. */
export async function settleReturnedWorld(commit: () => void, signal: AbortSignal) {
  const stage = document.querySelector<HTMLElement>(".brand-world-retainer .world-stage");
  if (!stage) throw new Error("The returning globe was unmounted.");
  const from = stage.getBoundingClientRect();
  commit(); // Synchronous React commit lets us measure and invert before the browser paints.
  const to = stage.getBoundingClientRect();
  const original = stage.getAttribute("style");
  stage.style.transition = "none";
  stage.style.transformOrigin = "0 0";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timing = { duration: reduced ? 0 : 520, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" as const };
  const scale = returningGlobeSize(from.width, from.height) / returningGlobeSize(to.width, to.height);
  const x = from.left + from.width / 2 - to.left - to.width * scale / 2;
  const y = from.top + from.height / 2 - to.top - to.height * scale / 2;
  const animations = [stage.animate([
    { transform: `translate(${x}px,${y}px) scale(${scale})` },
    { transform: "translate(0,0) scale(1)" },
  ], timing)];
  const world = stage.closest(".brand-world-retainer");
  world?.querySelectorAll<HTMLElement>(".world-copy, .world-city-nav, .world-scroll, .world-city[data-active='true']").forEach(node => {
    animations.push(node.animate([{ opacity: 0, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], timing));
  });
  const abort = () => animations.forEach(animation => animation.cancel());
  signal.addEventListener("abort", abort, { once: true });
  try {
    await Promise.all(animations.map(animation => animation.finished));
  } finally {
    signal.removeEventListener("abort", abort);
    animations.forEach(animation => animation.cancel());
    if (original === null) stage.removeAttribute("style");
    else stage.setAttribute("style", original);
  }
  await nextPaint();
}
