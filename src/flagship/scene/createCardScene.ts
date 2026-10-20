import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  PMREMGenerator,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  DirectionalLight,
  ACESFilmicToneMapping,
  SRGBColorSpace,
} from "three";
import { createCardHolder } from "./createCardHolder";
import { cardHolderSpec as spec } from "./cardHolderSpec";

export interface CardScene {
  setActive(active: boolean): void;
  setPaused(paused: boolean): void;
  setAccent(color: string): void;
  dispose(): void;
}

/** Reflections come from authored studio strips, not a texture painted on the model. */
function reflectionStudio() {
  const scene = new Scene();
  scene.background = new Color("#b3cbe3");
  const panels: Array<
    [number, number, number, number, number, string, number]
  > = [
    [-4, 1, 4, 1.1, 8, "#f3f7ff", 3],
    [4, 0, 3, 1.1, 7, "#c5dcff", 4],
    [0, 5, 1, 7, 2, "#ffffff", 5],
    [0, -4, 2, 6, 1, "#e8f0ff", 3],
    [1, 1, -5, 2, 8, "#92b7ff", 4],
    [-1, 0, 5, 0.2, 6, "#ffffff", 6],
    [-2.5, 0, 4, 1.3, 8, "#12243b", 0.5],
    [2, 1, 4, 0.6, 7, "#183b60", 0.5],
  ];
  panels.forEach(([x, y, z, w, h, color, power]) => {
    const panel = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({ color: new Color(color).multiplyScalar(power) }),
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    scene.add(panel);
  });
  return scene;
}

export async function createCardScene(
  host: HTMLDivElement,
  onError: () => void,
  signal: AbortSignal,
): Promise<CardScene> {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, spec.performance.maxDpr));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.setClearColor(0, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 40);
  const holder = createCardHolder();
  scene.add(holder.root);
  const studio = reflectionStudio();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.025, 0.1, 30);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.9;
  studio.traverse((o) => {
    if (o instanceof Mesh) {
      o.geometry.dispose();
      (o.material as MeshBasicMaterial).dispose();
    }
  });
  pmrem.dispose();
  const key = new DirectionalLight("#f0f6ff", 2.2);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new DirectionalLight("#4f8fff", 2);
  rim.position.set(4, -1, -2);
  scene.add(rim);

  let disposed = false,
    active = false,
    paused = false,
    frame = 0,
    time = 0,
    last = 0;
  let pointerX = 0,
    pointerY = 0;
  let drawCount = 0,
    costTotal = 0,
    costMax = 0;
  function metrics(ms: number) {
    drawCount++;
    costTotal += ms;
    costMax = Math.max(costMax, ms);
    if (drawCount % 40 === 1) {
      host.dataset.renderStats = JSON.stringify({
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        frames: drawCount,
        cpuMeanMs: +(costTotal / drawCount).toFixed(2),
        cpuMaxMs: +costMax.toFixed(2),
      });
    }
  }
  function render() {
    if (disposed) return;
    const start = performance.now();
    renderer.render(scene, camera);
    metrics(performance.now() - start);
  }
  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    const viewHeight = Math.max(5.25, 3.9 / camera.aspect);
    camera.position.set(
      0,
      0,
      viewHeight / (2 * Math.tan((32 * Math.PI) / 360)),
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  }
  function loop(now: number) {
    frame = 0;
    if (disposed || !active || paused || document.hidden) return;
    const elapsed = now - last;
    if (elapsed >= 1000 / spec.performance.targetFps) {
      time += Math.min(elapsed, 40) / 1000;
      last = now;
      holder.root.rotation.set(
        spec.rotation[0] + Math.sin(time * 0.35) * 0.045 + pointerY * 0.05,
        spec.rotation[1] + Math.sin(time * 0.28) * 0.095 + pointerX * 0.14,
        spec.rotation[2] + Math.sin(time * 0.24) * 0.022,
      );
      holder.root.position.y = Math.sin(time * 0.4) * 0.055;
      render();
    }
    frame = requestAnimationFrame(loop);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (active && !paused && !document.hidden && !disposed) {
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }
  }
  function pointer(event: PointerEvent) {
    if (event.pointerType !== "mouse" || paused) return;
    const b = host.getBoundingClientRect();
    pointerX = (event.clientX - b.left) / b.width - 0.5;
    pointerY = (event.clientY - b.top) / b.height - 0.5;
  }
  function resetPointer() {
    pointerX = 0;
    pointerY = 0;
  }
  function lost(event: Event) {
    event.preventDefault();
    cancelAnimationFrame(frame);
    active = false;
    onError();
  }
  host.addEventListener("pointermove", pointer);
  host.addEventListener("pointerleave", resetPointer);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", sync);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  signal.addEventListener("abort", dispose, { once: true });
  resize();
  try {
    await renderer.compileAsync(scene, camera);
    render();
  } catch (error) {
    dispose();
    throw error;
  }
  if (signal.aborted) {
    dispose();
    throw new DOMException("Scene cancelled", "AbortError");
  }
  host.appendChild(renderer.domElement);
  host.dataset.sceneId = crypto.randomUUID();
  host.dataset.warmupMs = costTotal.toFixed(2);
  drawCount = 0;
  costTotal = 0;
  costMax = 0;
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    host.removeEventListener("pointermove", pointer);
    host.removeEventListener("pointerleave", resetPointer);
    document.removeEventListener("visibilitychange", sync);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    signal.removeEventListener("abort", dispose);
    holder.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }
  return {
    setAccent(color) {
      holder.setAccent(color);
      render();
    },
    setActive(value) {
      active = value;
      sync();
    },
    setPaused(value) {
      paused = value;
      sync();
      if (paused) {
        holder.root.rotation.set(...spec.rotation);
        holder.root.position.y = 0;
        render();
      }
    },
    dispose,
  };
}
