import type { Locale } from "../i18n/siteContent";
import type { ReservationSlot, ReservationSlotStatus } from "./types";

export function formatReservationTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Taipei",
  }).format(new Date(value));
}

export function formatReservationDateTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Taipei",
  }).format(new Date(value));
}

export function reservationSlotLabel(slot: ReservationSlot, locale: Locale) {
  const title = locale === "zh-TW" ? slot.label.zh : slot.label.en;
  return `${title} · ${formatReservationTime(slot.startAt, locale)}–${formatReservationTime(slot.endAt, locale)}`;
}

export function reservationSlotStatusLabel(
  status: ReservationSlotStatus,
  copy: {
    slotAvailable: string;
    slotFull: string;
    slotClosed: string;
  },
) {
  if (status === "available") return copy.slotAvailable;
  if (status === "full") return copy.slotFull;
  return copy.slotClosed;
}
