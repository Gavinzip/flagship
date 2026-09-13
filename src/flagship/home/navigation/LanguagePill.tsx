import { MetalBorder } from "../ui/MetalBorder";
import { useContext, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Language, NavArrowDown } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { useSiteNavigation } from "../../routing/SiteNavigation";
import { EditionTransitionContext } from "../../routing/transition/EditionTransitionContext";
import { homeMotion } from "../motion/homeMotion";

const languages: { value: SiteLanguage; label: string; short: string }[] = [
  { value: "zh-TW", label: "繁體中文", short: "繁中" },
  { value: "en", label: "English", short: "EN" },
  { value: "ko", label: "한국어", short: "한국어" },
];

/** Available before scroll; uses the same locale routing as the rest of the site. */
export function LanguagePill() {
  const { location, setLanguage } = useSiteNavigation();
  const transferring = useContext(EditionTransitionContext)?.retainingWorld;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const current = languages.findIndex(item => item.value === location.language);
  const label = location.language === "zh-TW" ? "切換語言" : location.language === "ko" ? "언어 변경" : "Change language";

  useEffect(() => { if (transferring) setOpen(false); }, [transferring]);
  useEffect(() => {
    if (!open) return;
    options.current[current]?.focus();
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, current]);

  const close = () => { setOpen(false); trigger.current?.focus(); };
  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    const index = options.current.findIndex(option => option === document.activeElement);
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = (index + 1) % languages.length; break;
      case "ArrowUp": next = (index - 1 + languages.length) % languages.length; break;
      case "Home": next = 0; break;
      case "End": next = languages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    options.current[next]?.focus();
  };

  return <div className="ip-language" ref={root} inert={Boolean(transferring)} aria-hidden={Boolean(transferring)}
    onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <button className="ip-language-trigger ip-metal-control" ref={trigger} aria-label={`${label} / Language`}
      aria-haspopup="menu" aria-expanded={open} aria-controls="ip-language-menu"
      onClick={() => setOpen(value => !value)}
      onKeyDown={event => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); } }}>
      <MetalBorder /><Language aria-hidden="true" />
      <span>{languages[current].short}</span>
      <NavArrowDown className="ip-language-chevron" aria-hidden="true" />
    </button>
    <AnimatePresence initial={false}>{open && <motion.div id="ip-language-menu" className="ip-language-menu" role="menu" aria-label="Language"
      initial={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : .97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -4, scale: reduced ? 1 : .98 }}
      transition={{ duration: reduced ? 0 : .2, ease: homeMotion.ease }} onKeyDown={moveFocus}>
      {languages.map((item, index) => <button className="ip-metal-control" key={item.value} ref={node => { options.current[index] = node; }}
        role="menuitemradio" aria-checked={item.value === location.language} lang={item.value}
        tabIndex={item.value === location.language ? 0 : -1}
        onClick={() => { setLanguage(item.value); close(); }}>
        <MetalBorder /><span>{item.label}</span>{item.value === location.language && <Check aria-hidden="true" />}
      </button>)}
    </motion.div>}</AnimatePresence>
  </div>;
}
