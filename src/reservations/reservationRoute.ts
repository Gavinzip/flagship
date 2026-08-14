export const RESERVATION_ENTRY_PATH = "/early-bird-entry-2026";

export function isReservationEntryPath(pathname: string) {
  return pathname.replace(/\/+$/, "") === RESERVATION_ENTRY_PATH;
}
