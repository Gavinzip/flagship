import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { homeMedia } from "../homeMedia";
import { homeMotion } from "../motion/homeMotion";

const images = [homeMedia.collect, homeMedia.exchange, homeMedia.play, homeMedia.connect];

function Photo({ src, alt, direction }: { src: string; alt: string; direction: number }) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  return <motion.img src={src} alt={present ? alt : ""} aria-hidden={!present}
    width="1600" height="1067" loading="lazy" custom={direction} data-active={present}
    variants={{
      enter: (sign: number) => ({ opacity: 0, x: reduced ? 0 : sign * 28, scale: reduced ? 1 : 1.015 }),
      visible: { opacity: 1, x: 0, scale: 1 },
      exit: (sign: number) => ({ opacity: 0, x: reduced ? 0 : -sign * 22, scale: 1 }),
    }}
    initial="enter" animate="visible" exit="exit"
    transition={{ duration: reduced ? 0 : homeMotion.change, ease: homeMotion.ease }}
  />;
}

export function ExperiencePhoto({ active, direction, alt }: { active: number; direction: number; alt: string }) {
  return <div className="brand-experience-photo">
    {/* Warm the four image resources only as this panel approaches the viewport. */}
    <div className="brand-experience-preload" aria-hidden="true">
      {images.map(src => <img key={src} src={src} width="1600" height="1067" loading="lazy" alt="" />)}
    </div>
    <AnimatePresence initial={false} custom={direction}>
      <Photo key={active} src={images[active]} alt={alt} direction={direction} />
    </AnimatePresence>
  </div>;
}
