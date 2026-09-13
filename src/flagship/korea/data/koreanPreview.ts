import type { KoreaEventContent } from "./taiwanPreview";

/** Korean translation of the Taiwan event preview data; no language fallback. */
export const koreanPreview: KoreaEventContent = {
  navigation: [
    { label: "행사 하이라이트", href: "#highlights" },
    { label: "참가 업체", href: "#vendors" },
    { label: "행사장 안내", href: "#venue" },
    { label: "자주 묻는 질문", href: "#faq" },
  ],
  event: {
    venue: "타이베이 싼촹 생활원구",
    address: "대만 타이베이시 중정구 시민대로 3단 2호",
    transit: "MRT 중샤오신성역 1번 출구에서 도보 약 5분",
  },
  highlights: {
    title: "행사 하이라이트",
    english: "EVENT HIGHLIGHTS",
    indexLabel: "하이라이트 바로가기",
    listLabel: "행사 하이라이트",
    pointsLabel: (title) => `${title} 세부 내용`,
    items: [
      {
        number: "01",
        english: "GIFTS & ON-SITE SURPRISES",
        title: "입장 선물과 현장 이벤트",
        description:
          "행사 수익은 입장 선물, 카드 증정, 미션 및 추첨 경품과 현장 이벤트에 사용됩니다. 방문객 모두가 즐겁게 참여하고 특별한 선물을 가져갈 수 있도록 준비한 대만 행사 구성입니다.",
        alt: "카드 행사장에서 교류하는 참가자",
        points: ["입장 선물", "카드 증정", "미션과 추첨", "현장 이벤트"],
      },
      {
        number: "02",
        english: "CHAMPION CHALLENGE",
        title: "챔피언에게 도전하세요",
        description:
          "덱을 준비하고 FLAGSHIP 무대에 올라 보세요. 현장 관객 앞에서 다른 플레이어와 대결하고, 2승을 달성하여 경품을 획득하는 대만 행사 프로그램입니다.",
        alt: "카드 대결 무대와 관객",
        points: ["플레이어 도전", "무대 대결", "행사 경품"],
      },
      {
        number: "03",
        english: "30+ TCG VENDORS",
        title: "30개 이상의 TCG 업체",
        description:
          "대만 행사에는 30개 이상의 TCG 업체가 모였습니다. 포켓몬을 비롯한 다양한 카드와 수집품을 만나보세요.",
        alt: "TCG 업체 부스를 둘러보는 관람객",
        points: ["30개 이상 업체", "다양한 카드", "특별한 셀렉션"],
      },
    ],
  },
  vendors: {
    title: "파트너와 참가 업체",
    english: "PARTNERS & VENDORS",
    organizerLabel: "주최",
    titleSponsorLabel: "타이틀 스폰서",
    cohostLabel: "공동 주최",
    vendorLabel: "참가 업체",
  },
  venue: {
    title: "행사장과 교통",
    english: "VENUE & DIRECTIONS",
    mapTitle: "대만 싼촹 생활원구 지도",
    mapRoute: "중샤오신성역 → 싼촹 생활원구",
    transitTitle: "MRT로 방문하기",
    routeLabel: "행사장 오시는 길",
    routeSteps: [
      "MRT 중샤오신성역 1번 출구로 나옵니다.",
      "싼촹 생활원구까지 약 5분 걷습니다.",
      "건물 5층 CLAPPER STUDIO로 이동합니다.",
    ],
    directions: "대만 행사장 경로 보기",
  },
  faq: {
    categoryLabel: "질문 분류",
    categories: ["행사 안내", "티켓과 입장", "현장 체험"],
    items: [
      {
        category: "행사 안내",
        question: "FLAGSHIP Card Show Taiwan은 어떤 행사인가요?",
        answer:
          "카드 매장, 수집가, 플레이어와 브랜드가 모이는 하루 동안의 카드 전시회입니다. 카드 마켓, Champion Challenge와 무대 프로그램으로 구성되었습니다.",
      },
      {
        category: "행사 안내",
        question: "대만 행사는 언제 열렸나요?",
        answer:
          "2026년 9월 5일, 12:00–19:00. 이 페이지는 대만 행사 정보를 임시로 사용하는 한국 페이지 시안입니다.",
      },
      {
        category: "행사 안내",
        question: "대만 행사장은 어디인가요?",
        answer:
          "타이베이 싼촹 생활원구 5층 CLAPPER STUDIO입니다. 한국 행사장은 별도로 공지됩니다.",
      },
      {
        category: "행사 안내",
        question: "어떤 카드를 볼 수 있나요?",
        answer:
          "Pokémon, ONE PIECE, 스포츠 카드 등 다양한 수집품이 포함됩니다. 상품, 버전, 언어 및 재고는 각 참가 업체가 결정합니다.",
      },
      {
        category: "행사 안내",
        question: "누가 참가할 수 있나요?",
        answer:
          "경험 많은 수집가, 카드 플레이어, 입문자, 협업을 찾는 매장과 브랜드 모두를 위한 행사입니다.",
      },
      {
        category: "티켓과 입장",
        question: "티켓은 어떻게 구매하나요?",
        answer:
          "대만 행사에서는 Luma에서 가격과 입장 혜택을 확인하고 예약했습니다. 한국 행사 예약은 아직 열리지 않았습니다.",
      },
      {
        category: "티켓과 입장",
        question: "현장에서도 구매할 수 있나요?",
        answer:
          "현장 판매 여부는 남은 정원에 따라 결정됩니다. 방문 전에 공식 공지를 확인해 주세요.",
      },
      {
        category: "티켓과 입장",
        question: "티켓에 어떤 혜택이 포함되나요?",
        answer:
          "티켓 판매 페이지의 설명을 기준으로 합니다. 선물, 추첨 및 한정 상품의 수량과 조건은 각 프로그램 공지를 확인해 주세요.",
      },
      {
        category: "티켓과 입장",
        question: "일찍 도착해야 하나요?",
        answer:
          "대만 행사는 12시에 시작했습니다. 티켓 확인과 입장에 필요한 시간을 확보하고 현장 직원의 안내를 따라 주세요.",
      },
      {
        category: "티켓과 입장",
        question: "퇴장 후 다시 입장할 수 있나요?",
        answer:
          "재입장 규칙은 티켓 약관 및 행사 전 안내를 따릅니다. 전자 티켓이나 손목밴드 등 입장 증빙을 보관해 주세요.",
      },
      {
        category: "현장 체험",
        question: "Champion Challenge는 어떻게 참가하나요?",
        answer:
          "종목, 참가 자격, 규칙, 신청 방법과 정원은 별도로 공지됩니다. 일부 프로그램은 사전 신청이 필요할 수 있습니다.",
      },
      {
        category: "현장 체험",
        question: "개인 카드를 가져와도 되나요?",
        answer:
          "개인 소장품을 가져올 수 있으나 직접 보관해야 합니다. 매입, 교환 및 감정 서비스 여부는 각 업체가 결정합니다.",
      },
      {
        category: "현장 체험",
        question: "어떤 결제 수단을 사용할 수 있나요?",
        answer:
          "대만 행사 현장 거래는 현금 또는 계좌이체로 진행되었습니다. 결제 전에 업체에 수취 정보를 확인해 주세요.",
      },
      {
        category: "티켓과 입장",
        question: "티켓 환불이 가능한가요?",
        answer:
          "환불 기한, 수수료 및 행사 변경 관련 사항은 티켓 판매 페이지의 공식 약관을 기준으로 합니다.",
      },
      {
        category: "행사 안내",
        question: "최신 소식은 어디에서 확인하나요?",
        answer:
          "참가 업체, 티켓, 교통 및 현장 안내는 웹사이트와 공식 소셜 채널에 순차적으로 공개됩니다.",
      },
    ],
  },
};
