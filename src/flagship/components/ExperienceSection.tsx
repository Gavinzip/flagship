import { useRef, useState } from "react";
import { ArrowUpRight } from "iconoir-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useFlagship } from "../FlagshipContext";
import { experienceImages } from "../data/editions";
import { BlurText, Reveal } from "../motion/Reveal";

export function ExperienceSection() {
  const { content: c } = useFlagship();
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const current = c.experiences[selected];
  const ticker = useRef<HTMLDivElement>(null);
  const tickerVisible = useInView(ticker);
  return (
    <>
      <div
        ref={ticker}
        className="fs-ticker"
        data-visible={tickerVisible}
        aria-hidden="true"
      >
        <div className="fs-ticker-track">
          {[0, 1].map((n) => (
            <span key={n}>
              COLLECT <i>✦</i> TRADE <i>✦</i> PLAY <i>✦</i> CONNECT{" "}
              <i>✦</i>{" "}
            </span>
          ))}
        </div>
      </div>
      <section
        className="fs-experience fs-section"
        id="experience"
        aria-labelledby="fs-experience-title"
      >
        <div className="fs-wrap fs-scene-content">
          <Reveal className="fs-section-heading">
            <div>
              <p className="fs-eyebrow">01 / {c.experienceEyebrow}</p>
              <h2 id="fs-experience-title">
                <BlurText text={c.experienceTitle} />
              </h2>
            </div>
            <p>{c.experienceNote}</p>
          </Reveal>
          <div className="fs-experience-layout">
            <div
              className="fs-experience-list fs-reading-plane"
              role="tablist"
              aria-label={c.experienceEyebrow}
              aria-orientation="horizontal"
            >
              {c.experiences.map((item, i) => (
                <button
                  type="button"
                  role="tab"
                  id={`experience-tab-${i}`}
                  aria-controls="experience-panel"
                  aria-selected={selected === i}
                  tabIndex={selected === i ? 0 : -1}
                  key={item.name}
                  className={selected === i ? "is-selected" : ""}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === "ArrowRight") next = (i + 1) % 4;
                    else if (e.key === "ArrowLeft") next = (i + 3) % 4;
                    else if (e.key === "Home") next = 0;
                    else if (e.key === "End") next = 3;
                    else return;
                    e.preventDefault();
                    setSelected(next);
                    document.getElementById(`experience-tab-${next}`)?.focus();
                  }}
                >
                  <span className="fs-tab-number">0{i + 1}</span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.label}</small>
                  </span>
                  <ArrowUpRight />
                </button>
              ))}
            </div>
            <div
              id="experience-panel"
              role="tabpanel"
              aria-labelledby={`experience-tab-${selected}`}
              className="fs-experience-panel"
            >
              <div className="fs-experience-image">
                <motion.img
                  key={selected}
                  src={experienceImages[selected]}
                  alt={current.label}
                  loading="lazy"
                  width="1000"
                  height="700"
                  initial={false}
                  animate={
                    reduced
                      ? undefined
                      : { scale: [1.04, 1], opacity: [0.2, 1] }
                  }
                  transition={{ duration: 0.5 }}
                />
                <span>{c.visualNote}</span>
                <div className="fs-image-index">
                  0{selected + 1}
                  <span>/ 04</span>
                </div>
              </div>
              <div className="fs-experience-caption">
                <p>{current.text}</p>
                <span className="fs-eyebrow">{current.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
