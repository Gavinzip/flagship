import type { SiteLanguage } from "../../data/copy";
import type { EventContent } from "../../event/types";
import { thailandHighlights } from "./highlights";

// The five films document Taiwan 2026; Thailand's event plan and FAQ are independent.
export const thailandEventContent: Record<SiteLanguage, EventContent> = {
  th: {
    navigation: [{ label: "สถานที่", href: "#venue" }, { label: "พันธมิตร", href: "#vendors" }, { label: "ไฮไลต์", href: "#highlights" }, { label: "BNB โซล", href: "#seoul-recap" }, { label: "คำถามที่พบบ่อย", href: "#faq" }],
    highlights: thailandHighlights.th,
    vendors: { title: "พันธมิตร", english: "PARTNERS", organizerLabel: "ผู้จัดงาน", titleSponsorLabel: "ผู้สนับสนุนหลัก", vendorLabel: "ผู้จัดแสดง" },
    venue: { title: "สถานที่จัดงาน", english: "VENUE & ACCESS" },
    faq: {
      categoryLabel: "หมวดคำถามที่พบบ่อย", categories: ["ข้อมูลงาน", "การเข้าชม", "ภายในงาน"],
      items: [
        { category: "ข้อมูลงาน", question: "FLAGSHIP Thailand จัดเมื่อไร", answer: "วันที่ 28–29 พฤศจิกายน 2026 เวลา 13:00–20:00 น. ทุกวัน ตามเวลากรุงเทพฯ (UTC+7)" },
        { category: "ข้อมูลงาน", question: "งานจัดที่ไหน", answer: "QSNCC ศูนย์การประชุมแห่งชาติสิริกิติ์ Event Hall ชั้น B2 กรุงเทพฯ ประเทศไทย" },
        { category: "ข้อมูลงาน", question: "ภายในงานมีอะไรบ้าง", answer: "เดินดูการ์ดและของสะสม แลกเปลี่ยนหรือซื้อขายการ์ด และพูดคุยกับนักสะสม แผนงานปัจจุบันมีโต๊ะร้านค้ากว่า 100 โต๊ะ และบูธแบรนด์ 4–6 บูธ รายชื่อผู้จัดแสดงและกำหนดการฉบับเต็มจะประกาศเพิ่มเติม" },
        { category: "การเข้าชม", question: "ซื้อบัตรหรือลงทะเบียนอย่างไร", answer: "รายละเอียดบัตรเข้างานและลิงก์ลงทะเบียนของประเทศไทยยังไม่ประกาศ ติดตาม @flagshiptcg เพื่อรับข่าวเปิดจำหน่ายบัตร" },
        { category: "ภายในงาน", question: "ดูรายชื่อร้านค้าได้ที่ไหน", answer: "รายชื่อร้านค้าที่ได้รับการยืนยัน กิจกรรม และรายละเอียดการเข้าชม จะทยอยประกาศผ่านช่องทาง FLAGSHIP อย่างเป็นทางการ" },
      ],
    },
  },
  en: {
    vendors: { title: "Partners", english: "PARTNERS", organizerLabel: "ORGANIZER", titleSponsorLabel: "MAIN SPONSOR", vendorLabel: "EXHIBITORS" },
    venue: { title: "Venue", english: "VENUE & ACCESS" },
    highlights: thailandHighlights.en,
    navigation: [{ label: "Venue", href: "#venue" }, { label: "Partners", href: "#vendors" }, { label: "Highlights", href: "#highlights" }, { label: "BNB Seoul recap", href: "#seoul-recap" }, { label: "FAQ", href: "#faq" }],
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
    vendors: { title: "合作夥伴", english: "PARTNERS", organizerLabel: "主辦單位", titleSponsorLabel: "主要贊助商", vendorLabel: "參展攤商" },
    venue: { title: "場地資訊", english: "VENUE & ACCESS" },
    highlights: thailandHighlights["zh-TW"],
    navigation: [{ label: "場地資訊", href: "#venue" }, { label: "合作夥伴", href: "#vendors" }, { label: "活動亮點", href: "#highlights" }, { label: "BNB 首爾回顧", href: "#seoul-recap" }, { label: "常見問題", href: "#faq" }],
    faq: {
      categoryLabel: "常見問題分類", categories: ["活動資訊", "入場資訊", "現場安排"],
      items: [
        { category: "活動資訊", question: "泰國卡展何時舉行？", answer: "2026 年 11 月 28–29 日，每天 13:00–20:00，皆為曼谷當地時間（UTC+7）。" },
        { category: "活動資訊", question: "活動地點在哪裡？", answer: "泰國曼谷 QSNCC 詩麗吉王后國家會議中心，B2 樓 Event Hall。" },
        { category: "活動資訊", question: "現場可以體驗什麼？", answer: "目前規劃 100+ 張攤商桌和 4–6 個品牌展位。你可以逛攤位、看卡牌和收藏品，跟同好聊收藏、交易卡牌。參展名單與完整節目還會繼續更新，請以官方公告為準。" },
        { category: "入場資訊", question: "如何購票或報名？", answer: "泰國站票務資訊與正式報名連結尚未公布，請追蹤 @flagshiptcg 的開票消息。" },
        { category: "現場安排", question: "完整攤商名單在哪裡看？", answer: "已確認的攤商、活動內容與入場安排，會透過 FLAGSHIP 官方管道陸續公告。" },
      ],
    },
  },
  ko: {
    vendors: { title: "파트너", english: "PARTNERS", organizerLabel: "주최", titleSponsorLabel: "주요 스폰서", vendorLabel: "참가사" },
    venue: { title: "행사장", english: "VENUE & ACCESS" },
    highlights: thailandHighlights.ko,
    navigation: [{ label: "행사장", href: "#venue" }, { label: "파트너", href: "#vendors" }, { label: "하이라이트", href: "#highlights" }, { label: "BNB 서울", href: "#seoul-recap" }, { label: "FAQ", href: "#faq" }],
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
