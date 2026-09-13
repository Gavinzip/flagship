import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useFlagship } from "../FlagshipContext";
import type { CardScene } from "../scene/createCardScene";

/** A thin open holder. React owns admission, visibility and disposal. */
export function CollectionArtwork() {
  const ref = useRef<HTMLDivElement>(null);
  const scene = useRef<CardScene | null>(null);
  const preload = useInView(ref, { margin: "900px", once: true });
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const { paused, language, edition } = useFlagship();
  const accent = edition.id === "korea" ? "#397aca" : "#b67735";
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const state = useRef({ visible, paused: paused || !!reduced, accent });
  useEffect(() => {
    state.current = { visible, paused: paused || !!reduced, accent };
    scene.current?.setActive(visible);
    scene.current?.setPaused(paused || !!reduced);
  }, [visible, paused, reduced, accent]);
  useEffect(() => {
    scene.current?.setAccent(accent);
  }, [accent]);
  useEffect(() => {
    if (!preload || !ref.current) return;
    let cancelled = false;
    const abort = new AbortController();
    let owned: CardScene | undefined;
    let timer: ReturnType<typeof setTimeout>;
    setStatus("loading");
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error("Card scene loading timed out")),
        15000,
      );
    });
    const loading = import("../scene/createCardScene").then(async (module) => {
      if (cancelled || !ref.current) return;
      const result = await module.createCardScene(
        ref.current,
        () => setStatus("error"),
        abort.signal,
      );
      if (cancelled) {
        result.dispose();
        return;
      }
      owned = result;
      scene.current = result;
      result.setAccent(state.current.accent);
      result.setPaused(state.current.paused);
      result.setActive(state.current.visible);
      return result;
    });
    Promise.race([loading, timeout])
      .then((result) => {
        clearTimeout(timer);
        if (!cancelled && result) setStatus("ready");
      })
      .catch((error) => {
        clearTimeout(timer);
        if (!cancelled) {
          console.error("Card frame scene:", error);
          setStatus("error");
          cancelled = true;
          abort.abort();
          owned?.dispose();
          scene.current = null;
        }
      });
    return () => {
      cancelled = true;
      clearTimeout(timer);
      abort.abort();
      owned?.dispose();
      scene.current = null;
    };
  }, [preload, attempt]);
  const copy =
    language === "zh-TW"
      ? ["卡框視覺載入中", "卡框視覺無法載入", "再試一次"]
      : language === "ko"
        ? ["비주얼 로딩 중", "비주얼을 불러올 수 없습니다", "다시 시도"]
        : ["Loading visual", "The visual could not load", "Try again"];
  return (
    <div ref={ref} className="fs-collection-object" data-status={status}>
      {status !== "ready" && (
        <div className="fs-object-status" role="status">
          <span>{copy[status === "error" ? 1 : 0]}</span>
          {status === "error" && (
            <button onClick={() => setAttempt((n) => n + 1)}>{copy[2]}</button>
          )}
        </div>
      )}
    </div>
  );
}
