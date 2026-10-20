import type { SiteLanguage } from "../../data/copy";

// QSNCC official visitor directions, verified 2026-10-20.
export const thailandVisit = {
  address: "60 Ratchadaphisek Road, Khlong Toei, Bangkok 10110, Thailand",
  directionsSource: "https://www.qsncc.com/th/visit/how-to-get-here/",
  venueSource: "https://www.qsncc.com/th/plan/venue-space/level-b2/",
  exteriorSource: "https://www.qsncc.com/en/media/gallery/exterior/main-entrance/",
} as const;

export const visitCopy = {
  th: {
    heading: "เดินทางมางานอย่างไร", address: "ที่อยู่สถานที่จัดงาน", source: "คู่มือการเดินทางจาก QSNCC",
    mapTitle: "แผนที่ศูนย์การประชุมแห่งชาติสิริกิติ์ กรุงเทพฯ", venueNote: "FLAGSHIP จัดที่ Event Hall ชั้น B2 เมื่อมาถึงให้เดินตามป้ายงาน FLAGSHIP",
    routes: [
      { mode: "mrt", label: "MRT สายสีน้ำเงิน", title: "ทางออก 3 เชื่อมตรงถึง QSNCC", body: "ลงสถานีศูนย์การประชุมแห่งชาติสิริกิติ์ ออกทางออก 3 ผ่านทางเชื่อมเข้าศูนย์การประชุม แล้วตามป้ายไป Event Hall ชั้น B2" },
      { mode: "car", label: "แท็กซี่ / รถยนต์", title: "ปักหมุด QSNCC", body: "แจ้งคนขับว่าศูนย์การประชุมแห่งชาติสิริกิติ์ หรือแสดงที่อยู่ด้านล่าง ภายในมีที่จอดรถและลิฟต์เชื่อมไปชั้นจัดงาน ตรวจสอบค่าจอดรถและเวลาเปิดจากคู่มือของสถานที่" },
      { mode: "venue", label: "เมื่อมาถึง", title: "B2 · EVENT HALL", body: "ตามป้าย FLAGSHIP ไปที่ Event Hall ชั้น B2 งานเปิดวันที่ 28–29 พฤศจิกายน เวลา 13:00–20:00 น. ทุกวัน วิธีเช็กอิน เงื่อนไขการเข้าชม และกำหนดการฉบับเต็มจะประกาศผ่านช่องทางอย่างเป็นทางการ" },
    ],
  },
  "zh-TW": {
    heading: "怎麼到現場？", address: "場館地址", source: "QSNCC 官方交通指南",
    mapTitle: "QSNCC 詩麗吉王后國家會議中心地圖", venueNote: "FLAGSHIP 位於 B2 樓 Event Hall；前往現場請認明 FLAGSHIP 活動標示。",
    routes: [
      { mode: "mrt", label: "MRT 藍線", title: "3 號出口，直達 QSNCC", body: "搭至 Queen Sirikit National Convention Centre 站，從 3 號出口經連通道進入會議中心，再依現場標示前往 B2 Event Hall。" },
      { mode: "car", label: "計程車 / 自行開車", title: "導航至 QSNCC", body: "向司機出示 Queen Sirikit National Convention Center 或下方地址。館內設有停車場與通往展覽樓層的電梯；停車費及開放資訊請見場館官方指南。" },
      { mode: "venue", label: "抵達會場", title: "B2 · EVENT HALL", body: "到了 QSNCC，跟著 FLAGSHIP 的標示前往 B2 樓 Event Hall。活動日期是 11 月 28–29 日，每天 13:00–20:00。報到方式、入場規則和完整節目，請留意 FLAGSHIP 官方後續公告。" },
    ],
  },
  en: {
    heading: "Your way to the show.", address: "Venue address", source: "QSNCC official travel guide",
    mapTitle: "Map of Queen Sirikit National Convention Center, Bangkok", venueNote: "Find FLAGSHIP at Event Hall on Level B2. Follow the FLAGSHIP event signs on arrival.",
    routes: [
      { mode: "mrt", label: "MRT BLUE LINE", title: "Exit 3. Direct to QSNCC.", body: "Get off at Queen Sirikit National Convention Centre station. Exit 3 connects directly to the convention center. Follow the venue signs to Event Hall on Level B2." },
      { mode: "car", label: "TAXI / CAR", title: "Set your destination: QSNCC.", body: "Show your driver Queen Sirikit National Convention Center or the address below. On-site parking has lifts to the exhibition floors. See the official venue guide for parking fees and opening details." },
      { mode: "venue", label: "ON ARRIVAL", title: "B2 · EVENT HALL", body: "28–29 November, 1–8 PM each day. Head to Level B2. FLAGSHIP will announce check-in instructions, admission rules and the full programme through its official channels." },
    ],
  },
  ko: {
    heading: "행사장으로 오시는 길", address: "행사장 주소", source: "QSNCC 공식 교통 안내",
    mapTitle: "방콕 퀸 시리킷 국립 컨벤션 센터 지도", venueNote: "FLAGSHIP은 B2층 Event Hall에서 열립니다. 도착 후 FLAGSHIP 행사 안내 표지를 따라 이동해 주세요.",
    routes: [
      { mode: "mrt", label: "MRT 블루라인", title: "3번 출구에서 바로 연결", body: "Queen Sirikit National Convention Centre역에서 내린 후 3번 출구 연결 통로로 QSNCC에 진입하세요. 행사장 안내를 따라 B2층 Event Hall로 이동해 주세요." },
      { mode: "car", label: "택시 / 자가용", title: "목적지는 QSNCC", body: "기사에게 Queen Sirikit National Convention Center 또는 아래 주소를 보여주세요. 주차장에는 전시층으로 연결되는 엘리베이터가 있습니다. 요금과 이용 시간은 공식 안내를 확인해 주세요." },
      { mode: "venue", label: "도착 후", title: "B2 · EVENT HALL", body: "11월 28–29일, 매일 13:00–20:00에 열립니다. B2층으로 이동해 주세요. 체크인 방법, 입장 규정과 전체 프로그램은 FLAGSHIP 공식 채널에서 안내합니다." },
    ],
  },
} satisfies Record<SiteLanguage, { heading: string; address: string; source: string; mapTitle: string; venueNote: string; routes: { mode: "mrt" | "car" | "venue"; label: string; title: string; body: string }[] }>;

export type VisitCopy = typeof visitCopy[SiteLanguage];
