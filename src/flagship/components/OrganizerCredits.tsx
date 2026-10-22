import { organizer } from "../../data/partners";
import { officialLinks } from "../data/editions";
import { organizerAffiliations } from "../data/organizerAffiliations";
import "./organizer-credits.css";

/** Organizer identity and its chain/backer relationship, independent of page layout. */
export function OrganizerCredits() {
  const { chain, backer } = organizerAffiliations;
  return (
    <div className="organizer-credits">
      <div className="organizer-credits-organizer">
        <span className="organizer-credits-role">ORGANIZED BY</span>
        <div className="organizer-credits-marks">
          <a className="organizer-credits-renaiss" href={officialLinks.website} target="_blank" rel="noreferrer" aria-label={organizer.name}>
            <img src={organizer.src} width="1450" height="250" loading="lazy" alt={organizer.name} />
            <img className="organizer-credits-renaiss-icon" src={organizer.src} width="1450" height="250" loading="lazy" alt="" aria-hidden="true" />
          </a>
          <div className="organizer-credits-chain"><span>Built on</span><a href={chain.href} target="_blank" rel="noreferrer"><img src={chain.src} width="1388" height="244" loading="lazy" alt={chain.name} /></a></div>
        </div>
      </div>
      <div className="organizer-credits-backer" aria-label="Renaiss Protocol — Backed by YZi Labs">
        <span className="organizer-credits-role">BACKED BY</span>
        <a href={backer.href} target="_blank" rel="noreferrer"><img src={backer.src} width="1033" height="248" loading="lazy" alt={backer.name} /></a>
      </div>
    </div>
  );
}
