import { EventHighlightsGrid } from "./EventHighlightsGrid";
import { SectionHeading } from "./SectionHeading";

export function HighlightsSection() {
  return (
    <section className="section section--highlights" id="highlights">
      <div className="site-shell">
        <SectionHeading
          title="活動亮點"
          english="EVENT HIGHLIGHTS"
          description="從入場體驗、舞台挑戰到珍稀收藏與 30+ TCG 攤商，五個值得到場的理由一次看清楚。"
        />

        <EventHighlightsGrid />
      </div>
    </section>
  );
}
