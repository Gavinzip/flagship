import { useState } from "react";
import { HelpCircle, NavArrowDown } from "iconoir-react";
import { faqItems } from "../data/event";
import { SectionHeading } from "./SectionHeading";

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="section section--faq" id="faq">
      <div className="site-shell faq-layout">
        <SectionHeading
          title="入場前先知道"
          english="FAQ"
          description="還沒定案的規則會先標明，等主辦確認後再更新。"
        />

        <div className="faq-list" data-reveal>
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div className={`faq-item${isOpen ? " faq-item--open" : ""}`} key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  <HelpCircle aria-hidden="true" />
                  <span>{item.question}</span>
                  <NavArrowDown aria-hidden="true" />
                </button>
                <div className="faq-item__answer" id={answerId} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
