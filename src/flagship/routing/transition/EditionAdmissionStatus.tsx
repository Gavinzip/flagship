import type { EditionId } from "../../data/editions";
import type { SiteLanguage } from "../../data/copy";
import { editions } from "../../data/editions";
import { EditionEmblem } from "../../components/EditionEmblem";

const copy = {
  en: { preparing: "PREPARING", back: "Back" },
  "zh-TW": { preparing: "正在準備", back: "返回" },
  ko: { preparing: "준비 중", back: "뒤로" },
} as const;

/** Shared admission status for both a direct edition visit and a world transfer. */
export function EditionAdmissionStatus({
  edition,
  progress,
  language,
  cancel,
}: {
  edition: EditionId;
  progress: number;
  language: SiteLanguage;
  cancel?: () => void;
}) {
  const text = copy[language];
  return (
    <div className="edition-admission" role="status" aria-live="polite">
      <EditionEmblem edition={edition} className="edition-admission__logo" />
      <p>
        <span>{text.preparing}</span>
        <strong>{edition.toUpperCase()}</strong>
      </p>
      <div className="edition-admission__meter" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className={`edition-admission__footer${cancel ? "" : " edition-admission__footer--solo"}`}>
        <span>{String(progress).padStart(2, "0")}%</span>
        {cancel && <button type="button" onClick={cancel}>{text.back}</button>}
      </div>
    </div>
  );
}
