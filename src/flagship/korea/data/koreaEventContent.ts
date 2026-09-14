import type { EventHighlightNumber } from "../../../data/eventHighlights";

type HighlightCopy = {
  number: EventHighlightNumber;
  english: string;
  title: string;
  description: string;
  alt: string;
  points: readonly string[];
};

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export type KoreaEventContent = {
  navigation: readonly { label: string; href: string }[];
  highlights: {
    title: string;
    english: string;
    items: readonly HighlightCopy[];
  };
  vendors: {
    title: string;
    english: string;
    organizerLabel: string;
    titleSponsorLabel: string;
    cohostLabel: string;
    vendorLabel: string;
  };
  venue: {
    title: string;
    english: string;
  };
  faq: {
    categoryLabel: string;
    categories: readonly string[];
    items: readonly FaqItem[];
  };
};

export const koreaEventContent: Record<"zh-TW" | "en" | "ko", KoreaEventContent> = {
  "zh-TW": {
    navigation: [
      { label: "活動亮點", href: "#highlights" },
      { label: "合作夥伴", href: "#vendors" },
      { label: "場地資訊", href: "#venue" },
      { label: "常見問題", href: "#faq" },
    ],
    highlights: {
      title: "活動亮點",
      english: "EVENT HIGHLIGHTS",
      items: [
        {
          number: "01",
          english: "FREE CARD PACK",
          title: "現場可領取免費卡包",
          description:
            "完成現場報到後，即可免費領取活動卡包，展開當日的收藏體驗。",
          alt: "參與者從卡包桌免費領取活動卡包",
          points: ["現場報到", "免費卡包", "開包體驗"],
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "收藏家交流與社群互動",
          description:
            "FLAGSHIP KOREA 規劃讓收藏家、玩家與社群在首爾相聚；現場活動安排將於確認後公布。",
          alt: "卡牌活動現場的交流空間",
          points: ["收藏家交流", "社群互動", "玩家連結"],
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES",
          title: "品牌體驗與收藏品",
          description:
            "品牌展位、現場體驗與收藏品展示為本次活動規劃方向。合作陣容與細節將以官方公告為準。",
          alt: "卡牌展會中的品牌展示區",
          points: ["品牌展位", "現場體驗", "收藏品展示"],
        },
      ],
    },
    vendors: {
      title: "合作夥伴",
      english: "PARTNERS",
      organizerLabel: "主辦單位",
      titleSponsorLabel: "冠名贊助",
      cohostLabel: "共同主辦",
      vendorLabel: "合作夥伴名單",
    },
    venue: {
      title: "場地資訊",
      english: "VENUE INFORMATION",
    },
    faq: {
      categoryLabel: "常見問題分類",
      categories: ["活動資訊", "入場資訊", "現場安排"],
      items: [
        {
          category: "活動資訊",
          question: "FLAGSHIP KOREA 是什麼活動？",
          answer:
            "FLAGSHIP KOREA 是在首爾舉行的卡牌展會。活動規劃涵蓋卡牌交易、卡店選品、收藏家交流、品牌體驗與收藏品展示；各項內容以正式公告為準。",
        },
        {
          category: "活動資訊",
          question: "活動何時舉行？",
          answer: "日期：2026 年 9 月 29 日（二）\n時間：13:00–20:00",
        },
        {
          category: "活動資訊",
          question: "活動地點在哪裡？",
          answer:
            "TEX+FA HALL，Textile Center Building 3F，首爾江南區。完整地址與入場動線將於確認後公告。",
        },
        {
          category: "入場資訊",
          question: "如何取得票務與入場資訊？",
          answer:
            "票務、入場方式與相關連結尚未公布。資訊確認後，將透過本網站與 FLAGSHIP 官方社群發布。",
        },
        {
          category: "入場資訊",
          question: "完成報到後可以領取卡包嗎？",
          answer:
            "可以。完成現場報到後可領取活動卡包；詳細領取方式與數量將依正式公告說明。",
        },
        {
          category: "入場資訊",
          question: "是否提供現場售票？",
          answer:
            "現場售票安排尚未確認。請於活動前查看本網站或 FLAGSHIP 官方社群的最新公告。",
        },
        {
          category: "入場資訊",
          question: "是否可以再次入場？",
          answer:
            "再次入場規則將於票務與入場規範確認後一併公布。",
        },
        {
          category: "現場安排",
          question: "現場將有哪些活動？",
          answer:
            "目前規劃方向包括卡牌交易、卡店選品、收藏家交流、品牌體驗與收藏品展示。最終活動內容與時程將依官方公告更新。",
        },
        {
          category: "現場安排",
          question: "如何參與現場活動？",
          answer:
            "各項活動的參與方式、資格、規則與名額將依正式公告說明。",
        },
        {
          category: "現場安排",
          question: "可以攜帶個人卡牌嗎？",
          answer:
            "可以攜帶個人收藏，請自行妥善保管。各攤位是否提供收卡、換卡或估價服務，將由參與單位自行決定。",
        },
      ],
    },
  },
  en: {
    navigation: [
      { label: "Highlights", href: "#highlights" },
      { label: "Partners", href: "#vendors" },
      { label: "Venue", href: "#venue" },
      { label: "FAQ", href: "#faq" },
    ],
    highlights: {
      title: "Event highlights",
      english: "EVENT HIGHLIGHTS",
      items: [
        {
          number: "01",
          english: "FREE CARD PACK",
          title: "Free Card Pack on Site",
          description:
            "Complete on-site registration to receive a complimentary event card pack and begin the day's collecting experience.",
          alt: "An attendee receiving a complimentary event card pack at a card-show table",
          points: ["On-site registration", "Free card pack", "Pack-opening moment"],
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "Collector Community",
          description:
            "FLAGSHIP KOREA is planned as a meeting point for collectors, players, and the wider community in Seoul. On-site programming will be announced when confirmed.",
          alt: "A shared space at a card-show event",
          points: ["Collector exchange", "Community interaction", "Player connections"],
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES",
          title: "Brand Experiences & Collectibles",
          description:
            "Brand booths, on-site experiences, and collectible displays form the event direction. Partner information and final details will be provided through official announcements.",
          alt: "A brand display at a card show",
          points: ["Brand booths", "On-site experiences", "Collectible displays"],
        },
      ],
    },
    vendors: {
      title: "Partners",
      english: "PARTNERS",
      organizerLabel: "ORGANIZER",
      titleSponsorLabel: "TITLE SPONSOR",
      cohostLabel: "CO-HOST",
      vendorLabel: "PARTNER DIRECTORY",
    },
    venue: {
      title: "Venue information",
      english: "VENUE INFORMATION",
    },
    faq: {
      categoryLabel: "FAQ categories",
      categories: ["Event information", "Entry information", "On-site arrangements"],
      items: [
        {
          category: "Event information",
          question: "What is FLAGSHIP KOREA?",
          answer:
            "FLAGSHIP KOREA is a card show in Seoul. The event direction includes card trading, card-shop selections, collector exchange, brand experiences, and collectible displays. All details are subject to official announcements.",
        },
        {
          category: "Event information",
          question: "When is the event?",
          answer: "Date: Tuesday, 29 September 2026\nTime: 13:00–20:00",
        },
        {
          category: "Event information",
          question: "Where will it take place?",
          answer:
            "TEX+FA HALL, Textile Center Building 3F, Gangnam-gu, Seoul. The full address and entry route will be announced once confirmed.",
        },
        {
          category: "Entry information",
          question: "How can I find ticket and entry information?",
          answer:
            "Ticketing, entry arrangements, and related links have not yet been announced. Confirmed information will be published here and through FLAGSHIP's official social channels.",
        },
        {
          category: "Entry information",
          question: "Will I receive a card pack after registering?",
          answer:
            "Yes. An event card pack is available after on-site registration. Final collection instructions and quantities will be announced officially.",
        },
        {
          category: "Entry information",
          question: "Will tickets be available at the venue?",
          answer:
            "On-site ticket availability has not yet been confirmed. Please check this website or FLAGSHIP's official social channels before the event.",
        },
        {
          category: "Entry information",
          question: "Will re-entry be permitted?",
          answer:
            "Re-entry rules will be published with the confirmed ticketing and entry policy.",
        },
        {
          category: "On-site arrangements",
          question: "What will be available at the show?",
          answer:
            "The current event direction includes card trading, card-shop selections, collector exchange, brand experiences, and collectible displays. The final programme and schedule will be announced officially.",
        },
        {
          category: "On-site arrangements",
          question: "How do I join an on-site activity?",
          answer:
            "Participation methods, eligibility, rules, and capacity for each activity will be detailed in the official announcement.",
        },
        {
          category: "On-site arrangements",
          question: "May I bring my own cards?",
          answer:
            "You may bring personal collections and are responsible for keeping them secure. Buying, trading, and appraisal services are determined independently by participating partners.",
        },
      ],
    },
  },
  ko: {
    navigation: [
      { label: "행사 하이라이트", href: "#highlights" },
      { label: "파트너", href: "#vendors" },
      { label: "행사장 정보", href: "#venue" },
      { label: "자주 묻는 질문", href: "#faq" },
    ],
    highlights: {
      title: "행사 하이라이트",
      english: "EVENT HIGHLIGHTS",
      items: [
        {
          number: "01",
          english: "FREE CARD PACK",
          title: "현장 무료 카드팩 증정",
          description:
            "현장 등록을 완료하면 무료 행사 카드팩을 받을 수 있으며, 당일 컬렉팅 경험을 바로 시작할 수 있습니다.",
          alt: "카드 쇼 테이블에서 무료 행사 카드팩을 받는 참가자",
          points: ["현장 등록", "무료 카드팩", "팩 개봉 경험"],
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "컬렉터 커뮤니티",
          description:
            "FLAGSHIP KOREA는 서울에서 컬렉터, 플레이어, 커뮤니티가 교류하는 장을 지향합니다. 현장 프로그램은 확정 후 안내됩니다.",
          alt: "카드 쇼의 커뮤니티 공간",
          points: ["컬렉터 교류", "커뮤니티 소통", "플레이어 연결"],
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES",
          title: "브랜드 경험과 컬렉터블",
          description:
            "브랜드 부스, 현장 경험, 컬렉터블 전시는 이번 행사의 기획 방향입니다. 파트너 정보와 세부 내용은 공식 공지를 기준으로 안내됩니다.",
          alt: "카드 쇼의 브랜드 전시 공간",
          points: ["브랜드 부스", "현장 경험", "컬렉터블 전시"],
        },
      ],
    },
    vendors: {
      title: "파트너",
      english: "PARTNERS",
      organizerLabel: "ORGANIZER",
      titleSponsorLabel: "TITLE SPONSOR",
      cohostLabel: "CO-HOST",
      vendorLabel: "파트너 목록",
    },
    venue: {
      title: "행사장 정보",
      english: "VENUE INFORMATION",
    },
    faq: {
      categoryLabel: "자주 묻는 질문 분류",
      categories: ["행사 정보", "입장 정보", "현장 안내"],
      items: [
        {
          category: "행사 정보",
          question: "FLAGSHIP KOREA는 어떤 행사인가요?",
          answer:
            "FLAGSHIP KOREA는 서울에서 열리는 카드 쇼입니다. 카드 거래, 카드 숍 셀렉션, 컬렉터 교류, 브랜드 경험, 컬렉터블 전시를 중심으로 기획되며, 세부 내용은 공식 공지를 기준으로 합니다.",
        },
        {
          category: "행사 정보",
          question: "행사는 언제 열리나요?",
          answer: "날짜: 2026년 9월 29일 (화)\n시간: 13:00–20:00",
        },
        {
          category: "행사 정보",
          question: "행사장은 어디인가요?",
          answer:
            "서울 강남구 Textile Center Building 3층, TEX+FA HALL입니다. 전체 주소와 입장 동선은 확정 후 안내됩니다.",
        },
        {
          category: "입장 정보",
          question: "티켓과 입장 정보는 어디에서 확인할 수 있나요?",
          answer:
            "티켓, 입장 방식, 관련 링크는 아직 공개되지 않았습니다. 확정된 정보는 이 웹사이트와 FLAGSHIP 공식 소셜 채널을 통해 안내됩니다.",
        },
        {
          category: "입장 정보",
          question: "현장 등록 후 카드 팩을 받을 수 있나요?",
          answer:
            "네. 현장 등록을 완료하면 행사 카드 팩을 받을 수 있습니다. 최종 수령 방법과 수량은 공식 공지로 안내됩니다.",
        },
        {
          category: "입장 정보",
          question: "현장 판매가 있나요?",
          answer:
            "현장 판매 여부는 아직 확정되지 않았습니다. 행사 전 이 웹사이트 또는 FLAGSHIP 공식 소셜 채널을 확인해 주세요.",
        },
        {
          category: "입장 정보",
          question: "재입장이 가능한가요?",
          answer:
            "재입장 규정은 티켓과 입장 정책이 확정된 후 함께 안내됩니다.",
        },
        {
          category: "현장 안내",
          question: "현장에서는 어떤 프로그램이 진행되나요?",
          answer:
            "현재 카드 거래, 카드 숍 셀렉션, 컬렉터 교류, 브랜드 경험, 컬렉터블 전시를 중심으로 기획하고 있습니다. 최종 프로그램과 일정은 공식 공지로 안내됩니다.",
        },
        {
          category: "현장 안내",
          question: "현장 활동에는 어떻게 참여하나요?",
          answer:
            "각 활동의 참여 방법, 자격, 규정, 정원은 공식 공지에서 안내됩니다.",
        },
        {
          category: "현장 안내",
          question: "개인 카드를 가져가도 되나요?",
          answer:
            "개인 소장품을 가져올 수 있으며, 보관 책임은 본인에게 있습니다. 매입, 교환, 감정 서비스 제공 여부는 참여 파트너가 개별적으로 결정합니다.",
        },
      ],
    },
  },
};
