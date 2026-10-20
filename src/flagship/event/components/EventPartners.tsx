import { ArrowUpRight } from "iconoir-react";
import { organizer, titleSponsor } from "../../../data/partners";
import { PartnerTierCard } from "../../../components/PartnerLogoCard";
import { Reveal } from "../../motion/Reveal";
import { officialLinks } from "../../data/editions";
import type { EventDefinition, EventPageCopy } from "../types";

export function EventPartners({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  return (
    <section id="vendors" className="ev-section ev-partners">
      <div className="ev-wrap">
        <Reveal className="ev-section-title">
          <span>02 / {c.event.vendors.english}</span>
          <span className="ev-section-korean" lang={definition.id === "korea" ? "ko" : "en"}>
            {definition.captions.partners}
          </span>
          <h2>{c.event.vendors.title}</h2>
          <p>{c.partnersNote}</p>
        </Reveal>
        <div className="ev-partner-stage" data-reveal>
          <header className="ev-partner-stage-header">
            <p>
              <span lang={definition.id === "korea" ? "ko" : "en"}>{definition.captions.partners}</span>
              <strong>{definition.city} CHAPTER · PARTNER INFORMATION</strong>
            </p>
          </header>
          <div className="ev-partner-tiers" data-title-sponsor={definition.titleSponsor}>
            <PartnerTierCard
              label={c.event.vendors.organizerLabel}
              logo={organizer}
              tone="organizer"
              revealIndex={1}
            />
            {definition.titleSponsor && <PartnerTierCard
              label={c.event.vendors.titleSponsorLabel}
              logo={titleSponsor}
              tone="title"
              revealIndex={0}
            />}
          </div>
        </div>
        <div className="ev-partner-status" data-reveal>
          <div>
            <span>{c.event.vendors.vendorLabel}</span>
            <h3>{c.partnerDirectoryTitle}</h3>
            <p>{c.partnerDirectoryBody}</p>
          </div>
          <a
            className="ev-button"
            href={officialLinks.flagshipX}
            target="_blank"
            rel="noreferrer"
          >
            {c.officialUpdates}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
