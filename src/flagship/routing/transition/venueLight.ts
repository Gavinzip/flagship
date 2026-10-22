/** Locate the filmed doorway after object-fit cropping, including portrait screens. */
function positionDoorLight(light: HTMLElement, host: HTMLElement, video: HTMLVideoElement) {
  const width = host.clientWidth;
  const height = host.clientHeight;
  if (!width || !height || !video.videoWidth || !video.videoHeight) {
    throw new Error("The venue light cannot align with an unmeasured video.");
  }
  const [positionX, positionY] = getComputedStyle(video).objectPosition
    .split(" ").map(value => Number.parseFloat(value) / 100);
  if (!Number.isFinite(positionX) || !Number.isFinite(positionY)) {
    throw new Error("The venue video position is invalid.");
  }
  const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
  const renderedWidth = video.videoWidth * scale;
  const renderedHeight = video.videoHeight * scale;
  // The selected cut's right-hand threshold lights the scene before the lens sees deep into the hall.
  light.style.setProperty("--arrival-light-x", `${(width - renderedWidth) * positionX + renderedWidth * .60}px`);
  light.style.setProperty("--arrival-light-y", `${(height - renderedHeight) * positionY + renderedHeight * .72}px`);
}

/** Carry the final approach into the entrance's own warm light. */
export async function bloomVenueLight(host: HTMLElement, video: HTMLVideoElement, signal: AbortSignal) {
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  const light = host.querySelector<HTMLElement>(".thailand-arrival-light");
  if (!light) throw new Error("The venue entrance light is missing.");
  positionDoorLight(light, host, video);
  light.style.visibility = "visible";
  light.dataset.phase = "blooming";
  const animation = light.animate([
    { opacity: .03, transform: "scale(1)", offset: 0 },
    { opacity: .28, transform: "scale(2.5)", offset: .3 },
    { opacity: .78, transform: "scale(10)", offset: .72 },
    { opacity: 1, transform: "scale(24)" },
  ], { duration: 470, easing: "cubic-bezier(.2,.7,.25,1)", fill: "both" });
  const abort = () => animation.cancel();
  signal.addEventListener("abort", abort, { once: true });
  try {
    await animation.finished;
    light.style.opacity = "1";
    light.style.transform = "scale(24)";
    light.dataset.phase = "held";
  } finally {
    signal.removeEventListener("abort", abort);
    animation.cancel();
  }
}

export function resetVenueLight(host: HTMLElement) {
  const light = host.querySelector<HTMLElement>(".thailand-arrival-light");
  if (!light) return;
  light.removeAttribute("style");
  light.dataset.phase = "idle";
}
