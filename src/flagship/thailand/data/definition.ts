import type { EventDefinition } from "../../event/types";
import { thailandEvent } from "./event";
import { thailandPageCopy } from "./copy";

export const thailandDefinition: EventDefinition = {
  id: "thailand", country: "THAILAND", city: "BANGKOK",
  ticketUrl: thailandEvent.updatesUrl, mapQuery: thailandEvent.mapQuery, titleSponsor: false,
  captions: { highlights: "BANGKOK CARD CULTURE", partners: "THE PEOPLE BEHIND THE SHOW", venue: "FROM THE CITY TO THE SHOW", faq: "BEFORE YOU VISIT" },
  artwork: { kind: "halftone" },
  copy: thailandPageCopy,
};
