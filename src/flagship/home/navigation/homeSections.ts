import type { SiteLanguage } from "../../data/copy";

export const homeSectionIds = ["editions", "about", "experience", "partner", "recap"] as const;
export type HomeSectionId = typeof homeSectionIds[number];

const labels: Record<SiteLanguage, readonly string[]> = {
  "zh-TW": ["各地卡展", "品牌故事", "卡展體驗", "品牌夥伴", "台灣回顧"],
  en: ["Editions", "Our story", "Experience", "Partners", "Recap"],
  ko: ["지역 행사", "브랜드 소개", "카드 경험", "파트너", "대만 영상"],
};

export const homeSections = (language: SiteLanguage) => homeSectionIds.map((id, index) => ({ id, label: labels[language][index] }));
