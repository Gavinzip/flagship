import type { SiteLanguage } from "./copy";
import type { ArchiveLanguage } from "./languages";

// Keep route metadata independent of the full event content and media modules.

export const koreaDescriptions: Record<ArchiveLanguage, string> = {
  "zh-TW": "FLAGSHIP 韓國卡展將於 2026 年 9 月 29 日 13:00–20:00，在首爾 TEX+FA HALL 舉行。免費入場，報名須經主辦審核。",
  "en": "FLAGSHIP Korea takes place at TEX+FA HALL in Seoul on 29 September 2026, from 1–8 PM. Admission is free and registration requires host approval.",
  "ko": "FLAGSHIP KOREA는 2026년 9월 29일 13:00–20:00, 서울 TEX+FA HALL에서 열립니다. 무료 입장이며 등록은 주최 측 승인이 필요합니다."
};

export const thailandDescriptions: Record<SiteLanguage, string> = {
  "th": "พบกับ FLAGSHIP Thailand วันที่ 28–29 พฤศจิกายน 2026 เวลา 13:00–20:00 น. ทุกวัน ณ QSNCC, Event Hall ชั้น B2 กรุงเทพฯ สองวันสำหรับคนรักการ์ดและของสะสม",
  "en": "FLAGSHIP Thailand comes to QSNCC, Event Hall B2, Bangkok on 28–29 November 2026, from 1–8 PM each day. Two days of collecting, trading and community.",
  "zh-TW": "FLAGSHIP 泰國卡展將於 2026 年 11 月 28–29 日，每日 13:00–20:00，在曼谷 QSNCC 詩麗吉王后國家會議中心 Event Hall B2 舉行。",
  "ko": "FLAGSHIP Thailand는 2026년 11월 28–29일, 매일 13:00–20:00 방콕 QSNCC Event Hall B2에서 열립니다."
};
