import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useFlagship } from "../FlagshipContext";
import { artwork } from "../data/artwork";

/** A separate empty-holder cutout. Float is bounded and stops outside the viewport. */
export function CardFrameArtwork({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const { paused } = useFlagship();
  const active = visible && !reduced && !paused;
  return (
    <div
      ref={ref}
      className={`fs-card-fragment ${className}`}
      aria-hidden="true"
    >
      <motion.img
        src={artwork.frame}
        width="1024"
        height="1536"
        alt=""
        draggable={false}
        loading="eager"
        initial={false}
        animate={
          active ? { y: [0, -12, 0], rotate: [0, 1.5, 0] } : { y: 0, rotate: 0 }
        }
        transition={
          active
            ? { duration: 8, ease: "easeInOut", repeat: Infinity }
            : { duration: 0 }
        }
      />
    </div>
  );
}
