import type { SiteLanguage } from "../../data/copy";

type AffiliationCopy = { label: string; context: string; officialEvent: string };

export const affiliationCopy: Record<SiteLanguage, AffiliationCopy> = {
  "zh-TW": {
    label: "區塊鏈週周邊活動",
    context: "與 Binance Blockchain Week 同期，於曼谷 QSNCC 相聚。",
    officialEvent: "Binance Blockchain Week 官方活動網站",
  },
  en: {
    label: "Blockchain Week side event",
    context: "During Binance Blockchain Week. Together at QSNCC, Bangkok.",
    officialEvent: "Binance Blockchain Week official event website",
  },
  ko: {
    label: "블록체인 위크 사이드 이벤트",
    context: "Binance Blockchain Week 기간, 방콕 QSNCC에서 만나요.",
    officialEvent: "Binance Blockchain Week 공식 행사 웹사이트",
  },
  th: {
    label: "กิจกรรม Side Event",
    context: "พบกันที่ QSNCC กรุงเทพฯ ในช่วง Binance Blockchain Week",
    officialEvent: "เว็บไซต์ทางการของ Binance Blockchain Week",
  },
};
