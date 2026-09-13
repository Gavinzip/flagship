import { ArrowUpRight } from "iconoir-react";
import { SiteLink } from "../../routing/SiteNavigation";
import { MetalBorder } from "../../home/ui/MetalBorder";
import { worldSpec, type CityId } from "../config/worldSpec";
import "./city-marker.css";

const names = {
  korea: { country: "KOREA", city: "SEOUL", code: "KR" },
  taiwan: { country: "TAIWAN", city: "TAIPEI", code: "TW" },
} as const;

/** The scene projects the link onto the city; the leader ends at that exact point. */
export function CityMarker({ city, status, action }: { city: CityId; status: string; action: string }) {
  const place = names[city];
  const coordinates = worldSpec.cities[city];
  return <SiteLink page={city} className={`world-city world-city--${city} ip-metal-control`} aria-label={`${place.city} · ${action}`}>
    <svg className="world-city-leader" viewBox="0 0 30 24" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path className="world-city-leader-side" d="M0 24H10L30 4" vectorEffect="non-scaling-stroke" />
      <path className="world-city-leader-above" d="M15 24V0" vectorEffect="non-scaling-stroke" />
    </svg>
    <span className="world-city-aura" aria-hidden="true" />
    <MetalBorder />
    <span className="world-city-panel">
      <span className="world-city-meta"><span>{place.code} / {place.city}</span><ArrowUpRight aria-hidden="true" /></span>
      <strong className="world-city-name">{place.country}</strong>
      <span className="world-city-status">{status}</span>
      <span className="world-city-coordinates" aria-hidden="true">
        <span>{coordinates.latitude.toFixed(3)}° N</span><span>{coordinates.longitude.toFixed(3)}° E</span>
      </span>
    </span>
  </SiteLink>;
}
