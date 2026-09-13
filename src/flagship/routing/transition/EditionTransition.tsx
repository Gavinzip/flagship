import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { editions, type EditionId } from "../../data/editions";
import { OriginalEmblem } from "../../components/OriginalEmblem";
import { useSiteNavigation } from "../SiteNavigation";
import { preloadEdition } from "../preloadEdition";
import { EditionTransitionContext } from "./EditionTransitionContext";
import type {
  GeographicAnchor,
  WorldEntryBridge,
} from "../../world/runtime/entryBridge";
import {
  editionFrame,
  loadTransferImage,
  nextPaint,
} from "./transferRuntime";
import { geographicHandoff } from "./geographicHandoff";
import { useWorldReturn } from "./useWorldReturn";
import "./transition.css";

type Transfer = {
  edition: EditionId;
  phase: "aligning" | "geographic" | "handoff" | "error";
  theme: "dark" | "light";
  navigate: () => void;
  anchor?: GeographicAnchor;
};

export function EditionTransition({ children }: { children: ReactNode }) {
  const { location, registerHistoryTransition } = useSiteNavigation();
  const zh = location.language === "zh-TW";
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const active = useRef<AbortController | null>(null),
    world = useRef<WorldEntryBridge | null>(null),
    mark = useRef<HTMLDivElement>(null),
    opener = useRef<HTMLElement | null>(null),
    scroll = useRef(0);
  const { returning, returnMark, returnHome, cancelReturn, interruptReturn, running } = useWorldReturn(world, active);
  useEffect(() => registerHistoryTransition((from, to, commit) => {
    if (running.current) { interruptReturn(); return false; }
    if (active.current || to.page !== "home" || (from.page !== "korea" && from.page !== "taiwan")) return false;
    returnHome(from.page, () => {
      // Keep the country that was just visited selected when native history returns.
      const url = new URL(window.location.href);
      url.hash = `world-${from.page}`;
      window.history.replaceState(window.history.state, "", url);
      commit();
    });
    return true;
  }), [registerHistoryTransition, returnHome, interruptReturn]);
  const registerWorld = useCallback((bridge: WorldEntryBridge) => {
    world.current = bridge;
    return () => {
      if (world.current === bridge) world.current = null;
    };
  }, []);
  const cancel = useCallback(() => {
    if (!active.current) return;
    // The destination loads behind the globe during the flight. Keep that cover
    // until native history has restored the original IP route on cancellation.
    if (window.location.pathname !== "/") {
      window.history.back();
      return;
    }
    active.current?.abort();
    active.current = null;
    world.current?.restore();
    setTransfer(null);
    void nextPaint().then(() => {
      if (window.location.pathname === "/") {
        window.scrollTo({ top: scroll.current, behavior: "instant" });
        opener.current?.focus({ preventScroll: true });
      }
    });
  }, []);
  useEffect(() => {
    const back = () => { if (!running.current) cancel(); };
    window.addEventListener("popstate", back);
    return () => {
      window.removeEventListener("popstate", back);
      active.current?.abort();
    };
  }, [cancel]);
  useEffect(() => {
    if (!transfer && !returning) return;
    const root = document.documentElement,
      previous = root.style.overflow;
    root.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (returning) cancelReturn();
        else cancel();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", key);
    };
  }, [!!transfer, !!returning, cancel, cancelReturn]);
  const run = async (value: Transfer) => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    const { signal } = controller;
    try {
      const bridge = world.current;
      if (!bridge) throw new Error("The Protocol globe is not ready.");
      bridge.prepare(value.edition);
      setTransfer({ ...value, phase: "aligning", anchor: undefined });
      await nextPaint();
      if (signal.aborted) return;
      const mounted = editionFrame(value.edition, signal);
      value.navigate();
      const [anchor] = await Promise.all([
        bridge.flyTo(value.edition, signal),
        mounted,
        preloadEdition(),
        loadTransferImage(editions[value.edition].emblem, signal),
      ]);
      if (signal.aborted) return;
      setTransfer({ ...value, phase: "geographic", anchor });
      await nextPaint();
      if (signal.aborted) return;
      setTransfer({ ...value, phase: "handoff", anchor });
      await nextPaint();
      await geographicHandoff(value.edition, mark.current, signal, (advance) =>
        bridge.depart(signal, advance),
      );
      if (signal.aborted) return;
      setTransfer(null);
      active.current = null;
      await nextPaint();
      const destination = document.querySelector<HTMLElement>(
        "[data-active-edition] main",
      );
      if (destination) {
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
      }
    } catch (error) {
      if (!signal.aborted) setTransfer({ ...value, phase: "error" });
    }
  };
  const enter = (edition: EditionId, navigate: () => void) => {
    if (active.current) return;
    opener.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    scroll.current = window.scrollY;
    void run({
      edition,
      navigate,
      phase: "aligning",
      theme:
        document.querySelector(".brand-site")?.getAttribute("data-theme") ===
        "dark"
          ? "dark"
          : "light",
    });
  };
  const width = 120;
  const height = width / (transfer?.edition === "taiwan" ? 900 / 493 : 1170 / 755);
  return (
    <EditionTransitionContext.Provider
      value={{ enter, returnHome, retainingWorld: !!transfer || !!returning,
        returnPhase: returning?.phase, returnEdition: returning?.edition, registerWorld }}
    >
      <div inert={transfer || returning ? true : undefined}>{children}</div>
      {returning && (
        <div className="geographic-transfer geographic-return" data-phase={returning.phase}
          role="dialog" aria-modal="true" aria-label={zh ? "返回 FLAGSHIP 世界" : "Returning to the FLAGSHIP world"}>
          <div className="geographic-transfer-mark" ref={returnMark}>
            {returning.edition === "korea" ? <OriginalEmblem src={editions.korea.emblem} /> :
              <img src={editions.taiwan.emblem} alt="FLAGSHIP Card Show Taiwan" />}
          </div>
          {returning.phase === "error" && <div className="geographic-transfer-status" role="alert">
            <span>{zh ? "地球載入失敗，請重試。" : "The globe could not be loaded."}</span>
            <button onClick={() => returnHome(returning.edition, returning.navigate)}>{zh ? "重試" : "Retry"}</button>
            <button onClick={cancelReturn}>{zh ? "留在此頁" : "Stay here"}</button>
          </div>}
        </div>
      )}
      {transfer && (
        <div
          className="geographic-transfer"
          data-phase={transfer.phase}
          data-theme={transfer.theme}
          role="dialog"
          aria-modal="true"
          aria-label={`FLAGSHIP ${transfer.edition}`}
        >
          {transfer.anchor && (
            <div
              className="geographic-transfer-mark"
              ref={mark}
              style={{
                left: transfer.anchor.x - width / 2,
                top: transfer.anchor.y - height / 2,
                width,
                height,
              }}
            >
              {transfer.edition === "korea" ? (
                <OriginalEmblem src={editions.korea.emblem} />
              ) : (
                <img src={editions.taiwan.emblem} alt="FLAGSHIP Card Show Taiwan" />
              )}
            </div>
          )}
          <div
            className="geographic-transfer-status"
            role={transfer.phase === "error" ? "alert" : "status"}
          >
            <span>
              {transfer.phase === "error"
                ? zh
                  ? "旅程載入失敗，請重試。"
                  : "The journey could not be loaded."
                : zh
                  ? `前往 ${transfer.edition.toUpperCase()} · 連結下一次相聚`
                  : `ARRIVING IN ${transfer.edition.toUpperCase()}`}
            </span>
            {transfer.phase === "error" && (
              <button onClick={() => void run(transfer)}>
                {zh ? "重新載入" : "Retry"}
              </button>
            )}
            <button onClick={cancel}>{zh ? "返回" : "Back"}</button>
          </div>
        </div>
      )}
    </EditionTransitionContext.Provider>
  );
}
