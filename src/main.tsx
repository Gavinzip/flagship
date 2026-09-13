import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { QueuePage } from "./components/QueuePage";
import { installStaticAssetCssVariables } from "./config/media";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { installGoogleAnalytics } from "./lib/googleAnalytics";
import {
  getQueuePageMode,
  shouldInstallQueueAnalytics,
} from "./queue/queueRoute";
import "./styles/index.css";

installStaticAssetCssVariables();

const queuePageMode = getQueuePageMode(window.location.pathname);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {queuePageMode ? (
      <LocaleProvider>
        <QueuePage mode={queuePageMode} />
      </LocaleProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);

if (shouldInstallQueueAnalytics(queuePageMode)) {
  window.setTimeout(() => {
    const analyticsResult = installGoogleAnalytics();

    if (analyticsResult.status === "unavailable") {
      console.warn(
        "Google Analytics is unavailable in this browser:",
        analyticsResult.reason,
      );
    }
  }, 0);
}
