import { createContext } from "react";
import type { EditionId } from "../../data/editions";
import type { WorldEntryBridge } from "../../world/runtime/entryBridge";
export const EditionTransitionContext = createContext<null | {
  enter: (edition: EditionId, navigate: () => void) => void;
  returnHome: (edition: EditionId, navigate: () => void) => void;
  retainingWorld: boolean;
  returnPhase?: "preparing" | "retreating" | "settling" | "error";
  returnEdition?: EditionId;
  registerWorld: (bridge: WorldEntryBridge) => () => void;
}>(null);
