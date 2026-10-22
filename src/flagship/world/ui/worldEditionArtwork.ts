import { homeMedia } from "../../home/homeMedia";
import { thailandArtwork } from "../../thailand/data/artwork";
import type { CityId } from "../config/worldSpec";

/** The outer globe shows the mark belonging to the selected edition. */
export const worldEditionArtwork = {
  thailand: {
    src: thailandArtwork.emblem,
    width: 1536,
    height: 1024,
    alt: "FLAGSHIP Card Show Thailand",
  },
  taiwan: {
    src: homeMedia.masterLogo,
    width: 1670,
    height: 941,
    alt: "FLAGSHIP Card Show",
  },
} satisfies Record<CityId, { src: string; width: number; height: number; alt: string }>;
