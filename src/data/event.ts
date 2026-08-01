import eventManifest from "../config/event.json";

export const event = eventManifest;

export const navigation = [
  { label: "活動亮點", href: "#highlights" },
  { label: "節目表", href: "#schedule" },
  { label: "攤商", href: "#vendors" },
  { label: "場地地圖", href: "#venue" },
  { label: "常見問題", href: "#faq" },
] as const;

export const faqCategories = [
  "活動資訊",
  "門票與入場",
  "現場體驗",
] as const;

export const faqItems = [
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
    question: "如何購買門票？",
    answer:
      "點選網站中的「立即購票」，即可透過 Luma 查看票價、入場權益並完成購票。名額額滿後將停止售票。",
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
      "不同攤位的付款方式可能有所不同，請在交易前向參展商確認。大會不保證所有攤位均接受信用卡或電子支付。",
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
] as const;
