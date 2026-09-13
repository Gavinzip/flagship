import { ArrowUp } from "iconoir-react";
import { SiteLink, useSiteNavigation } from "../routing/SiteNavigation";
import "./chapter-home-link.css";

/** One return control shared by every regional edition. */
export function ChapterHomeLink({ onClick }: { onClick?: () => void }) {
  const { location } = useSiteNavigation();
  const label = location.language === "zh-TW"
    ? "返回 Flagship 主站"
    : location.language === "ko" ? "Flagship 홈으로" : "Back to Flagship home";
  return (
    <SiteLink page="home" className="chapter-home-link" aria-label={label} onClick={onClick}>
      <ArrowUp aria-hidden="true" />
      <span>FLAGSHIP</span>
    </SiteLink>
  );
}
