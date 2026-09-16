type HighlightCopy = {
  number: "01" | "02" | "03" | "04" | "05";
  english: string;
  title: string;
  description: string;
  alt: string;
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
      { label: "卡展現場", href: "#highlights" },
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
          english: "GATHER AROUND CARDS",
          title: "因卡相聚",
          description:
            "因為卡，大家來到這裡。因卡相聚，也是一種緣分；一張卡就能讓原本不認識的人停下腳步，開始認識彼此。",
          alt: "玩家圍著桌子看卡與對戰",
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "收藏家相遇",
          description:
            "喜歡同一套卡、收著同樣的收藏，話題就接上了。卡冊一攤開，大家交流收藏，也慢慢認識彼此。",
          alt: "收藏家在卡展中分享卡牌與收藏",
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES & COLLECTIBLES",
          title: "品牌體驗與收藏品",
          description:
            "攤位上有商品，也有展示、互動和各式收藏品。走到喜歡的攤位，停下來看看，也和身邊的人聊幾句。",
          alt: "卡展中的品牌攤位與收藏品展示",
        },
        {
          number: "04",
          english: "ON-SITE ATMOSPHERE",
          title: "現場的氛圍",
          description:
            "不管是小獎還是大獎，只要有了結果，旁邊的人都會跟著一起歡呼。",
          alt: "卡展人群舉手歡呼的瞬間",
        },
        {
          number: "05",
          english: "THE CARD SHOW FLOOR",
          title: "卡展現場",
          description:
            "從入口、攤位到舞台，每個角落都聚著喜歡卡牌的人。",
          alt: "FLAGSHIP TAIWAN 的卡展人潮與場內攤位",
        },
      ],
    },
    vendors: {
      title: "合作夥伴",
      english: "PARTNERS",
      organizerLabel: "主辦單位",
      titleSponsorLabel: "冠名贊助",
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
            "FLAGSHIP KOREA 是在首爾舉行的一日實體卡展。你可以逛卡店與收藏、現場買卡，也能和同樣喜歡卡牌的人聊聊。",
        },
        {
          category: "活動資訊",
          question: "第一次逛卡展也可以參加嗎？",
          answer:
            "可以。不管你已經有在收藏，還是只是想看看實體卡牌，都是歡迎的。帶著想找的卡來，或單純逛逛都可以。",
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
            "TEX+FA HALL，首爾特別市江南區德黑蘭路 518 號、纖維中心 3 樓。從三成站 4 號出口步行即可抵達。",
        },
        {
          category: "活動資訊",
          question: "FLAGSHIP KOREA 和 KBW 有什麼關係？",
          answer:
            "FLAGSHIP KOREA 在 KBW 期間舉辦。取票與入場以 FLAGSHIP KOREA 的 Luma 活動頁為準，請不要把其他活動的票券視為本活動的入場資格。",
        },
        {
          category: "活動資訊",
          question: "誰主辦 FLAGSHIP KOREA？",
          answer:
            "FLAGSHIP KOREA 由 Renaiss Protocol 主辦，Vinci World 為冠名贊助。其他合作夥伴與展商將在確認後公告。",
        },
        {
          category: "入場資訊",
          question: "如何取票？",
          answer:
            "點選頁面上的「立即取票」會前往 Luma 活動頁申請加入。報名需要由主辦方審核，請留意 Luma 的確認通知。",
        },
        {
          category: "入場資訊",
          question: "入場需要付費嗎？",
          answer: "目前活動頁標示為免費入場。若票務規則有更新，會以 Luma 活動頁的說明為準。",
        },
        {
          category: "入場資訊",
          question: "申請加入後，怎麼知道是否可以入場？",
          answer:
            "Luma 活動頁標示報名需要主辦審核。送出申請不等於已完成入場，請以 Luma 的確認通知為準。",
        },
        {
          category: "入場資訊",
          question: "現場是否會有活動贈品？",
          answer:
            "現場贈品與活動卡包安排尚未確認。若有相關內容，領取方式與數量將以官方公告說明。",
        },
        {
          category: "入場資訊",
          question: "是否提供現場售票？",
          answer:
            "目前公開資訊未說明現場是否可直接入場。建議先在 Luma 完成申請，並等候主辦確認。",
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
            "現場會有卡牌收藏、卡店選品與交流空間。完整展商名單、活動時程與個別參加方式會在確認後公告。",
        },
        {
          category: "現場安排",
          question: "現場可以買卡嗎？",
          answer:
            "可以。活動頁說明現場可瀏覽收藏並向參與卡店購買卡牌；特定卡片是否有貨、價格與付款方式，請直接向該卡店確認。",
        },
        {
          category: "現場安排",
          question: "現場可以使用哪些付款方式？",
          answer:
            "付款方式由各卡店自行決定。購買前請先向該攤位確認可使用的付款方式、幣別與價格。",
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
            "可以攜帶個人收藏，請自行妥善保管。個人換卡、出售與估價規則尚未公告；不要預設一般入場就能使用展商的商業服務。",
        },
        {
          category: "現場安排",
          question: "怎麼前往 TEX+FA HALL？",
          answer:
            "場地位於纖維中心 3 樓，從三成站 4 號出口步行即可抵達。頁面的場地資訊提供 Google Maps 連結，出發前也請再確認入場動線。",
        },
        {
          category: "現場安排",
          question: "有停車或無障礙入場資訊嗎？",
          answer:
            "停車、無障礙入口與場地協助方式尚未公布。確認後會更新在場地資訊與官方公告中。",
        },
      ],
    },
  },
  en: {
    navigation: [
      { label: "Card show", href: "#highlights" },
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
          english: "GATHER AROUND CARDS",
          title: "Gather Around Cards",
          description:
            "Cards brought people here. Meeting through cards is a kind of connection; one card can make strangers stop, talk, and get to know one another.",
          alt: "Players gathered around a table to look at cards and play",
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "Collectors Meet",
          description:
            "People who love the same cards and collect similar things already have something to talk about. Once a binder opens, the conversation begins.",
          alt: "Collectors sharing cards and their collections at a card show",
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES & COLLECTIBLES",
          title: "Brand Experiences & Collectibles",
          description:
            "Booths feature products, displays, interactive moments, and collectibles. They give people something to look at and talk about.",
          alt: "Brand booths and collectible displays at a card show",
        },
        {
          number: "04",
          english: "ON-SITE ATMOSPHERE",
          title: "The Feel of the Floor",
          description:
            "Small prize or big prize, once there is a result, the people nearby cheer along.",
          alt: "A cheering crowd at a card show",
        },
        {
          number: "05",
          english: "THE CARD SHOW FLOOR",
          title: "The Card Show Floor",
          description:
            "From the entrance and booths to the stage, every corner has people who love cards.",
          alt: "Crowds and booths at FLAGSHIP TAIWAN",
        },
      ],
    },
    vendors: {
      title: "Partners",
      english: "PARTNERS",
      organizerLabel: "ORGANIZER",
      titleSponsorLabel: "TITLE SPONSOR",
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
            "FLAGSHIP KOREA is a one-day physical card show in Seoul. Browse card shops and collections, buy cards in person, and meet people who enjoy the hobby.",
        },
        {
          category: "Event information",
          question: "Can I come if this is my first card show?",
          answer:
            "Yes. You are welcome whether you already collect cards or simply want to see what is on the tables. Come with a wish list or just have a look around.",
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
            "TEX+FA HALL, Textile Center Building 3F, 518 Teheran-ro, Gangnam-gu, Seoul. It is a short walk from Samseong Station Exit 4.",
        },
        {
          category: "Event information",
          question: "How is FLAGSHIP KOREA related to KBW?",
          answer:
            "FLAGSHIP KOREA takes place during KBW. Registration and entry are managed through the FLAGSHIP KOREA Luma page, so do not assume a ticket for another event grants entry here.",
        },
        {
          category: "Event information",
          question: "Who is behind FLAGSHIP KOREA?",
          answer:
            "FLAGSHIP KOREA is organised by Renaiss Protocol, with Vinci World as title sponsor. Further partners and exhibitors will be announced when confirmed.",
        },
        {
          category: "Entry information",
          question: "How do I get a ticket?",
          answer:
            "Select “Get tickets” to apply through the Luma event page. Registration requires host approval, so watch for Luma's confirmation notice.",
        },
        {
          category: "Entry information",
          question: "Is admission free?",
          answer:
            "The event page currently lists free admission. If ticket rules change, the Luma event page will be the source of record.",
        },
        {
          category: "Entry information",
          question: "How do I know if my registration is approved?",
          answer:
            "The Luma event page states that registration requires host approval. Submitting an application does not confirm entry; rely on Luma's confirmation notice.",
        },
        {
          category: "Entry information",
          question: "Will there be event gifts or card packs?",
          answer:
            "Event gifts and card packs have not yet been confirmed. If they are announced, collection details and quantities will be shared through official channels.",
        },
        {
          category: "Entry information",
          question: "Will tickets be available at the venue?",
          answer:
            "The published information does not confirm walk-in entry. Apply through Luma in advance and wait for host approval.",
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
            "Expect card collections, card-shop selections, and space to meet other collectors. The full exhibitor list, programme, and individual participation details will be announced when confirmed.",
        },
        {
          category: "On-site arrangements",
          question: "Can I buy cards at the show?",
          answer:
            "Yes. The event page says you can browse collections and buy from participating card shops. Ask the relevant shop about availability, price, and payment methods for a specific card.",
        },
        {
          category: "On-site arrangements",
          question: "Which payment methods can I use?",
          answer:
            "Payment methods are set by each card shop. Confirm accepted methods, currency, and price with the relevant booth before buying.",
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
            "You may bring personal cards and are responsible for keeping them secure. Rules for visitor trading, selling, and appraisals have not been announced, so do not assume general admission includes commercial services.",
        },
        {
          category: "On-site arrangements",
          question: "How do I get to TEX+FA HALL?",
          answer:
            "The venue is on the third floor of the Textile Center, a short walk from Samseong Station Exit 4. Use the Google Maps link in Venue information and check the entry route before you leave.",
        },
        {
          category: "On-site arrangements",
          question: "Is there parking or step-free access?",
          answer:
            "Parking, step-free entry, and venue-assistance details have not been announced. Confirmed information will be added to Venue information and official updates.",
        },
      ],
    },
  },
  ko: {
    navigation: [
      { label: "카드 쇼 현장", href: "#highlights" },
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
          english: "GATHER AROUND CARDS",
          title: "카드로 모이다",
          description:
            "카드가 사람들을 이곳으로 모았습니다. 카드로 만난 인연은 특별합니다. 카드 한 장이 낯선 사람들의 발걸음을 멈추게 하고, 대화를 시작하게 합니다.",
          alt: "테이블에 모여 카드를 보고 게임을 하는 사람들",
        },
        {
          number: "02",
          english: "COLLECTOR COMMUNITY",
          title: "컬렉터의 만남",
          description:
            "같은 카드를 좋아하고 비슷한 컬렉션을 모으면, 이미 할 이야기가 있습니다. 바인더가 펼쳐지면 대화가 시작됩니다.",
          alt: "카드 쇼에서 카드와 컬렉션을 나누는 컬렉터들",
        },
        {
          number: "03",
          english: "BRAND EXPERIENCES & COLLECTIBLES",
          title: "브랜드 경험과 컬렉터블",
          description:
            "부스에는 상품과 함께 전시, 체험, 다양한 컬렉터블이 놓입니다. 둘러보다가 멈춰 서서 이야기를 나누게 됩니다.",
          alt: "카드 쇼의 브랜드 부스와 컬렉터블 전시",
        },
        {
          number: "04",
          english: "ON-SITE ATMOSPHERE",
          title: "현장의 분위기",
          description:
            "작은 경품이든 큰 경품이든 결과가 나오면, 주변 사람들도 함께 환호합니다.",
          alt: "카드 쇼에서 함께 환호하는 사람들",
        },
        {
          number: "05",
          english: "THE CARD SHOW FLOOR",
          title: "카드 쇼 현장",
          description:
            "입구, 부스, 무대까지. 행사장 곳곳에 카드를 좋아하는 사람들이 모여 있습니다.",
          alt: "FLAGSHIP TAIWAN의 카드 쇼 관람객과 부스",
        },
      ],
    },
    vendors: {
      title: "파트너",
      english: "PARTNERS",
      organizerLabel: "ORGANIZER",
      titleSponsorLabel: "TITLE SPONSOR",
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
            "FLAGSHIP KOREA는 서울에서 하루 동안 열리는 오프라인 카드 쇼입니다. 카드샵과 컬렉션을 둘러보고, 현장에서 카드를 구매하고, 같은 취미를 가진 사람들을 만날 수 있습니다.",
        },
        {
          category: "행사 정보",
          question: "카드 쇼가 처음이어도 참여할 수 있나요?",
          answer:
            "네. 이미 카드를 모으고 계시거나 그냥 현장을 둘러보고 싶은 분 모두 환영합니다. 찾고 싶은 카드를 정해 오셔도 되고, 가볍게 구경만 하셔도 됩니다.",
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
            "서울특별시 강남구 테헤란로 518, 섬유센터 3층 TEX+FA HALL입니다. 삼성역 4번 출구에서 걸어서 오실 수 있습니다.",
        },
        {
          category: "행사 정보",
          question: "FLAGSHIP KOREA와 KBW는 어떤 관계인가요?",
          answer:
            "FLAGSHIP KOREA는 KBW 기간에 열립니다. 등록과 입장은 FLAGSHIP KOREA Luma 페이지에서 별도로 안내하므로, 다른 행사의 티켓만으로 입장할 수 있다고 생각하지 마세요.",
        },
        {
          category: "행사 정보",
          question: "FLAGSHIP KOREA는 누가 주최하나요?",
          answer:
            "FLAGSHIP KOREA는 Renaiss Protocol이 주최하고 Vinci World가 타이틀 파트너로 함께합니다. 추가 파트너와 참가사는 확정 후 공개됩니다.",
        },
        {
          category: "입장 정보",
          question: "티켓은 어떻게 신청하나요?",
          answer:
            "페이지의 ‘티켓 신청’ 버튼을 누르면 Luma 활동 페이지로 이동합니다. 등록은 주최 측 승인이 필요하니 Luma의 확인 알림을 확인해 주세요.",
        },
        {
          category: "입장 정보",
          question: "입장료가 있나요?",
          answer:
            "현재 활동 페이지에는 무료 입장으로 표시되어 있습니다. 티켓 조건이 바뀌면 Luma 활동 페이지의 안내를 기준으로 합니다.",
        },
        {
          category: "입장 정보",
          question: "등록이 승인됐는지는 어떻게 알 수 있나요?",
          answer:
            "Luma 활동 페이지에는 등록에 주최 측 승인이 필요하다고 안내되어 있습니다. 신청을 제출했다고 입장이 확정되는 것은 아니며, Luma의 확인 알림을 기준으로 해주세요.",
        },
        {
          category: "입장 정보",
          question: "현장 증정품이나 카드 팩이 있나요?",
          answer:
            "현장 증정품과 카드 팩 제공 여부는 아직 확정되지 않았습니다. 관련 내용이 정해지면 수령 방법과 수량을 공식 공지로 안내합니다.",
        },
        {
          category: "입장 정보",
          question: "현장 판매가 있나요?",
          answer:
            "공개된 정보에는 현장 입장 가능 여부가 나와 있지 않습니다. 미리 Luma에서 신청하고 주최 측 승인을 기다려 주세요.",
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
            "카드 컬렉션과 카드샵 셀렉션을 둘러보고, 컬렉터들과 교류할 수 있습니다. 전체 참가사, 프로그램, 개별 참여 방식은 확정 후 안내됩니다.",
        },
        {
          category: "현장 안내",
          question: "현장에서 카드를 살 수 있나요?",
          answer:
            "네. 활동 페이지에서 참여 카드샵의 컬렉션을 둘러보고 현장에서 카드를 구매할 수 있다고 안내합니다. 특정 카드의 재고, 가격, 결제 방식은 해당 카드샵에 직접 확인해 주세요.",
        },
        {
          category: "현장 안내",
          question: "현장에서 어떤 결제 수단을 사용할 수 있나요?",
          answer:
            "결제 수단은 카드샵마다 다릅니다. 구매 전 해당 부스에 가능한 결제 방식, 통화, 가격을 확인해 주세요.",
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
            "개인 카드를 가져오실 수 있으며 보관 책임은 본인에게 있습니다. 방문객 간 거래, 판매, 감정 규정은 아직 발표되지 않았으니 일반 입장에 상업 서비스가 포함된다고 생각하지 마세요.",
        },
        {
          category: "현장 안내",
          question: "TEX+FA HALL에는 어떻게 가나요?",
          answer:
            "행사장은 섬유센터 3층에 있으며 삼성역 4번 출구에서 걸어서 갈 수 있습니다. 출발 전 행사장 정보의 Google Maps 링크와 입장 동선을 다시 확인해 주세요.",
        },
        {
          category: "현장 안내",
          question: "주차나 장애인 편의 입장 정보가 있나요?",
          answer:
            "주차, 무단차 출입구, 현장 지원 방식은 아직 안내되지 않았습니다. 확정되면 행사장 정보와 공식 공지에 업데이트됩니다.",
        },
      ],
    },
  },
};
