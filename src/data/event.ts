import eventManifest from "../config/event.json";

export const event = eventManifest;

export const navigation = [
  { label: "活動亮點", href: "#highlights" },
  { label: "節目表", href: "#schedule" },
  { label: "攤商", href: "#vendors" },
  { label: "場地地圖", href: "#venue" },
  { label: "常見問題", href: "#faq" },
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
