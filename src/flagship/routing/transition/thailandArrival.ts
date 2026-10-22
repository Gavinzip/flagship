import { entryMotion } from "../../world/config/entryMotion";
import { nextPaint } from "./transferRuntime";
import { venuePlayback, venuePlaybackRate } from "./venuePlayback";
import { bloomVenueLight, resetVenueLight } from "./venueLight";

const aborted = () => new DOMException("Aborted", "AbortError");

function waitForVideo(video: HTMLVideoElement, signal: AbortSignal, ready: () => boolean, events: string[], timeoutMs = 15000) {
  return new Promise<void>((resolve, reject) => {
    const finish = (error?: Error) => {
      clearTimeout(timer);
      events.forEach(event => video.removeEventListener(event, check));
      video.removeEventListener("error", failed);
      signal.removeEventListener("abort", abort);
      error ? reject(error) : resolve();
    };
    const check = () => { if (ready()) finish(); };
    const failed = () => finish(new Error("QSNCC arrival video could not be decoded."));
    const abort = () => finish(aborted());
    const timer = window.setTimeout(() => finish(new Error("QSNCC arrival video timed out.")), timeoutMs);
    events.forEach(event => video.addEventListener(event, check));
    video.addEventListener("error", failed);
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) abort();
    else if (video.error) failed();
    else check();
  });
}

/** Warm the actual decoder/compositor, then park on frame zero before the globe departs. */
export async function prepareThailandArrival(video: HTMLVideoElement, signal: AbortSignal, onBufferProgress: (coverage: number) => void) {
  video.muted = true;
  video.pause();
  if (video.error) video.load();
  video.dataset.preparationStage = "buffering";
  const bufferedCoverage = () => {
    if (!Number.isFinite(video.duration) || !video.duration || !video.buffered.length || video.buffered.start(0) > .05) return 0;
    const end = video.buffered.end(0);
    return end >= video.duration - .025 ? 1 : end / video.duration;
  };
  const bufferProgress = () => onBufferProgress(bufferedCoverage() * .98);
  video.addEventListener("progress", bufferProgress);
  video.addEventListener("loadeddata", bufferProgress);
  video.addEventListener("timeupdate", bufferProgress);
  try {
    bufferProgress();
    // Passive preload often stops around half the clip. Play the hidden muted
    // element during admission so the browser actually fills the opening buffer.
    // The exact same element is rewound and reused for the visible arrival.
    const buffered = waitForVideo(video, signal,
      () => video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA && bufferedCoverage() >= .75,
      ["loadeddata", "canplay", "canplaythrough", "progress", "timeupdate"], 45000);
    await Promise.all([video.play(), buffered]);
  } finally {
    video.pause();
    video.removeEventListener("progress", bufferProgress);
    video.removeEventListener("loadeddata", bufferProgress);
    video.removeEventListener("timeupdate", bufferProgress);
  }
  video.dataset.preparationStage = "decoding";
  if (video.currentTime !== 0) {
    video.currentTime = 0;
    await waitForVideo(video, signal, () => !video.seeking, ["seeked"]);
  }
  await new Promise<void>((resolve, reject) => {
    let frame = 0;
    const finish = (error?: unknown) => {
      clearTimeout(timer);
      video.cancelVideoFrameCallback(frame);
      signal.removeEventListener("abort", abort);
      video.pause();
      error ? reject(error) : resolve();
    };
    const abort = () => finish(aborted());
    const timer = window.setTimeout(() => finish(new Error("QSNCC first frame did not render.")), 15000);
    signal.addEventListener("abort", abort, { once: true });
    frame = video.requestVideoFrameCallback(() => finish());
    if (signal.aborted) abort();
    else void video.play().catch(finish);
  });
  if (video.currentTime !== 0) {
    video.currentTime = 0;
    await waitForVideo(video, signal, () => !video.seeking, ["seeked"]);
  }
  video.dataset.prepared = "true";
  video.dataset.preparationStage = "ready";
  onBufferProgress(1);
}

async function fadeFilm(host: HTMLElement, signal: AbortSignal) {
  if (signal.aborted) throw aborted();
  // Dissolve the held warm final frame over the entire live page. The previous
  // 200 ms ease-out exposed most of the site immediately and read as a cut.
  const animation = host.animate([{ opacity: 1 }, { opacity: .01 }], {
    duration: 700, easing: "cubic-bezier(.4,0,.2,1)", fill: "both",
  });
  const abort = () => animation.cancel();
  signal.addEventListener("abort", abort, { once: true });
  try {
    await animation.finished;
    host.style.visibility = "hidden";
  } finally {
    signal.removeEventListener("abort", abort);
    animation.cancel();
  }
}

