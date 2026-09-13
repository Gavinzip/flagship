import type { CSSProperties } from "react";
import type { PartnerLogo } from "../data/partners";

type PartnerTierCardProps = {
  label: string;
  logo: PartnerLogo;
  tone: "organizer" | "title" | "cohost";
  preserveLeadingMarkColor?: boolean;
  revealIndex?: number;
};

export function PartnerTierCard({
  label,
  logo,
  tone,
  preserveLeadingMarkColor = false,
  revealIndex = 0,
}: PartnerTierCardProps) {
  return (
    <article
      className={`partner-tier-card partner-tier-card--${tone}`}
      data-reveal
      style={{ "--reveal-index": revealIndex } as CSSProperties}
    >
      <header className="partner-tier-card__header">
        <h3>{label}</h3>
      </header>
      <div
        className={`partner-tier-card__stage${
          preserveLeadingMarkColor
            ? " partner-tier-card__stage--preserve-leading-mark"
            : ""
        }`}
      >
        <img
          src={logo.src}
          alt={logo.name}
          decoding="async"
          loading="lazy"
        />
        {preserveLeadingMarkColor && (
          <img
            className="partner-tier-card__mark-layer"
            src={logo.src}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="lazy"
          />
        )}
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
