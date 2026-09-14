import { taiwanRecapMedia as responsiveMedia } from "../../../config/taiwanRecapMedia";
import type { ResponsiveMedia } from "../../../config/media";

export type EventHighlight = {
  number: `0${1 | 2 | 3}`;
  image: ResponsiveMedia;
  imagePosition: string;
  layout: "compact" | "wide" | "stage";
};

export const eventHighlightVisuals = [
  {
    number: "01",
    image: responsiveMedia.highlightEntryGift,
    imagePosition: "50% 42%",
    layout: "compact",
  },
  {
    number: "02",
    image: responsiveMedia.highlightChampionChallenge,
    imagePosition: "50% 58%",
    layout: "wide",
  },
  {
    number: "03",
    image: responsiveMedia.highlightTcgVendors,
    imagePosition: "center",
    layout: "stage",
  },
] as const satisfies readonly EventHighlight[];

export type EventHighlightNumber =
  (typeof eventHighlightVisuals)[number]["number"];
