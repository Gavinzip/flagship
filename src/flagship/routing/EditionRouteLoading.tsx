import type { SiteLanguage } from "../data/copy";
import type { EditionId } from "../data/editions";
import { EditionAdmissionStatus } from "./transition/EditionAdmissionStatus";

type EditionRouteLoadingProps = {
  edition: EditionId;
  language: SiteLanguage;
  progress: number;
  phase: "loading" | "exiting";
};

/** The one direct-entry surface while an edition module and its first frame load. */
export function EditionRouteLoading({
  edition,
  language,
  progress,
  phase,
}: EditionRouteLoadingProps) {
  return (
    <main
      className={`edition-direct-admission edition-direct-admission--${edition}${phase === "exiting" ? " is-exiting" : ""}`}
    >
      <EditionAdmissionStatus
        edition={edition}
        language={language}
        progress={progress}
      />
    </main>
  );
}
