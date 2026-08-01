import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-900.css";
import { App } from "./App";
import { SiteBoot } from "./components/SiteBoot";
import { installStaticAssetCssVariables } from "./config/media";
import "./styles/index.css";

installStaticAssetCssVariables();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteBoot>
      <App />
    </SiteBoot>
  </StrictMode>,
);
