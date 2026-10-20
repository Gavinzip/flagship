import koreaVisual from "../assets/korea-keyvisual.webp";
import koreaEmblem from "../assets/korea-emblem-color.webp";
import { staticAssetUrl } from "../../lib/staticAssets";
import { event } from "../../data/event";
import { thailandArtwork } from "../thailand/data/artwork";

export type EditionId = "thailand" | "korea" | "taiwan";
export type Edition = {
  id: EditionId;
  country: string;
  localName: string;
  number: string;
  status: "announced" | "past";
  visual: string;
  emblem: string;
  date: string | null;
  emblemAspectRatio: number;
};

export const editions: Record<EditionId, Edition> = {
  thailand: {
    id: "thailand", country: "THAILAND", localName: "ประเทศไทย", number: "03",
    status: "announced", visual: thailandArtwork.emblem, emblem: thailandArtwork.emblem,
    date: "28–29 NOV 2026", emblemAspectRatio: 3 / 2,
  },
  korea: {
    id: "korea",
    country: "KOREA",
    localName: "대한민국",
    number: "02",
    status: "past",
    visual: koreaVisual,
    emblem: koreaEmblem,
    date: "29 SEP 2026",
    emblemAspectRatio: 1170 / 755,
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
    emblemAspectRatio: 900 / 493,
  },
};

export const currentEdition: EditionId = "thailand";
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
