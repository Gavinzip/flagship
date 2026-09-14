import { useState } from "react";
import { Search } from "iconoir-react";
import {
  organizer,
  titleSponsor,
  cohost,
  vendors,
} from "../../../data/partners";
import {
  PartnerTierCard,
  VendorLogoCard,
} from "../../../components/PartnerLogoCard";
import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaPartners({ c }: { c: KoreaPageCopy }) {
  const [query, setQuery] = useState("");
  const filtered = vendors.filter((v) =>
    v.name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()),
  );
  return (
    <section id="vendors" className="kr-section kr-partners">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>03 / {c.event.vendors.english}</span>
          <span className="kr-section-korean" lang="ko">
            서울에서 이어지는 파트너
          </span>
          <h2>{c.event.vendors.title}</h2>
          <p>{c.partnersNote}</p>
        </Reveal>
        <div className="kr-partner-stage" data-reveal>
          <header className="kr-partner-stage-header">
            <p>
              <span lang="ko">파트너 프리뷰</span>
              <strong>SEOUL CHAPTER · PARTNER LINEUP</strong>
            </p>
          </header>
          <div className="kr-partner-tiers">
            <PartnerTierCard
              label={c.event.vendors.organizerLabel}
              logo={organizer}
              tone="organizer"
              preserveLeadingMarkColor
              revealIndex={1}
            />
            <PartnerTierCard
              label={c.event.vendors.titleSponsorLabel}
              logo={titleSponsor}
              tone="title"
              revealIndex={0}
            />
            <PartnerTierCard
              label={c.event.vendors.cohostLabel}
              logo={cohost}
              tone="cohost"
              revealIndex={2}
            />
          </div>
        </div>
        <div className="kr-vendor-bar" data-reveal>
          <h3>
            {c.event.vendors.vendorLabel}{" "}
            <span>
              {filtered.length} / {vendors.length}
            </span>
          </h3>
          <label>
            <Search />
            <input
              type="search"
              aria-label={c.search}
              placeholder={c.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <ul className="vendor-logo-grid kr-vendor-grid">
          {filtered.map((logo, index) => (
            <VendorLogoCard key={logo.name} logo={logo} index={index} />
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="kr-empty" role="status">
            {c.noResults}
          </p>
        )}
      </div>
    </section>
  );
}
