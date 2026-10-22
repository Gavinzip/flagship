import type { SiteLanguage } from "../../data/copy";

export type VenueEventId = "flagship" | "bbw";

export const venueExplorerCopy = {
  "zh-TW": {
    expectedVisitors: "預計人流", estimateShort: "預計", visitorUnit: "人",
    heading: ["同一天，", "同一座會場"],
    instruction: "點選活動 Logo 或建築上的黃色區域，看看兩場活動的樓層資訊。",
    diagram: "樓層關係示意；實際動線請依場館與活動標示。",
    details: "活動樓層資訊", source: "QSNCC 場館照片", exteriorAlt: "QSNCC 建築、周邊道路與曼谷城市天際線的黃昏鳥瞰照片", interior: "看看 B2 展場", official: "Blockchain Week 官方活動",
    flagship: { floor: "地下二樓", body: "帶上卡冊，到 B2 的 Event Hall 逛卡展、看收藏，認識同樣喜歡卡牌的人。" },
    bbw: { floor: "G 樓", body: "Binance Blockchain Week 同期在 QSNCC 的 Exhibition Hall 3 舉行。兩場活動的入場方式請各自確認。" },
  },
  en: {
    expectedVisitors: "Expected visitors", estimateShort: "EST.", visitorUnit: "visitors",
    heading: ["Two big shows.", "Same venue."],
    instruction: "Select an event logo or a yellow area on the building to explore each event’s floor.",
    diagram: "Floor relationship diagram. Follow venue and event signs on arrival.",
    details: "Event floor information", source: "QSNCC venue photo", exteriorAlt: "Aerial photograph of QSNCC, surrounding streets and the Bangkok skyline at dusk", interior: "Explore the B2 hall", official: "Blockchain Week official event",
    flagship: { floor: "Basement level 2", body: "Bring your collection to Event Hall on B2. Browse cards, discover collectibles and meet fellow collectors." },
    bbw: { floor: "Ground level", body: "Binance Blockchain Week takes place at Exhibition Hall 3 in QSNCC on the same dates. Each event has its own admission arrangements." },
  },
  ko: {
    expectedVisitors: "예상 방문 인원", estimateShort: "예상", visitorUnit: "명",
    heading: ["같은 날,", "같은 장소에서."],
    instruction: "행사 로고나 건물의 노란 영역을 눌러 각 행사의 층별 정보를 살펴보세요.",
    diagram: "층별 위치 관계를 보여 주는 개념도입니다. 현장 안내 표지를 따라 이동해 주세요.",
    details: "행사 층별 안내", source: "QSNCC 행사장 사진", exteriorAlt: "해 질 무렵 QSNCC 건물과 주변 도로, 방콕 스카이라인의 항공 사진", interior: "B2 행사장 둘러보기", official: "Blockchain Week 공식 행사",
    flagship: { floor: "지하 2층", body: "컬렉션을 들고 B2층 Event Hall에서 카드와 수집품을 둘러보고 다른 수집가들을 만나보세요." },
    bbw: { floor: "G층", body: "Binance Blockchain Week는 같은 날짜에 QSNCC Exhibition Hall 3에서 열립니다. 각 행사의 입장 안내를 별도로 확인해 주세요." },
  },
  th: {
    expectedVisitors: "ผู้เข้าชมที่คาดไว้", estimateShort: "คาดการณ์", visitorUnit: "คน",
    heading: ["วันเดียวกัน", "สถานที่เดียวกัน"],
    instruction: "แตะโลโก้งานหรือพื้นที่สีเหลืองบนอาคารเพื่อดูชั้นที่จัดแต่ละงาน",
    diagram: "ภาพแสดงความสัมพันธ์ของชั้น โปรดเดินตามป้ายสถานที่และป้ายงานเมื่อมาถึง",
    details: "ข้อมูลชั้นจัดงาน", source: "ภาพสถานที่ QSNCC", exteriorAlt: "ภาพมุมสูงของ QSNCC ถนนโดยรอบ และเส้นขอบฟ้ากรุงเทพฯ ยามเย็น", interior: "ชม Event Hall ชั้น B2", official: "เว็บไซต์ทางการ Blockchain Week",
    flagship: { floor: "ชั้นใต้ดิน 2", body: "หยิบแฟ้มการ์ดมาเดิน Event Hall ชั้น B2 ชมการ์ดและของสะสม พร้อมพบเพื่อนนักสะสม" },
    bbw: { floor: "ชั้น G", body: "Binance Blockchain Week จัดที่ Exhibition Hall 3 ใน QSNCC ในวันเดียวกัน โปรดตรวจสอบวิธีเข้าชมของแต่ละงานแยกกัน" },
  },
} satisfies Record<SiteLanguage, {
  heading: [string, string]; instruction: string; diagram: string; details: string; source: string; exteriorAlt: string; interior: string; official: string; expectedVisitors: string; estimateShort: string; visitorUnit: string;
  flagship: { floor: string; body: string }; bbw: { floor: string; body: string };
}>;
