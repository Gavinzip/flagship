import { useEffect, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/** Adapted from React Bits TiltedCard; see docs/licenses/react-bits.txt.
 * Keep the link itself native, with a small spring-driven tilt on mouse input.
 */
export function TiltSurface({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 25 });
  const reset = () => { rotateX.set(0); rotateY.set(0); };
  useEffect(() => { if (reduced) { rotateX.set(0); rotateY.set(0); } }, [reduced, rotateX, rotateY]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
  };
  return <div className="brand-tilt" onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
    <motion.div className="brand-tilt-inner" style={{ rotateX, rotateY }}>{children}</motion.div>
  </div>;
}
