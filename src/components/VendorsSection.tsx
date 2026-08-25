import { cohost, organizer, titleSponsor, vendors } from "../data/partners";
import { useLocale } from "../i18n/LocaleProvider";
import { PartnerTierCard, VendorLogoCard } from "./PartnerLogoCard";
import { SectionHeading } from "./SectionHeading";

export function VendorsSection() {
  const { content } = useLocale();

  return (
    <section className="section section--vendors" id="vendors">
      <div className="site-shell">
        <SectionHeading
          title={content.vendors.title}
          english={content.vendors.english}
        />

        <div className="partner-wall">
          <div className="partner-tier-grid">
            <PartnerTierCard
              label={content.vendors.organizerLabel}
              logo={organizer}
              tone="organizer"
            />
            <PartnerTierCard
              label={content.vendors.titleSponsorLabel}
              logo={titleSponsor}
              tone="title"
            />
            <PartnerTierCard
              label={content.vendors.cohostLabel}
              logo={cohost}
              tone="cohost"
            />
          </div>

          <div className="vendor-wall__heading" data-reveal>
            <h3>{content.vendors.vendorLabel}</h3>
            <span aria-hidden="true">
              {String(vendors.length).padStart(2, "0")}
            </span>
          </div>

          <ul
            className="vendor-logo-grid"
            aria-label={content.vendors.vendorLabel}
          >
            {vendors.map((vendor, index) => (
              <VendorLogoCard key={vendor.name} index={index} logo={vendor} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
