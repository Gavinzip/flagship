import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEventHandler,
  useRef,
} from "react";

type SpotlightStyles = CSSProperties & {
  "--spotlight-color": string;
  "--spotlight-size": string;
};

type SpotlightCardProps = ComponentPropsWithoutRef<"article"> & {
  spotlightColor?: string;
  spotlightSize?: number;
};

export function SpotlightCard({
  children,
  className = "",
  onPointerMove,
  spotlightColor = "rgba(104, 180, 255, 0.24)",
  spotlightSize = 320,
  style,
  ...articleProps
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    const card = cardRef.current;

    if (card && event.pointerType !== "touch") {
      const rect = card.getBoundingClientRect();
      const localX = ((event.clientX - rect.left) / rect.width) * card.clientWidth;
      const localY =
        ((event.clientY - rect.top) / rect.height) * card.clientHeight;

      card.style.setProperty("--spotlight-x", `${localX}px`);
      card.style.setProperty("--spotlight-y", `${localY}px`);
    }

    onPointerMove?.(event);
  };

  const spotlightStyles: SpotlightStyles = {
    ...style,
    "--spotlight-color": spotlightColor,
    "--spotlight-size": `${spotlightSize}px`,
  };

  return (
    <article
      {...articleProps}
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      style={spotlightStyles}
    >
      {children}
    </article>
  );
}
