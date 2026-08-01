import { useState } from "react";
import { HelpCircle, NavArrowDown } from "iconoir-react";
import { faqCategories, faqItems } from "../data/event";
import { SectionHeading } from "./SectionHeading";

export function FaqSection() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof faqCategories)[number]>(faqCategories[0]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(
    faqItems[0].question,
  );
  const visibleItems = faqItems.filter(
    (item) => item.category === activeCategory,
  );

  const selectCategory = (category: (typeof faqCategories)[number]) => {
    const firstQuestion = faqItems.find(
      (item) => item.category === category,
    )?.question;

    setActiveCategory(category);
    setActiveQuestion(firstQuestion ?? null);
  };

  return (
    <section className="section section--faq" id="faq">
      <div className="site-shell faq-layout">
        <SectionHeading title="FAQ" />

        <div className="faq-panel" data-reveal>
          <nav className="faq-categories" aria-label="常見問題分類">
            {faqCategories.map((category, index) => {
              const isSelected = category === activeCategory;

              return (
                <button
                  type="button"
                  className={isSelected ? "is-active" : undefined}
                  aria-pressed={isSelected}
                  onClick={() => selectCategory(category)}
                  key={category}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {category}
                </button>
              );
            })}
          </nav>

          <div className="faq-list">
            {visibleItems.map((item) => {
              const isOpen = activeQuestion === item.question;
              const answerId = `faq-answer-${faqItems.indexOf(item)}`;

              return (
                <div
                  className={`faq-item${isOpen ? " faq-item--open" : ""}`}
                  key={item.question}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setActiveQuestion(isOpen ? null : item.question)
                    }
                  >
                    <HelpCircle aria-hidden="true" />
                    <span>{item.question}</span>
                    <NavArrowDown aria-hidden="true" />
                  </button>
                  <div
                    className="faq-item__answer"
                    id={answerId}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
