import { useEffect, useState } from "react";
import { Plus, Minus } from "iconoir-react";
import type { EventPageCopy } from "../../event/types";
import type { EditorialCopy } from "../data/editorialCopy";
import { EventText } from "../../motion/EventText";

export function ThailandQuestions({ c, words }: { c: EventPageCopy; words: EditorialCopy }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => setOpen(null), [c]);
  const questions = c.event.faq.items;
  return <>
    <section id="faq" className="th-faq th-section" aria-labelledby="th-faq-title">
      <div className="th-wrap th-faq-layout"><h2 id="th-faq-title"><EventText key={words.faq} text={words.faq} /></h2><div className="th-faq-list">
        {questions.map((item, index) => <div className="th-question" data-th-reveal={index * 40} key={item.question}>
          <h3><button aria-expanded={open === index} aria-controls={`th-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span>{open === index ? <Minus /> : <Plus />}</button></h3>
          <div id={`th-answer-${index}`} className="th-answer" hidden={open !== index}><p>{item.answer}</p></div>
        </div>)}
      </div></div>
    </section>
  </>;
}
