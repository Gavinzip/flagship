import { useEffect, useState, type RefObject } from "react";
import { homeSectionIds, type HomeSectionId } from "./homeSections";

/** Reveal navigation only when the original hero logo has left the reading area. */
export function useHomeNavigation(root: RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState<{ visible: boolean; active: HomeSectionId }>({ visible: false, active: "editions" });
  useEffect(() => {
    const site = root.current;
    if (!site) return;
    const logo = site.querySelector<HTMLElement>(".world-logo");
    const sections = homeSectionIds.map(id => ({ id, element: site.querySelector<HTMLElement>(`#${id}`) }));
    let frame = 0, shown = false;
    const measure = () => {
      frame = 0;
      if (!logo) return;
      const bottom = logo.getBoundingClientRect().bottom;
      // Hysteresis avoids flicker when gently reversing near the reveal point.
      shown = window.scrollY > 80 && bottom < (shown ? 72 : 16);
      let active: HomeSectionId = "editions";
      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= window.innerHeight * 0.36) active = section.id;
      }
      setState(previous => previous.visible === shown && previous.active === active ? previous : { visible: shown, active });
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(queue);
    observer.observe(site);
    if (logo) observer.observe(logo);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [root]);
  return state;
}
