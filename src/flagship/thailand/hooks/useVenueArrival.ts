import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useEditionPresented } from "../../routing/EditionPresentationContext";

/** Prepare the route drawing before it is visible, then reveal it once. */
export function useVenueArrival(photoReady: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);
  const presented = useEditionPresented();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (arrived || !presented || !photoReady) return;
    if (reduced) { setArrived(true); return; }
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setArrived(true);
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [arrived, presented, reduced, photoReady]);
  return { root, arrived, reveal: () => setArrived(true) };
}
