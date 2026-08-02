import { EventHighlightsGrid } from "./EventHighlightsGrid";
import { SectionHeading } from "./SectionHeading";

export function HighlightsSection() {
  return (
    <section className="section section--highlights" id="highlights">
      <div className="site-shell">
        <SectionHeading
          title="活動亮點"
          english="EVENT HIGHLIGHTS"
        />

        <EventHighlightsGrid />
      </div>
    </section>
  );
}
