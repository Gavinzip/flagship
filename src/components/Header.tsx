import { useEffect, useState } from "react";
import { Menu, Xmark } from "iconoir-react";
import { navigation } from "../data/event";
import { ActionLink } from "./ActionLink";

export function Header() {
  const [open, setOpen] = useState(false);

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
        <a className="brand-link" href="#top" aria-label="回到網站頂端">
          <img
            src="/assets/flagship-logo.webp"
            width="900"
            height="493"
            alt="Flagship Card Show Taiwan"
          />
        </a>

        <nav className="desktop-nav" aria-label="主要導覽">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ActionLink className="header-cta" href="#highlights">
          活動資訊
        </ActionLink>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "關閉選單" : "開啟選單"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <Xmark aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label="手機導覽"
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
