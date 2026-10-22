import type { EditionId } from "../../data/editions";
import type { SiteLanguage } from "../../data/copy";
import masterLogo from "../../assets/brand/flagship-master.webp";
import { thailandArtwork } from "../../thailand/data/artwork";

const admissionArtwork = {
  thailand: { src: thailandArtwork.emblem, width: 1536, height: 1024, alt: "FLAGSHIP Card Show Thailand" },
  taiwan: { src: masterLogo, width: 1670, height: 941, alt: "FLAGSHIP Card Show" },
} satisfies Record<EditionId, { src: string; width: number; height: number; alt: string }>;

const copy = {
  th: { preparing: "กำลังเตรียม", back: "กลับ" },
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
  const artwork = admissionArtwork[edition];
  return (
    <div className="edition-admission" role="status" aria-live="polite" aria-label={`${text.preparing} ${edition.toUpperCase()} ${progress}%`}>
      <img src={artwork.src} className="edition-admission__logo" width={artwork.width} height={artwork.height} alt={artwork.alt} />
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
