import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode, PointerEvent } from "react";
import { useFlagship } from "../FlagshipContext";

/** React Bits TiltedCard spring technique, limited to fine pointers and a 4-degree tilt. */
export function TiltedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { paused } = useFlagship();
  const rotateX = useSpring(0, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 25 });
  const lightX = useMotionValue(50);
  const reflection = useSpring(0.08, { stiffness: 180, damping: 25 });
  const edgeStart = useTransform(lightX, (value) => value - 12);
  const edgeEnd = useTransform(lightX, (value) => value + 12);
  const foil = useMotionTemplate`linear-gradient(112deg, transparent ${edgeStart}%, rgba(255, 255, 255, .8) ${lightX}%, transparent ${edgeEnd}%)`;
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    reflection.set(0.08);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || paused || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    rotateX.set(-((event.clientY - box.top) / box.height - 0.5) * 8);
    rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 8);
    lightX.set(((event.clientX - box.left) / box.width) * 100);
    reflection.set(0.4);
  };
  return (
    <div
      className={`fs-tilt ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        style={
          reduced || paused ? { rotateX: 0, rotateY: 0 } : { rotateX, rotateY }
        }
        className="fs-tilt-inner"
      >
        {children}
        {!reduced && !paused && (
          <motion.div
            className="fs-foil-sheen"
            aria-hidden="true"
            style={{ background: foil, opacity: reflection }}
          />
        )}
      </motion.div>
    </div>
  );
}
