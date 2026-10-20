import { useEffect, useState, type RefObject } from "react";

/** Play only while the preview is on screen and its browser tab is visible. */
export function useViewportVideo(
  target: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = target.current;
    if (!enabled || !element) return;
    let intersecting = false;
    const sync = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      sync();
    }, { threshold: [0, 0.25] });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled, target]);

  return enabled && visible;
}
