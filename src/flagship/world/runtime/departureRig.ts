import { MathUtils } from "three";
import { entryMotion } from "../config/entryMotion";

/** Advance to the surface; never translate or drop the globe out of frame. */
export function createDepartureRig(wake: () => void) {
  let elapsed = 0,
    duration: number = entryMotion.pushSeconds,
    progress = 0;
  let finish: (() => void) | null = null;
  let interrupt: (() => void) | null = null;
  let advance: ((progress: number) => void) | null = null;
  return {
    get active() {
      return !!finish;
    },
    update(dt: number) {
      if (finish) {
        elapsed = Math.min(duration, elapsed + dt);
        progress = duration
          ? MathUtils.smootherstep(elapsed / duration, 0, 1)
          : 1;
        advance?.(progress);
        if (elapsed >= duration) finish();
      }
      return progress;
    },
    run(signal: AbortSignal, reduced: boolean, onProgress: (progress: number) => void) {
      return new Promise<void>((resolve, reject) => {
        interrupt?.();
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        elapsed = progress = 0;
        advance = onProgress;
        advance(0);
        duration = reduced ? 0 : entryMotion.pushSeconds;
        const clear = () => {
          signal.removeEventListener("abort", abort);
          finish = interrupt = null;
          advance = null;
        };
        const abort = () => {
          clear();
          reject(new DOMException("Aborted", "AbortError"));
        };
        interrupt = abort;
        finish = () => {
          clear();
          resolve();
        };
        signal.addEventListener("abort", abort, { once: true });
        wake();
      });
    },
    reset() {
      interrupt?.();
      progress = 0;
    },
  };
}
