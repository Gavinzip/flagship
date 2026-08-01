export type EventHighlight = {
  number: `0${1 | 2 | 3 | 4 | 5}`;
  english: string;
  title: string;
  description: string;
  image: string;
  imagePosition: string;
  alt: string;
  points: readonly string[];
  layout: "compact" | "wide" | "stage";
};

export const eventHighlights = [
  {
    number: "01",
    english: "MORE BACK INTO THE EVENT",
    title: "活動收入回到現場",
    description:
      "活動收入將投入宣傳、入場好禮、獎品、製作與現場體驗，讓每一位到場玩家都能感受到更完整的活動內容。",
    image: "/assets/section-highlights-arena.webp",
    imagePosition: "48% center",
    alt: "紅藍燈光下的大型卡牌活動會場與收藏展示區",
    points: ["入場好禮", "活動獎品", "現場製作"],
    layout: "compact",
  },
  {
    number: "02",
    english: "IMMERSIVE ATTENDEE EXPERIENCE",
    title: "沉浸式參加體驗",
    description:
      "從入場好禮、牌組試玩與 TCG 對戰，到小遊戲任務與幸運抽獎，進場後一路都有事情可以玩。",
    image: "/assets/highlight-players.webp",
    imagePosition: "50% center",
    alt: "玩家在卡牌活動現場交流、試玩並分享手上的卡牌",
    points: ["入場好禮", "牌組試玩與對戰", "任務與抽獎"],
    layout: "wide",
  },
  {
    number: "03",
    english: "CHAMPION CHALLENGE",
    title: "冠軍挑戰賽",
    description:
      "一般玩家也能登上舞台，面對頂尖選手，在現場觀眾面前完成一場高張力對戰。",
    image: "/assets/section-schedule-stage.webp",
    imagePosition: "center",
    alt: "紅藍燈光環繞的卡牌競賽舞台與現場觀眾",
    points: ["玩家挑戰", "舞台對戰", "活動獎品"],
    layout: "stage",
  },
  {
    number: "04",
    english: "RARE CARD & COLLECTIBLES SHOWCASE",
    title: "稀有卡牌與收藏展示",
    description:
      "近距離觀看玩家提供的珍稀卡牌與收藏品，也讀到每件藏品和運動、遊戲或在地文化之間的故事。",
    image: "/assets/highlight-rare-card.webp",
    imagePosition: "60% center",
    alt: "參加者近距離欣賞具有特殊設計的珍稀卡牌",
    points: ["稀有卡牌", "收藏故事", "文化藏品"],
    layout: "wide",
  },
  {
    number: "05",
    english: "30+ TCG VENDORS",
    title: "30+ TCG 攤商集結",
    description:
      "現場預計集結 30+ TCG 攤商，依逛展動線安排攤位；名單與位置確認後會更新在活動頁與場地圖。",
    image: "/assets/event-crowd.webp",
    imagePosition: "center",
    alt: "眾多玩家在設有大量攤位的 TCG 卡牌活動現場逛展",
    points: ["30+ 攤商", "精選店家", "名單與地圖"],
    layout: "compact",
  },
] as const satisfies readonly EventHighlight[];
