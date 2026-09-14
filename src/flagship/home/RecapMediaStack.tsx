import { useState } from "react";
import { MetalBorder } from "./ui/MetalBorder";
import { homeMedia } from "./homeMedia";
import type { HomeCopy } from "./homeCopy";

type RecapMediaId = "recap" | "crowd" | "players";
type RecapSlot = "active" | "left" | "right";

const initialOrder: RecapMediaId[] = ["recap", "crowd", "players"];

export function RecapMediaStack({ copy: c, onWatch }: { copy: HomeCopy; onWatch: () => void }) {
  const [order, setOrder] = useState(initialOrder);

  const selectMedia = (id: RecapMediaId) => {
    if (order[0] === id && id === "recap") {
      onWatch();
      return;
    }

    setOrder((current) => {
      const selectedIndex = current.indexOf(id);
      if (selectedIndex === 0) return [current[1], current[2], current[0]];
      return [id, ...current.filter((item) => item !== id)];
    });
  };

  const media = {
    recap: {
      src: homeMedia.recapPoster,
      width: 1200,
      height: 675,
      alt: "FLAGSHIP Taiwan 2026",
      caption: null,
    },
    crowd: {
      src: homeMedia.recapCrowd,
      width: 1600,
      height: 1067,
      alt: c.recapCrowdAlt,
      caption: c.recapCrowdCaption,
    },
    players: {
      src: homeMedia.recapPlayers,
      width: 1600,
      height: 1067,
      alt: c.recapPlayersAlt,
      caption: c.recapPlayersCaption,
    },
  } satisfies Record<RecapMediaId, { src: string; width: number; height: number; alt: string; caption: string | null }>;

  return <div className="brand-recap-frame">
    {initialOrder.map((id) => {
      const item = media[id];
      const slot = ["active", "left", "right"][order.indexOf(id)] as RecapSlot;
      const active = slot === "active";
      const label = active && id === "recap"
        ? c.viewRecap
        : `${active ? c.recapNextImage : c.recapBringForward}：${item.caption ?? item.alt}`;

      return <button
        type="button"
        key={id}
        className={`brand-recap-card brand-recap-card--${id}${id === "recap" ? " brand-recap-poster ip-metal-control" : ""}`}
        data-slot={slot}
        aria-label={label}
        aria-pressed={active}
        onClick={() => selectMedia(id)}
      >
        {id === "recap" && <MetalBorder />}
        <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" />
        {item.caption && <span className="brand-recap-card-caption">{item.caption}</span>}
        {id === "recap" && <span className="brand-recap-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 11 7-11 7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>}
      </button>;
    })}
  </div>;
}
