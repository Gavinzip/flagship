import { useRef, useState } from "react";
import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { floorPlanAsset } from "../data/floorPlanAsset";
import { floorPlanCopy } from "../data/floorPlanCopy";
import { ThailandFloorPlanDialog } from "./ThailandFloorPlanDialog";
import "../styles/floor-plan.css";

export function ThailandFloorPlan({ language }: { language: SiteLanguage }) {
  const copy = floorPlanCopy[language];
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return <div id="floor-plan" className="th-floor-plan" aria-labelledby="th-floor-title">
    <div className="th-floor-heading" data-th-reveal="0">
      <div><span className="th-eyebrow">B2 / FLOOR PLAN</span><h3 id="th-floor-title">{copy.title}</h3><p>{copy.body}</p></div>
      <span className="th-floor-status"><i aria-hidden="true" />{copy.status}</span>
    </div>
    <figure className="th-floor-figure" data-th-reveal="60">
      <button ref={opener} className="th-floor-preview" onClick={() => setOpen(true)} aria-label={copy.open} aria-haspopup="dialog">
        <span className="th-floor-image"><img src={floorPlanAsset.image} alt={copy.alt} width={floorPlanAsset.width} height={floorPlanAsset.height} loading="lazy" decoding="async" /></span>
        <span className="th-floor-open">{copy.open}<ArrowUpRight /></span>
      </button>
      <figcaption><ul className="th-floor-legend">{copy.legend.map((item, i) => <li key={item}><i className={`th-floor-swatch th-floor-swatch--${i}`} aria-hidden="true" />{item}</li>)}</ul><p>{copy.note}</p></figcaption>
    </figure>
    <ThailandFloorPlanDialog open={open} close={() => setOpen(false)} copy={copy} returnFocus={() => opener.current?.focus({ preventScroll: true })} />
  </div>;
}
