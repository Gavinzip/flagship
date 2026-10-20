import type { SiteLanguage } from "../../data/copy";
import type { EventContent } from "../../event/types";
import { koreaEventContent } from "../../korea/data/koreaEventContent";
import { thailandHighlights } from "./highlights";

// The five films document Taiwan 2026; Thailand's event plan and FAQ are independent.
export const thailandEventContent: Record<SiteLanguage, EventContent> = {
  en: {
    ...koreaEventContent.en,
    highlights: thailandHighlights.en,
    navigation: [{ label: "Highlights", href: "#highlights" }, { label: "Seoul recap", href: "#seoul-recap" }, { label: "Partners", href: "#vendors" }, { label: "Venue", href: "#venue" }, { label: "FAQ", href: "#faq" }],
    faq: {
      categoryLabel: "Frequently asked question categories",
      categories: ["The event", "Admission", "On site"],
      items: [
        { category: "The event", question: "When is FLAGSHIP Thailand?", answer: "28–29 November 2026, from 1–8 PM each day (Bangkok time, UTC+7)." },
        { category: "The event", question: "Where does the show take place?", answer: "QSNCC — Queen Sirikit National Convention Center, Event Hall on Level B2, Bangkok, Thailand." },
        { category: "The event", question: "What can I expect?", answer: "Card collecting, trading and community encounters. The current event plan includes 100+ vendor tables and 4–6 exhibitor booths; the final directory and programme will follow." },
        { category: "Admission", question: "How can I get tickets?", answer: "Thailand ticketing details and the official registration link have not been announced. Follow @flagshiptcg for the opening announcement." },
        { category: "On site", question: "Where will the exhibitor list be published?", answer: "The confirmed exhibitors, activities and entry arrangements will be shared through official FLAGSHIP announcements." },
      ],
    },
  },
  "zh-TW": {
    ...koreaEventContent["zh-TW"],
    highlights: thailandHighlights["zh-TW"],
    navigation: [{ label: "活動亮點", href: "#highlights" }, { label: "首爾回顧", href: "#seoul-recap" }, { label: "合作夥伴", href: "#vendors" }, { label: "場地資訊", href: "#venue" }, { label: "常見問題", href: "#faq" }],
    faq: {
      categoryLabel: "常見問題分類", categories: ["活動資訊", "入場資訊", "現場安排"],
      items: [
        { category: "活動資訊", question: "泰國卡展何時舉行？", answer: "2026 年 11 月 28–29 日，每日 13:00–20:00，時間為曼谷當地時間（UTC+7）。" },
        { category: "活動資訊", question: "活動地點在哪裡？", answer: "泰國曼谷 QSNCC 詩麗吉王后國家會議中心，B2 樓 Event Hall。" },
        { category: "活動資訊", question: "現場可以體驗什麼？", answer: "收藏、交易與卡牌社群交流。現階段規劃 100+ 張攤商桌與 4–6 個品牌展位；完整名單與節目將依正式公告更新。" },
        { category: "入場資訊", question: "如何購票或報名？", answer: "泰國站票務資訊與正式報名連結尚未公布，請追蹤 @flagshiptcg 的開票消息。" },
        { category: "現場安排", question: "完整攤商名單在哪裡看？", answer: "已確認的攤商、活動內容與入場安排，會透過 FLAGSHIP 官方管道陸續公告。" },
      ],
    },
  },
  ko: {
    ...koreaEventContent.ko,
    highlights: thailandHighlights.ko,
    navigation: [{ label: "하이라이트", href: "#highlights" }, { label: "서울 현장", href: "#seoul-recap" }, { label: "파트너", href: "#vendors" }, { label: "행사장", href: "#venue" }, { label: "FAQ", href: "#faq" }],
    faq: {
      categoryLabel: "자주 묻는 질문 분류", categories: ["행사 정보", "입장 안내", "현장 안내"],
      items: [
        { category: "행사 정보", question: "태국 행사는 언제 열리나요?", answer: "2026년 11월 28–29일, 매일 13:00–20:00에 열립니다. 방콕 현지 시간(UTC+7) 기준입니다." },
        { category: "행사 정보", question: "장소는 어디인가요?", answer: "태국 방콕 QSNCC(퀸 시리킷 국립 컨벤션 센터), B2층 Event Hall입니다." },
        { category: "행사 정보", question: "어떤 행사를 기대할 수 있나요?", answer: "카드 수집과 거래, 커뮤니티 교류를 만날 수 있습니다. 현재 100개 이상의 벤더 테이블과 4–6개 브랜드 부스를 계획 중이며 최종 내용은 공식 공지로 안내됩니다." },
        { category: "입장 안내", question: "티켓은 어떻게 받나요?", answer: "태국 행사 티켓과 공식 등록 링크는 아직 공개되지 않았습니다. @flagshiptcg에서 새로운 소식을 확인해 주세요." },
        { category: "현장 안내", question: "참가사 명단은 어디서 확인하나요?", answer: "확정된 참가사와 프로그램, 입장 안내는 FLAGSHIP 공식 채널을 통해 공개됩니다." },
      ],
    },
  },
};
