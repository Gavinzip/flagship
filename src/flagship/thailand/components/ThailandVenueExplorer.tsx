import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { affiliationLinks, affiliationMedia } from "../../home/affiliations/affiliationMedia";
import { venueExplorerCopy } from "../data/venueExplorerCopy";
import { venueDiagram } from "../data/venueDiagram";
import { thailandArtwork } from "../data/artwork";
import venueAerial from "../../assets/thailand/qsncc-venue-aerial-2560.webp";
import { useVenueArrival } from "../hooks/useVenueArrival";
import { useVenueInteraction } from "../hooks/useVenueInteraction";
import "../styles/venue-explorer.css";
import "../styles/venue-interaction.css";

const { events } = venueDiagram;

export function ThailandVenueExplorer({ language }: { language: SiteLanguage }) {
  const { selected, preview, activation, pointerProps, markerProps } = useVenueInteraction();
  const [photoReady, setPhotoReady] = useState(false);
  const { root, arrived, reveal } = useVenueArrival(photoReady);
  const reduced = useReducedMotion();
  const copy = venueExplorerCopy[language];
  return <div ref={root} className="th-venue-explorer" data-selected={selected} data-arrived={arrived} onFocusCapture={reveal}>
    <p className="th-venue-explorer-instruction">{copy.instruction}</p>
    <div className="th-venue-building">
      <div className="th-venue-building-photo">
        <img src={venueAerial} alt={copy.exteriorAlt} width="2560" height="1440" loading="eager" fetchPriority="low" decoding="async" onLoad={() => setPhotoReady(true)} />
        <span className="th-venue-building-name">QSNCC <span>BANGKOK · 28–29 NOV 2026</span></span>
        <span className="th-venue-building-badge">TWO SHOWS. ONE VENUE.</span>
        <svg className="th-venue-zones" viewBox="0 0 2560 1440" fill="none" aria-hidden="true">
          {events.map(event => <g className="th-venue-zone" key={event.id} data-event={event.id} data-selected={selected === event.id} data-preview={preview === event.id}>
            <polygon className="th-venue-hit-area" pathLength="1" points={event.area} {...pointerProps(event.id)} />
            <path className="th-venue-label-connector" pathLength="1" d={event.connector} />
            <path className="th-venue-connector-light" pathLength="1" d={event.connector} />
            <circle className="th-venue-target-halo" cx={event.target[0]} cy={event.target[1]} r="18" />
            <circle className="th-venue-label-target" cx={event.target[0]} cy={event.target[1]} r="7" />
            {activation?.id === event.id && !reduced && <motion.circle key={activation.sequence} className="th-venue-activation-ring" cx={event.target[0]} cy={event.target[1]}
              initial={{ r: 9, opacity: .95 }} animate={{ r: 64, opacity: 0 }} transition={{ duration: .85, ease: "easeOut" }} />}
          </g>)}
        </svg>
        {events.map(event => <button key={event.id} type="button" className={`th-venue-marker th-venue-marker--${event.id}`} style={{ left: `${event.marker[0] / venueDiagram.width * 100}%`, top: `${event.marker[1] / venueDiagram.height * 100}%` }} data-preview={preview === event.id} aria-label={`${event.floor} · ${event.name} · ${event.hall} · ${copy.expectedVisitors} ${event.expectedVisitors} ${copy.visitorUnit}`} aria-pressed={selected === event.id} aria-controls={`th-venue-floor-${event.id}`} {...markerProps(event.id)}>
          <motion.span className="th-venue-marker-surface" initial={false}
            animate={{ y: !reduced && preview === event.id ? -5 : 0 }}
            whileTap={reduced ? undefined : { scale: .965, y: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}>
            {event.id === "bbw" ? <span className="th-venue-marker-bbw"><img src={affiliationMedia.bbwWordmark} width="1920" height="1080" alt="Binance Blockchain Week" /></span> : <img className="th-venue-marker-flagship" src={thailandArtwork.emblem} width="1536" height="1024" alt="FLAGSHIP Card Show Thailand" />}
            <span className="th-venue-marker-hall"><span className="th-venue-marker-status" aria-hidden="true" /><b>{event.floor}</b> · {event.hall}</span>
            <span className="th-venue-marker-attendance"><span>{copy.estimateShort}</span><strong>{event.expectedVisitors} <small>{copy.visitorUnit}</small></strong></span>
          </motion.span>
        </button>)}
      </div>
      <div className="th-venue-floor-panels" role="region" aria-label={copy.details}>
        {events.map(event => <motion.article key={event.id} id={`th-venue-floor-${event.id}`} className="th-venue-floor-panel" initial={false}
          animate={{ opacity: selected === event.id ? 1 : 0, y: selected === event.id ? 0 : 10 }}
          transition={{ duration: reduced ? 0 : .32, ease: "easeOut" }}
          aria-hidden={selected !== event.id} inert={selected !== event.id}>
          <div className="th-venue-floor-heading"><span>{event.floor}</span><div><strong>{copy[event.id].floor}</strong><small>{event.hall}</small></div></div>
          {event.id === "bbw" ? <span className="th-venue-bbw-mark"><img src={affiliationMedia.bbwWordmark} width="1920" height="1080" alt="Binance Blockchain Week" /></span> : <h3 lang="en">FLAGSHIP CARD SHOW</h3>}
          <p>{copy[event.id].body}</p>
          <dl className="th-venue-attendance"><dt>{copy.expectedVisitors}</dt><dd>{event.expectedVisitors} <small>{copy.visitorUnit}</small></dd></dl>
          <a href={event.id === "flagship" ? "#th-venue-interior" : affiliationLinks.bbw} target={event.id === "bbw" ? "_blank" : undefined} rel={event.id === "bbw" ? "noreferrer" : undefined}>{event.id === "flagship" ? copy.interior : copy.official}<ArrowUpRight aria-hidden="true" /></a>
        </motion.article>)}
      </div>
    </div>
    <div className="th-venue-building-caption"><span>{copy.diagram}</span><a href="https://www.ocaji.or.jp/en/overseascontract/project/decision/tabid233.html" target="_blank" rel="noreferrer">{copy.source}<ArrowUpRight aria-hidden="true" /></a></div>
  </div>;
}
