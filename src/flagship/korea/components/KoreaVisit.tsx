import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Xmark } from "iconoir-react";
import { event } from "../../../data/event";
import { staticAssetUrl } from "../../../lib/staticAssets";
import { Reveal } from "../../motion/Reveal";
import type { KoreaPageCopy } from "../data/copy";

export function KoreaVisit({ c }: { c: KoreaPageCopy }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <section id="venue" className="kr-section kr-visit">
      <div className="kr-wrap">
        <Reveal className="kr-section-title">
          <span>03 / {c.event.venue.english}</span>
          <span className="kr-section-korean" lang="ko">
            도시에서 현장까지
          </span>
          <h2>{c.event.venue.title}</h2>
          <p>{c.visitNote}</p>
        </Reveal>
        <div className="kr-visit-layout">
          <div className="kr-map" data-reveal>
            <iframe
              src={event.mapEmbedUrl}
              title={c.event.venue.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span>{c.source}</span>
          </div>
          <div className="kr-visit-copy" data-reveal>
            <MapPin />
            <h3>{c.event.event.venue}</h3>
            <strong>{event.room}</strong>
            <p>{c.event.event.address}</p>
            <ol>
              {c.event.venue.routeSteps.map((s, i) => (
                <li key={s}>
                  <span>0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <a
              className="kr-button"
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {c.event.venue.directions}
              <ArrowUpRight />
            </a>
            <button className="kr-text-button" onClick={() => setOpen(true)}>
              {c.floorPlan}
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="kr-floor-dialog"
        aria-label={c.floorPlan}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <header>
          <h3>{c.floorPlan}</h3>
          <button onClick={() => setOpen(false)} aria-label={c.close}>
            <Xmark />
          </button>
        </header>
        {open && (
          <img
            src={staticAssetUrl("floor-plan-public.webp")}
            width="2600"
            height="1572"
            alt={c.floorPlan}
          />
        )}
      </dialog>
    </section>
  );
}
