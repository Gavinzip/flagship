import { useEffect, useState } from "react";
import {
  siteImagePreloads,
  type SiteImagePreload,
} from "../config/media";

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

function preloadImage({ src, srcSet, sizes }: SiteImagePreload) {
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
            reject(new Error(`Image could not be decoded: ${src}`));
            return;
          }
        }
        resolve();
      },
      { once: true },
    );

    image.addEventListener(
      "error",
      () => reject(new Error(`Image could not be loaded: ${src}`)),
      { once: true },
    );

    if (srcSet) image.srcset = srcSet;
    if (sizes) image.sizes = sizes;
    image.src = src;
  });
}

function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function useSiteReadiness(): SiteReadiness {
  const total = siteImagePreloads.length;
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
      const resources = [
        ...siteImagePreloads.map((image) => ({
          label: image.label,
          prepare: () => preloadImage(image),
        })),
      ];
      const results = await Promise.allSettled(
        resources.map(async ({ prepare }) => {
          try {
            await prepare();
          } finally {
            updateProgress();
          }
        }),
      );

      const failedUrls = results.flatMap((result, index) =>
        result.status === "rejected" ? [resources[index].label] : [],
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
