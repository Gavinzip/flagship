import type { SiteLanguage } from "../../data/copy";
import { seoulRecapCopy, seoulRecapPhotos } from "../data/seoulRecap";
import { EventText } from "../../motion/EventText";

export function ThailandSeoulRecap({ language }: { language: SiteLanguage }) {
  const copy = seoulRecapCopy[language];
  return <section id="seoul-recap" className="th-seoul th-section" aria-labelledby="th-seoul-title">
    <div className="th-wrap">
      <div className="th-section-heading">
        <div className="th-heading-title"><h2 id="th-seoul-title"><EventText key={copy.title} text={copy.title} /></h2><small>{copy.source}</small></div>
        <div><p>{copy.intro}</p></div>
      </div>
      <div className="th-seoul-gallery">
        {seoulRecapPhotos.map(photo => <figure key={photo.id} className={`th-seoul-photo th-seoul-photo--${photo.id}`}>
          <img src={photo.src} alt={copy.captions[photo.id].alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" style={{ objectPosition: photo.position }} />
          <figcaption>{copy.captions[photo.id].label}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
