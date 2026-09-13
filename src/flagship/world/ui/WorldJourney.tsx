import { MetalBorder } from "../../home/ui/MetalBorder";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { EditionTransitionContext } from "../../routing/transition/EditionTransitionContext";
import { ArrowDown } from "iconoir-react";
import { StellarActionContent } from "../../home/ui/StellarActionContent";
import { homeMotion } from "../../home/motion/homeMotion";
import { useSiteNavigation, SiteLink } from "../../routing/SiteNavigation";
import type { HomeCopy } from "../../home/homeCopy";
import { homeMedia } from "../../home/homeMedia";
import { observeWorldScroll } from "../runtime/scrollState";
import type { WorldRuntime } from "../scene/mountWorld";
import type { CityId } from "../config/worldSpec";
import type { WorldTheme } from "../config/appearance";
import { CityNavigator } from "./CityNavigator";
import { CityMarker } from "./CityMarker";
import { WorldDescription } from "./WorldDescription";
import { observeCityGestures } from "../runtime/cityGestures";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useWorldEntry } from "../runtime/useWorldEntry";

export function WorldJourney({
  copy: c,
  onWatch,
  theme,
}: {
  copy: HomeCopy;
  onWatch: () => void;
  theme: WorldTheme;
}) {
  const { location } = useSiteNavigation();
  const zh = location.language === "zh-TW",
    ko = location.language === "ko";
  const section = useRef<HTMLElement>(null),
    host = useRef<HTMLDivElement>(null),
    runtime = useRef<WorldRuntime | null>(null),
    progress = useRef(0);
  const returningCity = useContext(EditionTransitionContext)?.returnEdition;
  const initialCity: CityId = returningCity ??
    (window.location.hash === "#world-taiwan" ? "taiwan" : "korea");
  const [city, setCity] = useState<CityId>(initialCity);
  const cityRef = useRef(city);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false),
    [error, setError] = useState(false),
    [attempt, setAttempt] = useState(0);
  const selectEntryCity = useCallback((value: CityId) => {
    cityRef.current = value;
    setCity(value);
    runtime.current?.update(progress.current, value);
  }, []);
  const retry = useCallback(() => {
    setError(false);
    setReady(false);
    setAttempt((value) => value + 1);
  }, []);
  const entering = useWorldEntry(
    runtime,
    error,
    selectEntryCity,
    cityRef,
    retry,
  );
  const selectCity = useCallback((value: CityId) => {
    cityRef.current = value;
    setCity(value);
    runtime.current?.update(progress.current, value);
    window.history.replaceState(window.history.state, "", `#world-${value}`);
  }, []);
  useEffect(() => {
    const hash = () => {
      if (window.location.hash === "#world-taiwan") selectCity("taiwan");
      if (window.location.hash === "#world-korea") selectCity("korea");
    };
    window.addEventListener("hashchange", hash);
    return () => window.removeEventListener("hashchange", hash);
  }, [selectCity]);
  useEffect(() => {
    if (!host.current) return;
    return observeCityGestures(
      host.current,
      () => !entering.current,
      (direction) => selectCity(direction > 0 ? "taiwan" : "korea"),
    );
  }, [selectCity]);
  useEffect(() => {
    runtime.current?.setTheme(theme);
  }, [theme]);
  useEffect(() => {
    if (!section.current) return;
    return observeWorldScroll(section.current, (p) => {
      if (entering.current) return;
      progress.current = p;
      runtime.current?.update(p, cityRef.current);
    });
  }, []);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const controller = new AbortController();
    setReady(false);
    setError(false);
    const fail = (cause: unknown) => {
      if (!controller.signal.aborted) {
        console.error("[FLAGSHIP] Globe initialization failed.", cause);
        runtime.current = null;
        setError(true);
        setReady(false);
      }
    };
    import("../scene/mountWorld")
      .then(async ({ mountWorld }) => {
        if (controller.signal.aborted) return;
        const value = await mountWorld(
          node,
          controller.signal,
          fail,
          Array.from(node.querySelectorAll<HTMLElement>(".world-city")),
          progress.current,
          cityRef.current,
          themeRef.current,
        );
        if (controller.signal.aborted) {
          value.dispose();
          return;
        }
        runtime.current = value;
        value.update(progress.current, cityRef.current);
        value.setTheme(themeRef.current);
        setReady(true);
      })
      .catch(fail);
    return () => {
      controller.abort();
      runtime.current?.dispose();
      runtime.current = null;
    };
  }, [attempt]);
  const title =
    city === "taiwan"
      ? [
          "TAIWAN",
          zh ? "故事開始的地方。" : ko ? "우리의 시작." : "WHERE IT BEGAN.",
        ]
      : [
          "KOREA",
          zh ? "下一站，一起相聚。" : ko ? "다음 만남." : "OUR NEXT CHAPTER.",
        ];
  return (
    <section
      ref={section}
      id="editions"
      className="world-journey"
      data-chapter={city}
      aria-label="FLAGSHIP global editions"
    >
      <div className="world-sticky">
        <div
          className="world-stage"
          ref={host}
          data-ready={ready}
          role="group"
          tabIndex={0}
          aria-label={
            zh
              ? "左右滑動或使用方向鍵切換地區，向下捲動繼續認識 FLAGSHIP"
              : ko
                ? "최신 행사는 한국입니다. 좌우로 밀거나 방향키로 지역을 선택하세요. 아래로 스크롤하여 FLAGSHIP을 만나보세요."
                : "Korea is the latest edition. Swipe or use left and right arrow keys to explore regions. Scroll down to discover FLAGSHIP."
          }
        >
          <CityMarker city="taiwan" status={c.taiwanStatus} action={c.taiwanCta} />
          <CityMarker city="korea" status={c.koreaStatus} action={c.koreaCta} />
        </div>
        {!ready && !error && (
          <p className="world-loading" role="status">
            {zh
              ? "正在點亮 FLAGSHIP 世界"
              : ko
                ? "FLAGSHIP 세계를 여는 중"
                : "Opening the FLAGSHIP world"}
            <span />
          </p>
        )}
        {error && (
          <div className="world-loading" role="alert">
            <p>
              {zh ? "地球載入失敗，請重試。" : "The globe could not be loaded."}
            </p>
            <button className="ip-metal-control" onClick={() => setAttempt((v) => v + 1)}>
              <MetalBorder />{c.videoRetry}
            </button>
          </div>
        )}
        <div className="world-copy">
          <p className="world-eyebrow">
            COLLECTING CULTURE. CONNECTING PEOPLE.
          </p>
          <img
            className="world-logo"
            src={homeMedia.masterLogo}
            width="1670"
            height="941"
            alt="FLAGSHIP Card Show"
            fetchPriority="high"
          />
          <div className="world-heading-slot">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                className="world-heading"
                key={city}
                initial={{ opacity: 0, x: reduced ? 0 : city === "taiwan" ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : city === "taiwan" ? -12 : 12 }}
                transition={{
                  duration: reduced ? 0 : homeMotion.change,
                  ease: homeMotion.ease,
                }}
              >
                <p className="world-status">
                  {city === "taiwan" ? c.taiwanStatus : c.koreaStatus}
                </p>
                <h1>
                  {title.map((line, index) => (
                    <span
                      className={index === 0 ? "world-country" : ""}
                      key={line}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
                <WorldDescription text={city === "taiwan" ? c.taiwanDescription : c.koreaDescription} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="world-actions">
            <SiteLink page={city} className="world-enter stellar-action">
              <StellarActionContent>{city === "taiwan" ? c.taiwanCta : c.koreaCta}</StellarActionContent>
            </SiteLink>
            <button className="stellar-action stellar-action--quiet" onClick={onWatch}>
              <StellarActionContent play>{c.viewRecap}</StellarActionContent>
            </button>
          </div>
        </div>
        <CityNavigator
          city={city}
          select={selectCity}
          copy={c}
          language={location.language}
        />
        <a className="world-scroll" href="#about">
          <ArrowDown />
          {zh
            ? "繼續下滑，認識 FLAGSHIP"
            : ko
              ? "스크롤하여 FLAGSHIP을 만나보세요"
              : "SCROLL TO DISCOVER FLAGSHIP"}
        </a>
      </div>
      <span className="world-anchor world-anchor--taiwan" id="world-taiwan" />
      <span className="world-anchor world-anchor--korea" id="world-korea" />
    </section>
  );
}
