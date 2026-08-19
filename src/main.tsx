import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { ReservationEntryPage } from "./components/ReservationEntryPage";
import { QueuePage } from "./components/QueuePage";
import { SiteBoot } from "./components/SiteBoot";
import { installStaticAssetCssVariables } from "./config/media";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { installGoogleAnalytics } from "./lib/googleAnalytics";
import { ReservationAvailabilityProvider } from "./reservations/ReservationAvailabilityProvider";
import { isReservationEntryPath } from "./reservations/reservationRoute";
import {
  getQueuePageMode,
  shouldInstallQueueAnalytics,
} from "./queue/queueRoute";
import "./styles/index.css";

installStaticAssetCssVariables();

const reservationEntry = isReservationEntryPath(window.location.pathname);
const queuePageMode = getQueuePageMode(window.location.pathname);
const reservationDemo =
  reservationEntry &&
  new URLSearchParams(window.location.search).get("demo") === "1";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      {queuePageMode ? (
        <QueuePage mode={queuePageMode} />
      ) : reservationEntry ? (
        <ReservationAvailabilityProvider
          mode={reservationDemo ? "demo" : "live"}
        >
          <ReservationEntryPage />
        </ReservationAvailabilityProvider>
      ) : (
        <SiteBoot>
          <App />
        </SiteBoot>
      )}
    </LocaleProvider>
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
