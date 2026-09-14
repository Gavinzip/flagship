import type { SiteLanguage } from "../data/copy";

export type HomeCopy = {
  nav: [string, string, string]; menu: string; close: string; language: string; skip: string;
  headline: [string, string]; introduction: string; explore: string; viewRecap: string;
  aboutTitle: string[]; aboutParagraphs: [string, string]; aboutCaption: string; aboutAlt: string;
  editionsTitle: string; editionsIntro: string; taiwanStatus: string; koreaStatus: string;
  taiwanDescription: string; koreaDescription: string; taiwanCta: string; koreaCta: string; moreCities: string;
  experienceTitle: string; experienceIntro: string;
  experiences: { name: string; title: string; body: string; alt: string }[];
  sponsorLabel: string; sponsorTitle: string; sponsorBody: string; organizerLabel: string;
  recapTitle: [string, string]; recapBody: string; recapCaption: string; follow: string;
  recapArchiveLabel: string; recapLocation: string;
  recapCrowdCaption: string; recapCrowdAlt: string; recapPlayersCaption: string; recapPlayersAlt: string;
  recapBringForward: string; recapNextImage: string;
  footerTitle: string; footerBody: string; footerHome: string; official: string;
  pause: string; play: string; videoError: string; videoRetry: string; closeFilm: string;
};

