import type { HomeCopy } from "../../home/homeCopy";
import type { SiteLanguage } from "../../data/copy";
import type { CityId } from "../config/worldSpec";

export const worldEditionOrder: readonly CityId[] = ["thailand", "korea", "taiwan"];
export function worldEditionCopy(copy: HomeCopy, language: SiteLanguage) {
  const headlines = {
    en: { thailand: "OUR NEXT CHAPTER.", korea: "THE SEOUL CHAPTER.", taiwan: "WHERE IT BEGAN." },
    "zh-TW": { thailand: "下一站，一起相聚。", korea: "回看首爾的相聚。", taiwan: "故事開始的地方。" },
    ko: { thailand: "다음 만남.", korea: "서울에서의 만남.", taiwan: "우리의 시작." },
  }[language];
  return {
    thailand: { country: "THAILAND", headline: headlines.thailand, status: copy.thailandStatus, description: copy.thailandDescription, cta: copy.thailandCta },
    korea: { country: "KOREA", headline: headlines.korea, status: copy.koreaStatus, description: copy.koreaDescription, cta: copy.koreaCta },
    taiwan: { country: "TAIWAN", headline: headlines.taiwan, status: copy.taiwanStatus, description: copy.taiwanDescription, cta: copy.taiwanCta },
  };
}
