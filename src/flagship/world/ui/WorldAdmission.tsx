import { homeMedia } from "../../home/homeMedia";

type WorldAdmissionProps = {
  progress: number;
  stage: string;
  error: boolean;
  exiting: boolean;
  retry: () => void;
  language: "en" | "zh-TW" | "ko";
};

const copy = {
  en: { label: "PREPARING FLAGSHIP WORLD", retry: "Retry" },
  "zh-TW": { label: "正在準備 FLAGSHIP 世界", retry: "重新載入" },
  ko: { label: "FLAGSHIP 세계를 준비하는 중", retry: "다시 시도" },
} as const;

/** The opening holds on the real galaxy until its actual renderer can present. */
export function WorldAdmission({
  progress,
  stage,
  error,
  exiting,
  retry,
  language,
}: WorldAdmissionProps) {
  const text = copy[language];
  return (
    <div
      className={`world-admission${exiting ? " world-admission--exiting" : ""}`}
      role={error ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="world-admission__content">
        <img
          className="world-admission__logo"
          src={homeMedia.masterLogo}
          width="1670"
          height="941"
          alt="FLAGSHIP Card Show"
        />
        <div className="world-admission__copy">
          <span>{error ? "FLAGSHIP WORLD" : text.label}</span>
          {error ? (
            <button type="button" onClick={retry}>{text.retry}</button>
          ) : (
            <>
              <strong>{String(progress).padStart(2, "0")}%</strong>
              <small>{stage}</small>
              <div className="world-admission__rail" aria-hidden="true">
                <i style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
