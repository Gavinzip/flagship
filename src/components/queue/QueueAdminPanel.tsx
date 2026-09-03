import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  formatQueueRange,
  isQueueCall,
  isQueueHoldMinutes,
  isQueueRange,
  isQueueRangeActive,
  QUEUE_HOLD_MINUTES_DEFAULT,
  QUEUE_HOLD_MINUTES_MAX,
  QUEUE_HOLD_MINUTES_MIN,
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
  type QueueCall,
  type QueueRange,
  type QueueSnapshot,
} from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import { QueueApiError, updateQueueCall } from "../../queue/queueApi";
import { queueCopy } from "../../queue/queueCopy";

type QueueAdminPanelProps = {
  adminToken: string;
  locale: Locale;
  onSnapshot: (snapshot: QueueSnapshot) => void;
  timedUpdatesSupported: boolean;
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

function parseDraftHoldMinutes(draftHoldMinutes: string) {
  const normalized = draftHoldMinutes.trim();
  if (!/^\d+$/.test(normalized)) return null;
  const holdMinutes = Number(normalized);
  return isQueueHoldMinutes(holdMinutes) ? holdMinutes : null;
}

export function QueueAdminPanel({
  adminToken,
  locale,
  onSnapshot,
  timedUpdatesSupported,
  snapshot,
}: QueueAdminPanelProps) {
  const content = queueCopy[locale];
  const [draftStart, setDraftStart] = useState("");
  const [draftEnd, setDraftEnd] = useState("");
  const [draftHoldMinutes, setDraftHoldMinutes] = useState(
    String(QUEUE_HOLD_MINUTES_DEFAULT),
  );
  const [saveState, setSaveState] =
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!snapshot) return;
    setDraftStart(String(snapshot.rangeStart));
    setDraftEnd(String(snapshot.rangeEnd));
    setDraftHoldMinutes(String(snapshot.holdMinutes));
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

  const controlsReady = snapshot !== null && timedUpdatesSupported;

  const save = async (call: QueueCall) => {
    if (!controlsReady) {
      setSaveState("error");
      setError(
        snapshot ? content.timedUpgradePending : content.controlsUnavailable,
      );
      return;
    }
    if (!isQueueCall(call)) {
      setSaveState("error");
      setError(
        isQueueRange(call) ? content.invalidHoldMinutes : content.invalidRange,
      );
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const next = await updateQueueCall(call, adminToken);
      onSnapshot(next);
      setDraftStart(String(next.rangeStart));
      setDraftEnd(String(next.rangeEnd));
      setDraftHoldMinutes(String(next.holdMinutes));
      setSaveState("saved");
    } catch (saveError) {
      setSaveState("error");
      let message: string = content.updateFailed;
      if (saveError instanceof QueueApiError) {
        if (saveError.code === "QUEUE_ADMIN_UNAUTHORIZED") {
          message = content.unauthorized;
        } else if (saveError.code === "INVALID_QUEUE_HOLD_MINUTES") {
          message = content.invalidHoldMinutes;
        }
      }
      setError(message);
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
    const holdMinutes = parseDraftHoldMinutes(draftHoldMinutes);
    if (!holdMinutes) {
      setSaveState("error");
      setError(content.invalidHoldMinutes);
      return;
    }
    void save({ ...range, holdMinutes });
  };

  const step = (amount: number) => {
    if (!snapshot) return;
    const holdMinutes = parseDraftHoldMinutes(draftHoldMinutes);
    if (!holdMinutes) {
      setSaveState("error");
      setError(content.invalidHoldMinutes);
      return;
    }
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
      holdMinutes,
    };
    setDraftStart(String(next.rangeStart));
    setDraftEnd(String(next.rangeEnd));
    void save(next);
  };

  const controlsDisabled = !controlsReady || saveState === "saving";
  const previewRange = parseDraftRange(draftStart, draftEnd);
  const previewHoldMinutes = parseDraftHoldMinutes(draftHoldMinutes);
  const preview = previewRange
    ? isQueueRangeActive(previewRange)
      ? `${formatQueueRange(previewRange)}${content.numberSuffix}${
          previewHoldMinutes
            ? ` · ${content.holdWindow(previewHoldMinutes)}`
            : ""
        }`
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
        <label
          className="queue-admin-form__duration"
          htmlFor="queue-hold-minutes"
        >
          <span className="queue-admin-form__duration-copy">
            <strong>{content.holdDurationLabel}</strong>
            <small>{content.holdDurationHint}</small>
          </span>
          <span className="queue-admin-form__duration-input">
            <input
              id="queue-hold-minutes"
              disabled={!controlsReady}
              inputMode="numeric"
              min={QUEUE_HOLD_MINUTES_MIN}
              max={QUEUE_HOLD_MINUTES_MAX}
              step="1"
              type="number"
              value={draftHoldMinutes}
              onChange={(event) => {
                setDraftHoldMinutes(event.target.value);
                setSaveState("idle");
                setError("");
              }}
            />
            <span>{content.minutesSuffix}</span>
          </span>
        </label>
        <p className="queue-admin-form__preview" aria-live="polite">
          {preview ? `${content.previewLabel} ${preview}` : content.previewInvalid}
        </p>
        <div className="queue-admin-form__quick-controls">
          <button type="button" onClick={() => step(-10)} disabled={controlsDisabled}>
            <span aria-hidden="true">−</span> {content.previousRange}
          </button>
          <button type="button" onClick={() => step(10)} disabled={controlsDisabled}>
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
          {snapshot && !timedUpdatesSupported ? (
            <p>{content.timedUpgradePending}</p>
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
