import { ArrowUp } from "iconoir-react";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaFooter({ c }: { c: KoreaPageCopy }) {
  return (
    <footer className="kr-footer kr-wrap" data-reveal>
      <a href="#top" className="kr-footer-brand">
        FLAGSHIP <span>KOREA</span>
      </a>
      <p>{c.footer}</p>
      <a href="#top" aria-label={c.back}>
        <ArrowUp />
      </a>
      <small>© 2026 FLAGSHIP CARD SHOW</small>
      <small>{c.preview}</small>
    </footer>
  );
}
