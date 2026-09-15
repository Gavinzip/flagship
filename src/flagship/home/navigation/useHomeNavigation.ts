import { useEffect, useState, type RefObject } from "react";
import { homeSectionIds, type HomeSectionId } from "./homeSections";

/** Reveal navigation after the globe opener and track the current section. */
export function useHomeNavigation(root: RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState<{
    visible: boolean;
    active: HomeSectionId;
  }>({ visible: false, active: "editions" });
  const [site, setSite] = useState<HTMLDivElement | null>(null);

  // The parent ref is assigned after the header first renders. Mirror that
  // assignment into state so the scroll observer is always attached to the
  // mounted home page instead of silently returning on the initial render.
  useEffect(() => {
    const nextSite = root.current;
    if (nextSite !== site) setSite(nextSite);
  });

  useEffect(() => {
    if (!site) return;
    const worldSection = site.querySelector<HTMLElement>("#editions");
    const sections = homeSectionIds.map(id => ({ id, element: site.querySelector<HTMLElement>(`#${id}`) }));
    let frame = 0, visible = false;
    const measure = () => {
      frame = 0;
      if (!worldSection) return;
      const bottom = worldSection.getBoundingClientRect().bottom;
      // Keep the whole globe chapter clear. The slight hysteresis prevents the
      // header from flickering at the hand-off into the reading sections.
      const threshold = window.innerHeight * (visible ? 1.04 : 0.96);
      visible = window.scrollY > 80 && bottom < threshold;
      let active: HomeSectionId = "editions";
      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= window.innerHeight * 0.36) active = section.id;
      }
      setState(previous =>
        previous.visible === visible && previous.active === active
          ? previous
          : { visible, active },
      );
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(queue);
    observer.observe(site);
    if (worldSection) observer.observe(worldSection);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [site]);
  return state;
}
