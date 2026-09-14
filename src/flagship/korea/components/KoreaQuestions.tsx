import { useEffect, useState } from "react";
import { NavArrowDown } from "iconoir-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaQuestions({ c }: { c: KoreaPageCopy }) {
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
    <section id="faq" className="kr-section kr-faq">
      <div className="kr-wrap kr-faq-layout">
        <div className="kr-section-title" data-reveal>
          <span>04 / FAQ</span>
          <span className="kr-section-korean" lang="ko">
            자주 묻는 질문
          </span>
          <h2>{c.faqTitle}</h2>
        </div>
        <div className="kr-faq-browser" data-reveal>
          <LayoutGroup id="kr-faq-categories">
            <nav
              className="kr-faq-categories"
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
                        className="kr-faq-active-surface"
                        layoutId="kr-faq-active-surface"
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
                    <span className="kr-faq-category-label">{cat}</span>
                  </button>
                );
              })}
            </nav>
          </LayoutGroup>
          <div className="kr-faq-panels">
            {categories.map((cat, categoryIndex) => {
              const active = category === cat;
              const categoryItems = items.filter(
                (item) => item.category === cat,
              );
              return (
                <div
                  key={cat}
                  className="kr-faq-panel"
                  data-active={active}
                  aria-hidden={!active}
                  inert={active ? undefined : true}
                >
                  <div className="kr-faq-list">
                    {categoryItems.map((item, i) => {
                      const answerId = `kr-answer-${categoryIndex}-${i}`;
                      const expanded =
                        openQuestions[cat] === item.question;
                      return (
                        <div key={item.question} className="kr-question">
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
                              <span className="kr-question-number">
                                0{i + 1}
                              </span>
                              <span className="kr-question-copy">
                                {item.question}
                              </span>
                              <NavArrowDown />
                            </button>
                          </h3>
                          <div
                            className="kr-answer"
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
