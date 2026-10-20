import { ArrowUpRight } from "iconoir-react";
import type { CityId } from "../config/worldSpec";
import type { HomeCopy } from "../../home/homeCopy";
import type { SiteLanguage } from "../../data/copy";
import { worldEditionCopy, worldEditionOrder } from "./worldEditionCopy";

export function CityNavigator({ city, select, copy, language }: { city: CityId; select: (city: CityId) => void; copy: HomeCopy; language: SiteLanguage }) {
  const entries = worldEditionCopy(copy, language);
  return <nav className="world-city-nav" data-visible="true" aria-label={copy.explore}>
    <p>{language === "zh-TW" ? "各地卡展 · 點選地區，或左右滑動地球" : language === "ko" ? "지역을 선택하거나 지구를 좌우로 밀어보세요" : "GLOBAL EDITIONS · SELECT A REGION OR SWIPE THE GLOBE"}</p>
    <div className="world-city-nav-row">
      {worldEditionOrder.map(id => <button key={id} className="world-edition-choice" aria-label={`${entries[id].status}: ${entries[id].country}`} aria-pressed={city === id} onClick={() => select(id)}>
        <span><small>{entries[id].status}</small><strong>{entries[id].country}</strong></span>
        <ArrowUpRight aria-hidden="true" />
      </button>)}
    </div>
  </nav>;
}
