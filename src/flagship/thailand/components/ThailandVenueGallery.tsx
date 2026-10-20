import { ArrowUpRight } from "iconoir-react";
import { thailandArtwork } from "../data/artwork";
import { thailandVisit } from "../data/visitCopy";
import type { EditorialCopy } from "../data/editorialCopy";

/** Show the building visitors should recognize before introducing the B2 hall. */
export function ThailandVenueGallery({ words }: { words: EditorialCopy }) {
  return <div className="th-venue-gallery">
    <figure className="th-venue-exterior">
      <img src={thailandArtwork.venueExterior} alt={words.venueExteriorAlt} width={1280} height={698} loading="lazy" decoding="async" />
      <figcaption><strong>{words.venueExterior}</strong><a href={thailandVisit.exteriorSource} target="_blank" rel="noreferrer">{words.venuePhoto}<ArrowUpRight /></a></figcaption>
    </figure>
    <figure className="th-venue-interior">
      <img src={thailandArtwork.venueInterior} alt="QSNCC Event Hall B2" width={1500} height={1000} loading="lazy" decoding="async" />
      <figcaption><strong>{words.venueInterior}</strong><a href={thailandVisit.venueSource} target="_blank" rel="noreferrer">{words.venuePhoto}<ArrowUpRight /></a></figcaption>
    </figure>
  </div>;
}
