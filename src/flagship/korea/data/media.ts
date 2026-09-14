import entryPack from "../../../assets/korea-entry-pack-1280.webp";
import entryPackSmall from "../../../assets/korea-entry-pack-720.webp";
import { taiwanRecapMedia } from "../../../config/taiwanRecapMedia";

// The entry-pack photograph is a Drive-sourced real event image selected for
// Korea's temporary programme preview. The remaining previews retain the
// existing real-event photography until Korea-specific source photos arrive.
export const koreaEventMedia = [
  {
    src: entryPack,
    srcSet: `${entryPackSmall} 720w, ${entryPack} 1280w`,
  },
  taiwanRecapMedia.highlightChampionChallenge,
  taiwanRecapMedia.highlightTcgVendors,
] as const;
