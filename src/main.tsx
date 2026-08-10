import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { LumaCheckoutProvider } from "./components/LumaCheckoutProvider";
import { SiteBoot } from "./components/SiteBoot";
import { installStaticAssetCssVariables } from "./config/media";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { installGoogleAnalytics } from "./lib/googleAnalytics";
import "./styles/index.css";

installStaticAssetCssVariables();
installGoogleAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <LumaCheckoutProvider>
        <SiteBoot>
          <App />
        </SiteBoot>
      </LumaCheckoutProvider>
    </LocaleProvider>
  </StrictMode>,
);
