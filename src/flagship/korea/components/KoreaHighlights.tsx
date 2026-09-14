import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";
import { koreaEventMedia } from "../data/media";

export function KoreaHighlights({ c }: { c: KoreaPageCopy }) {
  return (
    <section id="highlights" className="kr-section kr-highlights">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>01 / {c.event.highlights.english}</span>
          <span className="kr-section-korean" lang="ko">
            서울 카드 컬처
          </span>
          <h2>{c.event.highlights.title}</h2>
        </Reveal>
        <div className="kr-highlight-list">
          {c.event.highlights.items.map((item, i) => {
            const visual = koreaEventMedia[i];
            return (
              <Reveal
                key={item.number}
                className={`kr-highlight kr-highlight-${i + 1}`}
                delay={i * 0.09}
              >
                <a
                  className="kr-highlight-image"
                  href={i === 2 ? "#vendors" : "#highlights"}
                >
                  <img
                    {...visual}
                    sizes="(max-width: 620px) 92vw, 50vw"
                    alt={item.alt}
                    width="1000"
                    height="700"
                    loading="lazy"
                  />
                  <span className="kr-highlight-number">{item.number}</span>
                </a>
                <div className="kr-highlight-copy">
                  <span className="kr-highlight-korean" lang="ko">
                    {i === 0
                      ? "무료 카드팩"
                      : i === 1
                        ? "컬렉터 커뮤니티"
                        : "브랜드 경험"}
                  </span>
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
