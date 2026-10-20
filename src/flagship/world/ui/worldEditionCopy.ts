import type { HomeCopy } from "../../home/homeCopy";
import type { SiteLanguage } from "../../data/copy";
import type { CityId } from "../config/worldSpec";

export const worldEditionOrder: readonly CityId[] = ["thailand", "taiwan"];
export function worldEditionCopy(copy: HomeCopy, language: SiteLanguage) {
  const headlines = {
    th: { thailand: "พบกันครั้งต่อไปที่กรุงเทพฯ", taiwan: "จุดเริ่มต้นของเรา" },
    en: { thailand: "OUR NEXT CHAPTER.", taiwan: "WHERE IT BEGAN." },
    "zh-TW": { thailand: "下一站，一起相聚。", taiwan: "故事開始的地方。" },
    ko: { thailand: "다음 만남.", taiwan: "우리의 시작." },
  }[language];
  return {
    thailand: { country: "THAILAND", headline: headlines.thailand, status: copy.thailandStatus, description: copy.thailandDescription, cta: copy.thailandCta },
    taiwan: { country: "TAIWAN", headline: headlines.taiwan, status: copy.taiwanStatus, description: copy.taiwanDescription, cta: copy.taiwanCta },
  };
}
