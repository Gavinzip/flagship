import type { EditionId } from "../../data/editions";
import { loadTransferImage, nextPaint } from "./transferRuntime";
import { entryMotion } from "../../world/config/entryMotion";
import { taiwanHandoff } from "./taiwanHandoff";

const range = (value: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

/** Korea keeps the approved September 12 emblem/camera handoff. */
export async function geographicHandoff(
  edition: EditionId,
  mark: HTMLElement | null,
  signal: AbortSignal,
  depart: (advance: (progress: number) => void) => Promise<void>,
) {
  if (edition === "taiwan") return taiwanHandoff(mark, signal, depart);
  if (!mark) throw new Error("The country emblem is missing.");
  const route = document.querySelector<HTMLElement>(".edition-route-plane");
  const world = document.querySelector<HTMLElement>(".brand-world-retainer");
  const target = document.querySelector<HTMLElement>(
    '[data-active-edition="korea"] .fs-hero-artwork .fs-original-emblem',
  );
  if (!route || !world || !target)
    throw new Error("The geographic handoff target is missing.");
  const hero = target.closest("section");
  if (!hero) throw new Error("The regional hero is missing.");
  await Promise.all(
    Array.from(hero.querySelectorAll<HTMLImageElement>("img"))
      .filter((image) => image.currentSrc || image.src)
      .map((image) => loadTransferImage(image.currentSrc || image.src, signal)),
  );
  await document.fonts.ready;
  await nextPaint();
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  const from = mark.getBoundingClientRect(), to = target.getBoundingClientRect();
  if (!to.width || !to.height)
    throw new Error("The regional emblem has no visible dimensions.");
  const oldVisibility = target.style.visibility;
  target.style.visibility = "hidden";
  mark.style.cssText = `width:${to.width}px;height:${to.height}px;left:0;top:0;transform-origin:0 0;`;
  route.style.visibility = "visible";
  const content = hero.querySelector<HTMLElement>(".fs-hero-artwork-inner");
  const oldContentStyle = content?.getAttribute("style");
  const oldWorldStyle = world.getAttribute("style");
  const mix = (a: number, b: number, p: number) => a + (b - a) * p;
  const advance = (progress: number) => {
    const resolve = range(progress, entryMotion.revealStart, entryMotion.revealEnd);
    world.style.opacity = String(1 - resolve);
    world.style.filter = `blur(${range(progress, 0.42, 0.9) * 8}px)`;
    mark.style.transform = `translate(${mix(from.left, to.left, progress)}px,${mix(from.top, to.top, progress)}px) scale(${mix(from.width / to.width, 1, progress)},${mix(from.height / to.height, 1, progress)})`;
    mark.style.opacity = String(range(progress, 0, 0.14));
    if (content) {
      content.style.setProperty("transform", `scale(${mix(entryMotion.heroStartScale, 1, progress)})`, "important");
      content.style.transformOrigin = "center center";
    }
  };
  try {
    await depart(advance);
  } finally {
    target.style.visibility = oldVisibility;
    if (content) {
      if (oldContentStyle === null) content.removeAttribute("style");
      else if (oldContentStyle !== undefined) content.setAttribute("style", oldContentStyle);
    }
    if (signal.aborted) {
      route.style.visibility = "";
      if (oldWorldStyle === null) world.removeAttribute("style");
      else world.setAttribute("style", oldWorldStyle);
    }
  }
}
