import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { ReservationEntryPage } from "./components/ReservationEntryPage";
import { SiteBoot } from "./components/SiteBoot";
import { installStaticAssetCssVariables } from "./config/media";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { installGoogleAnalytics } from "./lib/googleAnalytics";
import { ReservationAvailabilityProvider } from "./reservations/ReservationAvailabilityProvider";
import { isReservationEntryPath } from "./reservations/reservationRoute";
import "./styles/index.css";

installStaticAssetCssVariables();

const reservationEntry = isReservationEntryPath(window.location.pathname);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      {reservationEntry ? (
        <ReservationAvailabilityProvider>
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

window.setTimeout(() => {
  const analyticsResult = installGoogleAnalytics();

  if (analyticsResult.status === "unavailable") {
    console.warn(
      "Google Analytics is unavailable in this browser:",
      analyticsResult.reason,
    );
  }
}, 0);
