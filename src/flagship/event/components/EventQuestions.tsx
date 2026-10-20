import { useEffect, useState } from "react";
import { NavArrowDown } from "iconoir-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { EventDefinition, EventPageCopy } from "../types";

export function EventQuestions({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  const { categories, items } = c.event.faq;
  const [category, setCategory] = useState<string>(categories[0]);
  const [openQuestions, setOpenQuestions] = useState<
    Record<string, string | null>
  >({});
  const reduced = useReducedMotion();
  useEffect(() => {
    setCategory(categories[0]);
    setOpenQuestions({});
  }, [categories]);
  return (
    <section id="faq" className="ev-section ev-faq">
      <div className="ev-wrap ev-faq-layout">
        <div className="ev-section-title" data-reveal>
          <span>04 / FAQ</span>
          <span className="ev-section-korean" lang={definition.id === "korea" ? "ko" : "en"}>
            {definition.captions.faq}
          </span>
          <h2>{c.faqTitle}</h2>
        </div>
        <div className="ev-faq-browser" data-reveal>
          <LayoutGroup id="ev-faq-categories">
            <nav
              className="ev-faq-categories"
              aria-label={c.event.faq.categoryLabel}
            >
              {categories.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    aria-pressed={active}
                    onClick={() => setCategory(cat)}
                  >
                    {active && (
                      <motion.span
                        className="ev-faq-active-surface"
                        layoutId="ev-faq-active-surface"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 360,
                                damping: 34,
                              }
                        }
                      />
                    )}
                    <span className="ev-faq-category-label">{cat}</span>
                  </button>
                );
              })}
            </nav>
          </LayoutGroup>
          <div className="ev-faq-panels">
            {categories.map((cat, categoryIndex) => {
              const active = category === cat;
              const categoryItems = items.filter(
                (item) => item.category === cat,
              );
              return (
                <div
                  key={cat}
                  className="ev-faq-panel"
                  data-active={active}
                  aria-hidden={!active}
                  inert={active ? undefined : true}
                >
                  <div className="ev-faq-list">
                    {categoryItems.map((item, i) => {
                      const answerId = `ev-answer-${categoryIndex}-${i}`;
                      const expanded =
                        openQuestions[cat] === item.question;
                      return (
                        <div key={item.question} className="ev-question">
                          <h3>
                            <button
                              aria-expanded={expanded}
                              aria-controls={answerId}
                              onClick={() =>
                                setOpenQuestions((current) => ({
                                  ...current,
                                  [cat]:
                                    current[cat] === item.question
                                      ? null
                                      : item.question,
                                }))
                              }
                            >
                              <span className="ev-question-number">
                                0{i + 1}
                              </span>
                              <span className="ev-question-copy">
                                {item.question}
                              </span>
                              <NavArrowDown />
                            </button>
                          </h3>
                          <div
                            className="ev-answer"
                            id={answerId}
                            data-open={expanded}
                            aria-hidden={!expanded}
                          >
                            <div>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
