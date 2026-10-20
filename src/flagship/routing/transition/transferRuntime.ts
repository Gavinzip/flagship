import type { EditionId } from "../../data/editions";
export function loadTransferImage(src: string, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    const done = (error?: Error) => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      image.onload = null;
      image.onerror = null;
      error ? reject(error) : resolve();
    };
    const abort = () => done(new DOMException("Aborted", "AbortError"));
    const timer = window.setTimeout(
      () => done(new Error("Image load timed out")),
      15000,
    );
    signal.addEventListener("abort", abort, { once: true });
    image.onload = () => done();
    image.onerror = () => done(new Error("Image load failed"));
    image.src = src;
    if (signal.aborted) abort();
    else if (image.complete && image.naturalWidth) done();
  });
}
export function editionFrame(edition: EditionId, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const done = (error?: Error) => {
      clearTimeout(timer);
      document.removeEventListener("flagship:edition-ready", check);
      signal.removeEventListener("abort", abort);
      error ? reject(error) : resolve();
    };
    const check = () => {
      const page = document.querySelector(`[data-active-edition="${edition}"]`);
      if (page && !page.querySelector("#site-content[inert]")) done();
    };
    const abort = () => done(new DOMException("Aborted", "AbortError"));
    const timer = window.setTimeout(
      () => done(new Error("Edition load timed out")),
      15000,
    );
    document.addEventListener("flagship:edition-ready", check);
    signal.addEventListener("abort", abort, { once: true });
    check();
    if (signal.aborted) abort();
  });
}
export const nextPaint = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
