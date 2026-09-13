import { useRef, useState } from "react";
import { useSiteNavigation } from "../routing/SiteNavigation";
import { WorldJourney } from "../world/ui/WorldJourney";
import { GalaxyBackdrop } from "../world/ui/GalaxyBackdrop";
import { BrandStory } from "./BrandStory";
import { BrandExperience } from "./BrandExperience";
import { BrandPartner } from "./BrandPartner";
import { BrandRecap } from "./BrandRecap";
import { BrandFooter } from "./BrandFooter";
import { BrandPillHeader } from "./navigation/BrandPillHeader";
import { LanguagePill } from "./navigation/LanguagePill";
import { RecapDialog } from "./RecapDialog";
import { useMetalBorder } from "./ui/useMetalBorder";
import { homeCopy } from "./homeCopy";
import "./styles/index.css";

export function BrandHome() {
  const { location } = useSiteNavigation();
  const site = useRef<HTMLDivElement>(null);
  const metalBorder = useMetalBorder();
  const copy = homeCopy[location.language];
  const [filmOpen, setFilmOpen] = useState(false);
  const theme = "dark" as const;
  return (
    <div ref={site} {...metalBorder} className="brand-site" id="top" data-theme={theme}>
      <GalaxyBackdrop />
      <a className="brand-skip" href="#main">
        {copy.skip}
      </a>
      <BrandPillHeader site={site} />
      <LanguagePill />
      <main id="main">
        <WorldJourney
          copy={copy}
          theme={theme}
          onWatch={() => setFilmOpen(true)}
        />
        <BrandStory copy={copy} />
        <BrandExperience copy={copy} />
        <BrandPartner copy={copy} />
        <BrandRecap copy={copy} onWatch={() => setFilmOpen(true)} />
      </main>
      <BrandFooter copy={copy} />
      <RecapDialog
        open={filmOpen}
        close={() => setFilmOpen(false)}
        copy={copy}
      />
    </div>
  );
}
