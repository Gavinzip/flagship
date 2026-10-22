import type { SiteLanguage } from "../../data/copy";

export const floorPlanCopy = {
  "zh-TW": {
    title: "先看看場內怎麼逛", body: "從主入口、卡店桌位到品牌展區，先看一眼配置，再安排想逛的路線。",
    status: "規劃中配置", note: "配置仍可能調整，請以後續公告與現場安排為準。",
    open: "放大平面圖", close: "關閉平面圖", zoomIn: "放大", zoomOut: "縮小", fit: "符合視窗", pan: "放大後可拖曳或捲動查看細節", alt: "FLAGSHIP Thailand 暫定平面圖，標示左側主入口、卡店桌位、品牌展區與保留區域",
    legend: ["卡店桌位", "品牌展區", "保留區域"],
  },
  en: {
    title: "Find your way around", body: "Find the main entrance, vendor tables and brand booths, then plan where you'd like to explore.",
    status: "Proposed layout", note: "The layout may change. Follow future announcements and on-site signs.",
    open: "Explore floor plan", close: "Close floor plan", zoomIn: "Zoom in", zoomOut: "Zoom out", fit: "Fit to window", pan: "Zoom in, then drag or scroll to explore", alt: "Proposed FLAGSHIP Thailand floor plan showing the main entrance on the left, vendor tables, brand booths and reserved areas",
    legend: ["Vendor tables", "Brand booths", "Reserved areas"],
  },
  ko: {
    title: "행사장을 미리 둘러보세요", body: "주 출입구, 카드숍 테이블과 브랜드 부스의 위치를 확인하고 둘러볼 동선을 계획해 보세요.",
    status: "예정 배치도", note: "배치는 변경될 수 있습니다. 추후 공지와 현장 안내를 확인해 주세요.",
    open: "배치도 확대", close: "배치도 닫기", zoomIn: "확대", zoomOut: "축소", fit: "화면에 맞추기", pan: "확대 후 드래그하거나 스크롤하여 살펴보세요", alt: "왼쪽 주 출입구, 카드숍 테이블, 브랜드 부스와 예약 구역을 표시한 FLAGSHIP Thailand 예정 배치도",
    legend: ["카드숍 테이블", "브랜드 부스", "예약 구역"],
  },
  th: {
    title: "ดูแผนผังก่อนไปเดินงาน", body: "ดูทางเข้าหลัก โต๊ะร้านการ์ด และบูธแบรนด์ แล้ววางแผนเส้นทางที่อยากเดินชม",
    status: "แผนผังเบื้องต้น", note: "ผังอาจมีการเปลี่ยนแปลง โปรดติดตามประกาศและป้ายภายในงาน",
    open: "ขยายแผนผัง", close: "ปิดแผนผัง", zoomIn: "ขยาย", zoomOut: "ย่อ", fit: "พอดีหน้าจอ", pan: "ขยายแล้วลากหรือเลื่อนเพื่อดูรายละเอียด", alt: "แผนผังเบื้องต้นของ FLAGSHIP Thailand แสดงทางเข้าหลักด้านซ้าย โต๊ะร้านการ์ด บูธแบรนด์ และพื้นที่สำรอง",
    legend: ["โต๊ะร้านการ์ด", "บูธแบรนด์", "พื้นที่สำรอง"],
  },
} satisfies Record<SiteLanguage, {
  title: string; body: string; status: string; note: string; open: string; close: string;
  zoomIn: string; zoomOut: string; fit: string; pan: string; alt: string; legend: [string, string, string];
}>;
