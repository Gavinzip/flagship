import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ActionLink } from "./ActionLink";
import { InteractiveLink } from "./InteractiveLink";
import {
  type LumaCheckoutTarget,
  useLumaCheckout,
} from "./LumaCheckoutProvider";

type LumaCheckoutLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  checkoutTarget: LumaCheckoutTarget;
  href: string;
  tone?: "primary" | "secondary";
  variant?: "action" | "plain";
};

export function LumaCheckoutLink({
  checkoutTarget,
  children,
  href,
  tone = "primary",
  variant = "action",
  ...props
}: LumaCheckoutLinkProps) {
  const { openCheckout } = useLumaCheckout();
  const openLumaCheckout = (mouseEvent: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(mouseEvent);
    if (mouseEvent.defaultPrevented) return;

    mouseEvent.preventDefault();
    openCheckout(checkoutTarget);
  };

  const checkoutProps = {
    ...props,
    href,
    onClick: openLumaCheckout,
  };

  if (variant === "plain") {
    return <InteractiveLink {...checkoutProps}>{children}</InteractiveLink>;
  }

  return (
    <ActionLink {...checkoutProps} tone={tone}>
      {children}
    </ActionLink>
  );
}
