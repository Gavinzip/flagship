import { useEffect, useRef, useState } from "react";
import { MotionDirector } from "../../components/MotionDirector";
import { useFlagship } from "../FlagshipContext";
import { koreaPageCopy } from "./data/copy";
import { KoreaEnvironment } from "./components/KoreaEnvironment";
import { KoreaHeader } from "./components/KoreaHeader";
import { KoreaHero } from "./components/KoreaHero";
import { KoreaEventInfo } from "./components/KoreaEventInfo";
import { KoreaHighlights } from "./components/KoreaHighlights";
import { KoreaPartners } from "./components/KoreaPartners";
import { KoreaVisit } from "./components/KoreaVisit";
import { KoreaQuestions } from "./components/KoreaQuestions";
import { KoreaClosing } from "./components/KoreaClosing";
import "./styles/index.css";
import { loadWithDeadline } from "../routing/RouteBoundary";
import { editions } from "../data/editions";
import { preloadImage, nextPaint } from "../routing/preloadImage";
import { EditionAdmissionStatus } from "../routing/transition/EditionAdmissionStatus";

export function KoreaEventSite({ onReady }: { onReady: () => void }) {
  const { language } = useFlagship();
  const c = koreaPageCopy[language];
  const root = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let active = true;
    const images = Array.from(
      root.current?.querySelectorAll<HTMLImageElement>(
        ".kr-environment img, .kr-hero img",
      ) ?? [],
    );
    const total = images.length + 2;
    let completed = 0;
    const complete = () => {
      completed += 1;
      if (active) setProgress(Math.min(99, Math.round((completed / total) * 99)));
    };
    setReady(false);
    setProgress(0);
    loadWithDeadline(() =>
      Promise.all([
        ...images.map(async (img) => {
          await img.decode();
          complete();
        }),
        preloadImage({ src: editions.korea.emblem }).then(complete),
        document.fonts.ready.then(complete),
      ]),
    )
      .then(async () => {
        if (!active) return;
        setProgress(100);
        setReady(true);
        await nextPaint();
        if (active) onReady();
      })
      .catch((error) => {
        if (active)
          setLoadError(
            error instanceof Error ? error : new Error(String(error)),
          );
      });
    return () => {
      active = false;
    };
  }, [onReady]);
  if (loadError) throw loadError;
  return (
    <div ref={root} className="korea-event-site" id="top">
      <MotionDirector />
      <KoreaEnvironment />
      <div inert={ready ? undefined : true}>
        <KoreaHeader c={c} />
        <main id="main">
          <KoreaHero c={c} />
          <KoreaEventInfo c={c} />
          <KoreaHighlights c={c} />
          <KoreaPartners c={c} />
          <KoreaVisit c={c} />
          <KoreaQuestions c={c} />
          <KoreaClosing c={c} />
        </main>
      </div>
      {!ready && (
        <EditionAdmissionStatus
          edition="korea"
          progress={progress}
          language={language}
        />
      )}
    </div>
  );
}
