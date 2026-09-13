import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { HTMLAttributes, PointerEvent } from "react";
import { useFlagship } from "../FlagshipContext";

/** Pointer-driven edge reflection. The centre is masked out to protect text. */
export function GlareSurface({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const reduced = useReducedMotion();
  const { paused } = useFlagship();
  const position = useSpring(0, { stiffness: 85, damping: 25 });
  const backgroundPosition = useTransform(
    position,
    [-1, 1],
    ["0% 50%", "100% 50%"],
  );
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    position.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
  };
  return (
    <div
      {...props}
      className={`fs-reading-plane fs-glass-surface ${className}`}
      onPointerMove={move}
      onPointerLeave={() => position.set(0)}
      onPointerCancel={() => position.set(0)}
    >
      {children}
      <motion.span
        className="fs-glass-reflection"
        aria-hidden="true"
        style={{
          backgroundPosition:
            reduced || paused ? "50% 50%" : backgroundPosition,
        }}
      />
    </div>
  );
}
