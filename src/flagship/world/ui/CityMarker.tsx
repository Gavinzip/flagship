import { ArrowUpRight } from "iconoir-react";
import { SiteLink } from "../../routing/SiteNavigation";
import { MetalBorder } from "../../home/ui/MetalBorder";
import { worldSpec, type CityId } from "../config/worldSpec";
import type { SiteLanguage } from "../../data/copy";
import { WorldEventFacts } from "./WorldEventFacts";
import { WorldEventMarks } from "./WorldEventMarks";
import { worldEventCopy } from "./worldEventCopy";
import "./city-marker.css";

const names = {
  thailand: { country: "THAILAND", city: "BANGKOK", code: "TH" },
  taiwan: { country: "TAIWAN", city: "TAIPEI", code: "TW" },
} as const;

/** The scene projects the link onto the city; the leader ends at that exact point. */
export function CityMarker({ city, status, action, language }: { city: CityId; status: string; action: string; language: SiteLanguage }) {
  const place = names[city];
  const coordinates = worldSpec.cities[city];
  const eventCopy = worldEventCopy(language);
  const linkLabel = city === "thailand" ? eventCopy.cta : action;
  return <SiteLink page={city} data-city={city} className={`world-city world-city--${city} ip-metal-control`} aria-label={`${place.city} · ${linkLabel}`}>
    {city === "thailand" && <span className="world-city-beacon" aria-hidden="true" />}
    <svg className="world-city-leader" viewBox="0 0 30 24" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path className="world-city-leader-side" d="M0 24H10L30 4" vectorEffect="non-scaling-stroke" />
      <path className="world-city-leader-above" d="M15 24V0" vectorEffect="non-scaling-stroke" />
    </svg>
    <span className="world-city-aura" aria-hidden="true" />
    <MetalBorder />
    <span className="world-city-panel">
      <span className="world-city-meta"><span>{place.code} / {place.city}</span><ArrowUpRight aria-hidden="true" /></span>
      <strong className="world-city-name">{place.country}</strong>
      {city === "thailand" ? <>
        <WorldEventFacts language={language} compact />
        <WorldEventMarks />
        <span className="world-city-event-link">{eventCopy.cta}<ArrowUpRight aria-hidden="true" /></span>
      </> : <><span className="world-city-status">{status}</span>
      <span className="world-city-coordinates" aria-hidden="true">
        <span>{coordinates.latitude.toFixed(3)}° N</span><span>{coordinates.longitude.toFixed(3)}° E</span>
      </span></>}
    </span>
  </SiteLink>;
}
