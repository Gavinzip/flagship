import { ArrowUpRight, Check } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { editionList } from "../data/editions";
import { TiltedCard } from "../motion/TiltedCard";
import { BlurText, Reveal } from "../motion/Reveal";

export function EditionsSection() {
  const { content: c, edition, selectEdition } = useFlagship();
  return (
    <section
      className="fs-editions fs-section"
      id="editions"
      aria-labelledby="fs-editions-title"
    >
      <div className="fs-wrap">
        <Reveal className="fs-section-heading">
          <div>
            <p className="fs-eyebrow">02 / {c.editionsEyebrow}</p>
            <h2 id="fs-editions-title">
              <BlurText text={c.editionsTitle} />
            </h2>
          </div>
          <p>{c.editionsBody}</p>
        </Reveal>
        <div className="fs-edition-grid">
          {editionList.map((item) => (
            <Reveal key={item.id}>
              <TiltedCard>
                <button
                  className={`fs-edition-card fs-reading-plane fs-edition-${item.id}`}
                  onClick={() => {
                    if (item.id === edition.id) {
                      document.getElementById("show-info")?.scrollIntoView();
                    } else {
                      selectEdition(item.id);
                    }
                  }}
                  aria-label={`${c.switchEdition} ${item.country}`}
                  aria-pressed={edition.id === item.id}
                >
                  <span className="fs-slab-label">
                    <span>FLAGSHIP CARD SHOW</span>
                    <span>CHAPTER / {item.number}</span>
                  </span>
                  <div className="fs-edition-art">
                    <img
                      src={item.visual}
                      alt={`${item.country} FLAGSHIP visual`}
                      loading="lazy"
                      draggable={false}
                      width="800"
                      height="480"
                    />
                    {item.id === "taiwan" && (
                      <img
                        className="fs-edition-logo"
                        src={item.emblem}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        width="900"
                        height="493"
                      />
                    )}
                    <span className="fs-edition-badge">
                      <i className="fs-live-dot" />
                      {item.status === "announced" ? c.announced : c.archive}
                    </span>
                    <span className="fs-edition-number">{item.number}</span>
                  </div>
                  <div className="fs-edition-card-copy">
                    <div>
                      <p>
                        {item.localName} / {item.date ?? c.tba}
                      </p>
                      <h3>{item.country}</h3>
                      <span>
                        {item.id === "korea" ? c.koreaCard : c.taiwanCard}
                      </span>
                    </div>
                    <span className="fs-circle-arrow">
                      {edition.id === item.id ? <Check /> : <ArrowUpRight />}
                    </span>
                  </div>
                  <span className="fs-edition-bottom">
                    {edition.id === item.id ? c.selected : c.switchEdition}
                    <ArrowUpRight />
                  </span>
                </button>
              </TiltedCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="fs-editions-future">
          <span>MORE TO COME</span>
          <h3>{c.futureTitle}</h3>
          <p>{c.futureBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
