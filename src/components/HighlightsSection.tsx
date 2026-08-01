import { CardWallet, Shop, Sparks, Trophy } from "iconoir-react";
import { highlights } from "../data/event";
import { ExperienceGallery } from "./ExperienceGallery";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<(typeof highlights)[number]["icon"], typeof Shop> = {
  store: Shop,
  trophy: Trophy,
  card: CardWallet,
  sparkles: Sparks,
};

export function HighlightsSection() {
  return (
    <section className="section section--highlights" id="highlights">
      <div className="site-shell">
        <SectionHeading
          title="活動亮點"
          english="EVENT HIGHLIGHTS"
          description="逛攤、看珍藏、上場對戰。想先玩哪一種，從這裡開始看。"
        />

        <ExperienceGallery />

        <ol className="highlight-list" id="highlight-details" data-reveal>
          {highlights.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li key={item.number}>
                <div className="highlight-list__identity" aria-hidden="true">
                  <span className="highlight-list__number">{item.number}</span>
                  <span className="highlight-list__icon">
                    <Icon />
                  </span>
                </div>
                <div className="highlight-list__copy">
                  <span>FLAGSHIP HIGHLIGHT</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
