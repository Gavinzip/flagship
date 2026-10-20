import type { EventDefinition } from "../../event/types";
import { artwork } from "../../data/artwork";
import { koreaPageCopy } from "./copy";
import { koreaDeckEvent } from "./koreaDeck";

export const koreaDefinition: EventDefinition = {
  id: "korea",
  country: "KOREA",
  city: "SEOUL",
  ticketUrl: "https://luma.com/5qs2r3xi",
  mapQuery: koreaDeckEvent.mapQuery,
  titleSponsor: true,
  captions: { highlights: "서울 카드 컬처", partners: "서울에서 이어지는 파트너", venue: "도시에서 현장까지", faq: "자주 묻는 질문" },
  artwork: { kind: "panorama", panels: [artwork.scrollSky2k, artwork.scrollCity2k, artwork.scrollGround2k], continuous: false, width: 2048, height: 1152 },
  copy: {
    en: { ...koreaPageCopy.en, details: koreaPageCopy.en.koreaEvent },
    "zh-TW": { ...koreaPageCopy["zh-TW"], details: koreaPageCopy["zh-TW"].koreaEvent },
    ko: { ...koreaPageCopy.ko, details: koreaPageCopy.ko.koreaEvent },
  },
};
