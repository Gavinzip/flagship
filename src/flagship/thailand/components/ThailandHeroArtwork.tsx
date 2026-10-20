import { HeroArtwork } from "../../components/HeroArtwork";
import { thailandArtwork } from "../data/artwork";
import { thailandHeroGeometry } from "../data/heroGeometry";

/** Background and moving emblem share one image plane, including its mobile crop. */
export function ThailandHeroArtwork() {
  const { width, height, emblem } = thailandHeroGeometry;
  return <div className="th-hero-art" aria-hidden="true">
    <div className="th-hero-art-plane" style={{ aspectRatio: `${width} / ${height}` }}>
      <img className="th-hero-backdrop" src={thailandArtwork.hero} width={width} height={height} alt="" fetchPriority="high" />
      <div className="th-hero-logo" style={{
        left: `${emblem.left / width * 100}%`,
        top: `${emblem.top / height * 100}%`,
        width: `${emblem.width / width * 100}%`,
        height: `${emblem.height / height * 100}%`,
      }}>
        <HeroArtwork />
      </div>
    </div>
  </div>;
}
