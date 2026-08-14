import { event } from "../data/event";
import type { EventHighlightNumber } from "../data/eventHighlights";
import type { ReservationErrorCode } from "../../shared/reservations/domain";

export type Locale = "zh-TW" | "en";

type HighlightCopy = {
  number: EventHighlightNumber;
  english: string;
  title: string;
  description: string;
  alt: string;
  points: readonly string[];
  notice?: string;
};

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

type SiteContent = {
  metaDescription: string;
  navigation: readonly { label: string; href: string }[];
  header: {
    homeLabel: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    languageMenuLabel: string;
    currentLanguageLabel: string;
    languageOptions: readonly { locale: Locale; label: string }[];
  };
  hero: {
    eyebrow: string;
    titleKicker: string;
    title: string;
    coverVisualAlt: string;
    featureTags: readonly string[];
  };
  event: {
    venue: string;
    address: string;
    transit: string;
  };
  eventPass: {
    dateLabel: string;
    timeLabel: string;
    placeLabel: string;
  };
  calendar: {
    label: string;
  };
  mobileActions: {
    label: string;
    directions: string;
  };
  highlights: {
    title: string;
    english: string;
    indexLabel: string;
    listLabel: string;
    pointsLabel: (title: string) => string;
    items: readonly HighlightCopy[];
  };
  schedule: {
    title: string;
    english: string;
    entryOpen: string;
    comingSoon: string;
    comingSoonDescription: string;
    eventEnds: string;
  };
  vendors: {
    title: string;
    english: string;
    listComingSoon: string;
    mapComingSoon: string;
  };
  venue: {
    title: string;
    english: string;
    mapTitle: string;
    mapRoute: string;
    transitTitle: string;
    routeLabel: string;
    routeSteps: readonly string[];
    directions: string;
    floorPlanTitle: string;
    floorPlanDescription: string;
    openFloorPlan: string;
    floorPlanLabel: string;
    floorPlanAlt: string;
    legendLabel: string;
    legend: readonly string[];
  };
  faq: {
    categoryLabel: string;
    categories: readonly string[];
    items: readonly FaqItem[];
  };
  tickets: {
    title: string;
    pageHeading: string;
    description: string;
    statusEyebrow: string;
    liveStatus: string;
    lastUpdated: (time: string) => string;
    refresh: string;
    loadingTitle: string;
    loadingDescription: string;
    unavailableTitle: string;
    unavailableDescription: string;
    staleAvailability: string;
    retry: string;
    emptyTitle: string;
    emptyDescription: string;
    selectStep: string;
    confirmStep: string;
    gmailLabel: string;
    gmailPlaceholder: string;
    gmailHint: string;
    slotsLabel: string;
    remaining: (count: number) => string;
    registered: (count: number) => string;
    capacity: (count: number) => string;
    slotAvailable: string;
    slotFull: string;
    slotClosed: string;
    slotRejected: string;
    closesAt: (time: string) => string;
    continue: string;
    invalidGmail: string;
    selectSlot: string;
    reviewTitle: string;
    reviewDescription: string;
    reviewGmail: string;
    reviewSlot: string;
    ticketCountLabel: string;
    ticketCount: (count: number) => string;
    back: string;
    submit: string;
    submitting: string;
    privacy: string;
    successEyebrow: string;
    successTitle: string;
    successDescription: string;
    successReference: string;
    registerAnother: string;
    replayDemo: string;
    errors: Record<ReservationErrorCode, string>;
  };
  footer: {
    backToTop: string;
  };
  loading: {
    loadingLabel: string;
    errorLabel: string;
    errorTitle: string;
    errorDescription: string;
    reload: string;
    progressLabel: (progress: number) => string;
  };
};

