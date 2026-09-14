import { useEffect, useState, type RefObject } from "react";
import { homeSectionIds, type HomeSectionId } from "./homeSections";

/** Track the current IP section for the persistent navigation. */
export function useHomeNavigation(root: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState<HomeSectionId>("editions");
  useEffect(() => {
    const site = root.current;
    if (!site) return;
    const sections = homeSectionIds.map(id => ({ id, element: site.querySelector<HTMLElement>(`#${id}`) }));
    let frame = 0;
    const measure = () => {
      frame = 0;
      let active: HomeSectionId = "editions";
      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= window.innerHeight * 0.36) active = section.id;
      }
      setActive(previous => previous === active ? previous : active);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(queue);
    observer.observe(site);
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
  return { active };
}
