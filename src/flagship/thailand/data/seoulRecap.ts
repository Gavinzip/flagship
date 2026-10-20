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
  th: {
    title: "ย้อนชมโซล ก่อนพบกันที่กรุงเทพฯ",
    intro: "ภาพจาก BNB Seoul Super Meetup ที่บูธ Renaiss มีทั้งคนมาร่วมกิจกรรม แบ่งปันการ์ด และชมของสะสม แล้วพบกันอีกครั้งที่กรุงเทพฯ",
    source: "ภาพจากงานเกาหลี · BNB SEOUL SUPER MEETUP",
    captions: {
      reactions: { label: "เสียงเชียร์จากคนที่บูธ", alt: "ผู้เข้าชมล้อมบูธสีเหลืองและส่งเสียงเชียร์ในงานโซล" },
      cards: { label: "การ์ดเกรด PSA ที่บูธ Renaiss", alt: "การ์ดเกรด PSA จัดแสดงที่บูธ Renaiss ในงานโซล" },
      collectors: { label: "พาของสะสมมาพบเพื่อนใหม่", alt: "นักสะสมโชว์การ์ดหน้าบูธ Renaiss ในงานโซล" },
    },
  },
  "zh-TW": {
    title: "回看首爾，下一站曼谷。",
    intro: "這些照片來自 BNB Seoul Super Meetup：有人在攤位前互動，也有人帶著卡牌交流、看看 Renaiss 展出的收藏。下一站到曼谷，再和大家見面。",
    source: "韓國活動實拍 · BNB SEOUL SUPER MEETUP",
    captions: {
      reactions: { label: "攤位前，大家一起歡呼。", alt: "首爾活動參觀者圍在黃色攤位前，為互動體驗歡呼" },
      cards: { label: "Renaiss 攤位上的 PSA 鑑定卡。", alt: "首爾活動 Renaiss 攤位展示的 PSA 鑑定卡" },
      collectors: { label: "帶著收藏，認識同樣喜歡卡牌的人。", alt: "收藏家在首爾活動的 Renaiss 攤位前展示卡牌" },
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
