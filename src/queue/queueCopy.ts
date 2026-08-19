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
    current: "目前叫號",
    waiting: "尚未開始",
    loadingNumber: "讀取中",
    unavailableNumber: "暫時無法取得",
    numberSuffix: "號",
    guidance: "請留意現場工作人員指示，輪到號碼時再前往服務台。",
    connected: "即時同步中",
    connecting: "正在連線",
    offline: "連線中斷，正在重新連線",
    lastUpdated: "最後更新",
    loadingState: "正在讀取目前叫號",
    unavailableState: "目前無法取得最新叫號",
    neverUpdated: "等待第一筆叫號",
    adminEyebrow: "QUEUE CONTROL DESK",
    adminDescription:
      "輸入目前號碼，或用快速按鈕逐號調整。更新後，所有公開頁會立即同步。",
    inputLabel: "目前叫到幾號",
    previous: "上一號",
    next: "下一號",
    save: "更新叫號",
    saving: "更新中…",
    saved: "已同步到公開頁",
    missingTokenTitle: "管理網址不完整",
    missingTokenDescription:
      "這個網址缺少管理 token，因此無法更改叫號。請使用完整的管理網址。",
    controlsUnavailable: "尚未取得最新叫號，控制功能暫時停用。",
    invalidNumber: `請輸入 ${QUEUE_NUMBER_MIN} 到 ${QUEUE_NUMBER_MAX} 之間的整數。`,
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
    guidance:
      "Please follow staff instructions and approach the service desk when your number is called.",
    connected: "Live sync active",
    connecting: "Connecting",
    offline: "Connection lost · reconnecting",
    lastUpdated: "Last updated",
    loadingState: "Loading the current queue",
    unavailableState: "The latest queue is currently unavailable",
    neverUpdated: "Waiting for the first call",
    adminEyebrow: "QUEUE CONTROL DESK",
    adminDescription:
      "Enter the current number or use the quick controls. Every public display updates immediately.",
    inputLabel: "Current number",
    previous: "Previous",
    next: "Next",
    save: "Update queue",
    saving: "Updating…",
    saved: "Public display updated",
    missingTokenTitle: "Incomplete admin URL",
    missingTokenDescription:
      "This URL has no admin token, so it cannot change the queue. Use the complete admin URL.",
    controlsUnavailable:
      "The latest queue has not loaded, so controls are temporarily disabled.",
    invalidNumber: `Enter a whole number from ${QUEUE_NUMBER_MIN} to ${QUEUE_NUMBER_MAX}.`,
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
