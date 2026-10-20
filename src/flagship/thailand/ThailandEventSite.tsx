import { useRef } from "react";
import { useFlagship } from "../FlagshipContext";
import { useEventReady } from "../event/useEventReady";
import { EventHeader } from "../event/components/EventHeader";
import { thailandDefinition } from "./data/definition";
import { editorialCopy } from "./data/editorialCopy";
import { visitCopy } from "./data/visitCopy";
import { ThailandHero } from "./components/ThailandHero";
import { ThailandIntro } from "./components/ThailandIntro";
import { ThailandOpeningBackdrop } from "./components/ThailandOpeningBackdrop";
import { ThailandHighlights } from "./components/ThailandHighlights";
import { ThailandSeoulRecap } from "./components/ThailandSeoulRecap";
import { ThailandVenue } from "./components/ThailandVenue";
import { ThailandPartners } from "./components/ThailandPartners";
import { useThailandReveal } from "./hooks/useThailandReveal";
import { ThailandFooter } from "./components/ThailandFooter";
import { ThailandQuestions } from "./components/ThailandQuestions";
import "../event/styles/index.css";
import "./styles/theme.css";

export function ThailandEventSite({ onReady }: { onReady: () => void }) {
  const { language } = useFlagship();
  const root = useRef<HTMLDivElement>(null);
  const c = thailandDefinition.copy[language];
  const words = editorialCopy[language];
  useEventReady(root, onReady);
  useThailandReveal(root);
  return <div ref={root} className="edition-event-site thailand-event-site" id="top">
    <EventHeader c={c} definition={thailandDefinition} />
    <main id="main">
      <ThailandHero c={c} words={words} />
      <div className="th-show-opening">
        <ThailandOpeningBackdrop />
        <ThailandIntro c={c} words={words} />
        <ThailandHighlights c={c} words={words} />
      </div>
      <ThailandSeoulRecap language={language} />
      <ThailandPartners language={language} />
      <ThailandVenue c={c} words={words} visit={visitCopy[language]} />
      <ThailandQuestions c={c} words={words} />
    </main>
    <ThailandFooter c={c} words={words} />
  </div>;
}
