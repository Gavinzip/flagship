import {
  QUEUE_NUMBER_MAX,
  QUEUE_NUMBER_MIN,
} from "../../shared/queue/domain";
import type { Locale } from "../i18n/siteContent";

export const queueCopy = {
  "zh-TW": {
    publicTitle: "現場即時叫號",
    adminTitle: "叫號控制台",
    joinTitle: "現場掃碼取號",
    qrTitle: "現場取號 QR Code",
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
    joinEyebrow: "ON-SITE QUEUE PASS",
    joinHeading: "你的排隊號碼",
    joinDescription:
      "為進一步優化排隊安排，到場掃描 QR Code 後，系統會立即分配一個排隊號。取號後可先到附近等候，請保留此頁並留意目前叫號。",
    issuingTicket: "正在取得排隊號…",
    scanRequiredTitle: "請掃描現場 QR Code",
    scanRequiredDescription:
      "這個頁面沒有現場取號憑證，請使用會場提供的 QR Code 重新開啟。",
    storageErrorTitle: "無法保存排隊號",
    storageErrorDescription:
      "請關閉私密瀏覽模式或允許網站儲存資料，再重新掃描現場 QR Code。",
    storedTicketInvalidTitle: "已保存的排隊號資料異常",
    storedTicketInvalidDescription:
      "系統不會自動重發新號碼，請保留此頁並洽現場工作人員協助。",
    ticketLimitTitle: "目前已停止發號",
    ticketLimitDescription: "排隊號已達上限，請洽現場工作人員協助。",
    invalidJoinTitle: "這個 QR Code 已失效",
    invalidJoinDescription: "請掃描現場最新的 QR Code，或洽工作人員協助。",
    ticketErrorTitle: "暫時無法取得排隊號",
    ticketErrorDescription: "請保留這個頁面，確認網路連線後再試一次。",
    retryTicket: "重新嘗試",
    ticketIssued: "取號完成",
    ticketReminder: "請記住這個號碼，輪到時再前往服務台。",
    qrEyebrow: "ON-SITE QR DISPLAY",
    qrHeading: "掃描取得排隊號碼",
    qrDescription:
      "請參加者使用手機掃描下方 QR Code。開啟頁面後，系統會自動分配排隊號碼，不需要登入或填寫資料。",
    qrReady: "QR CODE READY",
    qrGenerating: "正在產生現場 QR Code…",
    qrFailedTitle: "無法產生 QR Code",
    qrFailedDescription: "請重新整理頁面；若仍無法顯示，請洽現場技術人員。",
    qrMissingTitle: "QR Code 網址不完整",
    qrMissingDescription:
      "這個網址缺少取號 token，請使用包含 QUEUE_JOIN_TOKEN 的完整 QR 展示網址。",
    qrScanHint: "掃描後會自動取號；同一瀏覽器重新整理不會重複發號。",
    qrDownload: "下載 QR Code",
    qrPrint: "列印 QR Code",
  },
  en: {
    publicTitle: "Live Queue",
    adminTitle: "Queue Control",
    joinTitle: "Get a Queue Number",
    qrTitle: "On-site Queue QR Code",
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
    joinEyebrow: "ON-SITE QUEUE PASS",
    joinHeading: "Your queue number",
    joinDescription:
      "To improve the on-site queue, scan the venue QR code to receive a number. You may wait nearby and keep this page open to follow the live call.",
    issuingTicket: "Getting your queue number…",
    scanRequiredTitle: "Scan the venue QR code",
    scanRequiredDescription:
      "This page has no on-site queue credential. Open it again using the QR code provided at the venue.",
    storageErrorTitle: "Unable to save your queue number",
    storageErrorDescription:
      "Turn off private browsing or allow site storage, then scan the venue QR code again.",
    storedTicketInvalidTitle: "Saved queue pass is invalid",
    storedTicketInvalidDescription:
      "A new number will not be issued automatically. Keep this page open and ask venue staff for help.",
    ticketLimitTitle: "Queue numbers are paused",
    ticketLimitDescription:
      "The queue number limit has been reached. Please ask venue staff for help.",
    invalidJoinTitle: "This QR code has expired",
    invalidJoinDescription:
      "Scan the latest venue QR code or ask a staff member for help.",
    ticketErrorTitle: "Unable to get a queue number",
    ticketErrorDescription:
      "Keep this page open, check your connection, and try again.",
    retryTicket: "Try again",
    ticketIssued: "Queue pass ready",
    ticketReminder: "Remember this number and approach the service desk when called.",
    qrEyebrow: "ON-SITE QR DISPLAY",
    qrHeading: "Scan to get a queue number",
    qrDescription:
      "Ask attendees to scan the QR code below. The page automatically issues a queue number without sign-in or a form.",
    qrReady: "QR CODE READY",
    qrGenerating: "Generating the venue QR code…",
    qrFailedTitle: "Unable to generate the QR code",
    qrFailedDescription:
      "Reload this page. If the code still does not appear, contact the on-site technical team.",
    qrMissingTitle: "Incomplete QR display URL",
    qrMissingDescription:
      "This URL has no join token. Use the complete QR display URL containing QUEUE_JOIN_TOKEN.",
    qrScanHint:
      "Scanning issues a number automatically. Reloading in the same browser will not issue another number.",
    qrDownload: "Download QR code",
    qrPrint: "Print QR code",
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
