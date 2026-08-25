import type { CSSProperties } from "react";
import type { PartnerLogo } from "../data/partners";

type PartnerTierCardProps = {
  label: string;
  logo: PartnerLogo;
  tone: "organizer" | "title" | "cohost";
};

export function PartnerTierCard({
  label,
  logo,
  tone,
}: PartnerTierCardProps) {
  return (
    <article
      className={`partner-tier-card partner-tier-card--${tone}`}
      data-reveal
    >
      <header className="partner-tier-card__header">
        <h3>{label}</h3>
      </header>
      <div className="partner-tier-card__stage">
        <img
          src={logo.src}
          alt={logo.name}
          decoding="async"
          loading="lazy"
        />
      </div>
    </article>
  );
}

type VendorLogoCardProps = {
  index: number;
  logo: PartnerLogo;
};

export function VendorLogoCard({ index, logo }: VendorLogoCardProps) {
  const treatmentClass = logo.treatment
    ? ` vendor-logo-card--${logo.treatment}`
    : "";

  return (
    <li
      className={`vendor-logo-card${treatmentClass}`}
      data-reveal
      style={{ "--reveal-index": index % 5 } as CSSProperties}
    >
      <span className="vendor-logo-card__media">
        <img src={logo.src} alt={logo.name} decoding="async" loading="lazy" />
      </span>
    </li>
  );
}
