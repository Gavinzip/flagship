import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
} from "react";
import { event } from "../data/event";
import { ActionLink } from "./ActionLink";
import { InteractiveLink } from "./InteractiveLink";

declare global {
  interface Window {
    luma?: {
      initCheckout?: () => void;
    };
  }
}

type TicketLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
  variant?: "action" | "plain";
};

function initializeLumaCheckout() {
  window.luma?.initCheckout?.();
}

export function TicketLink({
  children,
  tone = "primary",
  variant = "action",
  ...props
}: TicketLinkProps) {
  useEffect(() => {
    const checkoutScript = document.getElementById("luma-checkout");

    initializeLumaCheckout();
    checkoutScript?.addEventListener("load", initializeLumaCheckout);

    return () => {
      checkoutScript?.removeEventListener("load", initializeLumaCheckout);
    };
  }, []);

  const checkoutProps = {
    ...props,
    href: event.ticketUrl,
    "data-luma-action": "checkout",
    "data-luma-event-id": event.lumaEventId,
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
