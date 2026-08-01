import eventManifest from "../config/event.json";

export const event = eventManifest;

export const navigation = [
  { label: "活動亮點", href: "#highlights" },
  { label: "節目表", href: "#schedule" },
  { label: "攤商", href: "#vendors" },
  { label: "場地地圖", href: "#venue" },
  { label: "常見問題", href: "#faq" },
] as const;

export const experiences = [
  {
    title: "現場體驗",
    english: "LIVE FLOOR",
    description: "現場有 30+ TCG 攤商，也準備了入場好禮和抽獎。",
    image: "/assets/event-crowd.webp",
    alt: "卡牌展會現場，參加者在攤位間交流與選購",
    contents: [
      {
        title: "30+ TCG 攤商",
        description: "一次逛完熱門卡牌與收藏品",
      },
      {
        title: "入場好禮",
        description: "入場就能領取的活動好禮",
      },
      {
        title: "幸運抽獎",
        description: "完成現場任務，就能參加抽獎",
      },
    ],
  },
  {
    title: "玩家交流",
    english: "PLAYER MEETUP",
    description: "帶上牌組來打幾場，也有機會上台挑戰頂尖玩家。",
    image: "/assets/highlight-players.webp",
    alt: "玩家在卡牌展會現場交流並分享收藏",
    contents: [
      {
        title: "牌組試玩",
        description: "試試不同牌組的玩法",
      },
      {
        title: "TCG 現場對戰",
        description: "和其他玩家現場切磋",
      },
      {
        title: "冠軍挑戰賽",
        description: "上台挑戰頂尖玩家",
      },
    ],
  },
  {
    title: "珍稀探索",
    english: "RARE DISCOVERY",
    description: "近距離看看玩家帶來的珍稀卡牌，也讀讀每件收藏背後的故事。",
    image: "/assets/highlight-rare-card.webp",
    alt: "收藏家展示具有抽象星象圖案的原創全息卡牌",
    contents: [
      {
        title: "稀有卡牌展示",
        description: "近距離看看珍稀卡牌",
      },
      {
        title: "收藏故事",
        description: "讀讀藏品的背景與來歷",
      },
      {
        title: "文化收藏品",
        description: "也有和運動、遊戲及在地文化有關的收藏品",
      },
    ],
  },
] as const;

export const highlights = [
  {
    number: "01",
    title: "30+ TCG 攤商",
    description: "現場預計有 30+ TCG 攤商，可以逛單卡、補充包和各類收藏品。",
    icon: "store",
  },
  {
    number: "02",
    title: "冠軍挑戰賽",
    description: "一般玩家也有機會上台，直接挑戰頂尖選手。",
    icon: "trophy",
  },
  {
    number: "03",
    title: "稀有卡牌展示",
    description: "展示玩家帶來的珍稀卡牌與特色收藏，也會附上藏品故事。",
    icon: "card",
  },
  {
    number: "04",
    title: "對戰・任務・抽獎",
    description: "參加現場互動或完成挑戰任務，就有機會參加抽獎。",
    icon: "sparkles",
  },
] as const;

export const faqItems = [
  {
    question: "活動需要購票嗎？",
    answer: "票務與入場方式尚在確認中，正式資訊將在本頁公布。",
  },
  {
    question: "可以重複入場嗎？",
    answer: "重複入場與手環規則尚在確認中，請留意活動前公告。",
  },
  {
    question: "現場可以使用哪些付款方式？",
    answer: "各攤商支援的付款方式可能不同，完整說明將於攤商名單公布後更新。",
  },
  {
    question: "可以攜帶自己的卡牌交易嗎？",
    answer: "個人交換與交易規範尚在確認中，將以主辦單位最終公告為準。",
  },
] as const;
