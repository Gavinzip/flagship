import { entryMotion } from "../../world/config/entryMotion";
import type { ReturnFrame } from "../../world/runtime/returnRig";

const reveal = (progress: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

/** Scrub the entry's viewport expansion backwards on the camera's clock. */
export function prepareReturnHomeFrame(world: HTMLElement, stage: HTMLElement) {
  const home = stage.getBoundingClientRect();
  const original = stage.getAttribute("style");
  stage.style.position = "fixed";
  stage.style.inset = "auto";
  stage.style.gridArea = "auto";
  stage.style.transition = "none";
  const viewport = stage.animate([
    { left: `${home.left}px`, top: `${home.top}px`, width: `${home.width}px`, height: `${home.height}px` },
    { left: "0px", top: "0px", width: `${innerWidth}px`, height: `${innerHeight}px` },
  ], { duration: entryMotion.frameSeconds * 1000, easing: "ease", fill: "both" });
  viewport.pause();
  viewport.currentTime = entryMotion.frameSeconds * 1000;
  const controls = Array.from(world.querySelectorAll<HTMLElement>(".world-copy, .world-city-nav, .world-scroll"));
  const cities = Array.from(stage.querySelectorAll<HTMLElement>(".world-city"));
  const opacity = [...controls, ...cities].map(node => {
    const animation = node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: "both" });
    animation.pause();
    animation.currentTime = 0;
    return animation;
  });
  return {
    update(frame: ReturnFrame) {
      viewport.currentTime = frame.frameMilliseconds;
      const progress = 1 - frame.approach;
      opacity.forEach((animation, index) => {
        animation.currentTime = 1000 * (index < controls.length
          ? reveal(progress, 0, .55)
          : reveal(progress, .55, 1));
      });
    },
    restore() {
      viewport.cancel();
      opacity.forEach(animation => animation.cancel());
      if (original === null) stage.removeAttribute("style");
      else stage.setAttribute("style", original);
    },
  };
}
