import { lazy, Suspense, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandHome } from "./home/BrandHome";
import {
  SiteLink,
  SiteNavigationProvider,
  useSiteNavigation,
} from "./routing/SiteNavigation";
import { PageMetadata } from "./routing/PageMetadata";
import { RouteBoundary } from "./routing/RouteBoundary";

import { preloadEdition } from "./routing/preloadEdition";
import { EditionTransition } from "./routing/transition/EditionTransition";
import { EditionTransitionContext } from "./routing/transition/EditionTransitionContext";
import { entryMotion } from "./world/config/entryMotion";
import { observeEditionPreparation, type EditionPreparation } from "./routing/prepareEdition";
import { EditionRouteLoading } from "./routing/EditionRouteLoading";
import type { EditionId } from "./data/editions";
const EditionSite = lazy(preloadEdition);
const minimumDirectAdmissionMs = 700;
const directAdmissionExitMs = 260;

function DirectEditionRoute({
  edition,
  language,
}: {
  edition: EditionId;
  language: "en" | "ko" | "zh-TW";
}) {
  const [preparation, setPreparation] = useState<EditionPreparation | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [admissionPhase, setAdmissionPhase] = useState<"loading" | "exiting" | "hidden">("loading");
  const admissionStartedAt = useRef(0);

  useEffect(() => {
    let active = true;
    admissionStartedAt.current = performance.now();
    setPreparation(null);
    setError(null);
    setAdmissionPhase("loading");
    const observed = observeEditionPreparation(edition, (snapshot) => {
      if (active) setPreparation(snapshot);
    });
    observed.promise.catch((cause) => {
      if (active)
        setError(cause instanceof Error ? cause : new Error(String(cause)));
    });
    return () => {
      active = false;
      observed.stop();
    };
  }, [edition]);

  useEffect(() => {
    let exitTimer: number | undefined;
    let hideTimer: number | undefined;
    let readyReceived = false;
    const markPresented = () => {
      if (readyReceived) return;
      readyReceived = true;
      const elapsed = performance.now() - admissionStartedAt.current;
      exitTimer = window.setTimeout(() => {
        setAdmissionPhase("exiting");
        hideTimer = window.setTimeout(
          () => setAdmissionPhase("hidden"),
          directAdmissionExitMs,
        );
      }, Math.max(0, minimumDirectAdmissionMs - elapsed));
    };
    document.addEventListener("flagship:edition-ready", markPresented);
    return () => {
      document.removeEventListener("flagship:edition-ready", markPresented);
      if (exitTimer) window.clearTimeout(exitTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [edition]);

  if (error) throw error;
  const editionModuleReady = preparation?.status === "ready";

  return (
    <>
      {editionModuleReady && (
        <Suspense fallback={null}>
          <EditionSite />
        </Suspense>
      )}
      {admissionPhase !== "hidden" && (
        <EditionRouteLoading
          key="edition-direct-admission"
          edition={edition}
          language={language}
          progress={editionModuleReady ? 100 : preparation?.progress ?? 0}
          phase={admissionPhase}
        />
      )}
    </>
  );
}

function Site() {
  const { location } = useSiteNavigation();
  const transition = useContext(EditionTransitionContext);
  const retaining = transition?.retainingWorld ?? false;
  const transferring =
    retaining &&
    !transition?.returnPhase &&
    transition?.entryPhase !== "preparing";
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
          <div
            className="edition-route-plane"
            data-direct-entry={transferring ? undefined : "true"}
            data-transferring={transferring}
            data-return-phase={transition?.returnPhase}
          >
            <RouteBoundary key={location.page} language={location.language}>
              <DirectEditionRoute
                edition={location.page}
                language={location.language}
              />
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
