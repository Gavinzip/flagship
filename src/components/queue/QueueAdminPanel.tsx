import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  formatQueueRange,
  isQueueRange,
  isQueueRangeActive,
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
  type QueueRange,
  type QueueSnapshot,
} from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import { QueueApiError, updateQueueRange } from "../../queue/queueApi";
import { queueCopy } from "../../queue/queueCopy";

type QueueAdminPanelProps = {
  adminToken: string;
  locale: Locale;
  onSnapshot: (snapshot: QueueSnapshot) => void;
  rangeUpdatesSupported: boolean;
  snapshot: QueueSnapshot | null;
};

function parseDraftRange(draftStart: string, draftEnd: string) {
  const normalizedStart = draftStart.trim();
  const normalizedEnd = draftEnd.trim();
  if (!/^\d+$/.test(normalizedStart) || !/^\d+$/.test(normalizedEnd)) {
    return null;
  }
  const range = {
    rangeStart: Number(normalizedStart),
    rangeEnd: Number(normalizedEnd),
  };
  return isQueueRange(range) ? range : null;
}

export function QueueAdminPanel({
  adminToken,
  locale,
  onSnapshot,
  rangeUpdatesSupported,
  snapshot,
}: QueueAdminPanelProps) {
  const content = queueCopy[locale];
  const [draftStart, setDraftStart] = useState("");
  const [draftEnd, setDraftEnd] = useState("");
  const [saveState, setSaveState] =
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!snapshot) return;
    setDraftStart(String(snapshot.rangeStart));
    setDraftEnd(String(snapshot.rangeEnd));
  }, [snapshot]);

  if (!adminToken) {
    return (
      <aside
        className="queue-admin-panel queue-admin-panel--locked entry-item"
        style={{ "--entry-index": 4 } as CSSProperties}
      >
        <p className="queue-admin-panel__eyebrow">ADMIN URL REQUIRED</p>
        <h2>{content.missingTokenTitle}</h2>
        <p>{content.missingTokenDescription}</p>
      </aside>
    );
  }

  const controlsReady = snapshot !== null && rangeUpdatesSupported;

  const save = async (range: QueueRange) => {
    if (!controlsReady) {
      setSaveState("error");
      setError(
        snapshot ? content.rangeUpgradePending : content.controlsUnavailable,
      );
      return;
    }
    if (!isQueueRange(range)) {
      setSaveState("error");
      setError(content.invalidRange);
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const next = await updateQueueRange(range, adminToken);
      onSnapshot(next);
      setDraftStart(String(next.rangeStart));
      setDraftEnd(String(next.rangeEnd));
      setSaveState("saved");
    } catch (saveError) {
      setSaveState("error");
      setError(
        saveError instanceof QueueApiError &&
          saveError.code === "QUEUE_ADMIN_UNAUTHORIZED"
          ? content.unauthorized
          : content.updateFailed,
      );
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const range = parseDraftRange(draftStart, draftEnd);
    if (!range) {
      setSaveState("error");
      setError(content.invalidRange);
      return;
    }
    void save(range);
  };

  const step = (amount: number) => {
    if (!snapshot) return;
    const minimum = isQueueRangeActive(snapshot) ? 1 : QUEUE_NUMBER_MIN;
    const rangeStart = snapshot.rangeStart + amount;
    const rangeEnd = snapshot.rangeEnd + amount;
    if (
      rangeStart < minimum ||
      rangeStart > QUEUE_NUMBER_MAX ||
      rangeEnd < minimum ||
      rangeEnd > QUEUE_NUMBER_MAX
    ) {
      return;
    }
    const next = {
      rangeStart,
      rangeEnd,
    };
    setDraftStart(String(next.rangeStart));
    setDraftEnd(String(next.rangeEnd));
    void save(next);
  };

  const controlsDisabled = !controlsReady || saveState === "saving";
  const previewRange = parseDraftRange(draftStart, draftEnd);
  const preview = previewRange
    ? isQueueRangeActive(previewRange)
      ? `${formatQueueRange(previewRange)}${content.numberSuffix}`
      : content.waiting
    : null;

  return (
    <aside
      className="queue-admin-panel entry-item"
      data-save-state={saveState}
      style={{ "--entry-index": 4 } as CSSProperties}
    >
      <div className="queue-admin-panel__heading">
        <div>
          <p className="queue-admin-panel__eyebrow">{content.adminEyebrow}</p>
          <h2>{content.adminTitle}</h2>
        </div>
        <span className="queue-admin-panel__secure">ADMIN URL</span>
      </div>
      <p className="queue-admin-panel__description">{content.adminDescription}</p>

      <form className="queue-admin-form" onSubmit={submit}>
        <fieldset className="queue-admin-form__range">
          <legend>{content.inputLabel}</legend>
          <div className="queue-admin-form__range-fields">
            <label className="queue-admin-form__range-field" htmlFor="queue-range-start">
              <span>{content.rangeStartLabel}</span>
              <span className="queue-admin-form__input-row">
                <input
                  id="queue-range-start"
                  disabled={!controlsReady}
                  inputMode="numeric"
                  min={QUEUE_NUMBER_MIN}
                  max={QUEUE_NUMBER_MAX}
                  step="1"
                  type="number"
                  value={draftStart}
                  onChange={(event) => {
                    setDraftStart(event.target.value);
                    setSaveState("idle");
                    setError("");
                  }}
                />
                <span aria-hidden="true">{content.numberSuffix}</span>
              </span>
            </label>
            <span className="queue-admin-form__range-connector" aria-hidden="true">
              {content.rangeConnector}
            </span>
            <label className="queue-admin-form__range-field" htmlFor="queue-range-end">
              <span>{content.rangeEndLabel}</span>
              <span className="queue-admin-form__input-row">
                <input
                  id="queue-range-end"
                  disabled={!controlsReady}
                  inputMode="numeric"
                  min={QUEUE_NUMBER_MIN}
                  max={QUEUE_NUMBER_MAX}
                  step="1"
                  type="number"
                  value={draftEnd}
                  onChange={(event) => {
                    setDraftEnd(event.target.value);
                    setSaveState("idle");
                    setError("");
                  }}
                />
                <span aria-hidden="true">{content.numberSuffix}</span>
              </span>
            </label>
          </div>
        </fieldset>
        <p className="queue-admin-form__preview" aria-live="polite">
          {preview ? `${content.previewLabel} ${preview}` : content.previewInvalid}
        </p>
        <div className="queue-admin-form__quick-controls">
          <button type="button" onClick={() => step(-1)} disabled={controlsDisabled}>
            <span aria-hidden="true">−</span> {content.previousRange}
          </button>
          <button type="button" onClick={() => step(1)} disabled={controlsDisabled}>
            {content.nextRange} <span aria-hidden="true">＋</span>
          </button>
        </div>
        <button
          className="queue-admin-form__submit"
          type="submit"
          disabled={controlsDisabled}
        >
          <span>{saveState === "saving" ? content.saving : content.save}</span>
        </button>
        <div className="queue-admin-form__feedback" aria-live="polite">
          {!snapshot ? <p>{content.controlsUnavailable}</p> : null}
          {snapshot && !rangeUpdatesSupported ? (
            <p>{content.rangeUpgradePending}</p>
          ) : null}
          {saveState === "saved" ? (
            <p className="is-success">{content.saved}</p>
          ) : null}
          {saveState === "error" ? <p className="is-error">{error}</p> : null}
        </div>
      </form>
    </aside>
  );
}
