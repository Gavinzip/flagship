import { ArrowUpRight } from "iconoir-react";
import { editions } from "../data/editions";
import { Reveal } from "../motion/Reveal";
import { SiteLink } from "../routing/SiteNavigation";
import type { HomeCopy } from "./homeCopy";
import { TiltSurface } from "./ui/TiltSurface";
export function BrandChapters({ copy: c }: { copy: HomeCopy }) {
  const chapters = [
    {
      ...editions.korea,
      status: c.koreaStatus,
      description: c.koreaDescription,
      cta: c.koreaCta,
      name: "대한민국",
      number: "02",
    },
    {
      ...editions.taiwan,
      status: c.taiwanStatus,
      description: c.taiwanDescription,
      cta: c.taiwanCta,
      name: "台灣",
      number: "01",
    },
  ];
  return (
    <section
      id="editions"
      className="brand-section brand-editions"
      aria-labelledby="brand-editions-title"
    >
      <div className="brand-container">
        <Reveal className="brand-section-label">
          <span>02</span>
          <span>GLOBAL EDITIONS</span>
        </Reveal>
        <Reveal className="brand-section-intro">
          <h2 id="brand-editions-title">{c.editionsTitle}</h2>
          <p>{c.editionsIntro}</p>
        </Reveal>
        <div className="brand-chapter-grid">
          {chapters.map((chapter) => (
            <Reveal key={chapter.id}>
              <TiltSurface>
                <SiteLink
                  className={`brand-chapter brand-chapter-${chapter.id}`}
                  page={chapter.id}
                >
                  <div className="brand-chapter-meta">
                    <span>{chapter.status}</span>
                    <span>CH. {chapter.number}</span>
                  </div>
                  <div className="brand-chapter-art">
                    <img
                      className="brand-chapter-emblem"
                      src={chapter.emblem}
                      width={chapter.id === "korea" ? "3344" : "900"}
                      height={chapter.id === "korea" ? "1882" : "493"}
                      alt={`FLAGSHIP ${chapter.country}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="brand-chapter-title">
                    <h3>{chapter.country}</h3>
                    <span>{chapter.name}</span>
                  </div>
                  <p>{chapter.description}</p>
                  <div className="brand-chapter-link">
                    {chapter.cta}
                    <ArrowUpRight />
                  </div>
                </SiteLink>
              </TiltSurface>
            </Reveal>
          ))}
        </div>
        <p className="brand-next-cities">{c.moreCities}</p>
      </div>
    </section>
  );
}
