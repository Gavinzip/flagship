import {
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { event } from "../data/event";
import type { ActionLinkTone } from "./ActionLink";
import { LumaCheckoutLink } from "./LumaCheckoutLink";

type TicketLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  tone?: ActionLinkTone;
  variant?: "action" | "plain";
};

export function TicketLink({
  children,
  tone = "primary",
  variant = "action",
  ...props
}: TicketLinkProps) {
  return (
    <LumaCheckoutLink
      {...props}
      checkoutTarget="tickets"
      href={event.ticketUrl}
      tone={tone}
      variant={variant}
    >
      {children}
    </LumaCheckoutLink>
  );
}
