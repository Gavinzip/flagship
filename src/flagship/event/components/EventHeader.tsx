import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Xmark } from "iconoir-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFlagship } from "../../FlagshipContext";
import { ChapterHomeLink } from "../../components/ChapterHomeLink";
import { EventLanguageMenu } from "./EventLanguageMenu";
import { languageLabels } from "../../data/languages";
import type { EventDefinition, EventPageCopy } from "../types";

export function EventHeader({ c, definition, compactTicketLabel }: { c: EventPageCopy; definition: EventDefinition; compactTicketLabel?: string }) {
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
    <header className="ev-header">
      <ChapterHomeLink onClick={() => setOpen(false)} />
      <nav className="ev-desktop-nav" aria-label={c.navigation}>
        {c.event.navigation.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="ev-header-tools">
        <a
          className="ev-header-ticket"
          href={definition.ticketUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={compactTicketLabel ? c.ticketCta : undefined}
        >
          {compactTicketLabel ? <><span className="ev-header-ticket-full">{c.ticketCta}</span><span className="ev-header-ticket-compact" aria-hidden="true">{compactTicketLabel}</span></> : c.ticketCta}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <EventLanguageMenu className="ev-header-language" language={language}
          onChange={setLanguage} includeThai={definition.id === "thailand"} />
        <button
          ref={toggle}
          className="ev-menu"
          aria-label={open ? c.close : c.menu}
          aria-expanded={open}
          aria-controls="ev-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <Xmark /> : <Menu />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            className="ev-mobile-nav"
            id="ev-mobile-nav"
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
            {c.event.navigation.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
                <ArrowUpRight />
              </a>
            ))}
            <div className="ev-mobile-language">
              <span>{languageLabels[language].label}</span>
              <EventLanguageMenu language={language} onChange={setLanguage}
                includeThai={definition.id === "thailand"} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
