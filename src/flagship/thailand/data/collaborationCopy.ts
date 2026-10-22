import type { SiteLanguage } from "../../data/copy";

export const collaborationCopy = {
  "zh-TW": {
    title: "品牌聯名與線上活動", intro: "卡展之外，我們也和品牌辦過線上活動，讓卡友做任務、抽好禮，在互動中認識品牌。下方的 Merch 畫面，就是過去和 Surf 合作的例子。",
    label: "過往已舉辦的合作案例", formatTitle: "從任務到好禮", body: "當時，參加者可以在 Merch 完成帳號與社群任務，累積抽獎機會。獎品包括 Mystery Box 和 Surf Pro 會員。",
    invitation: "歡迎 U 卡、交易平台與其他品牌加入。一起設計聯名頁、線上任務與好禮，讓卡友認識你的產品，也更期待到卡展現場交流。",
    campaign: "查看過往聯名活動", contact: "一起規劃下一場聯名", caption: "Renaiss Merch · 過往聯名活動畫面", zoom: "放大案例截圖",
    steps: ["認識聯名品牌", "完成帳號與社群任務", "累積抽獎機會"],
  },
  en: {
    title: "Brand collaborations & online campaigns", intro: "Beyond the show floor, we've worked with brands on online quests and prize draws that help collectors discover their products. This Merch screen shows our past collaboration with Surf.",
    label: "A COMPLETED COLLABORATION", formatTitle: "From quests to rewards", body: "Participants could complete account and community quests on Merch to earn prize-draw entries. Prizes in that campaign included Mystery Boxes and Surf Pro memberships.",
    invitation: "Crypto payment card providers, exchanges and other brands are welcome to collaborate. Let's create campaign pages, online quests and rewards that introduce your product to collectors and encourage them to meet you at the show.",
    campaign: "View the past campaign", contact: "Plan the next collaboration", caption: "Renaiss Merch · Past collaboration screen", zoom: "Enlarge campaign screenshot",
    steps: ["Discover a partner brand", "Complete account and community quests", "Earn prize-draw entries"],
  },
  ko: {
    title: "브랜드 협업과 온라인 캠페인", intro: "카드쇼 외에도 브랜드와 온라인 미션 및 경품 추첨을 진행해 카드 수집가가 제품을 알아볼 수 있도록 했습니다. 아래 Merch 화면은 이전에 Surf와 함께한 협업 사례입니다.",
    label: "이전에 진행한 협업 사례", formatTitle: "미션부터 경품까지", body: "당시 참여자는 Merch에서 계정 및 커뮤니티 미션을 완료해 경품 추첨 응모 기회를 쌓을 수 있었습니다. 경품에는 Mystery Box와 Surf Pro 멤버십이 포함됐습니다.",
    invitation: "크립토 결제 카드, 거래 플랫폼을 비롯한 다양한 브랜드의 참여를 환영합니다. 캠페인 페이지와 온라인 미션, 경품을 함께 기획해 카드 수집가에게 제품을 소개하고 현장에서도 만나보세요.",
    campaign: "지난 캠페인 보기", contact: "다음 협업 함께 기획하기", caption: "Renaiss Merch · 지난 협업 활동 화면", zoom: "캠페인 화면 확대",
    steps: ["협업 브랜드 알아보기", "계정 및 커뮤니티 미션 완료", "경품 추첨 응모 기회 모으기"],
  },
  th: {
    title: "ความร่วมมือกับแบรนด์และกิจกรรมออนไลน์", intro: "นอกเหนือจากงานการ์ด เราเคยร่วมกับแบรนด์จัดภารกิจและกิจกรรมลุ้นรางวัลออนไลน์ ให้เพื่อนนักสะสมได้รู้จักผลิตภัณฑ์ ภาพ Merch ด้านล่างเป็นตัวอย่างกิจกรรมที่เราเคยจัดกับ Surf",
    label: "ตัวอย่างความร่วมมือที่เคยจัดแล้ว", formatTitle: "จากภารกิจสู่ของรางวัล", body: "ในครั้งนั้น ผู้เข้าร่วมทำภารกิจบัญชีและคอมมูนิตี้บน Merch เพื่อสะสมสิทธิ์ลุ้นรางวัล โดยมี Mystery Box และสมาชิก Surf Pro เป็นของรางวัล",
    invitation: "เรายินดีร่วมงานกับบริการบัตรคริปโต แพลตฟอร์มซื้อขาย และแบรนด์อื่น ๆ มาช่วยกันทำหน้าแคมเปญ ภารกิจออนไลน์ และของรางวัล ให้เพื่อนนักสะสมรู้จักผลิตภัณฑ์ของคุณ และอยากมาพบกันที่งาน",
    campaign: "ดูแคมเปญที่ผ่านมา", contact: "ร่วมวางแผนกิจกรรมครั้งต่อไป", caption: "Renaiss Merch · ภาพกิจกรรมร่วมในอดีต", zoom: "ขยายภาพแคมเปญ",
    steps: ["รู้จักแบรนด์ที่ร่วมกิจกรรม", "ทำภารกิจบัญชีและคอมมูนิตี้", "สะสมสิทธิ์ลุ้นของรางวัล"],
  },
} satisfies Record<SiteLanguage, {
  title: string; intro: string; label: string; formatTitle: string; body: string; invitation: string; campaign: string; contact: string; caption: string;
  zoom: string; steps: [string, string, string];
}>;

export const surfCollaborationUrl = "https://merch.renaisscltb.com/#campaign/surf";
