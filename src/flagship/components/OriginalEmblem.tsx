export function OriginalEmblem({
  src,
  label = "FLAGSHIP Card Show KOREA",
}: {
  src: string;
  label?: string;
}) {
  return (
    <svg
      className="fs-original-emblem"
      viewBox="220 90 1170 755"
      role="img"
      aria-label={label}
    >
      <image
        href={src}
        width="1672"
        height="941"
      />
    </svg>
  );
}
