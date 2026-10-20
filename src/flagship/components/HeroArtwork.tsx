import { motion, useReducedMotion } from "motion/react";
import { useFlagship } from "../FlagshipContext";
import { BrandMark } from "./BrandMark";

/** The original emblem is a separate foreground layer in the shared world. */
export function HeroArtwork() {
  const { edition, paused } = useFlagship();
  const reduced = useReducedMotion();
  return (
    <div className="fs-hero-artwork" data-edition={edition.id}>
      <motion.div
        key={edition.id}
        className="fs-hero-artwork-inner"
        initial={false}
        animate={
          reduced || paused ? undefined : { y: [5, 0], opacity: [0.5, 1] }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandMark />
      </motion.div>
    </div>
  );
}
