import { useSiteNavigation } from "./routing/SiteNavigation";
import { useLayoutEffect } from "react";
import { FlagshipProvider } from "./FlagshipProvider";
import { useFlagship } from "./FlagshipContext";
import { SiteHeader } from "./components/SiteHeader";
import { EditionHero } from "./components/EditionHero";
import { ExperienceSection } from "./components/ExperienceSection";
import { EditionsSection } from "./components/EditionsSection";
import { ShowInformation } from "./components/ShowInformation";
import { CommunitySection, QuestionsSection, SiteFooter } from "./components/CommunityFooter";
import { BrandIntroduction } from "./components/BrandIntroduction";
import { TaiwanEventSite } from "./taiwan/TaiwanEventSite";
import "./styles/index.css";

const notifyEditionReady = () => document.dispatchEvent(new Event("flagship:edition-ready"));

function EditionContent() {
  const { edition, content, paused } = useFlagship();
  useLayoutEffect(() => {
    if (edition.id !== "taiwan") notifyEditionReady();
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, [edition.id]);
  if (edition.id === "taiwan") return <TaiwanEventSite onReady={notifyEditionReady} />;
  return <div className={`fs-site fs-theme-${edition.id} ${paused ? "fs-motion-paused" : ""}`} id="top">
    <a className="fs-skip" href="#main">{content.skip}</a>
    <SiteHeader />
    <main id="main">
      <EditionHero /><BrandIntroduction /><ExperienceSection /><EditionsSection />
      <ShowInformation /><CommunitySection /><QuestionsSection />
    </main>
    <SiteFooter />
    <span className="fs-sr-only" role="status" aria-live="polite">{content.selected}: {edition.country}</span>
  </div>;
}

export default function EditionSite() {
  const {location}=useSiteNavigation();
  return <div data-active-edition={location.page}><FlagshipProvider><EditionContent /></FlagshipProvider></div>;
}
