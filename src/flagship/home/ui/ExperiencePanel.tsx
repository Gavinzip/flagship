import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import type { HomeCopy } from "../homeCopy";
import { ExperiencePhoto } from "./ExperiencePhoto";
import { homeMotion } from "../motion/homeMotion";

function CopyContent({ item, index }: { item: HomeCopy["experiences"][number]; index: number }) {
  return <><span className="brand-section-label">0{index + 1} / {item.name}</span><h3>{item.title}</h3><p>{item.body}</p></>;
}

function ExperienceCopy({ active, direction, copy }: { active: number; direction: number; copy: HomeCopy }) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  const item = copy.experiences[active];
  return <motion.div className="brand-experience-copy" custom={direction} aria-hidden={!present}
    variants={{
      enter: (sign: number) => ({ opacity: 0, x: reduced ? 0 : sign * 16 }),
      visible: { opacity: 1, x: 0 },
      exit: (sign: number) => ({ opacity: 0, x: reduced ? 0 : -sign * 12 }),
    }}
    initial="enter" animate="visible" exit="exit"
    transition={{ duration: reduced ? 0 : homeMotion.change * 0.8, ease: homeMotion.ease }}
  >
    <CopyContent item={item} index={active} />
  </motion.div>;
}

export function ExperiencePanel({ active, direction, copy }: { active: number; direction: number; copy: HomeCopy }) {
  return <div id="brand-experience-panel" className="brand-experience-panel" role="tabpanel" tabIndex={0} aria-labelledby={`brand-tab-${active}`}>
    <ExperiencePhoto active={active} direction={direction} alt={copy.experiences[active].alt} />
    <div className="brand-experience-description">
      <div className="brand-experience-copy-slot">
        {/* Reserve the tallest copy at this width, including translated text. */}
        {copy.experiences.map((item, index) => <div key={index} className="brand-experience-copy brand-experience-copy-measure" aria-hidden="true"><CopyContent item={item} index={index} /></div>)}
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <ExperienceCopy key={active} active={active} direction={direction} copy={copy} />
        </AnimatePresence>
      </div>
      <small>FLAGSHIP TAIWAN / 2026</small>
    </div>
  </div>;
}
