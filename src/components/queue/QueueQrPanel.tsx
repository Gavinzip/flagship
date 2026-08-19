import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Locale } from "../../i18n/siteContent";
import { generateQueueQrCodeDataUrl } from "../../queue/queueQrCode";
import { buildQueueJoinUrl } from "../../queue/queueRoute";
import { queueCopy } from "../../queue/queueCopy";

type QueueQrPanelProps = {
  joinToken: string;
  locale: Locale;
};

type QrState =
  | { status: "idle"; dataUrl: "" }
  | { status: "loading"; dataUrl: "" }
  | { status: "ready"; dataUrl: string }
  | { status: "error"; dataUrl: "" };

export function QueueQrPanel({ joinToken, locale }: QueueQrPanelProps) {
  const content = queueCopy[locale];
  const joinUrl = useMemo(
    () =>
      joinToken ? buildQueueJoinUrl(window.location.origin, joinToken) : "",
    [joinToken],
  );
  const [qrState, setQrState] = useState<QrState>({
    status: "idle",
    dataUrl: "",
  });

  useEffect(() => {
    if (!joinUrl) {
      setQrState({ status: "idle", dataUrl: "" });
      return;
    }

    let active = true;
    setQrState({ status: "loading", dataUrl: "" });

    void generateQueueQrCodeDataUrl(joinUrl)
      .then((dataUrl) => {
        if (active) setQrState({ status: "ready", dataUrl });
      })
      .catch(() => {
        if (active) setQrState({ status: "error", dataUrl: "" });
      });

    return () => {
      active = false;
    };
  }, [joinUrl]);

  if (!joinToken) {
    return (
      <aside
        className="queue-qr-panel queue-qr-panel--locked entry-item"
        style={{ "--entry-index": 1 } as CSSProperties}
      >
        <p className="queue-qr-panel__eyebrow">QR URL REQUIRED</p>
        <h1>{content.qrMissingTitle}</h1>
        <p className="queue-qr-panel__description">
          {content.qrMissingDescription}
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="queue-qr-panel entry-item"
      style={{ "--entry-index": 1 } as CSSProperties}
    >
      <div className="queue-qr-panel__heading">
        <p className="queue-qr-panel__eyebrow">{content.qrEyebrow}</p>
        <span>{qrState.status === "ready" ? content.qrReady : "VENUE ACCESS"}</span>
      </div>
      <h1>{content.qrHeading}</h1>
      <p className="queue-qr-panel__description">{content.qrDescription}</p>

      <div
        className="queue-qr-panel__code"
        aria-busy={qrState.status === "loading"}
        aria-live="polite"
      >
        {qrState.status === "loading" || qrState.status === "idle" ? (
          <p>{content.qrGenerating}</p>
        ) : null}
        {qrState.status === "ready" ? (
          <img
            alt={content.qrTitle}
            height="720"
            src={qrState.dataUrl}
            width="720"
          />
        ) : null}
        {qrState.status === "error" ? (
          <div className="queue-qr-panel__message">
            <h2>{content.qrFailedTitle}</h2>
            <p>{content.qrFailedDescription}</p>
          </div>
        ) : null}
      </div>

      <p className="queue-qr-panel__hint">{content.qrScanHint}</p>

      {qrState.status === "ready" ? (
        <div className="queue-qr-panel__actions">
          <a download="flagship-onsite-queue-qr.png" href={qrState.dataUrl}>
            {content.qrDownload}
          </a>
          <button type="button" onClick={() => window.print()}>
            {content.qrPrint}
          </button>
        </div>
      ) : null}
    </aside>
  );
}
