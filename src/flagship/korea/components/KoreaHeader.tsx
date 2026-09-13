import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Xmark } from "iconoir-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFlagship } from "../../FlagshipContext";
import { ChapterHomeLink } from "../../components/ChapterHomeLink";
import type { SiteLanguage } from "../../data/copy";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaHeader({ c }: { c: KoreaPageCopy }) {
  const { language, setLanguage } = useFlagship();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="kr-header">
      <ChapterHomeLink onClick={() => setOpen(false)} />
      <nav className="kr-desktop-nav" aria-label={c.navigation}>
        {c.event.navigation.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="kr-header-tools">
        <span className="kr-country">
          <span lang="ko">서울</span>
          <strong>KOREA</strong>
        </span>
        <select
          aria-label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as SiteLanguage)}
        >
          <option value="zh-TW">繁中</option>
          <option value="en">EN</option>
          <option value="ko">한국어</option>
        </select>
        <a className="kr-header-cta" href="#tickets">
          {c.participate}
          <ArrowUpRight />
        </a>
        <button
          ref={toggle}
          className="kr-menu"
          aria-label={open ? c.close : c.menu}
          aria-expanded={open}
          aria-controls="kr-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <Xmark /> : <Menu />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            className="kr-mobile-nav"
            id="kr-mobile-nav"
            initial={
              reduced
                ? false
                : { opacity: 0.08, y: -10, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduced
                ? { opacity: 1 }
                : { opacity: 0.08, y: -8, filter: "blur(6px)" }
            }
            transition={{
              duration: reduced ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {[
              ...c.event.navigation,
              { label: c.participate, href: "#tickets" },
            ].map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
                <ArrowUpRight />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
