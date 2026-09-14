import { MetalBorder } from "./ui/MetalBorder";
import { ArrowUpRight } from "iconoir-react";
import { officialLinks } from "../data/editions";
import { SiteLink } from "../routing/SiteNavigation";
import { homeMedia } from "./homeMedia";
import type { HomeCopy } from "./homeCopy";
import { BrandPreferences } from "./BrandPreferences";
import { HomeReveal } from "./motion/HomeReveal";

export function BrandFooter({
  copy: c,
}: {
  copy: HomeCopy;
}) {
  return (
    <footer className="brand-footer">
      <div className="brand-container">
        <HomeReveal className="ip-footer-invitation">
          <div className="ip-footer-message">
            <h2>{c.footerTitle}</h2>
            <p>{c.footerBody}</p>
          </div>
          <div className="ip-footer-destination">
            <SiteLink className="ip-footer-next ip-metal-control" page="korea">
              <span className="ip-footer-next-label"><small>{c.koreaStatus}</small><strong>KOREA</strong></span>
              <span className="ip-footer-next-arrow" data-metal-surface><MetalBorder /><ArrowUpRight aria-hidden="true" /></span>
            </SiteLink>
            <a
              className="ip-footer-follow ip-metal-control"
              href={officialLinks.updates}
              target="_blank"
              rel="noreferrer"
            >
              <MetalBorder />{c.follow}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </HomeReveal>
        <div className="brand-footer-bottom">
          <SiteLink page="home" aria-label={c.footerHome}>
            <img
              src={homeMedia.masterLogo}
              width="1670"
              height="941"
              alt="FLAGSHIP Card Show"
            />
          </SiteLink>
          <span>© 2026 FLAGSHIP Card Show.</span>
          <nav aria-label="Footer">
            <SiteLink page="taiwan">Taiwan</SiteLink>
            <SiteLink page="korea">Korea</SiteLink>
            <a href={officialLinks.flagshipX} target="_blank" rel="noreferrer" aria-label="X @flagshiptcg">
              X @flagshiptcg
              <ArrowUpRight />
            </a>
            <a href={officialLinks.instagram} target="_blank" rel="noreferrer" aria-label="FLAGSHIP Card Show on Instagram">
              Instagram
              <ArrowUpRight />
            </a>
            <a href={officialLinks.website} target="_blank" rel="noreferrer">
              Renaiss
              <ArrowUpRight />
            </a>
          </nav>
        </div>
        <BrandPreferences copy={c} />
      </div>
    </footer>
  );
}
