import { MetalBorder } from "./ui/MetalBorder";
import { useRef, useState } from "react";
import { ArrowUpRight } from "iconoir-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { HomeReveal } from "./motion/HomeReveal";
import { homeMotion } from "./motion/homeMotion";
import { ExperiencePanel } from "./ui/ExperiencePanel";
import type { HomeCopy } from "./homeCopy";

const verbs = ["COLLECT", "TRADE", "PLAY", "CONNECT"];

export function BrandExperience({ copy: c }: { copy: HomeCopy }) {
  const [selection, setSelection] = useState({ active: 0, direction: 1 });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const select = (next: number, direction?: number) => {
    setSelection(current => next === current.active ? current : {
      active: next,
      direction: direction ?? Math.sign(next - current.active),
    });
  };
  return (
    <section id="experience" className="brand-section brand-container" aria-labelledby="brand-experience-title">
      <HomeReveal className="brand-section-label"><span>02</span><span>THE FLAGSHIP EXPERIENCE</span></HomeReveal>
      <HomeReveal className="brand-section-intro" delay={0.06}>
        <h2 id="brand-experience-title">{c.experienceTitle}</h2><p>{c.experienceIntro}</p>
      </HomeReveal>
      <HomeReveal delay={0.1}>
        <LayoutGroup id="flagship-experience">
          <div className="brand-experience-tabs" role="tablist" aria-label={c.nav[1]}>
            {c.experiences.map((experience, index) => <button
              className="ip-metal-control" key={verbs[index]} ref={node => { tabs.current[index] = node; }}
              role="tab" id={`brand-tab-${index}`} aria-controls="brand-experience-panel"
              aria-selected={selection.active === index} tabIndex={selection.active === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={event => {
                const next = event.key === "ArrowRight" ? (index + 1) % 4
                  : event.key === "ArrowLeft" ? (index + 3) % 4
                    : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
                if (next === null) return;
                event.preventDefault();
                select(next, event.key === "ArrowLeft" ? -1 : 1);
                tabs.current[next]?.focus({ preventScroll: true });
              }}
            >
              <MetalBorder /><span>0{index + 1}</span><strong>{verbs[index]}</strong><small>{experience.name}</small><ArrowUpRight />
              {selection.active === index && <motion.i
                className="brand-experience-selection" layoutId="selected-experience"
                transition={reduced ? { duration: 0 } : homeMotion.selection} aria-hidden="true"
              />}
            </button>)}
          </div>
        </LayoutGroup>
        <ExperiencePanel {...selection} copy={c} />
      </HomeReveal>
    </section>
  );
}
