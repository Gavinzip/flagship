import { useRef } from "react";
import { MotionDirector } from "../../components/MotionDirector";
import { useFlagship } from "../FlagshipContext";
import type { EventDefinition } from "./types";
import { EventEnvironment } from "./components/EventEnvironment";
import { EventHeader } from "./components/EventHeader";
import { EventHero } from "./components/EventHero";
import { EventHighlights } from "./components/EventHighlights";
import { EventPartners } from "./components/EventPartners";
import { EventVisit } from "./components/EventVisit";
import { EventQuestions } from "./components/EventQuestions";
import { EventFooter } from "./components/EventFooter";
import "./styles/index.css";
import { useEventReady } from "./useEventReady";

export function EventSite({ onReady, definition }: { onReady: () => void; definition: EventDefinition }) {
  const { language } = useFlagship();
  const c = definition.copy[language];
  if (!c) throw new Error(`No ${language} translation for ${definition.id}. Resolve the edition language before mounting.`);
  const root = useRef<HTMLDivElement>(null);
  useEventReady(root, onReady);

  return (
    <div ref={root} className={`edition-event-site ${definition.id}-event-site`} id="top">
      <MotionDirector />
      <EventEnvironment artwork={definition.artwork} />
      <div>
        <EventHeader c={c} definition={definition} />
        <main id="main">
          <EventHero c={c} definition={definition} />
          <EventHighlights c={c} definition={definition} />
          <EventPartners c={c} definition={definition} />
          <EventVisit c={c} definition={definition} />
          <EventQuestions c={c} definition={definition} />
          <EventFooter c={c} definition={definition} />
        </main>
      </div>
    </div>
  );
}
