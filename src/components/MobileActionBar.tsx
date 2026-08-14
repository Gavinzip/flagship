import { useEffect, useState } from "react";
import { Map } from "iconoir-react";
import { event } from "../data/event";
import { useLocale } from "../i18n/LocaleProvider";

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
