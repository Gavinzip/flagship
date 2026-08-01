import { WarningTriangle } from "iconoir-react";
import { media } from "../config/media";
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

  return (
    <div
      className={`loading-screen${exiting ? " loading-screen--exiting" : ""}`}
      role={hasError ? "alert" : "status"}
      aria-live="polite"
      aria-label={hasError ? "網站載入失敗" : "網站載入中"}
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
            <strong>部分活動素材未能載入</strong>
            <p>請確認網路連線後重新載入，我們不會用低畫質圖片替代。</p>
            <button type="button" onClick={() => window.location.reload()}>
              重新載入
            </button>
          </div>
        ) : (
          <>
            <div
              className="loading-screen__meter"
              aria-label={`載入進度 ${readiness.progress}%`}
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
