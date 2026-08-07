import { useEffect, useRef, useState } from "react";
import { NavArrowDown } from "iconoir-react";
import { useLocale } from "../i18n/LocaleProvider";

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const { content, locale, setLocale } = useLocale();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [open]);

  return (
    <div className="language-selector" ref={selectorRef}>
      <button
        className="language-selector__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-menu"
        aria-label={content.header.languageMenuLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{content.header.currentLanguageLabel}</span>
        <NavArrowDown
          className={open ? "is-open" : undefined}
          aria-hidden="true"
        />
      </button>

      <div
        className={`language-selector__menu${open ? " language-selector__menu--open" : ""}`}
        id="language-menu"
        role="menu"
        aria-label={content.header.languageMenuLabel}
      >
        {content.header.languageOptions.map((option) => {
          const selected = option.locale === locale;

          return (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              className={selected ? "is-selected" : undefined}
              key={option.locale}
              onClick={() => {
                setLocale(option.locale);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              <small>{option.locale === "zh-TW" ? "中文" : "EN"}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
