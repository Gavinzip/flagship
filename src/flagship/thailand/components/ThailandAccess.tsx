import { ArrowUpRight, Car, MapPin, Train } from "iconoir-react";
import { thailandEvent } from "../data/event";
import { thailandVisit, type VisitCopy } from "../data/visitCopy";

const routeIcons = { mrt: Train, car: Car, venue: MapPin };

export function ThailandAccess({ visit }: { visit: VisitCopy }) {
  return <div className="th-access">
    <h3>{visit.heading}</h3>
    <div className="th-route-grid">
      {visit.routes.map((route, index) => {
        const Icon = routeIcons[route.mode];
        return <article className={`th-route th-route--${route.mode}`} data-th-reveal={index * 70} key={route.mode}>
          <span className="th-route-label"><Icon aria-hidden="true" />{route.label}</span>
          <h4>{route.title}</h4><p>{route.body}</p>
        </article>;
      })}
    </div>
    <div className="th-map-layout">
      <div className="th-map" data-th-reveal="0">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(thailandEvent.mapQuery)}&output=embed`}
          title={visit.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="th-address" data-th-reveal="100">
        <MapPin aria-hidden="true" /><span className="th-eyebrow">{visit.address}</span>
        <address><strong>Queen Sirikit National Convention Center</strong>{thailandVisit.address}</address>
        <p>{visit.venueNote}</p>
        <a href={thailandVisit.directionsSource} target="_blank" rel="noreferrer">{visit.source}<ArrowUpRight /></a>
      </div>
    </div>
  </div>;
}
