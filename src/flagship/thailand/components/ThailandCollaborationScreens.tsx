import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { collaborationCopy } from "../data/collaborationCopy";
import campaign from "../../assets/thailand/merch-past-campaign-screen.webp";

export function ThailandCollaborationScreens({ language }: { language: SiteLanguage }) {
  const copy = collaborationCopy[language];
  return <figure className="th-collaboration-screens">
    <div className="th-collaboration-screen-frame"><a href={campaign} target="_blank" rel="noreferrer" aria-label={copy.zoom}><img src={campaign} alt={`${copy.label} · Renaiss Merch · Renaiss × Surf`} width="1280" height="720" loading="lazy" decoding="async" /><span className="th-collaboration-screen-zoom"><ArrowUpRight aria-hidden="true" /></span></a></div>
    <figcaption>{copy.caption}</figcaption>
  </figure>;
}
