import { useEffect, useState, type RefObject } from "react";
import { nextPaint } from "../routing/preloadImage";

function decodeMountedImage(image: HTMLImageElement) {
  return new Promise<void>((resolve, reject) => {
    const decode = async () => {
      try { await image.decode(); }
      catch {
        if (!image.naturalWidth) {
          reject(new Error(`Image could not be decoded: ${image.currentSrc || image.src}`));
          return;
        }
      }
      resolve();
    };
    if (image.complete) { void decode(); return; }
    image.addEventListener("load", () => void decode(), { once: true });
    image.addEventListener("error", () => reject(new Error(`Image could not be loaded: ${image.currentSrc || image.src}`)), { once: true });
  });
}

/** Both event layouts keep their hero covered until their real images have decoded. */
export function useEventReady(root: RefObject<HTMLElement | null>, onReady: () => void) {
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let active = true;
    const images = Array.from(root.current?.querySelectorAll<HTMLImageElement>(".ev-environment img, .ev-hero img") ?? []);
    void Promise.all(images.map(decodeMountedImage)).then(nextPaint).then(() => {
      if (active) onReady();
    }).catch(cause => {
      if (active) setError(cause instanceof Error ? cause : new Error(String(cause)));
    });
    return () => { active = false; };
  }, [onReady, root]);
  if (error) throw error;
}
