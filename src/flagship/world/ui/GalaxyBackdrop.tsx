import { worldMaterials } from "../config/materials";

/** Poster-derived card culture behind the real Protocol Earth. */
export function GalaxyBackdrop() {
  return (
    <div className="world-galaxy" aria-hidden="true">
      <img
        data-active="true"
        src={worldMaterials.environment}
        alt=""
        width="1672"
        height="941"
        fetchPriority="high"
      />
      <div className="world-galaxy-legibility" />
    </div>
  );
}
