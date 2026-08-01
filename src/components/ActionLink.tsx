import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "iconoir-react";
import { InteractiveLink } from "./InteractiveLink";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
};

export function ActionLink({
  children,
  className = "",
  tone = "primary",
  ...props
}: ActionLinkProps) {
  return (
    <InteractiveLink
      className={`action-link action-link--${tone} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" width={22} height={22} />
    </InteractiveLink>
  );
}
