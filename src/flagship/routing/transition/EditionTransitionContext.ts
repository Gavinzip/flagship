import { createContext } from "react";
import type { EditionId } from "../../data/editions";
import type { WorldEntryBridge } from "../../world/runtime/entryBridge";
import type { WorldEntryOrigin } from "../../world/runtime/entryOrigin";
export const EditionTransitionContext = createContext<null | {
  enter: (edition: EditionId, navigate: () => void) => void;
  returnHome: (edition: EditionId, navigate: () => void) => void;
  retainingWorld: boolean;
  entryPhase?: "preparing" | "aligning" | "geographic" | "handoff" | "venue" | "revealing" | "error";
  returnPhase?: "preparing" | "retreating" | "settling" | "error";
  returnEdition?: EditionId;
  returnOrigin?: WorldEntryOrigin;
  registerWorld: (bridge: WorldEntryBridge) => () => void;
  prepareEntry: (edition: EditionId) => Promise<void>;
}>(null);
