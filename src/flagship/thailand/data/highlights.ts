import type { SiteLanguage } from "../../data/copy";
import type { EventContent } from "../../event/types";
import { thailandEvent } from "./event";

// Thailand programme copy is separate from the Taiwan recap footage and Korea's event copy.
export const thailandHighlights: Record<SiteLanguage, EventContent["highlights"]> = {
  th: {
    title: "ไฮไลต์งาน", english: "EVENT HIGHLIGHTS",
    items: [
      { number: "01", english: "GATHER AROUND CARDS", title: "เริ่มคุยกันจากการ์ดหนึ่งใบ", description: "หยิบแฟ้มมาเดินดูงาน คุยกับนักสะสม ผู้เล่น ร้านการ์ด และแบรนด์ต่าง ๆ แบ่งปันเรื่องราวของการ์ดในมือ แล้วรู้จักเพื่อนใหม่ไปด้วยกัน", alt: "ผู้เล่นล้อมโต๊ะเพื่อดูและเล่นการ์ด" },
      { number: "02", english: "COLLECT & TRADE", title: "โต๊ะร้านค้า 100+ โต๊ะ เดินดูได้เต็มที่", description: "งานกรุงเทพฯ วางแผนไว้กว่า 100 โต๊ะ ให้คุณเดินร้าน เลือกการ์ด และแลกเปลี่ยนหรือซื้อขายกับนักสะสม รายชื่อร้านค้าและข้อมูลสินค้าจะทยอยประกาศ", alt: "นักสะสมแบ่งปันการ์ดและของสะสมในงาน" },
      { number: "03", english: "BRANDS & COLLECTIBLES", title: "พบแบรนด์ที่บูธ 4–6 บูธ", description: "ชมการ์ดและของสะสม พร้อมคุยกับแบรนด์และนักสะสมแบบเจอหน้ากัน งานกรุงเทพฯ วางแผนบูธแบรนด์ไว้ 4–6 บูธ รายชื่อแบรนด์และกิจกรรมจะประกาศอย่างเป็นทางการ", alt: "บูธแบรนด์และของสะสมที่จัดแสดงในงานการ์ด" },
      { number: "04", english: "THE LIVE EXPERIENCE", title: "มาสนุกกับบรรยากาศในงาน", description: "วิดีโอบันทึกบทสนทนา กิจกรรม และเสียงเชียร์จากงานไต้หวัน ส่วนกำหนดการและวิธีเข้าร่วมกิจกรรมของประเทศไทยจะประกาศพร้อมโปรแกรมฉบับเต็ม", alt: "ผู้ร่วมงานส่งเสียงเชียร์ในงานการ์ด" },
      { number: "05", english: "TWO SHOWS. ONE DESTINATION.", title: "สองวัน พบกันที่ QSNCC", description: "วันที่ 28–29 พฤศจิกายน เวลา 13:00–20:00 น. ทุกวัน ณ Event Hall ชั้น B2 และ Binance Blockchain Week ก็จัดที่ QSNCC ในวันเดียวกัน ทั้งสองงานอยู่คนละชั้น โปรดตรวจสอบเงื่อนไขเข้าชมของแต่ละงานแยกกัน", alt: "ร้านค้าและผู้เข้าชมงาน FLAGSHIP Taiwan" },
    ],
  },
  "zh-TW": {
    title: "活動亮點", english: "EVENT HIGHLIGHTS",
    items: [
      { number: "01", english: "GATHER AROUND CARDS", title: "從一張卡開始聊", description: "帶著卡冊逛一逛，跟收藏家、玩家、卡店和品牌聊聊手上的卡。分享收藏心得，也認識新的朋友。", alt: "玩家圍著桌子看卡與對戰" },
      { number: "02", english: "COLLECT & TRADE", title: `${thailandEvent.plannedVendorTables} 張攤商桌，慢慢逛`, description: "曼谷站規劃超過 100 張攤商桌，可以逛不同卡店、挑卡，也和收藏家交流或交易。參展攤商和商品資訊會陸續公布。", alt: "收藏家在卡展中分享卡牌與收藏" },
      { number: "03", english: "BRANDS & COLLECTIBLES", title: `${thailandEvent.plannedExhibitorBooths} 個品牌展位`, description: "看看卡牌與收藏品，和品牌、收藏家面對面聊聊。曼谷站規劃 4–6 個品牌展位，參展品牌和體驗內容將由官方公布。", alt: "卡展中的品牌攤位與收藏品展示" },
      { number: "04", english: "THE LIVE EXPERIENCE", title: "一起感受現場氣氛", description: "影片記錄了台灣站的交流、互動和歡呼。曼谷站的活動時程與參加方式，會和完整節目一起公布。", alt: "卡展人群舉手歡呼的瞬間" },
      { number: "05", english: "TWO SHOWS. ONE DESTINATION.", title: "兩天卡展，曼谷相見", description: "卡展在 11 月 28–29 日開放，每日 13:00–20:00，地點是 QSNCC B2 的 Event Hall。Binance Blockchain Week 也在同一日期、同一場館舉行。兩場活動在不同樓層，入場方式也請各自確認。", alt: "FLAGSHIP TAIWAN 的卡展人潮與場內攤位" },
    ],
  },
  en: {
    title: "Event highlights", english: "EVENT HIGHLIGHTS",
    items: [
      { number: "01", english: "GATHER AROUND CARDS", title: "Bring your collection. Meet your people.", description: "Collectors, players, card shops and brands meet at one card show. Open your binder, share your collecting stories and make a new connection over a card you love.", alt: "Players gathering around a table to look at cards and play" },
      { number: "02", english: "COLLECT & TRADE", title: `${thailandEvent.plannedVendorTables} vendor tables to explore.`, description: "Bangkok is planning more than 100 vendor tables for collecting and trading. Browse card shops and their selections, and look for your next favourite card. The exhibitor directory and product details will follow.", alt: "Collectors sharing cards and collections at the show" },
      { number: "03", english: "BRANDS & COLLECTIBLES", title: `${thailandEvent.plannedExhibitorBooths} booths. Get closer to the brands.`, description: "Explore cards and collectibles, and meet brands and fellow collectors face to face. Bangkok is planning 4–6 exhibitor booths; the confirmed brands and experiences will be announced.", alt: "Brand booths and collectible displays at the card show" },
      { number: "04", english: "THE LIVE EXPERIENCE", title: "Feel the energy in the room.", description: "A card show brings a shared passion to life. Look back at Taiwan's conversations, interactions and cheers while we prepare the Thailand programme. Schedules and participation details will follow.", alt: "A crowd cheering at the card show" },
      { number: "05", english: "TWO SHOWS. ONE DESTINATION.", title: "Two days together at QSNCC.", description: "Meet us at Event Hall B2 on 28–29 November, 1–8 PM daily. Binance Blockchain Week is at QSNCC on the same dates. Check each event's floor and admission arrangements separately.", alt: "The FLAGSHIP Taiwan show floor and event crowd" },
    ],
  },
  ko: {
    title: "행사 하이라이트", english: "EVENT HIGHLIGHTS",
    items: [
      { number: "01", english: "GATHER AROUND CARDS", title: "컬렉션을 들고, 카드로 만나요", description: "수집가, 플레이어, 카드숍과 브랜드가 한자리에 모입니다. 바인더를 펼쳐 컬렉션과 이야기를 나누고, 좋아하는 카드 한 장으로 새로운 인연을 만나보세요.", alt: "카드를 보고 플레이하기 위해 테이블에 모인 사람들" },
      { number: "02", english: "COLLECT & TRADE", title: `${thailandEvent.plannedVendorTables}개 벤더 테이블을 둘러보세요`, description: "방콕에서는 수집과 거래를 위한 100개 이상의 벤더 테이블을 계획하고 있습니다. 카드숍과 다양한 셀렉션을 둘러보며 원하는 카드를 찾아보세요. 참가사와 상품 정보는 추후 공개됩니다.", alt: "카드와 컬렉션을 공유하는 수집가들" },
      { number: "03", english: "BRANDS & COLLECTIBLES", title: `${thailandEvent.plannedExhibitorBooths}개 브랜드 부스에서 더 가까이`, description: "카드와 수집품 전시를 보고 브랜드, 다른 수집가들과 직접 만나보세요. 방콕에서는 4–6개 브랜드 부스를 계획하고 있으며, 확정 브랜드와 체험 내용은 공식 공지로 안내됩니다.", alt: "카드쇼 브랜드 부스와 수집품 전시" },
      { number: "04", english: "THE LIVE EXPERIENCE", title: "현장의 열기를 함께 느껴보세요", description: "카드쇼는 같은 열정을 함께 나누는 자리입니다. 대만 행사에서 나눈 대화와 교류, 환호의 순간을 영상으로 만나보세요. 태국 행사 일정과 참여 방법은 전체 프로그램과 함께 공개됩니다.", alt: "카드쇼에서 환호하는 관람객들" },
      { number: "05", english: "TWO SHOWS. ONE DESTINATION.", title: "이틀간 방콕 QSNCC에서 만나요", description: "11월 28–29일, 매일 13:00–20:00 QSNCC B2층 Event Hall에서 만나요. 같은 날짜에 같은 장소에서 Binance Blockchain Week도 열립니다. 각 행사 층과 입장 안내를 별도로 확인해 주세요.", alt: "FLAGSHIP Taiwan 행사장과 관람객" },
    ],
  },
};
