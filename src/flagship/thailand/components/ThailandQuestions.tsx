import { useEffect, useState } from "react";
import { Plus, Minus, ArrowUp, ArrowUpRight } from "iconoir-react";
import { ChapterHomeLink } from "../../components/ChapterHomeLink";
import { thailandEvent } from "../data/event";
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
        {questions.map((item, index) => <div className="th-question" key={item.question}>
          <h3><button aria-expanded={open === index} aria-controls={`th-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span>{open === index ? <Minus /> : <Plus />}</button></h3>
          <div id={`th-answer-${index}`} className="th-answer" hidden={open !== index}><p>{item.answer}</p></div>
        </div>)}
      </div></div>
    </section>
    <footer className="th-footer"><div className="th-wrap">
      <p className="th-footer-title">{words.footer}</p>
      <div className="th-footer-links"><ChapterHomeLink /><a href={thailandEvent.updatesUrl} target="_blank" rel="noreferrer">{words.social}<ArrowUpRight /></a><a href="#top" aria-label={c.back}><ArrowUp /></a></div>
      <div className="th-footer-bottom"><span>© 2026 FLAGSHIP CARD SHOW</span><span>THAILAND · BANGKOK</span></div>
    </div></footer>
  </>;
}
