import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { SiteCopy, SiteLanguage } from "./data/copy";
import type { Edition, EditionId } from "./data/editions";

type FlagshipState = {
  content: SiteCopy;
  edition: Edition;
  language: SiteLanguage;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
  selectEdition: (edition: EditionId) => void;
  setLanguage: (language: SiteLanguage) => void;
};

// Keep the context outside the component refresh boundary so updates retain its identity.
export const FlagshipContext = createContext<FlagshipState | null>(null);

export function useFlagship() {
  const value = useContext(FlagshipContext);
  if (!value) throw new Error("FLAGSHIP components require FlagshipProvider.");
  return value;
}
