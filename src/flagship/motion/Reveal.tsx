import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Shared page reveal: low nonzero fade, short travel, and blur resolving together. */
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
      initial={
        reduced
          ? false
          : {
              y: 18,
              opacity: 0.08,
              filter: "blur(10px)",
            }
      }
      whileInView={
        reduced
          ? undefined
          : {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Keep the segmented-heading API while matching the shared page reveal. */
export function BlurText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span aria-label={text}>
      {text.split("\n").map((line, i) => (
        <motion.span
          className="fs-heading-line"
          aria-hidden="true"
          key={line}
          initial={
            reduced
              ? false
              : { y: 16, opacity: 0.08, filter: "blur(8px)" }
          }
          whileInView={
            reduced
              ? undefined
              : {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
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
