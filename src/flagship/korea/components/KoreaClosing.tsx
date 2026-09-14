import { ArrowUp, ArrowUpRight } from "iconoir-react";
import { officialLinks } from "../../data/editions";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaClosing({ c }: { c: KoreaPageCopy }) {
  return (
    <>
      <section id="tickets" className="kr-section kr-registration">
        <div className="kr-wrap kr-registration-layout">
          <div className="kr-registration-copy" data-reveal>
            <span className="kr-label">06 / JOIN THE SHOW</span>
            <span className="kr-registration-korean" lang="ko">
              서울에서 만나요
            </span>
            <h2>{c.registrationTitle}</h2>
            <p>{c.registrationText}</p>
            <a
              className="kr-button"
              href={officialLinks.updates}
              target="_blank"
              rel="noreferrer"
            >
              {c.updates}
              <ArrowUpRight />
            </a>
          </div>
          <div className="kr-admission-options" data-reveal>
            {[c.admission, c.challenge].map((label, i) => (
              <div key={label}>
                <span>0{i + 1}</span>
                <h3>{label}</h3>
                <p>{c.pending}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
    </>
  );
}
