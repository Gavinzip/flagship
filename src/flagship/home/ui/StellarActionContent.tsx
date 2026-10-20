import { MetalBorder } from "./MetalBorder";
import type { ReactNode } from "react";
import { ArrowUpRight } from "iconoir-react";

/** Shared visual content; the actual link/button continues to own its action. */
export function StellarActionContent({ children, play = false }: {
  children: ReactNode;
  play?: boolean;
}) {
  return <>
    <MetalBorder />
    <span className="stellar-action-label">{children}</span>
    <span className="stellar-action-icon" aria-hidden="true">
      {play
        ? <svg viewBox="0 0 24 24" fill="none"><path d="m9 6 9 6-9 6V6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
        : <ArrowUpRight />}
    </span>
  </>;
}
