import type { RefObject } from "react";
import { thailandAssetUrl } from "../../thailand/data/assetDelivery";
import "./thailand-arrival.css";

const film = thailandAssetUrl("qsncc-entry-1080p.mp4");
const poster = thailandAssetUrl("qsncc-entry-poster.webp");

/** One-shot venue arrival; separate from the Thailand hero's recap loop. */
export function ThailandArrivalFilm({ host, video }: {
  host: RefObject<HTMLDivElement | null>;
  video: RefObject<HTMLVideoElement | null>;
}) {
  return <div ref={host} className="thailand-arrival-film" aria-hidden="true">
    <video ref={video} src={film} poster={poster} muted playsInline loop={false} preload="auto" disablePictureInPicture />
    <div className="thailand-arrival-light" data-phase="idle" />
  </div>;
}
