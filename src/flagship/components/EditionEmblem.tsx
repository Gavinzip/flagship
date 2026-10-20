import { editions, type EditionId } from "../data/editions";

/** Published edition marks retain their original transparent artwork. */
export function EditionEmblem({ edition, className }: { edition: EditionId; className?: string }) {
  const data = editions[edition];
  return <img className={["fs-original-emblem", className].filter(Boolean).join(" ")} src={data.emblem} alt={`FLAGSHIP Card Show ${data.country}`} width={1536} height={1536 / data.emblemAspectRatio} draggable={false} />;
}
