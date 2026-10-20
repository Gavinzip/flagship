import { useRef, useState } from "react";
import { ArrowUpRight, Search, Xmark } from "iconoir-react";
import { organizer, cohost, titleSponsor, vendors } from "../../data/partners";
import { event } from "../../data/event";
import { staticAssetUrl } from "../../lib/staticAssets";
import { useFlagship } from "../FlagshipContext";

export function TaiwanArchive() {
  const { content: c } = useFlagship();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const filteredVendors = vendors.filter((v) =>
    v.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  );
  return (
    <div className="fs-archive">
      <div role="tablist" aria-label="Taiwan 2026" className="fs-archive-tabs">
        {c.tabs.map((title, i) => (
          <button
            key={i}
            role="tab"
            id={`archive-tab-${i}`}
            aria-selected={tab === i}
            aria-controls="archive-panel"
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight") next = (i + 1) % 3;
              else if (e.key === "ArrowLeft") next = (i + 2) % 3;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 2;
              else return;
              e.preventDefault();
              setTab(next);
              document.getElementById(`archive-tab-${next}`)?.focus();
            }}
          >
            {title}
          </button>
        ))}
      </div>
      <div
        id="archive-panel"
        role="tabpanel"
        aria-labelledby={`archive-tab-${tab}`}
        className="fs-archive-panel"
      >
        {tab === 0 && (
          <>
            <h3>{c.overviewTitle}</h3>
            <p>{c.overviewText}</p>
            <div className="fs-stats">
              {c.stats.map((label, i) => (
                <div key={label}>
                  <strong>{c.statsValues[i]}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="fs-archive-notice">
              {c.ended} · {event.date} · 12:00—19:00 (UTC+8)
            </p>
          </>
        )}
        {tab === 1 && (
          <>
            <p className="fs-eyebrow">{c.taiwanOnly}</p>
            <p>{c.partnerNote}</p>
            <div className="fs-sponsors">
              {[
                [organizer, c.organizer],
                [titleSponsor, c.titleSponsor],
                [cohost, c.cohost],
              ].map(
                ([partner, label]) =>
                  typeof partner !== "string" && (
                    <div key={partner.name}>
                      <span>{String(label)}</span>
                      <img
                        src={partner.src}
                        alt={partner.name}
                        loading="lazy"
                        width="180"
                        height="72"
                      />
                    </div>
                  ),
              )}
            </div>
            <label className="fs-search">
              <Search />
              <input
                type="search"
                aria-label={c.search}
                placeholder={c.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <div className="fs-vendors">
              {filteredVendors.map((v) => (
                <div key={v.name}>
                  <img
                    src={v.src}
                    alt=""
                    width="120"
                    height="80"
                    loading="lazy"
                    className={
                      v.treatment === "invert-monochrome" ? "fs-invert" : ""
                    }
                  />
                  <span>{v.name}</span>
                </div>
              ))}
            </div>
            {filteredVendors.length === 0 && <p role="status">{c.noResults}</p>}
          </>
        )}
        {tab === 2 && (
          <div className="fs-venue">
            <img
              src={staticAssetUrl("venue-clapper.webp")}
              alt="CLAPPER STUDIO"
              width="800"
              height="500"
              loading="lazy"
            />
            <div>
              <h3>{c.venueTitle}</h3>
              <p>{c.address}</p>
              <p>{c.transit}</p>
              <a
                className="fs-text-link"
                href={event.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                {c.map}
                <ArrowUpRight />
              </a>
              <button
                className="fs-button fs-button-outline"
                onClick={() => dialog.current?.showModal()}
              >
                {c.floorPlan}
                <ArrowUpRight />
              </button>
            </div>
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="fs-floor-dialog"
        aria-labelledby="floor-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="fs-dialog-heading">
          <h3 id="floor-title">{c.floorPlanTitle}</h3>
          <button aria-label={c.close} onClick={() => dialog.current?.close()}>
            <Xmark />
          </button>
        </div>
        <div className="fs-floor-scroll">
          <img
            src={staticAssetUrl("floor-plan-public-1800.webp")}
            alt={c.floorPlanTitle}
            width="1800"
            height="1200"
            loading="lazy"
          />
        </div>
      </dialog>
    </div>
  );
}
