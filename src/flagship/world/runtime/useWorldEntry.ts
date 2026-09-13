import { useContext, useEffect, useRef, type RefObject } from "react";
import { EditionTransitionContext } from "../../routing/transition/EditionTransitionContext";
import { nextPaint } from "../../routing/transition/transferRuntime";
import type { WorldRuntime } from "../scene/mountWorld";
import type { CityId } from "../config/worldSpec";

/** The route transition borrows the mounted globe, never a copied scene or screenshot. */
export function useWorldEntry(
  runtime: RefObject<WorldRuntime | null>,
  error: boolean,
  select: (city: CityId) => void,
  city: RefObject<CityId>,
  retry: () => void,
) {
  const registration = useContext(EditionTransitionContext)?.registerWorld;
  const paused = useRef(false),
    failed = useRef(error);
  failed.current = error;
  useEffect(() => {
    if (!registration) return;
    let previous = city.current;
    return registration({
      prepare: (destination) => {
        previous = city.current;
        paused.current = true;
        select(destination);
        if (failed.current) {
          failed.current = false;
          runtime.current = null;
          retry();
        }
      },
      flyTo: async (destination, signal) => {
        const started = performance.now();
        while (!runtime.current) {
          if (signal.aborted) throw new DOMException("Aborted", "AbortError");
          if (failed.current || performance.now() - started > 15000)
            throw new Error("The Protocol globe is not ready.");
          await nextPaint();
        }
        return runtime.current.flyTo(destination, signal);
      },
      restore: () => {
        paused.current = false;
        runtime.current?.resume();
        select(previous);
      },
      depart: (signal, advance) => {
        if (!runtime.current)
          return Promise.reject(
            new Error("The Protocol globe was interrupted."),
          );
        return runtime.current.depart(signal, advance);
      },
    });
  }, [registration, runtime, city, select, retry]);
  return paused;
}
