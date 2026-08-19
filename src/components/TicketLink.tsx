import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { event } from "../data/event";
import { ActionLink } from "./ActionLink";
import { InteractiveLink } from "./InteractiveLink";
import { useLumaCheckout } from "./LumaCheckoutProvider";

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
  const { openCheckout } = useLumaCheckout();
  const openLumaCheckout = (mouseEvent: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(mouseEvent);
    if (mouseEvent.defaultPrevented) return;

    mouseEvent.preventDefault();
    openCheckout();
  };

  const checkoutProps = {
    ...props,
    href: event.ticketUrl,
    onClick: openLumaCheckout,
  };

  if (variant === "plain") {
    return (
      <InteractiveLink {...checkoutProps}>
        {children}
      </InteractiveLink>
    );
  }

  return (
    <ActionLink {...checkoutProps} tone={tone}>
      {children}
    </ActionLink>
  );
}
