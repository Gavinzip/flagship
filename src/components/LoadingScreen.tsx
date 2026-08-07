import { WarningTriangle } from "iconoir-react";
import { media } from "../config/media";
import { useLocale } from "../i18n/LocaleProvider";
import type { SiteReadiness } from "../hooks/useSiteReadiness";

type LoadingScreenProps = {
  exiting: boolean;
  readiness: SiteReadiness;
};

export function LoadingScreen({
  exiting,
  readiness,
}: LoadingScreenProps) {
  const hasError = readiness.status === "error";
  const { content } = useLocale();

  return (
    <div
      className={`loading-screen${exiting ? " loading-screen--exiting" : ""}`}
      role={hasError ? "alert" : "status"}
      aria-live="polite"
      aria-label={hasError ? content.loading.errorLabel : content.loading.loadingLabel}
    >
      <div className="loading-screen__glow" aria-hidden="true" />
      <div className="loading-screen__content">
        <img
          className="loading-screen__logo"
          src={media.flagshipLogo}
          width="900"
          height="493"
          alt="Flagship Card Show Taiwan"
        />

        {hasError ? (
          <div className="loading-screen__error">
            <WarningTriangle aria-hidden="true" />
            <strong>{content.loading.errorTitle}</strong>
            <p>{content.loading.errorDescription}</p>
            <button type="button" onClick={() => window.location.reload()}>
              {content.loading.reload}
            </button>
          </div>
        ) : (
          <>
            <div
              className="loading-screen__meter"
              aria-label={content.loading.progressLabel(readiness.progress)}
            >
              <span style={{ width: `${readiness.progress}%` }} />
            </div>
            <div className="loading-screen__meta">
              <span>PREPARING THE SHOW</span>
              <strong>{String(readiness.progress).padStart(2, "0")}%</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
