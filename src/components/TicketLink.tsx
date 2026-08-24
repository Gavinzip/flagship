import {
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { event } from "../data/event";
import { LumaCheckoutLink } from "./LumaCheckoutLink";

type TicketLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
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
