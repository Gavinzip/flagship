import { useEffect, useState } from "react";
import { Calendar, Map } from "iconoir-react";
import { event } from "../data/event";

export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

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
      aria-label="活動快速操作"
      aria-hidden={!visible}
    >
      <a href="#highlights" tabIndex={visible ? undefined : -1}>
        <Calendar aria-hidden="true" />
        <span>活動資訊</span>
      </a>
      <a
        href={event.mapUrl}
        target="_blank"
        rel="noreferrer"
        tabIndex={visible ? undefined : -1}
      >
        <Map aria-hidden="true" />
        <span>開始導航</span>
      </a>
    </nav>
  );
}