export const siteContent = {
  "zh-TW": {
    metaDescription: event.metaDescription,
    navigation: [
      { label: "活動亮點", href: "#highlights" },
      { label: "節目表", href: "#schedule" },
      { label: "攤商", href: "#vendors" },
      { label: "場地地圖", href: "#venue" },
      { label: "常見問題", href: "#faq" },
    ],
    header: {
      homeLabel: "回到網站頂端",
      primaryNavLabel: "主要導覽",
      mobileNavLabel: "手機導覽",
      openMenuLabel: "開啟選單",
      closeMenuLabel: "關閉選單",
      languageMenuLabel: "選擇語言",
      currentLanguageLabel: "中文",
      languageOptions: [
        { locale: "zh-TW", label: "繁體中文" },
        { locale: "en", label: "English" },
      ],
    },
    hero: {
      eyebrow: "MORE THAN TABLES · CONNECTING PLAY CULTURE",
      titleKicker: "台灣年度",
      title: "旗艦卡牌展",
      coverVisualAlt: "浮動的 Flagship Card Show Taiwan 橫向活動卡片",
      featureTags: ["30+ TCG 攤商", "冠軍挑戰賽", "稀有收藏展示"],
    },
    event: {
      venue: event.venue,
      address: event.address,
      transit: event.transit,
    },
    eventPass: { dateLabel: "DATE", timeLabel: "TIME", placeLabel: "PLACE" },
    calendar: { label: "加入行事曆" },
    mobileActions: {
      label: "活動快速操作",
      directions: "開始導航",
    },
    highlights: {
      title: "活動亮點",
      english: "EVENT HIGHLIGHTS",
      indexLabel: "活動亮點快速導覽",
      listLabel: "活動亮點",
      pointsLabel: (title) => `${title}包含的內容`,
      items: [
        {
          number: "01",
          english: "GIFTS & ON-SITE SURPRISES",
          title: "入場好禮與現場驚喜",
          description:
            "活動收入將全數回饋現場，投入入場好禮、卡牌贈禮、任務與抽獎獎品及更多驚喜。入場即可帶走精選好禮，讓每位玩家都能玩得盡興、滿載而歸。",
          alt: "玩家在卡牌活動現場交流、試玩並分享手上的卡牌",
          points: ["入場好禮", "卡牌贈禮", "任務與抽獎", "現場驚喜"],
        },
        {
          number: "02",
          english: "CHAMPION CHALLENGE",
          title: "冠軍挑戰賽",
          description:
            "一般玩家也能登上舞台，面對頂尖選手，在現場觀眾面前完成一場高張力對戰。",
          alt: "紅藍燈光環繞的卡牌競賽舞台與現場觀眾",
          points: ["玩家挑戰", "舞台對戰", "活動獎品"],
        },
        {
          number: "03",
          english: "RARE CARD & COLLECTIBLES SHOWCASE",
          title: "稀有卡牌與收藏展示",
          description:
            "走進珍稀卡牌區與收藏展示區，近距離欣賞特殊設計的卡牌與精選收藏，一次看見卡牌文化的不同面貌。",
          alt: "參加者近距離欣賞具有特殊設計的珍稀卡牌",
          points: ["稀有卡牌", "收藏故事", "文化藏品"],
        },
        {
          number: "04",
          english: "30+ TCG VENDORS",
          title: "30+ TCG 攤商集結",
          description:
            "現場集結 30+ 家 TCG 攤商，不只有寶可夢，也有不同卡種與收藏方向。",
          alt: "眾多玩家在設有大量攤位的 TCG 卡牌活動現場逛展",
          points: ["30+ 攤商", "多元卡種", "特色選品"],
          notice: "攤商名單與攤位圖將陸續公布",
        },
      ],
    },
    schedule: {
      title: "節目表",
      english: "SCHEDULE",
      entryOpen: "開放入場",
      comingSoon: "完整舞台時程即將公布",
      comingSoonDescription: "挑戰賽、互動活動與抽獎時段將陸續更新",
      eventEnds: "活動結束",
    },
    vendors: {
      title: "參展攤商",
      english: "EXHIBITORS",
      listComingSoon: "攤商名單陸續公布",
      mapComingSoon: "攤位配置同步更新",
    },
    venue: {
      title: "場地地圖",
      english: "VENUE & FLOOR MAP",
      mapTitle: "三創生活園區 Google 地圖",
      mapRoute: "忠孝新生站 → 三創生活園區",
      transitTitle: "搭捷運最方便",
      routeLabel: "抵達會場步驟",
      routeSteps: [
        "抵達捷運忠孝新生站，從 1 號出口出站。",
        "步行約 5 分鐘抵達三創生活園區。",
        "進入商場後前往 5F Clapper Studio。",
      ],
      directions: "從目前位置開始導航",
      floorPlanTitle: "會場配置圖",
      floorPlanDescription: "入口位於左下方，舞台位於右側；手機可左右滑動查看。",
      openFloorPlan: "展開完整地圖",
      floorPlanLabel: "可左右滑動的會場配置圖",
      floorPlanAlt:
        "Clapper Studio 5F 會場配置圖；入口在左下方，攤位位於中央，展示區在上方，舞台在右側，出口在下方偏右。",
      legendLabel: "配置圖圖例",
      legend: [
        "紅色：一般攤位 T01–T24",
        "黃色：大型攤位 T30–T33",
        "藍色：展示區",
        "右側：舞台",
      ],
    },
    faq: {
      categoryLabel: "常見問題分類",
      categories: ["活動資訊", "門票與入場", "現場體驗"],
      items: [
        {
          category: "活動資訊",
          question: "FLAGSHIP Card Show Taiwan 是什麼活動？",
          answer:
            "FLAGSHIP Card Show Taiwan 是一日制卡牌展覽，集合卡店、收藏家、玩家及品牌。現場設有卡牌市集、Champion Challenge、珍稀收藏展示及舞台活動。",
        },
        {
          category: "活動資訊",
          question: "活動何時舉行？",
          answer: "日期：2026 年 9 月 5 日\n時間：12:00 至 19:00",
        },
        {
          category: "活動資訊",
          question: "活動地點在哪裡？",
          answer:
            "台北三創生活園區 5 樓 CLAPPER STUDIO。\n\n完整交通路線、排隊位置及入場指引將於活動前公布。",
        },
        {
          category: "活動資訊",
          question: "現場會有哪些卡牌？",
          answer:
            "現場預計涵蓋 Pokémon、ONE PIECE、運動卡及其他收藏品類。實際商品、卡牌版本、語言及庫存由各參展商決定，參展名單將分階段公布。",
        },
        {
          category: "活動資訊",
          question: "哪些人適合參加？",
          answer:
            "無論你是資深收藏家、卡牌玩家、剛開始接觸收藏的新手，還是正在尋找合作機會的卡店與品牌，都可以參加。",
        },
        {
          category: "門票與入場",
          question: "早鳥票要如何選擇入場時段？",
          answer:
            "已完成早鳥預約的參加者，將由主辦單位寄送入場時段登記通知至預約時使用的 Gmail。請從信件中的專屬頁面選擇尚有名額的時段；每個 Gmail 只能登記一次。",
        },
        {
          category: "門票與入場",
          question: "活動當日可以現場購票嗎？",
          answer:
            "現場售票安排須視剩餘名額而定。請在出發前查看本網站或官方社群的最新公告。",
        },
        {
          category: "門票與入場",
          question: "門票包含哪些內容？",
          answer:
            "實際權益以售票頁面所列內容為準。贈品、抽獎資格、限定商品或合作夥伴禮遇如有名額及參加條件，將在個別活動公告中說明。",
        },
        {
          category: "門票與入場",
          question: "需要提早到場嗎？",
          answer:
            "活動於 12:00 開場。建議預留時間完成驗票及入場程序。排隊起點與入場安排將於活動前公布，請依照現場工作人員指示排隊，並保持商場通道暢通。",
        },
        {
          category: "門票與入場",
          question: "可以中途離場後再次入場嗎？",
          answer:
            "再次入場規則將於售票條款及活動前通知中說明。請保留電子票券、手環或其他入場憑證。",
        },
        {
          category: "現場體驗",
          question: "如何參加 Champion Challenge？",
          answer:
            "比賽項目、參賽資格、活動規則、報名方式及名額將另行公布。部分環節可能需要事前報名，現場不一定接受即場參加。",
        },
        {
          category: "現場體驗",
          question: "珍稀收藏展示中的卡牌可以購買嗎？",
          answer:
            "收藏展示品不一定對外出售。現場攤位所提供的商品、售價及交易方式，請直接向相關參展商確認。",
        },
        {
          category: "現場體驗",
          question: "可以攜帶自己的卡牌到場嗎？",
          answer:
            "可以攜帶個人收藏，但請自行妥善保管。各攤位是否提供收卡、換卡或估價服務，須由參展商自行決定。",
        },
        {
          category: "現場體驗",
          question: "現場接受哪些付款方式？",
          answer:
            "現場所有交易皆採現金或轉帳，付款前請先向攤商確認收款資訊。",
        },
        {
          category: "門票與入場",
          question: "活動或門票可以退款嗎？",
          answer:
            "退票期限、手續費及活動異動安排，以購票頁面公布的正式條款為準。購票前請先閱讀完整退票政策。",
        },
        {
          category: "活動資訊",
          question: "如何取得最新消息？",
          answer:
            "參展名單、門票資訊、活動時間表、交通指南及現場安排，將陸續公布於本網站及 FLAGSHIP 官方社群。",
        },
      ],
    },
    tickets: {
      title: "早鳥入場時段",
      pageHeading: "預約入場時段",
      description:
        "早鳥票預約已結束。已完成預約的參加者，請輸入當時使用的 Gmail，並選擇尚有名額的入場時段。",
      statusEyebrow: "LIVE CAPACITY",
      liveStatus: "即時名額",
      lastUpdated: (time) => `更新於 ${time}`,
      refresh: "更新名額",
      loadingTitle: "正在取得即時名額",
      loadingDescription: "名額會以伺服器目前資料為準。",
      unavailableTitle: "目前無法取得名額",
      unavailableDescription:
        "為避免顯示錯誤數字，暫時不開放送出。請稍後重新整理。",
      staleAvailability: "即時更新暫時中斷，目前顯示最後一次成功取得的名額；恢復更新前不開放送出。",
      retry: "重新取得",
      emptyTitle: "時段尚未開放",
      emptyDescription: "主辦單位完成時段與名額設定後，會在這裡直接開放登記。",
      selectStep: "選擇時段",
      confirmStep: "確認送出",
      gmailLabel: "早鳥預約使用的 Gmail",
      gmailPlaceholder: "yourname@gmail.com",
      gmailHint: "請填寫完成早鳥預約時使用的 Gmail；每個 Gmail 限登記一次，且只會登記 1 張早鳥票。",
      slotsLabel: "選擇入場時段",
      remaining: (count) => `剩餘 ${count} 名`,
      registered: (count) => `已登記 ${count} 名`,
      capacity: (count) => `總名額 ${count} 名`,
      slotAvailable: "可登記",
      slotFull: "已額滿",
      slotClosed: "已截止",
      slotRejected: "此組合未完成",
      closesAt: (time) => `${time} 截止`,
      continue: "確認資料",
      invalidGmail: "請輸入完整的 Gmail 地址。",
      selectSlot: "請先選擇一個尚有名額的入場時段。",
      reviewTitle: "最後確認",
      reviewDescription: "送出後無法自行更改時段；本次只會登記 1 張早鳥票，請確認 Gmail 與入場時間。",
      reviewGmail: "Gmail",
      reviewSlot: "入場時段",
      ticketCountLabel: "本次登記",
      ticketCount: (count) => `${count} 張早鳥票`,
      back: "返回修改",
      submit: "確認登記",
      submitting: "正在鎖定名額",
      privacy: "Gmail 僅用於本次早鳥入場時段登記、辨識重複資料及活動通知。",
      successEyebrow: "RESERVATION LOCKED",
      successTitle: "入場時段已登記",
      successDescription: "請截圖保存以下資料，並於活動當日攜帶原早鳥票券。",
      successReference: "登記編號",
      registerAnother: "登記其他 Gmail",
      replayDemo: "再看一次示範",
      errors: {
        INVALID_GMAIL: "這個地址不是有效的 Gmail，請重新確認。",
        INVALID_SLOT: "這個時段已不存在，請重新選擇。",
        SLOT_CLOSED: "你選擇的時段剛剛截止，請改選其他時段。",
        SLOT_FULL: "這個時段剛剛額滿，請改選其他時段。",
        RESERVATION_UNAVAILABLE: "目前無法完成登記。請確認 Gmail 與原 Luma 早鳥預約相同、尚未選過時段，或改選其他時段。",
        SERVER_ERROR: "系統暫時無法完成登記，名額不會被誤扣，請稍後再試。",
        NETWORK_ERROR: "網路連線中斷，請確認連線後再試一次。",
      },
    },
    footer: { backToTop: "返回頂端" },
    loading: {
      loadingLabel: "網站載入中",
      errorLabel: "網站載入失敗",
      errorTitle: "部分活動素材未能載入",
      errorDescription: "請確認網路連線後重新載入，我們不會用低畫質圖片替代。",
      reload: "重新載入",
      progressLabel: (progress) => `載入進度 ${progress}%`,
    },
  },
  en: {
    metaDescription:
      "Flagship Card Show Taiwan 2026 takes place on September 5 at CLAPPER STUDIO, 5F, Syntrend Creative Park. Explore 30+ TCG vendors, the Champion Challenge, rare-card displays, and on-site activities.",
    navigation: [
      { label: "Highlights", href: "#highlights" },
      { label: "Schedule", href: "#schedule" },
      { label: "Vendors", href: "#vendors" },
      { label: "Venue", href: "#venue" },
      { label: "FAQ", href: "#faq" },
    ],
    header: {
      homeLabel: "Back to top",
      primaryNavLabel: "Primary navigation",
      mobileNavLabel: "Mobile navigation",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      languageMenuLabel: "Select language",
      currentLanguageLabel: "EN",
      languageOptions: [
        { locale: "zh-TW", label: "Traditional Chinese" },
        { locale: "en", label: "English" },
      ],
    },
    hero: {
      eyebrow: "MORE THAN TABLES · CONNECTING PLAY CULTURE",
      titleKicker: "TAIWAN'S PREMIER",
      title: "CARD SHOW",
      coverVisualAlt: "A floating landscape Flagship Card Show Taiwan event card",
      featureTags: ["30+ TCG VENDORS", "CHAMPION CHALLENGE", "RARE SHOWCASE"],
    },
    event: {
      venue: event.englishVenue,
      address: event.englishAddress,
      transit: "About a 5-minute walk from Zhongxiao Xinsheng MRT Station, Exit 1",
    },
    eventPass: { dateLabel: "DATE", timeLabel: "TIME", placeLabel: "VENUE" },
    calendar: { label: "Add to Calendar" },
    mobileActions: {
      label: "Event quick actions",
      directions: "Get Directions",
    },
    highlights: {
      title: "Highlights",
      english: "EVENT HIGHLIGHTS",
      indexLabel: "Highlights quick navigation",
      listLabel: "Event highlights",
      pointsLabel: (title) => `What's included in ${title}`,
      items: [
        {
          number: "01",
          english: "GIFTS & ON-SITE SURPRISES",
          title: "Gifts & On-Site Surprises",
          description:
            "All event proceeds go back into the show—entry gifts, card giveaways, missions, prize draws, and more surprises. Come in, take home something special, and make the most of the day.",
          alt: "Players trading and sharing cards at the show",
          points: ["Entry gifts", "Card giveaways", "Missions & prize draws", "On-site surprises"],
        },
        {
          number: "02",
          english: "CHAMPION CHALLENGE",
          title: "Champion Challenge",
          description:
            "Step onto the stage, face top players, and take on a high-stakes match in front of a live audience.",
          alt: "A card-game stage with red and blue lights and a live audience",
          points: ["Player challenge", "Stage matches", "Event prizes"],
        },
        {
          number: "03",
          english: "RARE CARD & COLLECTIBLES SHOWCASE",
          title: "Rare Cards & Collectibles",
          description:
            "Explore rare cards and curated displays up close, and discover the stories behind collectible card culture.",
          alt: "A visitor examining a rare card up close",
          points: ["Rare cards", "Collector stories", "Cultural collectibles"],
        },
        {
          number: "04",
          english: "30+ TCG VENDORS",
          title: "30+ TCG Vendors",
          description:
            "Meet more than 30 TCG vendors, with Pokémon, other card games, and a wide range of collectible specialties.",
          alt: "Visitors browsing a busy TCG card show with many vendors",
          points: ["30+ vendors", "Multiple card games", "Curated finds"],
          notice: "Vendor list and floor plan will be announced soon",
        },
      ],
    },
    schedule: {
      title: "Schedule",
      english: "EVENT PROGRAM",
      entryOpen: "Doors open",
      comingSoon: "Full stage schedule coming soon",
      comingSoonDescription:
        "Challenge matches, interactive activities, and prize-draw times will be announced soon.",
      eventEnds: "Event ends",
    },
    vendors: {
      title: "Vendors",
      english: "EXHIBITORS",
      listComingSoon: "Vendor list coming soon",
      mapComingSoon: "Floor assignments will be updated here",
    },
    venue: {
      title: "Venue & Floor Map",
      english: "GETTING HERE",
      mapTitle: "Syntrend Creative Park on Google Maps",
      mapRoute: "Zhongxiao Xinsheng Station → Syntrend Creative Park",
      transitTitle: "Easy to reach by MRT",
      routeLabel: "Getting to the venue",
      routeSteps: [
        "Arrive at Zhongxiao Xinsheng MRT Station and exit through Exit 1.",
        "Walk about 5 minutes to Syntrend Creative Park.",
        "Enter the mall and head to CLAPPER STUDIO on the 5th floor.",
      ],
      directions: "Get Directions",
      floorPlanTitle: "Floor Plan",
      floorPlanDescription:
        "The entrance is at the lower left and the stage is on the right. On mobile, scroll sideways to explore.",
      openFloorPlan: "Open Full Map",
      floorPlanLabel: "Horizontally scrollable floor plan",
      floorPlanAlt:
        "CLAPPER STUDIO 5F floor plan with the entrance at lower left, vendors in the center, displays at the top, the stage on the right, and the exit toward the lower right.",
      legendLabel: "Floor plan legend",
      legend: [
        "Red: standard vendor tables T01–T24",
        "Yellow: large vendor tables T30–T33",
        "Blue: display area",
        "Right: stage",
      ],
    },
    faq: {
      categoryLabel: "FAQ categories",
      categories: ["Event Info", "Tickets & Entry", "On-site Experience"],
      items: [
        {
          category: "Event Info",
          question: "What is FLAGSHIP Card Show Taiwan?",
          answer:
            "FLAGSHIP Card Show Taiwan is a one-day card show for card shops, collectors, players, and brands. It features a card market, the Champion Challenge, rare-collectible displays, and stage activities.",
        },
        {
          category: "Event Info",
          question: "When is the event?",
          answer: "Date: September 5, 2026\nTime: 12:00–19:00",
        },
        {
          category: "Event Info",
          question: "Where is the event?",
          answer:
            "CLAPPER STUDIO, 5F, Syntrend Creative Park, Taipei.\n\nFull travel directions, queueing locations, and entry guidance will be announced before the event.",
        },
        {
          category: "Event Info",
          question: "What cards will be at the show?",
          answer:
            "The show is expected to include Pokémon, ONE PIECE, sports cards, and other collectibles. Individual vendors determine the products, card versions, languages, and inventory they carry. Exhibitors will be announced in stages.",
        },
        {
          category: "Event Info",
          question: "Who is the show for?",
          answer:
            "Collectors, card-game players, newcomers to the hobby, card shops, and brands looking for collaboration are all welcome.",
        },
        {
          category: "Tickets & Entry",
          question: "How do early-bird guests choose an entry time?",
          answer:
            "Early-bird guests will receive an entry-time registration email at the Gmail used for their reservation. Open the private page from that email and choose an available slot; each Gmail may register once.",
        },
        {
          category: "Tickets & Entry",
          question: "Can I buy a ticket at the venue?",
          answer:
            "On-site sales depend on remaining capacity. Check this website or the official social channels for the latest update before you travel.",
        },
        {
          category: "Tickets & Entry",
          question: "What does a ticket include?",
          answer:
            "Refer to the ticketing page for the exact benefits. Details and participation conditions for gifts, prize draws, limited items, and partner benefits will be stated in each activity announcement.",
        },
        {
          category: "Tickets & Entry",
          question: "Should I arrive early?",
          answer:
            "Doors open at 12:00. Please allow time for ticket checks and entry. Queueing and entry arrangements will be announced before the event; follow on-site staff guidance and keep mall walkways clear.",
        },
        {
          category: "Tickets & Entry",
          question: "Can I re-enter after leaving?",
          answer:
            "Re-entry rules will be outlined in the ticket terms and pre-event notices. Keep your e-ticket, wristband, or other admission proof with you.",
        },
        {
          category: "On-site Experience",
          question: "How can I join the Champion Challenge?",
          answer:
            "Events, eligibility, rules, registration, and capacity will be announced separately. Some parts may require advance registration and may not accept walk-ins.",
        },
        {
          category: "On-site Experience",
          question: "Are cards in the rare-collectibles showcase for sale?",
          answer:
            "Showcase items may not be for sale. Please confirm available products, prices, and transaction methods directly with the relevant vendor.",
        },
        {
          category: "On-site Experience",
          question: "Can I bring my own cards?",
          answer:
            "Yes—please keep personal collections secure. Whether a vendor offers buying, trading, or appraisal services is up to that vendor.",
        },
        {
          category: "On-site Experience",
          question: "Which payment methods are accepted?",
          answer:
            "All on-site transactions accept cash or bank transfer only. Confirm the vendor’s payment details before paying.",
        },
        {
          category: "Tickets & Entry",
          question: "Can tickets or the event be refunded?",
          answer:
            "Refund deadlines, fees, and event-change arrangements are governed by the official terms on the ticketing page. Please review the complete refund policy before purchasing.",
        },
        {
          category: "Event Info",
          question: "How do I get the latest updates?",
          answer:
            "Exhibitor announcements, ticket information, schedules, travel guidance, and on-site arrangements will be published on this website and FLAGSHIP’s official social channels.",
        },
      ],
    },
    tickets: {
      title: "Early-Bird Entry Times",
      pageHeading: "Early-Bird Entry Times",
      description:
        "Early-bird reservations are closed. If you already reserved, enter the Gmail used at registration and choose an available entry time.",
      statusEyebrow: "LIVE CAPACITY",
      liveStatus: "Live availability",
      lastUpdated: (time) => `Updated ${time}`,
      refresh: "Refresh availability",
      loadingTitle: "Loading live availability",
      loadingDescription: "Availability is confirmed against the server.",
      unavailableTitle: "Availability is temporarily unavailable",
      unavailableDescription:
        "Submission is paused instead of showing an inaccurate number. Please try again shortly.",
      staleAvailability: "Live updates are temporarily interrupted. The last confirmed availability remains visible, and submission is paused until updates resume.",
      retry: "Try again",
      emptyTitle: "Entry times are not open yet",
      emptyDescription: "Registration will open here once the organizer confirms the time slots and capacities.",
      selectStep: "Choose a time",
      confirmStep: "Confirm",
      gmailLabel: "Gmail used for the early-bird reservation",
      gmailPlaceholder: "yourname@gmail.com",
      gmailHint: "Use the Gmail from your early-bird reservation. Each Gmail can register once, for exactly one early-bird ticket.",
      slotsLabel: "Choose an entry time",
      remaining: (count) => `${count} remaining`,
      registered: (count) => `${count} registered`,
      capacity: (count) => `${count} total`,
      slotAvailable: "Available",
      slotFull: "Full",
      slotClosed: "Closed",
      slotRejected: "Combination not accepted",
      closesAt: (time) => `Closes ${time}`,
      continue: "Review details",
      invalidGmail: "Enter a complete Gmail address.",
      selectSlot: "Choose an entry time that is still available.",
      reviewTitle: "Final check",
      reviewDescription: "You cannot change the entry time yourself after submission. This registration covers exactly one early-bird ticket.",
      reviewGmail: "Gmail",
      reviewSlot: "Entry time",
      ticketCountLabel: "This registration",
      ticketCount: (count) => `${count} early-bird ticket${count === 1 ? "" : "s"}`,
      back: "Edit details",
      submit: "Confirm entry time",
      submitting: "Securing your place",
      privacy: "Your Gmail is used only for this entry-time registration, duplicate detection, and event updates.",
      successEyebrow: "RESERVATION LOCKED",
      successTitle: "Your entry time is confirmed",
      successDescription: "Save a screenshot of these details and bring your original early-bird ticket to the event.",
      successReference: "Reference",
      registerAnother: "Register another Gmail",
      replayDemo: "Replay demo",
      errors: {
        INVALID_GMAIL: "Enter a valid Gmail address and try again.",
        INVALID_SLOT: "That entry time no longer exists. Please choose again.",
        SLOT_CLOSED: "That entry time just closed. Please choose another.",
        SLOT_FULL: "This entry time just filled up. Choose another time.",
        RESERVATION_UNAVAILABLE: "Registration could not be completed. Check the Gmail against the original Luma early-bird booking, confirm it has not registered already, or choose another time.",
        SERVER_ERROR: "Registration is temporarily unavailable. No place was deducted; please try again.",
        NETWORK_ERROR: "The connection was interrupted. Check your network and try again.",
      },
    },
    footer: { backToTop: "Back to Top" },
    loading: {
      loadingLabel: "Website loading",
      errorLabel: "Website failed to load",
      errorTitle: "Some event media could not be loaded",
      errorDescription:
        "Check your connection and reload. We will not substitute lower-quality images.",
      reload: "Reload",
      progressLabel: (progress) => `Loading progress ${progress}%`,
    },
  },
} as const satisfies Record<Locale, SiteContent>;
