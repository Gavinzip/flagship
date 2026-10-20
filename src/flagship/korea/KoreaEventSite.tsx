import { EventSite } from "../event/EventSite";
import { koreaDefinition } from "./data/definition";
export function KoreaEventSite({ onReady }: { onReady: () => void }) {
  return <EventSite onReady={onReady} definition={koreaDefinition} />;
}
