import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";
import { koreaHighlightMedia } from "../data/media";
import { KoreaHighlightVideo } from "./KoreaHighlightVideo";

export function KoreaHighlights({ c }: { c: KoreaPageCopy }) {
  return (
    <section id="highlights" className="kr-section kr-highlights">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>01 / {c.event.highlights.english}</span>
          <span className="kr-section-korean" lang="ko">
            카드 쇼의 순간들
          </span>
          <h2>{c.event.highlights.title}</h2>
          <p className="kr-highlight-intro">{c.event.highlights.intro}</p>
        </Reveal>
        <div className="kr-highlight-list">
          {c.event.highlights.items.map((item, i) => {
            const visual = koreaHighlightMedia[i];
            return (
              <Reveal
                key={item.number}
                className={`kr-highlight kr-highlight-${i + 1}`}
                delay={i * 0.09}
              >
                <div className="kr-highlight-image">
                  <KoreaHighlightVideo visual={visual} alt={item.alt} />
                  <span className="kr-highlight-number">{item.number}</span>
                </div>
                <div className="kr-highlight-copy">
                  <span className="kr-highlight-korean" lang="ko">{item.korean}</span>
                  <span className="kr-label">{item.english}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
