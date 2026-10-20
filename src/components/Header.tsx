import { useEffect, useState, type ReactNode } from "react";
import { Menu, Xmark } from "iconoir-react";
import { useLocale } from "../i18n/LocaleProvider";
import { LanguageSelector } from "./LanguageSelector";
import { ActionLink } from "./ActionLink";

export function Header({ brandControl, editionControl }: { brandControl: ReactNode; editionControl?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { content } = useLocale();

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        {brandControl}

        <nav
          className="desktop-nav"
          aria-label={content.header.primaryNavLabel}
        >
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {editionControl}
          <LanguageSelector />
          <ActionLink
            className="header-cta"
            href="#highlights"
          >
            {content.archive.recap}
          </ActionLink>

          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? content.header.closeMenuLabel
                : content.header.openMenuLabel
            }
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <Xmark aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label={content.header.mobileNavLabel}
      >
        {content.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
