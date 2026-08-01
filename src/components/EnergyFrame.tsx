import type { HTMLAttributes, ReactNode } from "react";

type EnergyFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: "split" | "red" | "blue";
};

export function EnergyFrame({
  accent = "split",
  children,
  className = "",
  ...props
}: EnergyFrameProps) {
  return (
    <div
      className={`energy-frame energy-frame--${accent} ${className}`.trim()}
      {...props}
    >
      <span className="energy-frame__rail energy-frame__rail--top" aria-hidden="true" />
      <span className="energy-frame__rail energy-frame__rail--bottom" aria-hidden="true" />
      <div className="energy-frame__inner">{children}</div>
    </div>
  );
}
