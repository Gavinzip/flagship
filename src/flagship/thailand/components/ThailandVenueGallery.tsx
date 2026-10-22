import { ArrowUpRight } from "iconoir-react";
import { thailandArtwork } from "../data/artwork";
import { thailandVisit } from "../data/visitCopy";
import type { EditorialCopy } from "../data/editorialCopy";

/** The full gallery column is reserved for the B2 interior. */
export function ThailandVenueGallery({ words }: { words: EditorialCopy }) {
  return <div className="th-venue-gallery">
    <figure id="th-venue-interior" className="th-venue-interior" data-th-reveal="0">
      <img src={thailandArtwork.venueInterior} alt="QSNCC Event Hall B2" width={1500} height={1000} loading="lazy" decoding="async" />
      <figcaption><strong>{words.venueInterior}</strong><a href={thailandVisit.venueSource} target="_blank" rel="noreferrer">{words.venuePhoto}<ArrowUpRight /></a></figcaption>
    </figure>
  </div>;
}
