import { Check } from "iconoir-react";
import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaEventInfo({ c }: { c: KoreaPageCopy }) {
  return (
    <section id="event-info" className="kr-section kr-event-info">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>01 / {c.info.english}</span>
          <span className="kr-section-korean" lang="ko">
            {c.info.korean}
          </span>
          <h2>{c.info.title}</h2>
          <p>{c.info.intro}</p>
        </Reveal>

        <div className="kr-info-board">
          <Reveal className="kr-info-confirmed">
            <dl className="kr-info-facts">
              {c.info.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="kr-info-detail-grid">
              <div>
                <h3>{c.info.scaleTitle}</h3>
                <div className="kr-info-scale">
                  {c.info.scale.map((item) => (
                    <p key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h3>{c.info.experiencesTitle}</h3>
                <ul className="kr-info-experiences">
                  {c.info.experiences.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
