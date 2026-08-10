import { setTrustedScriptSource } from "./trustedScripts";

const MEASUREMENT_ID_META_NAME = "ga-measurement-id";
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export type GoogleAnalyticsInstallResult =
  | { status: "installed" | "already-installed" }
  | { status: "not-configured" }
  | { status: "unavailable"; reason: string };

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

function describeInstallError(error: unknown) {
  return error instanceof Error
    ? `${error.name}: ${error.message}`
    : "Unknown Google Analytics installation error";
}

export function installGoogleAnalytics(): GoogleAnalyticsInstallResult {
  const measurementId = readMeasurementId();

  if (!measurementId) {
    return { status: "not-configured" };
  }

  if (
    document.querySelector(
      `script[data-ga-measurement-id="${measurementId}"]`,
    )
  ) {
    return { status: "already-installed" };
  }

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gaMeasurementId = measurementId;

  try {
    setTrustedScriptSource(
      script,
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
    );
  } catch (error) {
    return { status: "unavailable", reason: describeInstallError(error) };
  }

  window.dataLayer ??= [];
  window.gtag ??= function gtag() {
    window.dataLayer?.push(arguments);
  };

  try {
    document.head.append(script);
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  } catch (error) {
    script.remove();
    return { status: "unavailable", reason: describeInstallError(error) };
  }

  return { status: "installed" };
}
