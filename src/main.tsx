import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { SiteBoot } from "./components/SiteBoot";
import { installStaticAssetCssVariables } from "./config/media";
import { LocaleProvider } from "./i18n/LocaleProvider";
import "./styles/index.css";

installStaticAssetCssVariables();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <SiteBoot>
        <App />
      </SiteBoot>
    </LocaleProvider>
  </StrictMode>,
);
