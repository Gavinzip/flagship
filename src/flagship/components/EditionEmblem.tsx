import { editions, type EditionId } from "../data/editions";
import { OriginalEmblem } from "./OriginalEmblem";

/** Korea's supplied artwork needs its original contour; transparent marks render directly. */
export function EditionEmblem({ edition, className }: { edition: EditionId; className?: string }) {
  const data = editions[edition];
  if (edition === "korea") return <OriginalEmblem src={data.emblem} className={className} />;
  return <img className={["fs-original-emblem", className].filter(Boolean).join(" ")} src={data.emblem} alt={`FLAGSHIP Card Show ${data.country}`} width={1536} height={1536 / data.emblemAspectRatio} draggable={false} />;
}
