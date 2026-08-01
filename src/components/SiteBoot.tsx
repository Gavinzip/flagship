import { useEffect, useState, type ReactNode } from "react";
import { useSiteReadiness } from "../hooks/useSiteReadiness";
import { LoadingScreen } from "./LoadingScreen";

type SiteBootProps = {
  children: ReactNode;
};

const EXIT_DURATION_MS = 620;

export function SiteBoot({ children }: SiteBootProps) {
  const readiness = useSiteReadiness();
  const [visible, setVisible] = useState(true);
  const exiting = readiness.status === "ready";

  useEffect(() => {
    document.documentElement.classList.toggle("site-is-loading", visible);

    return () => {
      document.documentElement.classList.remove("site-is-loading");
    };
  }, [visible]);

  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [exiting]);

  return (
    <>
      <div
        id="site-content"
        aria-hidden={visible ? true : undefined}
        inert={visible ? true : undefined}
      >
        {children}
      </div>
      {visible ? (
        <LoadingScreen exiting={exiting} readiness={readiness} />
      ) : null}
    </>
  );
}
