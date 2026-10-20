import { useLayoutEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useFlagship } from "../../FlagshipContext";
import { useEditionPresented } from "../../routing/EditionPresentationContext";

/** Prepare before paint; entering view only plays an already prepared reveal. */
export function useThailandReveal(root: RefObject<HTMLElement | null>) {
  const presented = useEditionPresented();
  const reduced = useReducedMotion();
  const { paused, language } = useFlagship();
  const seen = useRef(new WeakSet<HTMLElement>());
  const wasDisabled = useRef(false);

  useLayoutEffect(() => {
    const resuming = wasDisabled.current;
    wasDisabled.current = Boolean(reduced || paused);
    if (reduced || paused || !root.current) return;
    const animations = new Map<HTMLElement, Animation>();

    root.current.querySelectorAll<HTMLElement>("[data-th-reveal]").forEach(element => {
      if (seen.current.has(element)) return;
      // Resuming motion must not reset content the visitor is already reading.
      const rect = element.getBoundingClientRect();
      if (resuming && rect.top < window.innerHeight && rect.bottom > 0) {
        seen.current.add(element);
        return;
      }
      const animation = element.animate([
        { opacity: .18, transform: "translate3d(0,16px,0)", filter: "blur(3px)" },
        { opacity: 1, transform: "translate3d(0,0,0)", filter: "blur(0px)" },
      ], {
        duration: 620,
        delay: Math.min(Number(element.dataset.thReveal) || 0, 240),
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "both",
      });
      // Fill applies now, behind the admission screen, rather than snapping a
      // fully visible element back to the first frame when scrolling reaches it.
      animation.pause();
      animation.currentTime = 0;
      animations.set(element, animation);
    });

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        const animation = animations.get(element);
        if (!animation) continue;
        seen.current.add(element);
        animation.onfinish = () => { animations.delete(element); animation.cancel(); };
        animation.play();
      }
    }, { threshold: 0, rootMargin: "0px 0px 64px 0px" });
    if (presented) animations.forEach((_, element) => observer.observe(element));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [root, presented, reduced, paused, language]);
}