export const homeCopy: Record<SiteLanguage, HomeCopy> = {
  "en": {
    "nav": [
      "About Flagship",
      "The experience",
      "Our partner"
    ],
    "menu": "Open navigation",
    "close": "Close navigation",
    "language": "Language",
    "skip": "Skip to content",
    "headline": [
      "A SHARED PASSION.",
      "A PLACE TO MEET."
    ],
    "introduction": "Collect, trade and play. Meet the people who love cards as much as you do, at FLAGSHIP.",
    "explore": "Explore the editions",
    "viewRecap": "Watch Taiwan 2026",
    "aboutTitle": [
      "THE BEGINNING OF FLAGSHIP"
    ],
    "aboutParagraphs": [
      "FLAGSHIP began with a simple idea: cards give people a reason to meet. We bring collectors, players, card shops and brands into one space, where a shared interest becomes a conversation.",
      "Show someone your favourite find. Trade a card. Sit down for a game. From Taiwan to Korea and the cities ahead, we create a place for collecting culture to come together."
    ],
    "aboutCaption": "Sharing collections, face to face. Taiwan 2026.",
    "aboutAlt": "An exhibitor shows a card binder to collectors at FLAGSHIP Taiwan 2026",
    "editionsTitle": "ONE FLAGSHIP. ACROSS BORDERS.",
    "editionsIntro": "Explore the collecting culture, community and show experience of each edition.",
    "taiwanStatus": "2026 · PAST EDITION",
    "koreaStatus": "UP NEXT",
    "taiwanDescription": "Where our story began. Step inside the Taiwan show and revisit the first gathering.",
    "koreaDescription": "A new destination. The same passion for cards. Discover what comes next in Korea.",
    "taiwanCta": "Explore Taiwan",
    "koreaCta": "Explore Korea",
    "moreCities": "More cities. More connections. The story continues.",
    "experienceTitle": "WHAT YOU'LL EXPERIENCE",
    "experienceIntro": "Four ways to be part of FLAGSHIP. One shared love of collecting.",
    "experiences": [
      {
        "name": "COLLECT",
        "title": "Find your next favourite.",
        "body": "Take a closer look at cards, rare finds and the collections people love. Every collection has a story worth sharing.",
        "alt": "Cards on display at Flagship Taiwan 2026"
      },
      {
        "name": "TRADE",
        "title": "Add that missing card to your collection.",
        "body": "Meet collectors and card shops, compare collections and discover something new across the table.",
        "alt": "Collectors examining cards across a counter at Flagship Taiwan 2026"
      },
      {
        "name": "PLAY",
        "title": "Challenge skilled players.",
        "body": "Meet another player, talk strategy and enjoy the game together. The next connection might be sitting opposite you.",
        "alt": "Players with their cards at Flagship Taiwan 2026"
      },
      {
        "name": "CONNECT",
        "title": "Meet your kind of people.",
        "body": "A familiar face, a new friend or a shared obsession. The best part of the show is who you meet along the way.",
        "alt": "Participants connecting at Flagship Taiwan 2026"
      }
    ],
    "sponsorLabel": "OFFICIAL BRAND SPONSOR",
    "sponsorTitle": "Building the gathering, together.",
    "sponsorBody": "Vinci World supports FLAGSHIP as our brand sponsor, helping bring collectors, players and communities together across our event chapters.",
    "organizerLabel": "CREATED & ORGANIZED BY",
    "recapTitle": [
      "IT STARTED",
      "IN TAIWAN."
    ],
    "recapBody": "A room full of cards. Conversations across the table. The people who made our first chapter what it was.",
    "recapCaption": "FLAGSHIP TAIWAN · SEPTEMBER 5, 2026",
    "recapArchiveLabel": "FIRST CHAPTER / 01",
    "recapLocation": "TAIPEI · CLAPPER STUDIO",
    "recapCrowdCaption": "THE ROOM",
    "recapCrowdAlt": "The crowd gathered around the card show floor at FLAGSHIP Taiwan 2026",
    "recapPlayersCaption": "THE MATCH",
    "recapPlayersAlt": "Players competing across a card table at FLAGSHIP Taiwan 2026",
    "recapBringForward": "Bring this image forward",
    "recapNextImage": "Show the next image",
    "follow": "Follow the next chapter",
    "footerTitle": "SEE YOU AT FLAGSHIP.",
    "footerBody": "Collecting culture. Connecting people.",
    "footerHome": "Back to Flagship",
    "official": "Official updates",
    "pause": "Pause background film",
    "play": "Play background film",
    "videoError": "The film could not be loaded.",
    "videoRetry": "Try again",
    "closeFilm": "Close film"
  },
  "zh-TW": {
    "nav": [
      "關於 Flagship",
      "卡展體驗",
      "品牌夥伴"
    ],
    "menu": "開啟導覽",
    "close": "關閉導覽",
    "language": "語言",
    "skip": "跳至主要內容",
    "headline": [
      "從一張卡牌，",
      "開始一段交流。"
    ],
    "introduction": "收藏、交換、對戰。在 FLAGSHIP，和喜歡卡牌的人面對面相聚。",
    "explore": "探索各地卡展",
    "viewRecap": "觀看台灣 2026 回顧",
    "aboutTitle": [
      "FLAGSHIP 的開始"
    ],
    "aboutParagraphs": [
      "FLAGSHIP 是為卡牌收藏與交流而建立的卡展。我們把收藏家、玩家、卡店與品牌聚在一起，翻開卡冊、分享收藏，認識志同道合的朋友。",
      "從台灣出發，前往韓國與更多地方。我們希望把各地的卡牌文化帶到現場，讓大家交換心得、一起玩牌，讓共同的興趣成為人與人之間的連結。"
    ],
    "aboutCaption": "面對面分享收藏。台灣 2026 活動實拍。",
    "aboutAlt": "FLAGSHIP 台灣卡展攤商翻開卡冊，與收藏家面對面分享收藏",
    "editionsTitle": "一個 FLAGSHIP，走進各地卡展。",
    "editionsIntro": "從台灣到韓國，認識當地的卡牌文化與玩家社群。選擇地區，查看活動內容與最新資訊。",
    "taiwanStatus": "2026 · 歷屆活動",
    "koreaStatus": "下一站",
    "taiwanDescription": "2026 年 9 月 5 日，台北三創。回顧活動內容、攤商與現場體驗。",
    "koreaDescription": "FLAGSHIP 的下一站。日期、場地與活動資訊將陸續公布。",
    "taiwanCta": "進入台灣卡展",
    "koreaCta": "進入韓國卡展",
    "moreCities": "更多地區的展會消息，將透過官方管道公布。",
    "experienceTitle": "你即將體驗到",
    "experienceIntro": "逛卡店、分享收藏、打一場牌，也認識新的朋友。",
    "experiences": [
      {
        "name": "收藏",
        "title": "遇見下一張心動的卡。",
        "body": "近距離欣賞不同卡牌、珍稀收藏，以及收藏家用心整理的系列。每一份收藏，都有值得分享的故事。",
        "alt": "Flagship 台灣卡展的卡牌展示"
      },
      {
        "name": "交易",
        "title": "入手你收藏中缺的那張卡。",
        "body": "認識收藏家與卡店，交流版本、卡況與收藏心得，也尋找一直想收入卡冊的那張卡。",
        "alt": "Flagship 台灣卡展的收藏家在櫃檯前交換、欣賞卡牌"
      },
      {
        "name": "對戰",
        "title": "與高手們切磋。",
        "body": "和玩家切磋牌技、聊聊策略，享受一起玩牌的時間。各站的對戰活動以當地公告為準。",
        "alt": "Flagship 台灣卡展的玩家現場對戰"
      },
      {
        "name": "交流",
        "title": "認識和你一樣喜歡卡牌的人。",
        "body": "從一張喜歡的卡聊起，交換收藏故事，也認識新的朋友。讓線上的共同興趣，延伸成現場的交流。",
        "alt": "Flagship 台灣卡展的參與者交流"
      }
    ],
    "sponsorLabel": "品牌贊助商",
    "sponsorTitle": "一起支持卡牌文化。",
    "sponsorBody": "感謝 Vinci World 作為 FLAGSHIP 的品牌贊助商，支持各地卡展，和我們一起為收藏家、玩家與社群創造面對面交流的機會。",
    "organizerLabel": "品牌創立與主辦",
    "recapTitle": [
      "回到台灣 2026，",
      "重溫卡展現場。"
    ],
    "recapBody": "2026 年 9 月 5 日，我們在台北三創因卡牌相聚。一起回看現場的收藏、對戰與交流。",
    "recapCaption": "FLAGSHIP TAIWAN · 2026 年 9 月 5 日",
    "recapArchiveLabel": "活動紀錄 / 01",
    "recapLocation": "台北 · 三創 CLAPPER STUDIO",
    "recapCrowdCaption": "卡展全場",
    "recapCrowdAlt": "FLAGSHIP 台灣 2026 卡展現場聚集的參觀者",
    "recapPlayersCaption": "現場對戰",
    "recapPlayersAlt": "FLAGSHIP 台灣 2026 玩家在牌桌前對戰",
    "recapBringForward": "顯示這張照片",
    "recapNextImage": "切換下一張照片",
    "follow": "追蹤最新展會消息",
    "footerTitle": "我們在 FLAGSHIP 見。",
    "footerBody": "讓收藏文化，連結更多人。",
    "footerHome": "返回 Flagship 主站",
    "official": "官方最新消息",
    "pause": "暫停背景影片",
    "play": "播放背景影片",
    "videoError": "影片載入失敗。",
    "videoRetry": "重新載入",
    "closeFilm": "關閉回顧影片"
  },
  "ko": {
    "nav": [
      "Flagship 소개",
      "전시 경험",
      "브랜드 파트너"
    ],
    "menu": "메뉴 열기",
    "close": "메뉴 닫기",
    "language": "언어",
    "skip": "본문으로 건너뛰기",
    "headline": [
      "한 장의 카드로,",
      "대화를 시작하세요."
    ],
    "introduction": "수집하고, 교환하고, 함께 즐기세요. FLAGSHIP에서 같은 취미를 가진 사람들을 만나보세요.",
    "explore": "각 지역 행사 둘러보기",
    "viewRecap": "Taiwan 2026 영상 보기",
    "aboutTitle": [
      "FLAGSHIP의 시작"
    ],
    "aboutParagraphs": [
      "FLAGSHIP은 카드가 사람을 만나게 한다는 생각에서 시작되었습니다. 컬렉터, 플레이어, 카드숍과 브랜드가 한 공간에 모여 컬렉션을 공유하고 카드를 교환하며 함께 게임을 즐깁니다.",
      "소중한 카드를 보여주거나 함께 게임을 하는 순간, 새로운 대화가 시작됩니다. 대만에서 한국, 그리고 다음 도시까지 수집 문화가 사람들을 연결하는 자리를 만들어갑니다."
    ],
    "aboutCaption": "마주 앉아 컬렉션을 나누다. Taiwan 2026 현장.",
    "aboutAlt": "FLAGSHIP 대만 행사에서 카드 바인더를 보여주는 전시자와 컬렉터",
    "editionsTitle": "하나의 FLAGSHIP. 새로운 챕터.",
    "editionsIntro": "각 지역의 커뮤니티와 수집 문화를 만나보세요. 도시마다 새로운 경험이 기다립니다.",
    "taiwanStatus": "2026 · 지난 행사",
    "koreaStatus": "다음 행사",
    "taiwanDescription": "우리의 이야기가 시작된 곳. 첫 대만 행사의 순간들을 다시 만나보세요.",
    "koreaDescription": "카드를 향한 같은 열정으로 새로운 도시를 향합니다. 한국 행사의 최신 소식을 확인하세요.",
    "taiwanCta": "대만 행사 보기",
    "koreaCta": "한국 행사 보기",
    "moreCities": "더 많은 도시, 더 많은 만남. 이야기는 계속됩니다.",
    "experienceTitle": "FLAGSHIP에서 경험할 것",
    "experienceIntro": "수집, 거래, 게임, 교류. FLAGSHIP에 참여하는 네 가지 방법.",
    "experiences": [
      {
        "name": "수집",
        "title": "다음으로 사랑할 카드를 만나세요.",
        "body": "다양한 카드와 소중한 컬렉션을 가까이에서 살펴보세요. 모든 컬렉션에는 함께 나눌 이야기가 있습니다.",
        "alt": "Flagship 대만 행사에서 전시된 카드"
      },
      {
        "name": "거래",
        "title": "컬렉션에 빠진 그 한 장을 손에 넣으세요.",
        "body": "컬렉터와 카드숍을 만나 컬렉션을 비교하고, 테이블 건너편에서 새로운 발견을 해보세요.",
        "alt": "Flagship 대만 행사에서 카드를 살펴보는 컬렉터"
      },
      {
        "name": "게임",
        "title": "고수들과 실력을 겨뤄보세요.",
        "body": "새로운 플레이어와 전략을 나누고 게임을 즐겨보세요. 다음 친구는 바로 맞은편에 있을지도 모릅니다.",
        "alt": "Flagship 대만 행사에서 카드를 즐기는 플레이어"
      },
      {
        "name": "교류",
        "title": "같은 열정을 가진 사람들을 만나세요.",
        "body": "익숙한 얼굴, 새로운 친구, 컬렉션에 관한 대화. 행사의 특별함은 그곳에서 만나는 사람들에게 있습니다.",
        "alt": "Flagship 대만 행사에서 교류하는 참가자"
      }
    ],
    "sponsorLabel": "공식 브랜드 스폰서",
    "sponsorTitle": "함께 만들어가는 만남.",
    "sponsorBody": "Vinci World는 FLAGSHIP의 브랜드 스폰서로서 각 지역의 카드 행사를 지원하며 컬렉터, 플레이어와 커뮤니티가 만나는 기회를 함께 만들어갑니다.",
    "organizerLabel": "브랜드 기획 및 주최",
    "recapTitle": [
      "우리의 시작은",
      "대만이었습니다."
    ],
    "recapBody": "테이블 가득한 카드, 끝없는 대화, 첫 챕터를 함께 만든 사람들. 그날의 만남을 돌아보세요.",
    "recapCaption": "FLAGSHIP TAIWAN · 2026년 9월 5일",
    "recapArchiveLabel": "첫 번째 기록 / 01",
    "recapLocation": "타이베이 · CLAPPER STUDIO",
    "recapCrowdCaption": "행사 현장",
    "recapCrowdAlt": "FLAGSHIP Taiwan 2026 카드쇼 현장에 모인 관람객들",
    "recapPlayersCaption": "현장 대전",
    "recapPlayersAlt": "FLAGSHIP Taiwan 2026 카드 테이블에서 대전하는 플레이어들",
    "recapBringForward": "이 사진 보기",
    "recapNextImage": "다음 사진 보기",
    "follow": "다음 챕터 소식 보기",
    "footerTitle": "FLAGSHIP에서 만나요.",
    "footerBody": "수집 문화로 사람을 연결합니다.",
    "footerHome": "Flagship 홈으로",
    "official": "공식 소식",
    "pause": "배경 영상 일시 정지",
    "play": "배경 영상 재생",
    "videoError": "영상을 불러오지 못했습니다.",
    "videoRetry": "다시 시도",
    "closeFilm": "영상 닫기"
  }
};
