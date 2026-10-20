import { siteContent } from "./siteContent";
import { taiwanArchiveFaq } from "./taiwanArchiveFaq";

export const taiwanArchiveContent = {
  "zh-TW": {
    ...siteContent["zh-TW"],
    pageTitle: "FLAGSHIP Taiwan 2026｜活動回顧",
    metaDescription: "回顧 2026 年 9 月 5 日 FLAGSHIP 台灣卡展。透過現場實拍照片，重溫入場好禮、激戰擂台與 30+ TCG 攤商的精彩時刻。",
    navigation: [
      { label: "精彩回顧", href: "#highlights" },
      { label: "攤商", href: "#vendors" },
      { label: "活動場地", href: "#venue" },
      { label: "常見問題", href: "#faq" },
    ],
    hero: {
      eyebrow: "05 SEP 2026 · THANK YOU, TAIWAN",
      titleKicker: "台灣 2026・活動回顧",
      title: "旗艦卡牌展",
      coverVisualAlt: "浮動的 Flagship Card Show Taiwan 橫向活動卡片",
      featureTags: ["30+ TCG 攤商", "登上激戰擂台", "現場活動"],
    },
    archive: { status: "本屆活動已結束", recap: "回看現場精彩", updates: "追蹤最新消息", thanks: "謝謝每一位到場的你。", description: "從翻開卡本，到坐上對戰桌，是每一位玩家、收藏家與攤商，讓 FLAGSHIP 台灣站成為值得記住的一天。下一次見面，從這裡繼續。" },
    highlights: {
      title: "那一天的精彩",
      english: "TAIWAN 2026 · RECAP",
      cardLabel: "EVENT RECAP",
      description: "2026 年 9 月 5 日，收藏、對戰與相遇發生在同一個現場。透過當天的真實照片，回看屬於台灣站的三個精彩片段。",
      indexLabel: "活動回顧快速導覽",
      listLabel: "台灣站現場實拍回顧",
      pointsLabel: (title: string) => `${title}包含的內容`,
      items: [
        {
          number: "01",
          english: "GIFTS & ON-SITE SURPRISES",
          title: "入場好禮與現場驚喜",
          description:
            "轉動抽獎箱、亮出手中的卡牌，攤位前的笑容與歡呼，留下了這一天最直接的驚喜。",
          alt: "台灣站玩家在抽獎箱旁開心展示卡牌，周圍觀眾一同見證現場驚喜",
          points: ["入場好禮", "卡牌贈禮", "任務與抽獎", "現場驚喜"],
        },
        {
          number: "02",
          english: "CHAMPION CHALLENGE",
          title: "激戰擂台・現場交鋒",
          description:
            "牌組攤開、玩家就位。舞台對戰區裡，每一次出牌與交鋒，都成了 FLAGSHIP 台灣站的現場記憶。",
          alt: "台灣站舞台上的多組玩家坐在對戰桌兩側，專注進行卡牌對局",
          points: ["玩家挑戰", "舞台對戰", "活動獎品"],
        },
        {
          number: "03",
          english: "30+ TCG VENDORS",
          title: "30+ TCG 攤商集結",
          description:
            "30+ 家 TCG 攤商齊聚台北。收藏家在攤位前翻卡、交流，從不同卡種到珍藏選品，讓每張桌子都有聊不完的話題。",
          alt: "從高處俯瞰 FLAGSHIP 台灣卡展，密集人潮一路延伸至舞台與兩側攤位",
          points: ["30+ 攤商", "多元卡種", "特色選品"],
        },
      ],
    },
    faq: taiwanArchiveFaq["zh-TW"],
    venue: { ...siteContent["zh-TW"].venue, title: "那一天的場地", english: "THE VENUE · TAIPEI", directions: "查看活動場地" },
  },
  "en": {
    ...siteContent["en"],
    pageTitle: "FLAGSHIP Taiwan 2026 | Event Recap",
    metaDescription:
      "Revisit FLAGSHIP Taiwan, held on September 5, 2026. Real photographs capture on-site surprises, Champion Challenge matches and 30+ TCG vendors.",
    navigation: [
      { label: "Recap", href: "#highlights" },
      { label: "Vendors", href: "#vendors" },
      { label: "Venue", href: "#venue" },
      { label: "FAQ", href: "#faq" },
    ],
    hero: {
      eyebrow: "05 SEP 2026 · THANK YOU, TAIWAN",
      titleKicker: "TAIWAN 2026 · THE RECAP",
      title: "CARD SHOW",
      coverVisualAlt: "A floating landscape Flagship Card Show Taiwan event card",
      featureTags: ["30+ TCG VENDORS", "CHAMPION CHALLENGE", "ON-SITE ACTIVITIES"],
    },
    archive: { status: "THIS EDITION HAS ENDED", recap: "Revisit the highlights", updates: "Follow the next chapter", thanks: "Thank you for being there.", description: "From opening binders to sitting down for a match, every player, collector and vendor helped make FLAGSHIP Taiwan a day to remember. The story continues from here." },
    highlights: {
      title: "A Day to Remember",
      english: "TAIWAN 2026 · RECAP",
      cardLabel: "EVENT RECAP",
      description: "September 5, 2026. Collecting, competing and meeting face to face. Revisit three moments from FLAGSHIP Taiwan through photographs taken on the day.",
      indexLabel: "Highlights quick navigation",
      listLabel: "Event highlights",
      pointsLabel: (title: string) => `What's included in ${title}`,
      items: [
        {
          number: "01",
          english: "GIFTS & ON-SITE SURPRISES",
          title: "Gifts & On-Site Surprises",
          description:
            "A turn of the prize drum, a card held up for everyone to see. Smiles and cheers around the booth captured the surprises of the day.",
          alt: "A smiling Taiwan attendee shows cards beside the prize drum, surrounded by fellow visitors",
          points: ["Entry gifts", "Card giveaways", "Missions & prize draws", "On-site surprises"],
        },
        {
          number: "02",
          english: "CHAMPION CHALLENGE",
          title: "Champion Challenge",
          description:
            "Decks on the table, players face to face. Every turn and match in the stage play area became part of the story of FLAGSHIP Taiwan.",
          alt: "Players seated across multiple tables on the Taiwan stage, focused on their card matches",
          points: ["Player challenge", "Stage matches", "Event prizes"],
        },
        {
          number: "03",
          english: "30+ TCG VENDORS",
          title: "30+ TCG Vendors",
          description:
            "More than 30 TCG vendors came together in Taipei. Collectors browsed cards and shared stories across tables filled with different games and treasured finds.",
          alt: "An elevated view of FLAGSHIP Taiwan with a dense crowd stretching toward the stage and vendor rows",
          points: ["30+ vendors", "Multiple card games", "Curated finds"],
        },
      ],
    },
    faq: taiwanArchiveFaq["en"],
    venue: { ...siteContent.en.venue, title: "Where It Happened", english: "THE VENUE · TAIPEI", directions: "View the venue" },
  },
} as const;
