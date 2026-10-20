import { useEffect, useRef, useState } from "react";
import LightRays from "../../motion/react-bits/light-rays/LightRays";

/** Mount the shader on first approach; LightRays pauses itself outside the viewport. */
export function ThailandPartnerLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const layer = lightRef.current;
    if (!layer) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: "120px 0px" });
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  return <div ref={lightRef} className="th-partner-light" aria-hidden="true">
    {ready && <LightRays
      raysOrigin="top-left"
      raysColor="#f4f0e6"
      raysSpeed={0.28}
      tilt={-28}
      lightSpread={0.6}
      rayLength={1.8}
      rayDensity={1.65}
      raySharpness={0.68}
      glow={0.08}
      haze={0.14}
      atmosphere={0}
      intensity={1.05}
      opacity={0.55}
      fadeDistance={1.05}
      followMouse
      mouseInfluence={0.32}
      cursorShadow
      clickPulse
      intro={false}
      maxDevicePixelRatio={1}
    />}
  </div>;
}
