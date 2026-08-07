import { MapPin, Shop } from "iconoir-react";
import { EnergyFrame } from "./EnergyFrame";
import { useLocale } from "../i18n/LocaleProvider";
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

        <EnergyFrame className="vendor-announcement" data-reveal>
          <div className="vendor-announcement__count" aria-hidden="true">
            30<span>+</span>
          </div>
          <div className="vendor-announcement__content">
            <Shop aria-hidden="true" />
            <div>
              <h3>{content.vendors.listComingSoon}</h3>
            </div>
          </div>
          <div className="vendor-announcement__map">
            <MapPin aria-hidden="true" />
            <span>{content.vendors.mapComingSoon}</span>
          </div>
        </EnergyFrame>
      </div>
    </section>
  );
}
