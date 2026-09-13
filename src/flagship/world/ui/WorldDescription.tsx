/** Keep each sentence together in the desktop column without changing the copy. */
export function WorldDescription({ text }: { text: string }) {
  const sentences = text.split(/(?<=[。.!?])\s*/u).filter(Boolean);
  return <p className="world-description">{sentences.map((sentence, index) =>
    <span key={index}>{sentence}{index < sentences.length - 1 ? " " : ""}</span>
  )}</p>;
}
