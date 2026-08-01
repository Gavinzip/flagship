import { useState } from "react";
import { ArrowUpRight } from "iconoir-react";
import { experiences } from "../data/event";
import { GlareSweep } from "./GlareSweep";

export function ExperienceGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = experiences[activeIndex];

  return (
    <div className="experience-gallery" data-reveal>
      <div className="experience-gallery__cards" role="tablist" aria-label="參加者體驗">
        {experiences.map((experience, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              className={`experience-card${isActive ? " experience-card--active" : ""}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="experience-detail"
              key={experience.title}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={experience.image}
                width={index === 0 ? 1600 : 1400}
                height={index === 0 ? 900 : 788}
                alt={experience.alt}
                loading="lazy"
              />
              <span className="experience-card__shade" aria-hidden="true" />
              <GlareSweep />
              <span className="experience-card__label">
                <small>{experience.english}</small>
                <strong>{experience.title}</strong>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="experience-gallery__detail" id="experience-detail" role="tabpanel">
        <span className="experience-gallery__number" aria-hidden="true">
          0{activeIndex + 1}
        </span>
        <div className="experience-gallery__copy">
          <div className="experience-gallery__heading">
            <small>SELECTED EXPERIENCE · 現場內容</small>
            <strong>{activeExperience.title}</strong>
            <p>{activeExperience.description}</p>
          </div>
          <ul
            className="experience-gallery__contents"
            aria-label={`${activeExperience.title}包含的活動內容`}
          >
            {activeExperience.contents.map((content, index) => (
              <li key={content.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <strong>{content.title}</strong>
                <p>{content.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="experience-gallery__pager" aria-hidden="true">
          {experiences.map((experience, index) => (
            <span
              className={index === activeIndex ? "is-active" : ""}
              key={experience.english}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
