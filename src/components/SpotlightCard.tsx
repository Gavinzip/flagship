import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEventHandler,
  useRef,
} from "react";

type SpotlightStyles = CSSProperties & {
  "--spotlight-color": string;
  "--spotlight-opacity": string;
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
      card.style.setProperty("--spotlight-opacity", "0.78");
    }

    onPointerMove?.(event);
  };

  const spotlightStyles: SpotlightStyles = {
    ...style,
    "--spotlight-color": spotlightColor,
    "--spotlight-opacity": "0",
    "--spotlight-size": `${spotlightSize}px`,
  };

  return (
    <article
      {...articleProps}
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        cardRef.current?.style.removeProperty("--spotlight-x");
        cardRef.current?.style.removeProperty("--spotlight-y");
        cardRef.current?.style.setProperty("--spotlight-opacity", "0");
        articleProps.onPointerLeave?.(event);
      }}
      style={spotlightStyles}
    >
      {children}
    </article>
  );
}
