import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  isQueueNumber,
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
  type QueueSnapshot,
} from "../../../shared/queue/domain";
import type { Locale } from "../../i18n/siteContent";
import { QueueApiError, updateQueueNumber } from "../../queue/queueApi";
import { queueCopy } from "../../queue/queueCopy";

type QueueAdminPanelProps = {
  adminToken: string;
  locale: Locale;
  onSnapshot: (snapshot: QueueSnapshot) => void;
  snapshot: QueueSnapshot | null;
};

export function QueueAdminPanel({
  adminToken,
  locale,
  onSnapshot,
  snapshot,
}: QueueAdminPanelProps) {
  const content = queueCopy[locale];
  const [draft, setDraft] = useState("");
  const [saveState, setSaveState] =
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (snapshot) setDraft(String(snapshot.currentNumber));
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

  const controlsReady = snapshot !== null;

  const save = async (currentNumber: number) => {
    if (!controlsReady) {
      setSaveState("error");
      setError(content.controlsUnavailable);
      return;
    }
    if (!isQueueNumber(currentNumber)) {
      setSaveState("error");
      setError(content.invalidNumber);
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const next = await updateQueueNumber(currentNumber, adminToken);
      onSnapshot(next);
      setDraft(String(next.currentNumber));
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
    const normalized = draft.trim();
    if (!/^\d+$/.test(normalized)) {
      setSaveState("error");
      setError(content.invalidNumber);
      return;
    }
    void save(Number(normalized));
  };

  const step = (amount: number) => {
    if (!snapshot) return;
    const next = Math.min(
      QUEUE_NUMBER_MAX,
      Math.max(QUEUE_NUMBER_MIN, snapshot.currentNumber + amount),
    );
    setDraft(String(next));
    void save(next);
  };

  const controlsDisabled = !controlsReady || saveState === "saving";

  return (
    <aside
      className="queue-admin-panel entry-item"
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
        <label htmlFor="queue-current-number">{content.inputLabel}</label>
        <div className="queue-admin-form__input-row">
          <input
            id="queue-current-number"
            disabled={!controlsReady}
            inputMode="numeric"
            min={QUEUE_NUMBER_MIN}
            max={QUEUE_NUMBER_MAX}
            step="1"
            type="number"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaveState("idle");
              setError("");
            }}
          />
          <span aria-hidden="true">{content.numberSuffix}</span>
        </div>
        <div className="queue-admin-form__quick-controls">
          <button type="button" onClick={() => step(-1)} disabled={controlsDisabled}>
            <span aria-hidden="true">−</span> {content.previous}
          </button>
          <button type="button" onClick={() => step(1)} disabled={controlsDisabled}>
            {content.next} <span aria-hidden="true">＋</span>
          </button>
        </div>
        <button
          className="queue-admin-form__submit"
          type="submit"
          disabled={controlsDisabled}
        >
          {saveState === "saving" ? content.saving : content.save}
        </button>
        <div className="queue-admin-form__feedback" aria-live="polite">
          {!controlsReady ? <p>{content.controlsUnavailable}</p> : null}
          {saveState === "saved" ? (
            <p className="is-success">{content.saved}</p>
          ) : null}
          {saveState === "error" ? <p className="is-error">{error}</p> : null}
        </div>
      </form>
    </aside>
  );
}
