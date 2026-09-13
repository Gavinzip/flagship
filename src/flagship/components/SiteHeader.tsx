import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Menu, Xmark } from "iconoir-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useFlagship } from "../FlagshipContext";
import type { SiteLanguage } from "../data/copy";
import { editionList, isEditionId } from "../data/editions";
import { SiteLink } from "../routing/SiteNavigation";

const sections = ["experience", "editions", "show-info", "questions"];
export function SiteHeader() {
  const {
    content: c,
    edition,
    selectEdition,
    language,
    setLanguage,
  } = useFlagship();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [concealed, setConcealed] = useState(false);
  const directionOrigin = useRef(0);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 48);
    const distance = value - directionOrigin.current;
    if (Math.abs(distance) > 12 || value < 100) {
      setConcealed(value > 100 && distance > 0);
      directionOrigin.current = value;
    }
  });
  useEffect(() => {
    setScrolled(scrollY.get() > 48);
  }, [scrollY]);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className="fs-header"
      data-scrolled={scrolled}
      data-open={open}
      data-concealed={concealed && !open}
    >
      <SiteLink
        className="fs-home-link"
        page="home"
        aria-label={language === "zh-TW" ? "返回 Flagship 主站" : language === "ko" ? "Flagship 홈으로" : "Back to Flagship home"}
        onClick={() => setOpen(false)}
      >
        <ArrowUp /><span>FLAGSHIP</span>
      </SiteLink>
      <nav className="fs-desktop-nav" aria-label="Main navigation">
        {sections.map((id, i) => (
          <a href={`#${id}`} key={id}>
            {c.nav[i]}
          </a>
        ))}
      </nav>
      <div className="fs-header-controls">
        <div className="fs-edition-control">
          <span className="fs-live-dot" />
          <select
            aria-label={c.editionLabel}
            value={edition.id}
            onChange={(e) => {
              if (isEditionId(e.target.value)) selectEdition(e.target.value);
            }}
          >
            {editionList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.country}
              </option>
            ))}
          </select>
        </div>
        <select
          className="fs-language"
          aria-label={c.language}
          value={language}
          onChange={(e) => setLanguage(e.target.value as SiteLanguage)}
        >
          <option value="en">EN</option>
          <option value="ko">한국어</option>
          <option value="zh-TW">繁中</option>
        </select>
        <button
          ref={toggle}
          className="fs-menu-toggle"
          aria-label={open ? c.closeMenu : c.menu}
          aria-expanded={open}
          aria-controls="fs-mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <Xmark /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="fs-mobile-navigation"
          className="fs-mobile-nav"
          aria-label="Mobile navigation"
        >
          {sections.map((id, i) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {c.nav[i]}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
