import koreaVisual from "../assets/korea-keyvisual.webp";
import koreaEmblem from "../assets/korea-emblem-color.webp";
import { staticAssetUrl } from "../../lib/staticAssets";
import { event } from "../../data/event";

export type EditionId = "korea" | "taiwan";
export type Edition = {
  id: EditionId;
  country: string;
  localName: string;
  number: string;
  status: "announced" | "past";
  visual: string;
  emblem: string;
  date: string | null;
};

export const editions: Record<EditionId, Edition> = {
  korea: {
    id: "korea",
    country: "KOREA",
    localName: "대한민국",
    number: "02",
    status: "announced",
    visual: koreaVisual,
    emblem: koreaEmblem,
    date: null,
  },
  taiwan: {
    id: "taiwan",
    country: "TAIWAN",
    localName: "台灣",
    number: "01",
    status: "past",
    visual: staticAssetUrl("hero-arena.webp"),
    emblem: staticAssetUrl("flagship-logo.webp"),
    date: event.date,
  },
};

export const currentEdition: EditionId = "korea";
export const editionList = Object.values(editions);

export function isEditionId(value: string | null): value is EditionId {
  return value !== null && Object.hasOwn(editions, value);
}

export const officialLinks = {
  website: "https://www.renaiss.xyz/",
  updates: "https://x.com/renaissxyz",
  flagshipX: "https://x.com/flagshiptcg",
  instagram: "https://www.instagram.com/flagshipcardshow?stkn=MzdzamkzZXJhYnY1",
};
export const experienceImages = [
  "highlight-rare-showcase.webp",
  "highlight-tcg-vendors.webp",
  "highlight-champion-challenge.webp",
  "highlight-entry-gift.webp",
].map(staticAssetUrl);
