import { useId } from "react";
import { koreaEmblemContour } from "../data/koreaEmblemContour";

export function OriginalEmblem({
  src,
  label = "FLAGSHIP Card Show KOREA",
  className,
}: {
  src: string;
  label?: string;
  className?: string;
}) {
  const clipId = `korea-emblem-${useId().replaceAll(":", "")}`;
  return (
    <svg
      className={["fs-original-emblem", className].filter(Boolean).join(" ")}
      viewBox="220 90 1170 755"
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={koreaEmblemContour} />
        </clipPath>
      </defs>
      <image
        href={src}
        width="1672"
        height="941"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}
