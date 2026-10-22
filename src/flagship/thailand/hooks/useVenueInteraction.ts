import { useState, type FocusEvent, type PointerEvent } from "react";
import type { VenueEventId } from "../data/venueExplorerCopy";

/** Preview never changes the selected floor, so moving across the photo is safe. */
export function useVenueInteraction() {
  const [selected, setSelected] = useState<VenueEventId>("flagship");
  const [hovered, setHovered] = useState<VenueEventId | null>(null);
  const [focused, setFocused] = useState<VenueEventId | null>(null);
  const [activation, setActivation] = useState<{ id: VenueEventId; sequence: number } | null>(null);

  function select(id: VenueEventId) {
    setSelected(id);
    setActivation(previous => ({ id, sequence: (previous?.sequence ?? 0) + 1 }));
  }

  function pointerProps(id: VenueEventId) {
    return {
      onPointerEnter: (event: PointerEvent) => {
        if (event.pointerType !== "touch") {
          setFocused(null);
          setHovered(id);
        }
      },
      onPointerLeave: () => setHovered(previous => previous === id ? null : previous),
      onClick: () => select(id),
    };
  }

  function markerProps(id: VenueEventId) {
    return {
      ...pointerProps(id),
      onFocus: (event: FocusEvent<HTMLButtonElement>) => {
        if (event.currentTarget.matches(":focus-visible")) {
          setHovered(null);
          setFocused(id);
        }
      },
      onBlur: () => setFocused(null),
    };
  }

  return { selected, preview: hovered ?? focused, activation, pointerProps, markerProps };
}