/** Keep the existing globe clock/camera; substitute the destination after that flight. */
export async function thailandArrival({ host, video, signal, depart, onPlayback, onReveal }: {
  host: HTMLElement;
  video: HTMLVideoElement;
  signal: AbortSignal;
  depart: (advance: (progress: number) => void) => Promise<void>;
  onPlayback: () => void;
  onReveal: () => void;
}) {
  const route = document.querySelector<HTMLElement>(".edition-route-plane");
  const world = document.querySelector<HTMLElement>(".brand-world-retainer");
  if (!route || !world) throw new Error("The QSNCC arrival target is missing.");
  const oldWorldStyle = world.getAttribute("style");
  const oldRouteVisibility = route.style.visibility;
  const restoreWorld = () => {
    if (oldWorldStyle === null) world.removeAttribute("style");
    else world.setAttribute("style", oldWorldStyle);
  };
  const playback = new AbortController();
  const interrupt = () => playback.abort();
  signal.addEventListener("abort", interrupt, { once: true });
  let rateFrame = 0;
  let lightTask: Promise<{ ok: true } | { ok: false; error: unknown }> | undefined;
  let playbackTask: Promise<{ ok: true } | { ok: false; error: unknown }> | undefined;
  const startDoorLight = () => {
    if (lightTask) return;
    lightTask = bloomVenueLight(host, video, playback.signal).then(
      () => ({ ok: true as const }),
      error => ({ ok: false as const, error }),
    );
  };
  const accelerate = () => {
    if (video.ended || playback.signal.aborted) return;
    video.playbackRate = venuePlaybackRate(video.currentTime, video.duration);
    // Carry motion straight into the entrance light while every source frame
    // still plays. The light begins at the filmed floor near the doorway.
    if (video.currentTime >= venuePlayback.doorLightAt) startDoorLight();
    rateFrame = requestAnimationFrame(accelerate);
  };
  const startFlight = () => {
    if (playbackTask) return;
    video.playbackRate = venuePlayback.initialRate;
    rateFrame = requestAnimationFrame(accelerate);
    const ended = waitForVideo(video, playback.signal, () => video.ended, ["ended"]);
    // Capture early playback failure while the globe is still on its own clock;
    // propagate it below rather than leaving an unhandled rejection between frames.
    playbackTask = Promise.all([video.play(), ended]).then(
      () => ({ ok: true as const }),
      error => ({ ok: false as const, error }),
    );
  };
  let completed = false;
  try {
    await depart(progress => {
      // Start behind the globe before the crossfade. A visible venue frame is
      // already moving, instead of holding still until departure completes.
      if (progress >= .42) startFlight();
      const t = Math.max(0, Math.min(1, (progress - entryMotion.revealStart) / (entryMotion.revealEnd - entryMotion.revealStart)));
      const fade = t * t * (3 - 2 * t);
      if (t > 0) host.style.visibility = "visible";
      host.style.opacity = String(.01 + .99 * fade);
      world.style.opacity = String(1 - .99 * fade);
    });
    if (signal.aborted) throw aborted();
    startFlight();
    onPlayback();
    const result = await playbackTask;
    if (!result?.ok) throw result?.error ?? new Error("QSNCC flight did not start.");
    if (signal.aborted) throw aborted();
    // The source always finishes before revealing the website. Its warm light
    // overlaps the approach so there is no parked doorway between the shots.
    startDoorLight();
    const lightResult = await lightTask;
    if (!lightResult?.ok) throw lightResult?.error ?? new Error("QSNCC entrance light did not start.");
    route.style.visibility = "visible";
    onReveal();
    await nextPaint();
    await fadeFilm(host, signal);
    completed = true;
  } finally {
    signal.removeEventListener("abort", interrupt);
    playback.abort();
    cancelAnimationFrame(rateFrame);
    video.pause();
    video.playbackRate = 1;
    if (video.currentTime !== 0) video.currentTime = 0;
    resetVenueLight(host);
    if (!completed) {
      host.style.visibility = "hidden";
      route.style.visibility = oldRouteVisibility;
      restoreWorld();
    }
  }
}
