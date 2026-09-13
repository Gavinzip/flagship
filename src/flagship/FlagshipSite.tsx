import { lazy, Suspense, useContext, type CSSProperties } from "react";
import { BrandHome } from "./home/BrandHome";
import {
  SiteLink,
  SiteNavigationProvider,
  useSiteNavigation,
} from "./routing/SiteNavigation";
import { PageMetadata } from "./routing/PageMetadata";
import { RouteBoundary, RouteStatus } from "./routing/RouteBoundary";

import { preloadEdition } from "./routing/preloadEdition";
import { EditionTransition } from "./routing/transition/EditionTransition";
import { EditionTransitionContext } from "./routing/transition/EditionTransitionContext";
import { entryMotion } from "./world/config/entryMotion";
const EditionSite = lazy(preloadEdition);

function Site() {
  const { location } = useSiteNavigation();
  const transition = useContext(EditionTransitionContext);
  const retaining = transition?.retainingWorld ?? false;
  const transferring = retaining && !transition?.returnPhase;
  return (
    <>
      <PageMetadata />
      {(location.page === "home" || retaining) && (
        <div className="brand-world-retainer" data-transferring={transferring} data-return-phase={transition?.returnPhase}
          style={{ "--world-frame-duration": `${entryMotion.frameSeconds}s` } as CSSProperties}>
          <BrandHome />
        </div>
      )}
      {location.page !== "home" &&
        (location.page === "not-found" ? (
          <main className="brand-route-status">
            <p>404</p>
            <h1>Page not found</h1>
            <SiteLink page="home">Back to Flagship ↗</SiteLink>
          </main>
        ) : (
          <div className="edition-route-plane" data-transferring={transferring} data-return-phase={transition?.returnPhase}>
            <RouteBoundary key={location.page} language={location.language}>
              <Suspense fallback={<RouteStatus language={location.language} />}>
                <EditionSite />
              </Suspense>
            </RouteBoundary>
          </div>
        ))}
    </>
  );
}

export function FlagshipSite() {
  return (
    <SiteNavigationProvider>
      <EditionTransition>
        <Site />
      </EditionTransition>
    </SiteNavigationProvider>
  );
}
