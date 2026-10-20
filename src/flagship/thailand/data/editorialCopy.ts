import type { SiteLanguage } from "../../data/copy";

export const editorialCopy = {
  "zh-TW": {
    heroDate: "28–29 NOV 2026", explore: "探索卡展", tables: "規劃攤商桌", booths: "規劃品牌展位", visitors: "預計參觀人次",
    filmTitle: "卡展亮點", filmIntro: "從收藏家交流到品牌展位，帶你認識 FLAGSHIP 的現場。",
    playHint: "滑鼠移到畫面，即自動播放台灣站現場回顧。泰國站完整節目將陸續公布。",
    filmSource: "FLAGSHIP TAIWAN 2026 現場回顧",
    venueTitle: "同一天，同一座會場。",
    venueContext: "與 Binance Blockchain Week 同期於 QSNCC 舉行。",
    transit: "MRT 藍線 · Queen Sirikit National Convention Centre 站 · 3 號出口", venuePhoto: "QSNCC 官方場館照片",
    venueExterior: "場館外觀 · QSNCC", venueInterior: "展場內部 · EVENT HALL B2", venueExteriorAlt: "QSNCC 正面玻璃外牆、場館招牌與入口廣場",
    footer: "SEE YOU IN BANGKOK.", social: "官方最新公告", faq: "常見問題",
  },
  en: {
    heroDate: "28–29 NOV 2026", explore: "Explore the show", tables: "Planned vendor tables", booths: "Planned exhibitor booths", visitors: "Expected visitors",
    filmTitle: "The card show experience.", filmIntro: "From collector encounters to brand booths, discover the FLAGSHIP experience.",
    playHint: "Hover over a film to play the Taiwan recap automatically. The full Thailand programme will be announced.",
    filmSource: "FLAGSHIP TAIWAN 2026 — THE RECAP",
    venueTitle: "Two big shows. Same venue.",
    venueContext: "At QSNCC on the same dates as Binance Blockchain Week.",
    transit: "MRT BLUE LINE · Queen Sirikit National Convention Centre station · Exit 3", venuePhoto: "Official QSNCC venue photo",
    venueExterior: "QSNCC · THE VENUE", venueInterior: "INSIDE EVENT HALL B2", venueExteriorAlt: "QSNCC glass facade, venue sign and entrance plaza",
    footer: "SEE YOU IN BANGKOK.", social: "Official updates", faq: "Before you visit.",
  },
  ko: {
    heroDate: "28–29 NOV 2026", explore: "카드쇼 둘러보기", tables: "예정 벤더 테이블", booths: "예정 브랜드 부스", visitors: "예상 방문 인원",
    filmTitle: "카드쇼 하이라이트", filmIntro: "수집가 교류부터 브랜드 부스까지, FLAGSHIP 현장을 만나보세요.",
    playHint: "영상 위에 마우스를 올리면 대만 행사 영상이 자동 재생됩니다. 태국 전체 프로그램은 추후 공개됩니다.",
    filmSource: "FLAGSHIP TAIWAN 2026 현장 하이라이트",
    venueTitle: "같은 날, 같은 장소에서.",
    venueContext: "Binance Blockchain Week와 같은 날짜에 QSNCC에서 열립니다.",
    transit: "MRT 블루라인 · Queen Sirikit National Convention Centre역 · 3번 출구", venuePhoto: "QSNCC 공식 행사장 사진",
    venueExterior: "QSNCC · 행사장 외관", venueInterior: "행사장 내부 · EVENT HALL B2", venueExteriorAlt: "QSNCC 유리 외벽, 행사장 간판과 입구 광장",
    footer: "SEE YOU IN BANGKOK.", social: "공식 소식", faq: "자주 묻는 질문",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

export type EditorialCopy = typeof editorialCopy[SiteLanguage];
