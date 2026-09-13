import { useState, type ReactNode } from "react";
import { FlagshipContext } from "./FlagshipContext";
import { copy } from "./data/copy";
import { editions } from "./data/editions";
import { useSiteNavigation } from "./routing/SiteNavigation";

/** Event state exists only inside an event page. The master site has no selected edition. */
export function FlagshipProvider({ children }: { children: ReactNode }) {
  const { location, navigate, setLanguage } = useSiteNavigation();
  const [paused, setPaused] = useState(false);
  if (location.page !== "korea" && location.page !== "taiwan") {
    throw new Error("An event provider requires a Korea or Taiwan route.");
  }
  return <FlagshipContext.Provider value={{
    edition: editions[location.page],
    content: copy[location.language],
    language: location.language,
    paused, setPaused,
    selectEdition: edition => navigate(edition),
    setLanguage,
  }}>{children}</FlagshipContext.Provider>;
}
