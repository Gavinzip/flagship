import * as T from "three";
import type { WorldTheme } from "../config/appearance";
import { disposeObject } from "./protocol/dispose";
import { createEarth } from "./createEarth";
import {
  worldSpec,
  type CityId,
} from "../config/worldSpec";
import { journeyPose, cityIllumination } from "../runtime/journeyPose";
import { sampleFlight, type GlobeFlight } from "../runtime/flightRig";
import type { GeographicAnchor } from "../runtime/entryBridge";
import { createDepartureRig } from "../runtime/departureRig";
import { entryMotion } from "../config/entryMotion";
export type WorldRuntime = {
  update: (progress: number, city: CityId) => void;
  dispose: () => void;
  setTheme: (theme: WorldTheme) => void;
  flyTo: (city: CityId, signal: AbortSignal) => Promise<GeographicAnchor>;
  resume: () => void;
  depart: (signal: AbortSignal, advance: (progress: number) => void) => Promise<void>;
};
export async function mountWorld(
  host: HTMLElement,
  signal: AbortSignal,
  onError: (error: Error) => void,
  labels: HTMLElement[],
  initialProgress = 0,
  initialCity: CityId = "korea",
  initialTheme: WorldTheme = "light",
): Promise<WorldRuntime> {
  const renderer = new T.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(
    Math.min(
      devicePixelRatio,
      innerWidth < 700 ? worldSpec.dpr.mobile : worldSpec.dpr.desktop,
    ),
  );
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.append(canvas);
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(worldSpec.camera.fov, 1, 0.1, 30);
  const model = createEarth();
  scene.add(model.root);
  const ambient = new T.HemisphereLight("#b6d6ff", "#0b172b", 0.85);
  const key = new T.DirectionalLight("#edf0ff", 2.1);
  key.position.set(-3, 4, 4);
  const fill = new T.DirectionalLight("#7099ff", 1.0);
  fill.position.set(3, -1, 3);
  const rim = new T.DirectionalLight("#c64e77", 1.5);
  rim.position.set(-3, 1, -2);
  scene.add(ambient, key, fill, rim);
  let selectedCity = initialCity;
  let themeTarget = initialTheme === "dark" ? 1 : 0;
  let themeBlend = themeTarget;
  const view = journeyPose(initialProgress, selectedCity);
  let flight: GlobeFlight | null = null;
  let entering = false;
  let completeFlight: (() => void) | null = null;
  let interruptFlight: ((error: Error) => void) | null = null;
  const departure = createDepartureRig(() => wake());
  const atmosphere = model.root.getObjectByName("atmosphere") as T.Mesh<
    T.SphereGeometry,
    T.ShaderMaterial
  >;
  let frame = 0,
    disposed = false,
    visible = true,
    last = 0,
    target = initialProgress,
    smooth = initialProgress;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let cameraFit = 1;
  const pose = (dt = 1) => {
    const desired = flight
      ? sampleFlight(flight, reduced.matches ? 100 : dt)
      : entering
        ? view
        : journeyPose(smooth, selectedCity);
    for (const key of ["longitude", "latitude", "distance"] as const) {
      view[key] =
        reduced.matches || flight || entering
          ? desired[key]
          : T.MathUtils.damp(view[key], desired[key], 6, dt);
    }
    themeBlend = reduced.matches
      ? themeTarget
      : T.MathUtils.damp(themeBlend, themeTarget, 5, dt);
    ambient.intensity = T.MathUtils.lerp(1.05, 0.3, themeBlend);
    key.intensity = T.MathUtils.lerp(2.1, 1.75, themeBlend);
    renderer.toneMappingExposure = T.MathUtils.lerp(1.04, 0.96, themeBlend);
    atmosphere.material.uniforms.intensity.value = T.MathUtils.lerp(
      0.24,
      0.36,
      themeBlend,
    );
    model.root.rotation.set(
      (view.latitude * Math.PI) / 180,
      -Math.PI / 2 - (view.longitude * Math.PI) / 180,
      0,
    );
    const leaving = departure.update(dt);
    camera.position.z = T.MathUtils.lerp(
      view.distance * cameraFit,
      entryMotion.surfaceDistance,
      leaving,
    );
    host.dataset.entryProgress = leaving.toFixed(3);
    host.dataset.cameraDistance = camera.position.z.toFixed(3);
    host.dataset.longitude = view.longitude.toFixed(3);
    host.dataset.latitude = view.latitude.toFixed(3);
    for (const city of model.cities) {
      const alignment = Math.hypot(
        view.longitude - worldSpec.cities[selectedCity].longitude,
        view.latitude - worldSpec.cities[selectedCity].latitude,
      );
      const illumination =
        city.id === selectedCity
          ? cityIllumination(alignment)
          : 0;
      city.anchor.visible = illumination > 0.015 && !entering;
      city.core.scale.setScalar(1 + illumination * 0.15);
      city.halo.scale.setScalar(1 + illumination * 0.12);
      city.halo.material.opacity = 0.15 + illumination * 0.45;
      city.core.material.color
        .set(worldSpec.cities[city.id as "taiwan" | "korea"].color)
        .lerp(new T.Color("#ffffff"), illumination * 0.6);
    }
  };
  const size = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const fittedDistance =
      worldSpec.camera.minimumFrameDiameter /
      (2 *
        Math.tan((worldSpec.camera.fov * Math.PI) / 360) *
        Math.min(1, camera.aspect));
    cameraFit = Math.max(1, fittedDistance / worldSpec.arrivalDistance);
    camera.updateProjectionMatrix();
  };
  size();
  pose();
  let needsResize = false;
  const paintTimes: number[] = [];
  const render = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const paintStart = performance.now();
    // Changing the drawing-buffer dimensions clears it. Resize and redraw in
    // the same frame so the expanding entry canvas never presents an empty globe.
    if (needsResize) {
      size();
      needsResize = false;
    }
    const dt = Math.min(0.05, (time - last) / 1000);
    last = time;
    const destination = target;
    smooth = reduced.matches
      ? destination
      : T.MathUtils.damp(smooth, destination, 7, dt);
    pose(dt);
    renderer.render(scene, camera);
    model.root.updateMatrixWorld();
    for (let i = 0; i < model.cities.length; i++) {
      const city = model.cities[i],
        label = labels[i];
      if (!label) continue;
      const position = city.anchor.getWorldPosition(new T.Vector3()),
        normal = position.clone().normalize(),
        front =
          normal.dot(camera.position.clone().sub(position).normalize()) > 0.08;
      const projected = position.clone().project(camera);
      label.style.transform = `translate(${(projected.x * 0.5 + 0.5) * host.clientWidth}px,${(-projected.y * 0.5 + 0.5) * host.clientHeight}px)`;
      const alignment = Math.hypot(
        view.longitude - worldSpec.cities[selectedCity].longitude,
        view.latitude - worldSpec.cities[selectedCity].latitude,
      );
      const opacity =
        front && city.id === selectedCity
          ? cityIllumination(alignment)
          : 0;
      label.style.visibility = opacity > 0.015 ? "visible" : "hidden";
      label.style.opacity = String(opacity);
      label.style.pointerEvents = opacity > 0.8 ? "auto" : "none";
      label.inert = opacity <= 0.8;
      label.dataset.active = String(city.id === selectedCity);
    }
    if (flight && flight.elapsed >= flight.duration) {
      flight = null;
      const complete = completeFlight;
      completeFlight = null;
      complete?.();
    }
    paintTimes.push(performance.now() - paintStart);
    if (paintTimes.length > 240) paintTimes.shift();
    if (paintTimes.length % 15 === 0) {
      const sorted = [...paintTimes].sort((a, b) => a - b);
      host.dataset.renderP50 =
        sorted[Math.floor(sorted.length * 0.5)].toFixed(2);
      host.dataset.renderP95 =
        sorted[Math.floor(sorted.length * 0.95)].toFixed(2);
    }
    host.dataset.textures = String(renderer.info.memory.textures);
    host.dataset.progress = smooth.toFixed(3);
    host.dataset.calls = String(renderer.info.render.calls);
    host.dataset.triangles = String(renderer.info.render.triangles);
    const desired = entering ? view : journeyPose(smooth, selectedCity);
    const moving =
      Math.abs(view.longitude - desired.longitude) +
      Math.abs(view.latitude - desired.latitude) +
      Math.abs(view.distance - desired.distance);
    if (
      !reduced.matches &&
      (flight ||
        departure.active ||
        Math.abs(smooth - target) > 0.0001 ||
        moving > 0.001 ||
        Math.abs(themeBlend - themeTarget) > 0.001)
    )
      frame = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!frame && !disposed && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(render);
    }
  };
  const resize = new ResizeObserver(() => {
    needsResize = true;
    wake();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  observer.observe(host);
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    interruptFlight?.(new Error("The Protocol globe was interrupted."));
    departure.reset();
    cancelAnimationFrame(frame);
    resize.disconnect();
    observer.disconnect();
    document.removeEventListener("visibilitychange", wake);
    reduced.removeEventListener("change", wake);
    signal.removeEventListener("abort", dispose);
    canvas.removeEventListener("webglcontextlost", lost);
    disposeObject(model.root);
    renderer.dispose();
    if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
    canvas.remove();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    dispose();
    onError(new Error("The 3D globe was interrupted."));
  };
  canvas.addEventListener("webglcontextlost", lost);
  signal.addEventListener("abort", dispose, { once: true });
  document.addEventListener("visibilitychange", wake);
  reduced.addEventListener("change", wake);
  try {
    await renderer.compileAsync(scene, camera);
    if (signal.aborted) {
      dispose();
      throw new DOMException("Aborted", "AbortError");
    }
    renderer.render(scene, camera);
    wake();
    return {
      update: (p, city) => {
        if (entering) return;
        target = p;
        if (city !== selectedCity) {
          flight = {
            from: { ...view },
            city,
            elapsed: 0,
            duration: 1.35,
            toDistance: journeyPose(p, city).distance,
            entering: false,
          };
          selectedCity = city;
        }
        if (flight && !flight.entering)
          flight.toDistance = journeyPose(p, selectedCity).distance;
        wake();
      },
      flyTo: (city, travelSignal) =>
        new Promise((resolve, reject) => {
          if (travelSignal.aborted || disposed) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
          }
          entering = true;
          selectedCity = city;
          target = smooth = Math.max(smooth, 0.65);
          const stop = (error: Error) => {
            travelSignal.removeEventListener("abort", abort);
            flight = null;
            completeFlight = null;
            interruptFlight = null;
            entering = false;
            reject(error);
            wake();
          };
          const abort = () => stop(new DOMException("Aborted", "AbortError"));
          interruptFlight = stop;
          travelSignal.addEventListener("abort", abort, { once: true });
          completeFlight = () => {
            travelSignal.removeEventListener("abort", abort);
            interruptFlight = null;
            const targetCity = model.cities.find((value) => value.id === city)!;
            const point = targetCity.anchor
              .getWorldPosition(new T.Vector3())
              .project(camera);
            const bounds = host.getBoundingClientRect();
            resolve({
              x: bounds.left + (point.x * 0.5 + 0.5) * bounds.width,
              y: bounds.top + (-point.y * 0.5 + 0.5) * bounds.height,
            });
          };
          flight = {
            from: { ...view },
            city,
            elapsed: 0,
            duration: reduced.matches ? 0 : entryMotion.approachSeconds,
            toDistance: entryMotion.approachDistance,
            entering: true,
          };
          wake();
        }),
      resume: () => {
        interruptFlight?.(new DOMException("Aborted", "AbortError"));
        entering = false;
        flight = null;
        completeFlight = null;
        departure.reset();
        wake();
      },
      depart: (travelSignal, advance) => departure.run(travelSignal, reduced.matches, advance),
      setTheme: (theme) => {
        themeTarget = theme === "dark" ? 1 : 0;
        wake();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
