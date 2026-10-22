import { affiliationMedia } from "../../home/affiliations/affiliationMedia";
import { worldEditionArtwork } from "./worldEditionArtwork";
import "./world-event-marks.css";

/** Compact event marks inside the Thailand city card. */
export function WorldEventMarks() {
  const flagship = worldEditionArtwork.thailand;
  return <span className="world-event-marks">
    <span className="world-event-marks-bbw">
      <span><img src={affiliationMedia.bbwWordmark} width="1920" height="1080" alt="Binance Blockchain Week" /></span>
    </span>
    <img className="world-event-marks-flagship" src={flagship.src} width={flagship.width} height={flagship.height} alt={flagship.alt} />
  </span>;
}
