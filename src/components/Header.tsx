import { useEffect, useState } from "react";
import { Menu, Xmark } from "iconoir-react";
import { responsiveMedia } from "../config/media";
import { useLocale } from "../i18n/LocaleProvider";
import { LanguageSelector } from "./LanguageSelector";
import { TicketLink } from "./TicketLink";

export function Header() {
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
        <a className="brand-link" href="#top" aria-label={content.header.homeLabel}>
          <img
            {...responsiveMedia.flagshipLogo}
            width="900"
            height="493"
            alt="Flagship Card Show Taiwan"
          />
        </a>

        <nav className="desktop-nav" aria-label={content.header.primaryNavLabel}>
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSelector />
          <TicketLink className="header-cta">{content.header.ticketLabel}</TicketLink>

          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open ? content.header.closeMenuLabel : content.header.openMenuLabel
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
