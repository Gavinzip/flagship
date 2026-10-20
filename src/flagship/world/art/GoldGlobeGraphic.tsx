import { useId, useMemo } from "react";
import { goldGlobePaths } from "./goldGlobePaths";

/** The destination continues the same geographic dots after the live camera arrives. */
export function GoldGlobeGraphic() {
  const paths = useMemo(goldGlobePaths, []);
  const id = useId().replaceAll(":", "");
  return <svg className="gold-globe-graphic" viewBox="-30 -30 1060 1060" aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-surface`} cx="45%" cy="25%" r="75%">
        <stop stopColor="#fcd535" stopOpacity=".07" />
        <stop offset=".65" stopColor="#0b0d10" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".65" />
      </radialGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2=".8" y2="1">
        <stop stopColor="#ffe998" />
        <stop offset=".32" stopColor="#f0b90b" />
        <stop offset=".8" stopColor="#8b6812" />
        <stop offset="1" stopColor="#f0b90b" stopOpacity=".2" />
      </linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="0" x2=".8" y2="1">
        <stop stopColor="#fff2b5" />
        <stop offset=".4" stopColor="#f0b90b" />
        <stop offset=".7" stopColor="#f0b90b" stopOpacity=".04" />
        <stop offset="1" stopColor="#f0b90b" stopOpacity=".4" />
      </linearGradient>
    </defs>
    <circle cx="500" cy="500" r="500" fill={`url(#${id}-surface)`} />
    <path d={paths.ocean} fill="#f0b90b" opacity=".19" />
    <path d={paths.land} fill={`url(#${id}-gold)`} />
    <circle cx="500" cy="500" r="500" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.4" />
  </svg>;
}
