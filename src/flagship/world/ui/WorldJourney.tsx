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
import { preloadImage, nextPaint } from "../../routing/preloadImage";
import { warmEdition } from "../../routing/prepareEdition";
import { worldMaterials } from "../config/materials";
import { WorldAdmission } from "./WorldAdmission";

type AdmissionStage = "assets" | "module" | "renderer";

const admissionCopy = {
  en: {
    assets: "PREPARING THE GALAXY",
    module: "PREPARING THE WORLD",
    renderer: "LIGHTING THE GLOBE",
  },
  "zh-TW": {
    assets: "正在準備銀河背景",
    module: "正在準備 FLAGSHIP 世界",
    renderer: "正在點亮地球",
  },
  ko: {
    assets: "은하 배경을 준비하는 중",
    module: "FLAGSHIP 세계를 준비하는 중",
    renderer: "지구를 밝히는 중",
  },
} as const;

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
  const transition = useContext(EditionTransitionContext);
  const returningCity = transition?.returnEdition;
  const returnOrigin = transition?.returnOrigin;
  const initialCity: CityId = returningCity ??
    (window.location.hash === "#world-taiwan" ? "taiwan" : "korea");
  const [city, setCity] = useState<CityId>(initialCity);
  const cityRef = useRef(city);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false),
    [error, setError] = useState(false),
    [attempt, setAttempt] = useState(0),
    [admissionVisible, setAdmissionVisible] = useState(true),
    [admissionProgress, setAdmissionProgress] = useState(0),
    [admissionStage, setAdmissionStage] =
      useState<AdmissionStage>("assets");
  const selectEntryCity = useCallback((value: CityId) => {
    cityRef.current = value;
    setCity(value);
    runtime.current?.update(progress.current, value);
  }, []);
  const retry = useCallback(() => {
    setError(false);
    setReady(false);
    setAdmissionVisible(true);
    setAdmissionProgress(0);
    setAdmissionStage("assets");
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
    const admissionTotal = 5;
    let admissionCompleted = 0;
    const completeAdmissionStep = () => {
      admissionCompleted += 1;
      setAdmissionProgress(
        Math.min(99, Math.round((admissionCompleted / admissionTotal) * 99)),
      );
    };
    setReady(false);
    setError(false);
    setAdmissionVisible(true);
    setAdmissionProgress(0);
    setAdmissionStage("assets");
    const fail = (cause: unknown) => {
      if (!controller.signal.aborted) {
        console.error("[FLAGSHIP] Globe initialization failed.", cause);
        runtime.current = null;
        setError(true);
        setReady(false);
      }
    };
    const assets = Promise.all([
      preloadImage({ src: worldMaterials.environment }).then(
        completeAdmissionStep,
      ),
      preloadImage({ src: homeMedia.masterLogo }).then(completeAdmissionStep),
      document.fonts.ready.then(completeAdmissionStep),
    ]);
    setAdmissionStage("module");
    const scene = import("../scene/mountWorld").then(({ mountWorld }) => {
        if (controller.signal.aborted) return;
        completeAdmissionStep();
        setAdmissionStage("renderer");
        return mountWorld(
          node,
          controller.signal,
          fail,
          Array.from(node.querySelectorAll<HTMLElement>(".world-city")),
          progress.current,
          cityRef.current,
          themeRef.current,
          returnOrigin,
        );
      });
    Promise.all([assets, scene])
      .then(async ([, value]) => {
        if (!value) return;
        if (controller.signal.aborted) {
          value.dispose();
          return;
        }
        runtime.current = value;
        value.update(progress.current, cityRef.current);
        value.setTheme(themeRef.current);
        completeAdmissionStep();
        await nextPaint();
        if (controller.signal.aborted) {
          value.dispose();
          return;
        }
        setAdmissionProgress(100);
        setReady(true);
      })
      .catch(fail);
    return () => {
      controller.abort();
      runtime.current?.dispose();
      runtime.current = null;
    };
  // returnOrigin only defines this mount's starting pose. It must not restart
  // the globe when the return transition clears its context after landing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setAdmissionVisible(false), 460);
    return () => window.clearTimeout(timer);
  }, [ready]);
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      void warmEdition("korea")
        .then(() => warmEdition("taiwan"))
        .catch((cause) => console.warn("[FLAGSHIP] Route warmup failed.", cause));
    }, 280);
    return () => window.clearTimeout(timer);
  }, [ready]);
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
      aria-busy={!ready}
    >
      <div className="world-sticky">
        <div
          className="world-stage"
          ref={host}
          data-ready={ready}
          role="group"
          tabIndex={ready ? 0 : -1}
          inert={ready ? undefined : true}
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
        {admissionVisible && (
          <WorldAdmission
            progress={admissionProgress}
            stage={admissionCopy[location.language][admissionStage]}
            error={error}
            exiting={ready && !error}
            retry={retry}
            language={location.language}
          />
        )}
        {ready && (
          <>
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
          </>
        )}
      </div>
      <span className="world-anchor world-anchor--taiwan" id="world-taiwan" />
      <span className="world-anchor world-anchor--korea" id="world-korea" />
    </section>
  );
}
