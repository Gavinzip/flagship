import { loadWithDeadline } from "./RouteBoundary";
let pending: Promise<typeof import("../EditionSite")> | undefined;
export function preloadEdition() {
  return (pending ??= loadWithDeadline(() => import("../EditionSite")).catch(
    (error) => {
      pending = undefined;
      throw error;
    },
  ));
}
