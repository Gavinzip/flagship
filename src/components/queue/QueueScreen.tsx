import type { CSSProperties, ReactNode } from "react";
import type { QueueSnapshot } from "../../../shared/queue/domain";
import { responsiveMedia } from "../../config/media";
import type { Locale } from "../../i18n/siteContent";
import type { QueueConnectionStatus } from "../../queue/useQueueRealtime";
import { LanguageSelector } from "../LanguageSelector";
import { QueueLiveDisplay } from "./QueueLiveDisplay";

type QueueScreenProps = {
  children?: ReactNode;
  connectionStatus: QueueConnectionStatus;
  footer?: ReactNode;
  headerLabel: string;
  locale: Locale;
  snapshot: QueueSnapshot | null;
  variant: "admin" | "join" | "public";
};

export function QueueScreen({
  children,
  connectionStatus,
  footer,
  headerLabel,
  locale,
  snapshot,
  variant,
}: QueueScreenProps) {
  return (
    <div className={`queue-page queue-page--${variant}`} id="top">
      <header
        className="queue-header entry-item"
        style={{ "--entry-index": 0 } as CSSProperties}
      >
        <a
          href="/"
          aria-label={locale === "zh-TW" ? "返回活動網站" : "Back to event site"}
        >
          <img
            {...responsiveMedia.flagshipLogo}
            width="900"
            height="493"
            alt="Flagship Card Show Taiwan"
          />
        </a>
        <div className="queue-header__tools">
          <span>{headerLabel}</span>
          <LanguageSelector />
        </div>
      </header>

      <main className="queue-main">
        <div className="queue-grid" aria-hidden="true" />
        <QueueLiveDisplay
          connectionStatus={connectionStatus}
          locale={locale}
          snapshot={snapshot}
        />
        {children}
      </main>
      {footer}
    </div>
  );
}
