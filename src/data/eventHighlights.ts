import { media } from "../config/media";

export type EventHighlight = {
  number: `0${1 | 2 | 3 | 4 | 5}`;
  english: string;
  title: string;
  singleLineTitle?: boolean;
  description: string;
  image: string;
  imagePosition: string;
  alt: string;
  points: readonly string[];
  notice?: string;
  layout: "compact" | "wide" | "stage";
};

export const eventHighlights = [
  {
    number: "01",
    english: "MORE BACK INTO THE EVENT",
    title: "活動收入全數回饋",
    singleLineTitle: true,
    description:
      "活動收入將全數投入入場好禮、卡牌贈禮、活動獎品與現場驚喜，讓每位到場玩家都能玩得盡興、帶著滿滿收穫回家。",
    image: media.sectionHighlightsArena,
    imagePosition: "48% center",
    alt: "紅藍燈光下的大型卡牌活動會場與收藏展示區",
    points: ["入場好禮", "活動獎品", "現場製作"],
    layout: "compact",
  },
  {
    number: "02",
    english: "GIFTS & ON-SITE SURPRISES",
    title: "入場好禮與現場驚喜",
    description:
      "不只是來逛展。入場即可獲得精選好禮，現場還有卡牌贈禮、互動任務與抽獎獎品。",
    image: media.highlightPlayers,
    imagePosition: "50% center",
    alt: "玩家在卡牌活動現場交流、試玩並分享手上的卡牌",
    points: ["入場好禮", "卡牌贈禮", "任務與抽獎"],
    layout: "wide",
  },
  {
    number: "03",
    english: "CHAMPION CHALLENGE",
    title: "冠軍挑戰賽",
    description:
      "一般玩家也能登上舞台，面對頂尖選手，在現場觀眾面前完成一場高張力對戰。",
    image: media.sectionScheduleStage,
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
      "走進珍稀卡牌區與收藏展示區，近距離欣賞特殊設計的卡牌與精選收藏，一次看見卡牌文化的不同面貌。",
    image: media.highlightRareCard,
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
      "現場集結 30+ 家 TCG 攤商，不只有寶可夢，也有不同卡種與收藏方向。",
    image: media.eventCrowd,
    imagePosition: "center",
    alt: "眾多玩家在設有大量攤位的 TCG 卡牌活動現場逛展",
    points: ["30+ 攤商", "多元卡種", "特色選品"],
    notice: "攤商名單與攤位圖將陸續公布",
    layout: "compact",
  },
] as const satisfies readonly EventHighlight[];
