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

export function KoreaEventSite({ onReady }: { onReady: () => void }) {
  const { language } = useFlagship();
  const c = koreaPageCopy[language];
  const root = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  useEffect(() => {
    let active = true;
    const images = Array.from(
      root.current?.querySelectorAll<HTMLImageElement>(
        ".kr-environment img, .kr-hero img",
      ) ?? [],
    );
    loadWithDeadline(() =>
      Promise.all([...images.map((img) => img.decode()), document.fonts.ready]),
    )
      .then(() => {
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
  );
}
