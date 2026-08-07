import { useEffect, useState } from "react";
import { Map, SecurityPass } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";
import { TicketLink } from "./TicketLink";

export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { content } = useLocale();

  useEffect(() => {
    const hero = document.querySelector("#top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-74px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`mobile-action-bar${visible ? " mobile-action-bar--visible" : ""}`}
      aria-label={content.mobileActions.label}
      aria-hidden={!visible}
    >
      <TicketLink
        variant="plain"
        tabIndex={visible ? undefined : -1}
      >
        <SecurityPass aria-hidden="true" />
        <span>{content.mobileActions.ticket}</span>
      </TicketLink>
      <a
        href={event.mapUrl}
        target="_blank"
        rel="noreferrer"
        tabIndex={visible ? undefined : -1}
      >
        <Map aria-hidden="true" />
        <span>{content.mobileActions.directions}</span>
      </a>
    </nav>
  );
}
