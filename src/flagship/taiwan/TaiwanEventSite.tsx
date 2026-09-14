import { useContext } from "react";
import { FaqSection } from "../../components/FaqSection";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { HighlightsSection } from "../../components/HighlightsSection";
import { MobileActionBar } from "../../components/MobileActionBar";
import { MotionDirector } from "../../components/MotionDirector";
import { SiteBoot } from "../../components/SiteBoot";
import { VendorsSection } from "../../components/VendorsSection";
import { VenueSection } from "../../components/VenueSection";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { useFlagship } from "../FlagshipContext";
import { TaiwanEditionControl } from "./TaiwanEditionControl";
import { ChapterHomeLink } from "../components/ChapterHomeLink";
import { EditionTransitionContext } from "../routing/transition/EditionTransitionContext";
import "./taiwan-navigation.css";
import "./taiwan-recap.css";
import { TaiwanRecapClosing } from "./TaiwanRecapClosing";

/** The completed Taiwan edition, retaining its event identity and real on-site record. */
export function TaiwanEventSite({ onReady }: { onReady?: () => void }) {
  const { language, setLanguage } = useFlagship();
  const coveredByTransition = useContext(EditionTransitionContext)?.retainingWorld ?? false;
  if (language === "ko") {
    throw new Error(
      "The original Taiwan site supports zh-TW and en. Resolve its language before mounting.",
    );
  }
  return (
    <LocaleProvider locale={language} onLocaleChange={setLanguage}>
      <SiteBoot onReady={onReady} coveredByTransition={coveredByTransition}>
        <div className="taiwan-event-site">
          <MotionDirector />
          <Header brandControl={<ChapterHomeLink />} editionControl={<TaiwanEditionControl />} />
          <main id="main">
            <Hero />
            <MobileActionBar />
            <HighlightsSection />
            <VendorsSection />
            <VenueSection />
            <FaqSection />
            <TaiwanRecapClosing />
          </main>
          <Footer />
        </div>
      </SiteBoot>
    </LocaleProvider>
  );
}
