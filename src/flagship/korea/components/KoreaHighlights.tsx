import { taiwanRecapMedia } from "../../../config/taiwanRecapMedia";
import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";

const visuals = [
  taiwanRecapMedia.highlightEntryGift,
  taiwanRecapMedia.highlightChampionChallenge,
  taiwanRecapMedia.highlightTcgVendors,
];

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
          <p>{c.source}</p>
        </Reveal>
        <div className="kr-highlight-list">
          {c.event.highlights.items.map((item, i) => {
            const visual = visuals[i];
            return (
              <Reveal
                key={item.number}
                className={`kr-highlight kr-highlight-${i + 1}`}
                delay={i * 0.09}
              >
                <a
                  className="kr-highlight-image"
                  href={i === 2 ? "#vendors" : "#tickets"}
                >
                  <img
                    {...visual}
                    sizes="(max-width: 620px) 92vw, 50vw"
                    alt={item.alt}
                    width="1000"
                    height="700"
                    loading="lazy"
                  />
                  <span>{item.number}</span>
                </a>
                <div className="kr-highlight-copy">
                  <span className="kr-highlight-korean" lang="ko">
                    {i === 0
                      ? "현장 경험"
                      : i === 1
                        ? "챔피언 스테이지"
                        : "카드 마켓"}
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
