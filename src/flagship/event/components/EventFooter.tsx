import { ArrowUp } from "iconoir-react";
import type { EventDefinition, EventPageCopy } from "../types";

export function EventFooter({ c, definition }: { c: EventPageCopy; definition: EventDefinition }) {
  return (
    <footer className="ev-footer ev-wrap" data-reveal>
      <a href="#top" className="ev-footer-brand">
        FLAGSHIP <span>{definition.country}</span>
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
