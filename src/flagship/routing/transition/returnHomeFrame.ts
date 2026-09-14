import { entryMotion } from "../../world/config/entryMotion";
import type { ReturnFrame } from "../../world/runtime/returnRig";

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
  return {
    update(frame: ReturnFrame) {
      viewport.currentTime = frame.frameMilliseconds;
    },
    restore() {
      viewport.cancel();
      if (original === null) stage.removeAttribute("style");
      else stage.setAttribute("style", original);
    },
  };
}
