import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Xmark } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";

export type LumaCheckoutTarget = "tickets" | "challenge";

type LumaCheckoutContextValue = {
  openCheckout: (target?: LumaCheckoutTarget) => void;
};

const LumaCheckoutContext = createContext<LumaCheckoutContextValue | null>(
  null,
);

const checkoutEventIds = {
  tickets: event.lumaEventId,
  challenge: event.challengeRegistrationEventId,
} as const satisfies Record<LumaCheckoutTarget, string>;

export function LumaCheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [checkoutTarget, setCheckoutTarget] =
    useState<LumaCheckoutTarget>("tickets");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const { content, locale } = useLocale();

  const openCheckout = useCallback((target: LumaCheckoutTarget = "tickets") => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setCheckoutTarget(target);
    setLoaded(false);
    setOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    const siteContent = document.getElementById("site-content");
    const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") closeCheckout();
    };

    document.documentElement.style.overflow = "hidden";
    siteContent?.setAttribute("aria-hidden", "true");
    if (siteContent) siteContent.inert = true;
    window.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      siteContent?.removeAttribute("aria-hidden");
      if (siteContent) siteContent.inert = false;
      window.removeEventListener("keydown", closeOnEscape);
      returnFocusRef.current?.focus();
    };
  }, [closeCheckout, open]);

  const value = useMemo(() => ({ openCheckout }), [openCheckout]);
  const checkoutCopy =
    checkoutTarget === "challenge"
      ? {
          dialogLabel:
            locale === "zh-TW"
              ? `${content.challengeRegistration.label}視窗`
              : `${content.challengeRegistration.label} dialog`,
          iframeTitle: `Luma ${content.challengeRegistration.label}`,
          closeLabel:
            locale === "zh-TW"
              ? `關閉${content.challengeRegistration.label}視窗`
              : `Close ${content.challengeRegistration.label}`,
        }
      : {
          dialogLabel:
            locale === "zh-TW"
              ? `${event.name} 活動預約`
              : `${event.name} registration`,
          iframeTitle:
            locale === "zh-TW" ? "Luma 活動預約" : "Luma registration",
          closeLabel:
            locale === "zh-TW" ? "關閉預約視窗" : "Close registration",
        };
  const checkoutUrl = `https://luma.com/embed/event/${encodeURIComponent(checkoutEventIds[checkoutTarget])}/simple`;
  const closeOnBackdrop = (mouseEvent: MouseEvent<HTMLDivElement>) => {
    if (mouseEvent.target === mouseEvent.currentTarget) closeCheckout();
  };

  return (
    <LumaCheckoutContext.Provider value={value}>
      {children}
      {open
        ? createPortal(
            <div
              className="luma-modal-backdrop"
              role="presentation"
              onMouseDown={closeOnBackdrop}
            >
              <section
                className={`luma-modal${loaded ? " luma-modal--loaded" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label={checkoutCopy.dialogLabel}
              >
                <div className="luma-modal__loading" aria-hidden="true" />
                <iframe
                  src={checkoutUrl}
                  title={checkoutCopy.iframeTitle}
                  allow="fullscreen; payment"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setLoaded(true)}
                />
                <button
                  ref={closeButtonRef}
                  className="luma-modal__close"
                  type="button"
                  aria-label={checkoutCopy.closeLabel}
                  onClick={closeCheckout}
                >
                  <Xmark aria-hidden="true" />
                </button>
              </section>
            </div>,
            document.body,
          )
        : null}
    </LumaCheckoutContext.Provider>
  );
}

export function useLumaCheckout() {
  const context = useContext(LumaCheckoutContext);

  if (!context) {
    throw new Error(
      "useLumaCheckout must be used within LumaCheckoutProvider",
    );
  }

  return context;
}
