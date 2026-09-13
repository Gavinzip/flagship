import { ArrowUpRight } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { officialLinks } from "../data/editions";
import { TaiwanArchive } from "./TaiwanArchive";
import { BlurText, Reveal } from "../motion/Reveal";
import { PosterScene } from "./PosterScene";

export function ShowInformation() {
  const { content: c, edition } = useFlagship();
  const korea = edition.id === "korea";
  return (
    <section
      id="show-info"
      className="fs-info-scene fs-section"
      aria-labelledby="fs-info-title"
    >
      <PosterScene scene="city" />
      <div className="fs-show-info fs-wrap fs-scene-content">
        <Reveal className="fs-info-intro">
          <p className="fs-eyebrow">03 / {c.infoEyebrow}</p>
          <h2 id="fs-info-title">
            <BlurText text={korea ? c.infoTitle : c.archiveTitle} />
          </h2>
          <p>{korea ? c.koreaInfo : c.taiwanInfo}</p>
          <span className="fs-status">
            <i className="fs-live-dot" />
            {edition.country} / {korea ? c.announced : c.ended}
          </span>
        </Reveal>
        {korea ? (
          <Reveal className="fs-next-card" delay={0.1}>
            <div className="fs-next-details">
              <dl>
                {[
                  [c.date, c.tba],
                  [c.venue, c.cityTba],
                  [c.tickets, c.ticketTba],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="fs-button"
                href={officialLinks.updates}
                target="_blank"
                rel="noreferrer"
              >
                {c.updates}
                <ArrowUpRight />
              </a>
              <p className="fs-small-note">{c.noRegistration}</p>
            </div>
          </Reveal>
        ) : (
          <TaiwanArchive />
        )}
      </div>
    </section>
  );
}
