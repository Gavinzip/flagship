import type { SiteLanguage } from "../../data/copy";
import { organizer, titleSponsor } from "../../../data/partners";

// Provisional review lineup requested by Gavin on 2026-10-20.
// Match Korea's two main positions; all other names remain unrevealed.
export const thailandPartnerLineup = {
  status: "provisional",
  organizer: { ...organizer, href: "https://x.com/renaissCLTB" },
  mainSponsor: { ...titleSponsor, href: "https://x.com/vinciwld" },
  pendingSlots: ["one", "two", "three"],
} as const;

export const thailandPartnerCopy = {
  th: {
    title: "พันธมิตร", organizer: "ผู้จัดงาน", mainSponsor: "ผู้สนับสนุนหลัก",
    pendingTitle: "พบพันธมิตรเพิ่มเติมเร็ว ๆ นี้", comingSoon: "รอเปิดเผย",
  },
  "zh-TW": {
    title: "合作夥伴", organizer: "主辦單位", mainSponsor: "主要贊助商",
    pendingTitle: "更多合作夥伴", comingSoon: "待揭曉",
  },
  en: {
    title: "Partners", organizer: "ORGANIZER", mainSponsor: "MAIN SPONSOR",
    pendingTitle: "More partners to come", comingSoon: "TO BE REVEALED",
  },
  ko: {
    title: "함께하는 파트너", organizer: "주최", mainSponsor: "주요 스폰서",
    pendingTitle: "더 많은 파트너", comingSoon: "추후 공개",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;
