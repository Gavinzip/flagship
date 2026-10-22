import { thailandEvent } from "./event";

/** The organizer's venue slide places FLAGSHIP on the lower RIGHT wing,
 * not on the curved central entrance. Coordinates refer to the complete
 * 2560×1440 photograph, shared by the image, facade areas and connectors.
 * Reference: CleanShot 2026-10-21 at 19.57.17@2x.png.
 */
export const venueDiagram = {
  width: 2560, height: 1440,
  events: [
    // Attendance figures are organizer estimates supplied on 2026-10-22.
    { id: "bbw", floor: "G", hall: "EXHIBITION HALL 3", name: "BINANCE BLOCKCHAIN WEEK", expectedVisitors: "6,000",
      area: "336,392 1010,490 1420,506 1420,676 1010,635 336,484",
      marker: [1030, 275], connector: "M1030 370V445H1110V556", target: [1110, 556] },
    { id: "flagship", floor: "B2", hall: "EVENT HALL", name: "FLAGSHIP THAILAND", expectedVisitors: thailandEvent.expectedVisitors,
      area: "1692,647 1978,565 1978,625 1692,709",
      marker: [1900, 330], connector: "M1900 435V535H1835V637", target: [1835, 637] },
  ],
} as const;
