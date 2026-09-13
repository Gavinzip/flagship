import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { homeMotion } from "./homeMotion";

/** One entrance per reading group, without blur or replay while scrolling back. */
export function HomeReveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
      transition={{ duration: reduced ? 0 : homeMotion.reveal, delay: reduced ? 0 : delay, ease: homeMotion.ease }}
    >
      {children}
    </motion.div>
  );
}
