import { EventHighlightsGrid } from "./EventHighlightsGrid";
import { useLocale } from "../i18n/LocaleProvider";
import { SectionHeading } from "./SectionHeading";

export function HighlightsSection() {
  const { content } = useLocale();

  return (
    <section className="section section--highlights" id="highlights">
      <div className="site-shell">
        <SectionHeading
          title={content.highlights.title}
          english={content.highlights.english}
        />

        <EventHighlightsGrid />
      </div>
    </section>
  );
}
