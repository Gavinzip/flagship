import type { SiteLanguage } from "../../data/copy";
import { thailandAssetUrl } from "./assetDelivery";

// Selected user-provided Seoul photographs; original files remain in the user's folder.
export const seoulRecapPhotos = [
  { id: "reactions", src: thailandAssetUrl("seoul-booth-reactions.webp"), width: 1400, height: 933, position: "58% 45%" },
  { id: "cards", src: thailandAssetUrl("seoul-graded-card-display.webp"), width: 1200, height: 800, position: "56% 62%" },
  { id: "collectors", src: thailandAssetUrl("seoul-collector-cards.webp"), width: 1200, height: 800, position: "50% 40%" },
] as const;

type SeoulRecapCopy = {
  title: string;
  intro: string;
  source: string;
  captions: Record<typeof seoulRecapPhotos[number]["id"], { label: string; alt: string }>;
};

export const seoulRecapCopy: Record<SiteLanguage, SeoulRecapCopy> = {
  "zh-TW": {
    title: "從首爾，走向下一次相聚。",
    intro: "卡牌在手，話題就開始了。回看 Renaiss 在 BNB Seoul Super Meetup 的收藏展示、攤位互動與社群交流，把這份熱愛帶到下一站曼谷。",
    source: "韓國活動實拍 · BNB SEOUL SUPER MEETUP",
    captions: {
      reactions: { label: "一起投入，才有現場的熱度。", alt: "首爾活動參觀者圍在黃色攤位前，為互動體驗歡呼" },
      cards: { label: "值得停下來看的收藏。", alt: "首爾活動 Renaiss 攤位展示的 PSA 鑑定卡" },
      collectors: { label: "收藏，讓我們認識彼此。", alt: "收藏家在首爾活動的 Renaiss 攤位前展示卡牌" },
    },
  },
  en: {
    title: "From Seoul, to our next gathering.",
    intro: "A card starts a conversation. Look back at Renaiss at BNB Seoul Super Meetup: collectible displays, booth experiences and community encounters. Next stop, Bangkok.",
    source: "PHOTOGRAPHED IN KOREA · BNB SEOUL SUPER MEETUP",
    captions: {
      reactions: { label: "The energy of being there, together.", alt: "Visitors cheering around a yellow booth during an interactive experience at the Seoul event" },
      cards: { label: "Collections worth a closer look.", alt: "PSA graded cards on display at the Renaiss booth in Seoul" },
      collectors: { label: "A collection. A new connection.", alt: "A collector showing cards in front of the Renaiss booth at the Seoul event" },
    },
  },
  ko: {
    title: "서울에서, 다음 만남으로.",
    intro: "카드 한 장으로 대화가 시작됩니다. BNB Seoul Super Meetup의 Renaiss 부스에서 만난 수집품 전시, 현장 체험과 커뮤니티 교류를 돌아봅니다. 다음 만남은 방콕입니다.",
    source: "한국 행사 실사 · BNB SEOUL SUPER MEETUP",
    captions: {
      reactions: { label: "함께하기에 더 뜨거운 현장.", alt: "서울 행사 노란색 부스에서 체험하며 환호하는 관람객들" },
      cards: { label: "가까이서 보고 싶은 컬렉션.", alt: "서울 Renaiss 부스에 전시된 PSA 등급 카드" },
      collectors: { label: "컬렉션으로 이어지는 새로운 인연.", alt: "서울 행사 Renaiss 부스 앞에서 카드를 보여주는 수집가" },
    },
  },
};
