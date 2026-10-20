import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, NavArrowDown } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { languageLabels, siteLanguages } from "../../data/languages";

/** An event-themed language menu; routing remains owned by the event provider. */
export function EventLanguageMenu({ language, onChange, includeThai, className = "" }: {
  language: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
  includeThai: boolean;
  className?: string;
}) {
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const languages = siteLanguages.filter(item => includeThai || item.value !== "th");
  const selected = languages.findIndex(item => item.value === language);
  const open = phase === "open";
  const label = languageLabels[language];

  useEffect(() => {
    if (phase !== "closing" || !panel.current) return;
    const duration = getComputedStyle(panel.current).getPropertyValue("--dropdown-close-dur");
    const timer = window.setTimeout(() => setPhase("closed"), Number.parseFloat(duration));
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!open) return;
    options.current[selected]?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setPhase("closing");
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, selected]);

  const close = (focusTrigger = false) => {
    setPhase("closing");
    if (focusTrigger) trigger.current?.focus({ preventScroll: true });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      close(true);
      return;
    }
    if (!open) return;
    const current = options.current.findIndex(item => item === document.activeElement);
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = (current + 1) % languages.length; break;
      case "ArrowUp": next = (current - 1 + languages.length) % languages.length; break;
      case "Home": next = 0; break;
      case "End": next = languages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    options.current[next]?.focus();
  };

  return <div className={`ev-language ${className}`} ref={root} onKeyDown={onKeyDown}
    onBlurCapture={event => {
      if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) close();
    }}>
    <button ref={trigger} type="button" className="ev-language-trigger"
      aria-label={`${label.change} / Language`} aria-haspopup="menu"
      aria-expanded={open} aria-controls={id}
      onClick={() => open ? close() : setPhase("open")}
      onKeyDown={event => {
        if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
          event.preventDefault();
          setPhase("open");
        }
      }}>
      <span lang={language}>{languages[selected].short}</span><NavArrowDown aria-hidden="true" />
    </button>
    <div ref={panel} id={id} role="menu" aria-label={label.label} aria-hidden={!open} inert={!open}
      data-origin="top-right" data-phase={phase}
      className={`ev-language-panel t-dropdown${open ? " is-open" : phase === "closing" ? " is-closing" : ""}`}>
      {languages.map((item, index) => <button key={item.value} type="button" lang={item.value}
        ref={node => { options.current[index] = node; }} role="menuitemradio"
        aria-checked={item.value === language} tabIndex={item.value === language ? 0 : -1}
        onClick={() => { onChange(item.value); close(true); }}>
        <span>{item.label}</span>{item.value === language && <Check aria-hidden="true" />}
      </button>)}
    </div>
  </div>;
}
