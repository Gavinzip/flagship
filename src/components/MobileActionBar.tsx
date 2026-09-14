import { useEffect, useState } from "react";
import { MediaImage, Group } from "iconoir-react";
import { useLocale } from "../i18n/LocaleProvider";
import { InteractiveLink } from "./InteractiveLink";

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
      <InteractiveLink
        href="#highlights"
        tabIndex={visible ? undefined : -1}
      >
        <MediaImage aria-hidden="true" />
        <span>{content.archive.recap}</span>
      </InteractiveLink>
      <a
        href="#vendors"
        tabIndex={visible ? undefined : -1}
      >
        <Group aria-hidden="true" />
        <span>{content.vendors.title}</span>
      </a>
    </nav>
  );
}
