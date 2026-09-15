import { ArrowUpRight } from "iconoir-react";
import { organizer, titleSponsor } from "../../../data/partners";
import { PartnerTierCard } from "../../../components/PartnerLogoCard";
import { Reveal } from "../../motion/Reveal";
import { officialLinks } from "../../data/editions";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaPartners({ c }: { c: KoreaPageCopy }) {
  return (
    <section id="vendors" className="kr-section kr-partners">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>02 / {c.event.vendors.english}</span>
          <span className="kr-section-korean" lang="ko">
            서울에서 이어지는 파트너
          </span>
          <h2>{c.event.vendors.title}</h2>
          <p>{c.partnersNote}</p>
        </Reveal>
        <div className="kr-partner-stage" data-reveal>
          <header className="kr-partner-stage-header">
            <p>
              <span lang="ko">파트너 정보</span>
              <strong>SEOUL CHAPTER · PARTNER INFORMATION</strong>
            </p>
          </header>
          <div className="kr-partner-tiers">
            <PartnerTierCard
              label={c.event.vendors.organizerLabel}
              logo={organizer}
              tone="organizer"
              revealIndex={1}
            />
            <PartnerTierCard
              label={c.event.vendors.titleSponsorLabel}
              logo={titleSponsor}
              tone="title"
              revealIndex={0}
            />
          </div>
        </div>
        <div className="kr-partner-status" data-reveal>
          <div>
            <span>{c.event.vendors.vendorLabel}</span>
            <h3>{c.partnerDirectoryTitle}</h3>
            <p>{c.partnerDirectoryBody}</p>
          </div>
          <a
            className="kr-button"
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
