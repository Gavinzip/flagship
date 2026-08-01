import { useEffect, useState } from "react";
import { siteImageUrls } from "../config/media";

export type SiteReadiness =
  | {
      status: "loading";
      completed: number;
      total: number;
      progress: number;
      failedUrls: readonly [];
    }
  | {
      status: "ready";
      completed: number;
      total: number;
      progress: 100;
      failedUrls: readonly [];
    }
  | {
      status: "error";
      completed: number;
      total: number;
      progress: number;
      failedUrls: readonly string[];
    };

function preloadImage(url: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";

    image.addEventListener(
      "load",
      async () => {
        try {
          await image.decode();
        } catch {
          if (!image.naturalWidth) {
            reject(new Error(`Image could not be decoded: ${url}`));
            return;
          }
        }
        resolve();
      },
      { once: true },
    );

    image.addEventListener(
      "error",
      () => reject(new Error(`Image could not be loaded: ${url}`)),
      { once: true },
    );

    image.src = url;
  });
}

function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function useSiteReadiness(): SiteReadiness {
  const total = siteImageUrls.length;
  const [readiness, setReadiness] = useState<SiteReadiness>({
    status: "loading",
    completed: 0,
    total,
    progress: 0,
    failedUrls: [],
  });

  useEffect(() => {
    let active = true;
    let completed = 0;

    const updateProgress = () => {
      completed += 1;
      if (!active) return;

      setReadiness({
        status: "loading",
        completed,
        total,
        progress: Math.round((completed / total) * 100),
        failedUrls: [],
      });
    };

    const prepareSite = async () => {
      const results = await Promise.allSettled(
        siteImageUrls.map(async (url) => {
          try {
            await preloadImage(url);
          } finally {
            updateProgress();
          }
          return url;
        }),
      );

      const failedUrls = results.flatMap((result, index) =>
        result.status === "rejected" ? [siteImageUrls[index]] : [],
      );

      if (!active) return;

      if (failedUrls.length) {
        setReadiness({
          status: "error",
          completed,
          total,
          progress: Math.round((completed / total) * 100),
          failedUrls,
        });
        return;
      }

      await document.fonts?.ready;
      await nextPaint();

      if (active) {
        setReadiness({
          status: "ready",
          completed: total,
          total,
          progress: 100,
          failedUrls: [],
        });
      }
    };

    void prepareSite();

    return () => {
      active = false;
    };
  }, [total]);

  return readiness;
}
