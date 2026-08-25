import { media } from "../config/media";

export type EventHighlight = {
  number: `0${1 | 2 | 3}`;
  image: string;
  imagePosition: string;
  layout: "compact" | "wide" | "stage";
};

export const eventHighlightVisuals = [
  {
    number: "01",
    image: media.highlightEntryGift,
    imagePosition: "50% center",
    layout: "compact",
  },
  {
    number: "02",
    image: media.highlightChampionChallenge,
    imagePosition: "center",
    layout: "wide",
  },
  {
    number: "03",
    image: media.highlightTcgVendors,
    imagePosition: "center",
    layout: "stage",
  },
] as const satisfies readonly EventHighlight[];

export type EventHighlightNumber =
  (typeof eventHighlightVisuals)[number]["number"];
