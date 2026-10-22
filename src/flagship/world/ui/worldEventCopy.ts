import type { SiteLanguage } from "../../data/copy";
import { thailandEvent } from "../../thailand/data/event";

const labels = {
  "zh-TW": { information: "泰國活動資訊", daily: "每日 · 曼谷時間", venue: "詩麗吉王后國家會議中心 · 曼谷", cta: "查看泰國活動" },
  en: { information: "Thailand event information", daily: "Daily · Bangkok time", venue: "Queen Sirikit National Convention Center · Bangkok", cta: "View Thailand event" },
  ko: { information: "태국 행사 정보", daily: "매일 · 방콕 시간", venue: "퀸 시리킷 국립 컨벤션 센터 · 방콕", cta: "태국 행사 보기" },
  th: { information: "ข้อมูลงานประเทศไทย", daily: "ทุกวัน · เวลากรุงเทพฯ", venue: "ศูนย์การประชุมแห่งชาติสิริกิติ์ · กรุงเทพฯ", cta: "ดูงานประเทศไทย" },
} satisfies Record<SiteLanguage, { information: string; daily: string; venue: string; cta: string }>;

/** Calendar weekdays, not public-holiday claims. Event dates remain organizer data. */
export function worldEventCopy(language: SiteLanguage) {
  const start = new Date(`${thailandEvent.startDate}T12:00:00+07:00`);
  const end = new Date(`${thailandEvent.endDate}T12:00:00+07:00`);
  const numeric = language === "zh-TW" || language === "ko";
  const weekday = new Intl.DateTimeFormat(language, { weekday: "short", timeZone: "Asia/Bangkok" });
  const month = new Intl.DateTimeFormat(language === "th" ? "th" : "en", {
    month: "short", timeZone: "Asia/Bangkok", calendar: "gregory", numberingSystem: "latn",
  }).format(start).toUpperCase();
  return {
    ...labels[language],
    dateStart: numeric ? thailandEvent.startDate.replaceAll("-", ".") : String(start.getUTCDate()),
    dateEnd: numeric ? String(end.getUTCDate()) : `${end.getUTCDate()} ${month} ${end.getUTCFullYear()}`,
    weekdays: `${weekday.format(start)}–${weekday.format(end)}`,
  };
}
