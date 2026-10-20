import { createContext, useContext } from "react";

/** True after route admission and the geographic handoff have released the page. */
export const EditionPresentationContext = createContext<boolean | null>(null);

export function useEditionPresented() {
  const presented = useContext(EditionPresentationContext);
  if (presented === null) throw new Error("Edition motion requires its route presentation provider.");
  return presented;
}
