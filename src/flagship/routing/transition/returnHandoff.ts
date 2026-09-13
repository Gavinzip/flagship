import type { EditionId } from "../../data/editions";
import { entryMotion } from "../../world/config/entryMotion";
import type { ReturnFrame } from "../../world/runtime/returnRig";
import { prepareReturnHomeFrame } from "./returnHomeFrame";

const range = (value: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** Reverse the regional handoff and the original camera journey on one clock. */
export async function returnHandoff(
  edition: EditionId,
  mark: HTMLElement,
  retreat: (advance: (frame: ReturnFrame) => void) => Promise<void>,
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
  const content = edition === "korea" ? target.closest(".fs-hero-artwork-inner") as HTMLElement | null : null;
  const followers = edition === "taiwan" ? Array.from(route.querySelectorAll<HTMLElement>(
    ".hero__intro > :not(.hero__logo), .hero-hand__card, .hero__pass",
  )) : [];
  const nodes = [world, route, target, mark, ...followers, ...(content ? [content] : [])];
  const previous = new Map(nodes.map(node => [node, node.getAttribute("style")]));
  const home = prepareReturnHomeFrame(world, stage);
  const restore = () => {
    home.restore();
    previous.forEach((style, node) => {
      if (style === null) node.removeAttribute("style");
      else node.setAttribute("style", style);
    });
  };
  const smallWidth = 120;
  const smallHeight = smallWidth / (edition === "taiwan" ? 900 / 493 : 1170 / 755);
  const anchorX = innerWidth / 2, anchorY = innerHeight / 2;
  mark.style.cssText = `left:0;top:0;width:${from.width}px;height:${from.height}px;transform-origin:0 0;opacity:0;`;
  try {
    await retreat(frame => {
      home.update(frame);
      const p = frame.departure;
      target.style.visibility = "hidden";
      world.style.opacity = String(1 - range(p, entryMotion.revealStart, entryMotion.revealEnd));
      world.style.filter = `blur(${range(p, .42, .9) * 8}px)`;
      route.style.opacity = String(range(p, 0, entryMotion.revealStart));
      mark.style.opacity = String(inView ? range(p, 0, .14) : 0);
      if (edition === "taiwan") {
        const scale = mix(smallWidth / from.width, 1, range(p, 0, .68));
        const x = mix(anchorX, from.left + from.width / 2, range(p, .1, 1));
        const y = mix(anchorY, from.top + from.height / 2, p);
        mark.style.transform = `translate(${x - from.width * scale / 2}px,${y - from.height * scale / 2}px) scale(${scale})`;
        followers.forEach((node, index) => {
          const alpha = range(p, entryMotion.revealStart + index * .04, 1);
          node.style.setProperty("opacity", String(alpha), "important");
          node.style.setProperty("translate", `0 ${20 * (1 - alpha)}px`, "important");
        });
      } else {
        const x = mix(anchorX - smallWidth / 2, from.left, p);
        const y = mix(anchorY - smallHeight / 2, from.top, p);
        mark.style.transform = `translate(${x}px,${y}px) scale(${mix(smallWidth / from.width, 1, p)},${mix(smallHeight / from.height, 1, p)})`;
        if (content) {
          content.style.setProperty("transform", `scale(${mix(entryMotion.heroStartScale, 1, p)})`, "important");
          content.style.transformOrigin = "center center";
        }
      }
    });
    return restore;
  } catch (error) {
    restore();
    throw error;
  }
}
