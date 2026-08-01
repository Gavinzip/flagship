import {
  type AnchorHTMLAttributes,
  type PointerEventHandler,
  useRef,
} from "react";

type InteractiveLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const MAX_MAGNET_OFFSET = 4;

export function InteractiveLink({
  children,
  className = "",
  onPointerLeave,
  onPointerMove,
  ...props
}: InteractiveLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const resetPosition: PointerEventHandler<HTMLAnchorElement> = (event) => {
    const link = linkRef.current;

    if (link) {
      link.style.setProperty("--action-shift-x", "0px");
      link.style.setProperty("--action-shift-y", "0px");
    }

    onPointerLeave?.(event);
  };

  const updatePosition: PointerEventHandler<HTMLAnchorElement> = (event) => {
    const link = linkRef.current;

    if (link && event.pointerType !== "touch") {
      const rect = link.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

      link.style.setProperty(
        "--action-shift-x",
        `${normalizedX * MAX_MAGNET_OFFSET * 2}px`,
      );
      link.style.setProperty(
        "--action-shift-y",
        `${normalizedY * MAX_MAGNET_OFFSET * 2}px`,
      );
    }

    onPointerMove?.(event);
  };

  return (
    <a
      {...props}
      ref={linkRef}
      className={`interactive-action ${className}`.trim()}
      onPointerLeave={resetPosition}
      onPointerMove={updatePosition}
    >
      {children}
    </a>
  );
}
