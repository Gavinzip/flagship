import { MetalBorder } from "../../home/ui/MetalBorder";
import { ArrowLeft, ArrowRight } from "iconoir-react";
import type { CityId } from "../config/worldSpec";
import type { HomeCopy } from "../../home/homeCopy";

export function CityNavigator({
  city,
  select,
  copy: c,
  language,
}: {
  city: CityId;
  select: (city: CityId) => void;
  copy: HomeCopy;
  language: string;
}) {
  const zh = language === "zh-TW";
  const ko = language === "ko";
  return (
    <nav className="world-city-nav" data-visible="true" aria-label={c.explore}>
      <p>
        {zh
          ? "各地卡展 · 點選地區，或左右滑動地球"
          : ko
            ? "지역별 행사 · 지역을 선택하거나 지구를 좌우로 밀어보세요"
            : "GLOBAL EDITIONS · SELECT A REGION OR SWIPE THE GLOBE"}
      </p>
      <div className="world-city-nav-row">
        <button
          className="world-edition-choice ip-metal-control"
          aria-label={zh ? "最新卡展：韓國" : ko ? "최신 행사: 한국" : "Latest edition: Korea"}
          aria-pressed={city === "korea"}
          onClick={() => select("korea")}
        >
          <MetalBorder />
          <ArrowLeft />
          <span>
            <small>{c.koreaStatus}</small>
            <strong>KOREA</strong>
          </span>
        </button>
        <button
          className="world-edition-choice ip-metal-control"
          aria-label={zh ? "前一次卡展：台灣" : ko ? "이전 행사: 대만" : "Previous edition: Taiwan"}
          aria-pressed={city === "taiwan"}
          onClick={() => select("taiwan")}
        >
          <MetalBorder />
          <span>
            <small>{zh ? "回看歷屆 · 2026" : ko ? "이전 행사 · 2026" : "PREVIOUS · 2026"}</small>
            <strong>TAIWAN</strong>
          </span>
          <ArrowRight />
        </button>
      </div>
    </nav>
  );
}
