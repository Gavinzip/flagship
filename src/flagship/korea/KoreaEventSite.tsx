import { useEffect, useRef, useState } from "react";
import { MotionDirector } from "../../components/MotionDirector";
import { useFlagship } from "../FlagshipContext";
import { koreaPageCopy } from "./data/copy";
import { KoreaEnvironment } from "./components/KoreaEnvironment";
import { KoreaHeader } from "./components/KoreaHeader";
import { KoreaHero } from "./components/KoreaHero";
import { KoreaHighlights } from "./components/KoreaHighlights";
import { KoreaPartners } from "./components/KoreaPartners";
import { KoreaVisit } from "./components/KoreaVisit";
import { KoreaQuestions } from "./components/KoreaQuestions";
import { KoreaFooter } from "./components/KoreaFooter";
import "./styles/index.css";
import { nextPaint } from "../routing/preloadImage";

function decodeMountedImage(image: HTMLImageElement) {
  return new Promise<void>((resolve, reject) => {
    const decode = async () => {
      try {
        await image.decode();
      } catch {
        if (!image.naturalWidth) {
          reject(new Error(`Image could not be decoded: ${image.currentSrc || image.src}`));
          return;
        }
      }
      resolve();
    };

    if (image.complete) {
      void decode();
      return;
    }

    image.addEventListener("load", () => void decode(), { once: true });
    image.addEventListener(
      "error",
      () => reject(new Error(`Image could not be loaded: ${image.currentSrc || image.src}`)),
      { once: true },
    );
  });
}

export function KoreaEventSite({ onReady }: { onReady: () => void }) {
  const { language } = useFlagship();
  const c = koreaPageCopy[language];
  const root = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    const mountedImages = Array.from(
      root.current?.querySelectorAll<HTMLImageElement>(
        ".kr-environment img, .kr-hero img",
      ) ?? [],
    );

    void Promise.all(mountedImages.map(decodeMountedImage))
      .then(nextPaint)
      .then(() => {
        if (active) onReady();
      })
      .catch((cause) => {
        if (active) {
          setLoadError(cause instanceof Error ? cause : new Error(String(cause)));
        }
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
      <div>
        <KoreaHeader c={c} />
        <main id="main">
          <KoreaHero c={c} />
          <KoreaHighlights c={c} />
          <KoreaPartners c={c} />
          <KoreaVisit c={c} />
          <KoreaQuestions c={c} />
          <KoreaFooter c={c} />
        </main>
      </div>
    </div>
  );
}
