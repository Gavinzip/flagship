import { ArrowUpRight } from "iconoir-react";
import { organizer, titleSponsor } from "../../data/partners";
import { officialLinks } from "../data/editions";
import { HomeReveal } from "./motion/HomeReveal";
import type { HomeCopy } from "./homeCopy";

export function BrandPartner({ copy: c }: { copy: HomeCopy }) {
  return (
    <section
      id="partner"
      className="brand-section brand-partner"
      aria-labelledby="brand-partner-title"
    >
      <div className="brand-container">
        <HomeReveal className="ip-partner-heading">
          <span>{c.sponsorLabel}</span>
        </HomeReveal>
        <div className="ip-partner-showcase">
          <HomeReveal className="ip-partner-mark" delay={0.06}>
            <img
              src={titleSponsor.src}
              width="960"
              height="349"
              loading="lazy"
              alt={titleSponsor.name}
            />
          </HomeReveal>
          <HomeReveal className="ip-partner-copy" delay={0.12}>
            <h2 id="brand-partner-title">{c.sponsorTitle}</h2>
            <p>{c.sponsorBody}</p>
          </HomeReveal>
        </div>
        <div className="ip-partner-organizer">
          <span>{c.organizerLabel}</span>
          <a href={officialLinks.website} target="_blank" rel="noreferrer">
            <img
              src={organizer.src}
              width="360"
              height="120"
              loading="lazy"
              alt={organizer.name}
            />
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
