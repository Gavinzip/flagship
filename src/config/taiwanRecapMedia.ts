import gifts from "../assets/taiwan-recap/taiwan-2026-gifts-1280.webp";
import giftsSmall from "../assets/taiwan-recap/taiwan-2026-gifts-720.webp";
import challenge from "../assets/taiwan-recap/taiwan-2026-challenge-1280.webp";
import challengeSmall from "../assets/taiwan-recap/taiwan-2026-challenge-720.webp";
import vendors from "../assets/taiwan-recap/taiwan-2026-vendors-1680.webp";
import vendorsSmall from "../assets/taiwan-recap/taiwan-2026-vendors-840.webp";

// Original event photographs; provenance and selection are in docs/taiwan-2026-recap.md.
export const taiwanRecapMedia = {
  highlightEntryGift: {
    src: gifts,
    srcSet: `${giftsSmall} 720w, ${gifts} 1280w`,
    sizes: "(max-width: 700px) 92vw, 42vw",
  },
  highlightChampionChallenge: {
    src: challenge,
    srcSet: `${challengeSmall} 720w, ${challenge} 1280w`,
    sizes: "(max-width: 700px) 92vw, 54vw",
  },
  highlightTcgVendors: {
    src: vendors,
    srcSet: `${vendorsSmall} 840w, ${vendors} 1680w`,
    sizes: "(max-width: 700px) 92vw, 54vw",
  },
};
