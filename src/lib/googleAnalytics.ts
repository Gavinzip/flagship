import { setTrustedScriptSource } from "./trustedScripts";

const MEASUREMENT_ID_META_NAME = "ga-measurement-id";
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...command: unknown[]) => void;
  }
}

function readMeasurementId() {
  const measurementId = document
    .querySelector<HTMLMetaElement>(
      `meta[name="${MEASUREMENT_ID_META_NAME}"]`,
    )
    ?.content.trim();

  return measurementId && MEASUREMENT_ID_PATTERN.test(measurementId)
    ? measurementId
    : null;
}

export function installGoogleAnalytics() {
  const measurementId = readMeasurementId();

  if (!measurementId) {
    if (import.meta.env.PROD) {
      throw new Error("A valid Google Analytics measurement ID is required.");
    }
    return;
  }

  if (
    document.querySelector(
      `script[data-ga-measurement-id="${measurementId}"]`,
    )
  ) {
    return;
  }

  window.dataLayer ??= [];
  window.gtag ??= function gtag() {
    window.dataLayer?.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gaMeasurementId = measurementId;
  setTrustedScriptSource(
    script,
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
  );
  document.head.append(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}
