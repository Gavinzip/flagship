import {
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
} from "../../shared/queue/domain";
import type { Locale } from "../i18n/siteContent";

export const queueCopy = {
  "zh-TW": {
    publicTitle: "現場即時叫號",
    adminTitle: "叫號控制台",
    eyebrow: "FLAGSHIP 2026 · LIVE QUEUE",
    current: "目前叫號範圍",
    waiting: "尚未開始",
    loadingNumber: "讀取中",
    unavailableNumber: "暫時無法取得",
    numberSuffix: "號",
    guidance: [
      "請留意現場工作人員指示，",
      "輪到號碼時再前往服務台。",
    ],
    connected: "即時同步中",
    connecting: "正在連線",
    offline: "連線中斷，正在重新連線",
    lastUpdated: "最後更新",
    loadingState: "正在讀取目前叫號",
    unavailableState: "目前無法取得最新叫號",
    neverUpdated: "等待第一筆叫號",
    adminEyebrow: "QUEUE CONTROL DESK",
    adminDescription:
      "輸入這次叫號的起始與結束號碼；兩欄都填 0 會顯示尚未開始。更新後，所有公開頁會立即同步。",
    inputLabel: "叫號範圍",
    rangeStartLabel: "起始號碼",
    rangeEndLabel: "結束號碼",
    rangeConnector: "到",
    previewLabel: "公開頁將顯示",
    previewInvalid: "請先輸入有效的起始與結束號碼",
    previousRange: "整段往前",
    nextRange: "整段往後",
    save: "更新叫號",
    saving: "更新中…",
    saved: "已同步到公開頁",
    missingTokenTitle: "管理網址不完整",
    missingTokenDescription:
      "這個網址缺少管理 token，因此無法更改叫號。請使用完整的管理網址。",
    controlsUnavailable: "尚未取得最新叫號，控制功能暫時停用。",
    rangeUpgradePending: "叫號服務正在更新範圍功能，完成後會自動開放控制。",
    invalidRange: `請輸入 1 到 ${QUEUE_NUMBER_MAX} 之間的整數，且起始號碼不得大於結束號碼；兩欄都填 ${QUEUE_NUMBER_MIN} 可設為尚未開始。`,
    unauthorized: "這個管理網址已失效，請確認 token 或重新產生管理網址。",
    updateFailed: "更新失敗，請確認連線後再試一次。",
    backToDisplay: "開啟公開叫號頁",
  },
  en: {
    publicTitle: "Live Queue",
    adminTitle: "Queue Control",
    eyebrow: "FLAGSHIP 2026 · LIVE QUEUE",
    current: "Now serving",
    waiting: "Not started",
    loadingNumber: "Loading",
    unavailableNumber: "Temporarily unavailable",
    numberSuffix: "",
    guidance: [
      "Please follow staff instructions.",
      "Approach the service desk when your number is called.",
    ],
    connected: "Live sync active",
    connecting: "Connecting",
    offline: "Connection lost · reconnecting",
    lastUpdated: "Last updated",
    loadingState: "Loading the current queue",
    unavailableState: "The latest queue is currently unavailable",
    neverUpdated: "Waiting for the first call",
    adminEyebrow: "QUEUE CONTROL DESK",
    adminDescription:
      "Enter the first and last number in the active call range. Enter 0 in both fields to show not started. Every public display updates immediately.",
    inputLabel: "Call range",
    rangeStartLabel: "First number",
    rangeEndLabel: "Last number",
    rangeConnector: "to",
    previewLabel: "Public display",
    previewInvalid: "Enter a valid first and last number",
    previousRange: "Shift earlier",
    nextRange: "Shift later",
    save: "Update queue",
    saving: "Updating…",
    saved: "Public display updated",
    missingTokenTitle: "Incomplete admin URL",
    missingTokenDescription:
      "This URL has no admin token, so it cannot change the queue. Use the complete admin URL.",
    controlsUnavailable:
      "The latest queue has not loaded, so controls are temporarily disabled.",
    rangeUpgradePending:
      "The queue service is enabling range updates. Controls will unlock automatically.",
    invalidRange: `Enter whole numbers from 1 to ${QUEUE_NUMBER_MAX}, with the first number no greater than the last; enter ${QUEUE_NUMBER_MIN} in both fields to show not started.`,
    unauthorized:
      "This admin URL is no longer valid. Check the token or create a new admin URL.",
    updateFailed: "Update failed. Check the connection and try again.",
    backToDisplay: "Open public queue",
  },
} as const satisfies Record<Locale, object>;

export function formatQueueUpdatedAt(value: string | null, locale: Locale) {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale === "zh-TW" ? "zh-TW" : "en-US", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(value));
}
