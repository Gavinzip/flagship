import { useCallback, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { EditionId } from "../../data/editions";
import type { WorldEntryBridge } from "../../world/runtime/entryBridge";
import { nextPaint } from "./transferRuntime";
import { returnHandoff, settleReturnedWorld } from "./returnHandoff";

type ReturnJourney = {
  edition: EditionId;
  phase: "preparing" | "retreating" | "settling" | "error";
  navigate: () => void;
};

export function useWorldReturn(
  world: RefObject<WorldEntryBridge | null>,
  active: RefObject<AbortController | null>,
) {
  const [returning, setReturning] = useState<ReturnJourney | null>(null);
  const current = useRef(returning);
  current.current = returning;
  const returnMark = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const nativeReturn = useRef(false);
  const opener = useRef<HTMLElement | null>(null);
  const returnHome = useCallback((edition: EditionId, navigate: () => void) => {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    running.current = true;
    nativeReturn.current = window.location.pathname === "/";
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const value: ReturnJourney = { edition, navigate, phase: "preparing" };
    setReturning(value);
    void (async () => {
      let restore: (() => void) | undefined;
      try {
        const { signal } = controller;
        const started = performance.now();
        // Direct country URLs are supported too: mount the original globe behind the country.
        while (!world.current || !returnMark.current) {
          if (signal.aborted) throw new DOMException("Aborted", "AbortError");
          if (performance.now() - started > 15000) throw new Error("The returning world is not ready.");
          await nextPaint();
        }
        const bridge = world.current;
        bridge.prepare(edition);
        setReturning({ ...value, phase: "retreating" });
        await nextPaint();
        restore = await returnHandoff(edition, returnMark.current, signal,
          advance => bridge.retreat(edition, signal, advance));
        if (signal.aborted) return;
        await settleReturnedWorld(() => flushSync(() => {
          navigate();
          setReturning({ ...value, phase: "settling" });
        }), signal);
        bridge.release();
        restore();
        setReturning(null);
        active.current = null;
        running.current = false;
        await nextPaint();
        const destination = document.querySelector<HTMLElement>(".world-enter");
        destination?.focus({ preventScroll: true });
      } catch (error) {
        restore?.();
        world.current?.release();
        active.current = null;
        running.current = false;
        if (controller.signal.aborted) setReturning(null);
        else {
          console.error("[FLAGSHIP] Return journey failed.", error);
          setReturning({ ...value, phase: "error" });
        }
      }
    })();
  }, [active, world]);
  const stopReturn = useCallback((restoreHistory: boolean) => {
    if (!current.current) return;
    active.current?.abort();
    active.current = null;
    world.current?.release();
    running.current = false;
    setReturning(null);
    if (restoreHistory && nativeReturn.current && current.current.phase !== "settling") window.history.forward();
    else void nextPaint().then(() => opener.current?.focus({ preventScroll: true }));
  }, [active, world]);
  const cancelReturn = useCallback(() => stopReturn(true), [stopReturn]);
  const interruptReturn = useCallback(() => stopReturn(false), [stopReturn]);
  return { returning, returnMark, returnHome, cancelReturn, interruptReturn, running };
}
