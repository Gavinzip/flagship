import { artwork } from "../data/artwork";

const scenes = {
  sky: artwork.sky,
  city: artwork.city,
  river: artwork.river,
};

/** Each section owns one distinct extension of the supplied poster. */
export function PosterScene({ scene }: { scene: keyof typeof scenes }) {
  return (
    <div className={`fs-poster-scene fs-poster-${scene}`} aria-hidden="true">
      <img
        src={scenes[scene]}
        alt=""
        width="1672"
        height="941"
        loading={scene === "sky" ? "eager" : "lazy"}
        fetchPriority={scene === "sky" ? "high" : "auto"}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
