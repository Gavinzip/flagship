import type { SiteLanguage } from "../../data/copy";
import type { EventPageCopy } from "../../event/types";
import { thailandEvent } from "./event";
import { thailandEventContent } from "./content";

const dates = { en: "28–29 NOV 2026", "zh-TW": "2026.11.28–29", ko: "2026.11.28–29" };
const details = (language: SiteLanguage) => ({
  date: dates[language], time: thailandEvent.time, venue: thailandEvent.venue,
  venueDetail: language === "zh-TW" ? "詩麗吉王后國家會議中心 · 曼谷" : language === "ko" ? "퀸 시리킷 국립 컨벤션 센터 · 방콕" : "Queen Sirikit National Convention Center · Bangkok",
  mapTitle: "QSNCC · Bangkok", directions: language === "zh-TW" ? "在 Google Maps 開啟" : language === "ko" ? "Google Maps에서 열기" : "Open in Google Maps",
});

export const thailandPageCopy: Record<SiteLanguage, EventPageCopy> = {
  en: {
    metaDescription: "FLAGSHIP Thailand comes to QSNCC, Event Hall B2, Bangkok on 28–29 November 2026, from 1–8 PM each day. Two days of collecting, trading and community.",
    event: thailandEventContent.en, preview: "FLAGSHIP THAILAND · BANGKOK 2026", details: details("en"),
    headline: "Meet in Bangkok.", intro: "Two days. One shared passion. Bring your collection to Bangkok and meet the people behind the cards.",
    explore: "View event highlights", ticketCta: "Ticket updates", officialUpdates: "Follow FLAGSHIP updates",
    registration: "ADMISSION", registrationNote: "Ticket details coming soon",
    menu: "Open menu", navigation: "Event navigation", search: "Search partners", noResults: "No matching partners.", home: "Back to FLAGSHIP",
    date: "Date", time: "Time · Bangkok", venue: "Venue", pause: "Pause decorative motion", resume: "Resume decorative motion",
    partnersNote: "The people and brands bringing the Bangkok chapter together.", partnerDirectoryTitle: "A bigger gathering in Bangkok.",
    partnerDirectoryBody: "The current plan includes 100+ vendor tables and 4–6 exhibitor booths. Confirmed exhibitors and the complete programme will follow through official announcements.",
    visitNote: "Find us at QSNCC, Event Hall on Level B2. Take the MRT to Queen Sirikit National Convention Centre station and follow the venue signs. Final entry arrangements will be announced before the show.",
    close: "Close", faqTitle: "Frequently asked questions", back: "Back to top", footer: "Collecting culture. Connecting people. See you in Bangkok.",
  },
  "zh-TW": {
    metaDescription: "FLAGSHIP 泰國卡展將於 2026 年 11 月 28–29 日，每日 13:00–20:00，在曼谷 QSNCC 詩麗吉王后國家會議中心 Event Hall B2 舉行。",
    event: thailandEventContent["zh-TW"], preview: "FLAGSHIP THAILAND · BANGKOK 2026", details: details("zh-TW"),
    headline: "下一站，曼谷相見。", intro: "兩天的相聚，一樣的熱愛。帶上你的收藏，在曼谷遇見喜歡卡牌的人。",
    explore: "查看活動亮點", ticketCta: "追蹤開票消息", officialUpdates: "追蹤 FLAGSHIP 最新公告",
    registration: "入場資訊", registrationNote: "票務詳情即將公布",
    menu: "開啟選單", navigation: "活動導覽", search: "搜尋合作夥伴", noResults: "找不到符合的合作夥伴。", home: "返回 FLAGSHIP",
    date: "日期", time: "時間 · 曼谷", venue: "場地", pause: "暫停裝飾動畫", resume: "播放裝飾動畫",
    partnersNote: "和我們一起，讓曼谷成為下一次相聚的地方。", partnerDirectoryTitle: "在曼谷，遇見更多同好。",
    partnerDirectoryBody: "現階段規劃 100+ 張攤商桌與 4–6 個品牌展位。已確認的攤商與完整節目，將依官方公告陸續公布。",
    visitNote: "活動位於 QSNCC 詩麗吉王后國家會議中心 B2 樓 Event Hall。可搭乘 MRT 至 Queen Sirikit National Convention Centre 站，依會場標示前往；最終入場安排將於活動前公告。",
    close: "關閉", faqTitle: "常見問題", back: "回到頂部", footer: "收藏、交流與探索，期待在曼谷相見。",
  },
  ko: {
    metaDescription: "FLAGSHIP Thailand는 2026년 11월 28–29일, 매일 13:00–20:00 방콕 QSNCC Event Hall B2에서 열립니다.",
    event: thailandEventContent.ko, preview: "FLAGSHIP THAILAND · BANGKOK 2026", details: details("ko"),
    headline: "방콕에서 만나요.", intro: "이틀간의 만남, 같은 열정. 컬렉션을 들고 방콕에서 카드를 사랑하는 사람들을 만나보세요.",
    explore: "행사 하이라이트 보기", ticketCta: "티켓 소식 확인", officialUpdates: "FLAGSHIP 공식 소식 보기",
    registration: "입장 안내", registrationNote: "티켓 정보 추후 공개",
    menu: "메뉴 열기", navigation: "행사 메뉴", search: "파트너 검색", noResults: "일치하는 파트너가 없습니다.", home: "FLAGSHIP으로 돌아가기",
    date: "날짜", time: "시간 · 방콕", venue: "장소", pause: "장식 애니메이션 일시 정지", resume: "장식 애니메이션 재생",
    partnersNote: "방콕의 다음 만남을 함께 만들어 갑니다.", partnerDirectoryTitle: "방콕에서 더 큰 만남을.",
    partnerDirectoryBody: "현재 100개 이상의 벤더 테이블과 4–6개 브랜드 부스를 계획 중입니다. 확정된 참가사와 전체 프로그램은 공식 공지로 안내됩니다.",
    visitNote: "QSNCC B2층 Event Hall에서 만나요. MRT Queen Sirikit National Convention Centre역에서 행사장 안내를 따라 이동해 주세요. 최종 입장 안내는 행사 전에 공개됩니다.",
    close: "닫기", faqTitle: "자주 묻는 질문", back: "맨 위로", footer: "카드와 사람, 컬렉팅과 교류. 방콕에서 만나요.",
  },
};
