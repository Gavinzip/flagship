import { useFlagship } from "../FlagshipContext";
import { EditionEmblem } from "./EditionEmblem";

/** Use the supplied edition artwork. Never reconstruct, recolor or blend the logo. */
export function BrandMark({ className = "" }: { className?: string }) {
  const { edition } = useFlagship();
  return (
    <span className={`fs-brand ${className}`}>
      <EditionEmblem edition={edition.id} />
    </span>
  );
}
