import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../../data/copy";
import { collaborationCopy, surfCollaborationUrl } from "../data/collaborationCopy";
import { thailandEvent } from "../data/event";
import { ThailandCollaborationScreens } from "./ThailandCollaborationScreens";
import "../styles/collaboration.css";

export function ThailandCollaboration({ language }: { language: SiteLanguage }) {
  const copy = collaborationCopy[language];
  return <section id="community" className="th-collaboration th-section" aria-labelledby="th-collaboration-title">
    <div className="th-wrap">
      <header className="th-collaboration-heading">
        <span className="th-eyebrow" data-th-reveal="0">ONLINE COLLABORATIONS</span>
        <h2 id="th-collaboration-title" data-th-reveal="30">{copy.title}</h2>
        <p className="th-collaboration-intro" data-th-reveal="40">{copy.intro}</p>
      </header>
      <div className="th-collaboration-layout">
        <div className="th-collaboration-proof" data-th-reveal="70">
          <div className="th-collaboration-case-heading"><span className="th-collaboration-past">{copy.label}</span><h3 lang="en">Renaiss <i>×</i> Surf</h3></div>
          <ThailandCollaborationScreens language={language} />
          <a className="th-text-link" href={surfCollaborationUrl} target="_blank" rel="noreferrer">{copy.campaign}<ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="th-collaboration-copy" data-th-reveal="100">
          <h3 className="th-collaboration-format-title">{copy.formatTitle}</h3>
          <p className="th-collaboration-body">{copy.body}</p>
          <ol className="th-collaboration-steps">{copy.steps.map((step, i) => <li key={step}><span aria-hidden="true">0{i+1}</span>{step}</li>)}</ol>
          <p className="th-collaboration-invitation">{copy.invitation}</p>
          <a className="th-text-link th-collaboration-contact" href={thailandEvent.updatesUrl} target="_blank" rel="noreferrer">{copy.contact}<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}
