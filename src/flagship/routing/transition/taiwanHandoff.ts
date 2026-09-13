import { entryMotion } from "../../world/config/entryMotion";
import { loadTransferImage, nextPaint } from "./transferRuntime";

const range = (value: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

/** Compose Taiwan on Korea's departure clock, with no extra settlement phase. */
export async function taiwanHandoff(
  mark: HTMLElement | null,
  signal: AbortSignal,
  depart: (advance: (progress: number) => void) => Promise<void>,
) {
  const route = document.querySelector<HTMLElement>(".edition-route-plane");
  const world = document.querySelector<HTMLElement>(".brand-world-retainer");
  const hero = route?.querySelector<HTMLElement>('[data-active-edition="taiwan"] .hero');
  const target = hero?.querySelector<HTMLImageElement>(".hero__logo");
  const image = mark?.querySelector("img");
  if (!route || !world || !hero || !target || !mark || !image)
    throw new Error("The Taiwan emblem handoff is missing.");
  await Promise.all(
    Array.from(hero.querySelectorAll<HTMLImageElement>("img"))
      .filter(image => image.currentSrc || image.src)
      .map(image => loadTransferImage(image.currentSrc || image.src, signal)),
  );
  await document.fonts.ready;
  await nextPaint();
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  const from = mark.getBoundingClientRect(), to = target.getBoundingClientRect();
  if (!to.width || !to.height) throw new Error("The Taiwan emblem has no visible dimensions.");
  const followers = Array.from(hero.querySelectorAll<HTMLElement>(
    ".hero__intro > :not(.hero__logo), .hero-hand__card, .hero__pass",
  ));
  const previous = new Map([world, route, target, ...followers].map(node => [node, node.getAttribute("style")]));
  const restore = (node: HTMLElement) => {
    const style = previous.get(node);
    if (style === null) node.removeAttribute("style");
    else if (style !== undefined) node.setAttribute("style", style);
  };
  target.style.visibility = "hidden";
  image.style.filter = getComputedStyle(target).filter;
  mark.style.cssText = `width:${to.width}px;height:${to.height}px;left:0;top:0;transform-origin:0 0;`;
  route.style.visibility = "visible";
  try {
    await depart(progress => {
      world.style.opacity = String(1 - range(progress, entryMotion.revealStart, entryMotion.revealEnd));
      world.style.filter = `blur(${range(progress, 0.42, 0.9) * 8}px)`;
      mark.style.opacity = String(range(progress, 0, 0.14));
      // Reach full size before the last part of the leftward move, without
      // stopping the geographic journey or starting a second animation clock.
      const scale = mix(from.width / to.width, 1, range(progress, 0, 0.68));
      const centerX = mix(from.left + from.width / 2, to.left + to.width / 2, range(progress, 0.1, 1));
      const centerY = mix(from.top + from.height / 2, to.top + to.height / 2, progress);
      mark.style.transform = `translate(${centerX - to.width * scale / 2}px,${centerY - to.height * scale / 2}px) scale(${scale})`;
      followers.forEach((node, index) => {
        const reveal = range(progress, entryMotion.revealStart + index * 0.04, 1);
        node.style.setProperty("opacity", String(reveal), "important");
        node.style.setProperty("translate", `0 ${20 * (1 - reveal)}px`, "important");
      });
    });
  } finally {
    restore(target);
    followers.forEach(restore);
    // Preserve the final overlay position until React removes it on the next paint.
    mark.style.transform = `translate(${to.left}px,${to.top}px) scale(1)`;
    if (signal.aborted) {
      restore(route);
      restore(world);
    }
  }
}
