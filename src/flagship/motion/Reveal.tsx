import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Restrained React Motion entry. Text and reading surfaces stay crisp throughout. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? undefined
          : {
              y: [10, 0],
              opacity: [0.85, 1],
            }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Keep the existing segmented-heading API, with crisp motion and no blur filter. */
export function BlurText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span aria-label={text}>
      {text.split("\n").map((line, i) => (
        <motion.span
          className="fs-heading-line"
          aria-hidden="true"
          key={line}
          initial={false}
          whileInView={
            reduced
              ? undefined
              : {
                  y: [12, 0],
                  opacity: [0.9, 1],
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}
