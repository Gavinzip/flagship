import { ThailandAffiliationBanner } from "../../thailand/components/ThailandAffiliationBanner";
import "./world-event-tape.css";

/** Reuse the same affiliation banner shown inside the Thailand edition. */
export function WorldEventTape() {
  return (
    <div id="blockchain" className="world-event-tape">
      <ThailandAffiliationBanner />
    </div>
  );
}
