import { useFlagship } from "../FlagshipContext";
import { OriginalEmblem } from "./OriginalEmblem";

/** Use the supplied edition artwork. Never reconstruct, recolor or blend the logo. */
export function BrandMark({ className = "" }: { className?: string }) {
  const { edition } = useFlagship();
  return (
    <span className={`fs-brand ${className}`}>
      {edition.id === "korea" ? (
        <OriginalEmblem src={edition.emblem} />
      ) : (
        <img
          src={edition.emblem}
          alt={`FLAGSHIP Card Show ${edition.country}`}
          width={900}
          height={493}
          draggable={false}
        />
      )}
    </span>
  );
}
