import { MathUtils } from "three";
import { entryMotion } from "../config/entryMotion";

export type ReturnFrame = {
  departure: number;
  approach: number;
  frameMilliseconds: number;
};

/** Sample the approved entry timeline backwards, including its viewport expansion. */
export function sampleReturn(elapsed: number): ReturnFrame {
  const remaining = Math.max(0, entryMotion.pushSeconds + entryMotion.approachSeconds - elapsed);
  return {
    departure: MathUtils.smootherstep(
      (remaining - entryMotion.approachSeconds) / entryMotion.pushSeconds, 0, 1,
    ),
    approach: MathUtils.smootherstep(remaining / entryMotion.approachSeconds, 0, 1),
    frameMilliseconds: Math.min(remaining, entryMotion.frameSeconds) * 1000,
  };
}

export function createReturnRig(wake: () => void) {
  const duration = entryMotion.pushSeconds + entryMotion.approachSeconds;
  let elapsed = 0;
  let finish: (() => void) | null = null;
  let interrupt: (() => void) | null = null;
  let advance: ((frame: ReturnFrame) => void) | null = null;
  return {
    get active() { return finish !== null; },
    update(dt: number) {
      elapsed = Math.min(duration, elapsed + dt);
      const frame = sampleReturn(elapsed);
      advance?.(frame);
      if (elapsed >= duration) finish?.();
      return frame;
    },
    run(signal: AbortSignal, reduced: boolean, onFrame: (frame: ReturnFrame) => void) {
      return new Promise<void>((resolve, reject) => {
        interrupt?.();
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        const clear = () => {
          signal.removeEventListener("abort", abort);
          finish = interrupt = advance = null;
        };
        const abort = () => { clear(); reject(new DOMException("Aborted", "AbortError")); };
        elapsed = reduced ? duration : 0;
        advance = onFrame;
        interrupt = abort;
        finish = () => { clear(); resolve(); };
        signal.addEventListener("abort", abort, { once: true });
        advance(sampleReturn(elapsed));
        wake();
      });
    },
    reset() { interrupt?.(); },
  };
}
