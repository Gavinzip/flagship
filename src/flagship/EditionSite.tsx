import { useSiteNavigation } from "./routing/SiteNavigation";
import { useLayoutEffect } from "react";
import { FlagshipProvider } from "./FlagshipProvider";
import { useFlagship } from "./FlagshipContext";
import { TaiwanEventSite } from "./taiwan/TaiwanEventSite";
import { ThailandEventSite } from "./thailand/ThailandEventSite";

const notifyEditionReady = () =>
  document.dispatchEvent(new Event("flagship:edition-ready"));

function EditionContent() {
  const { edition } = useFlagship();
  useLayoutEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, [edition.id]);
  if (edition.id === "taiwan")
    return <TaiwanEventSite onReady={notifyEditionReady} />;
  if (edition.id === "thailand")
    return <ThailandEventSite onReady={notifyEditionReady} />;
  throw new Error(`Unsupported event edition: ${edition.id}`);
}

export default function EditionSite() {
  const { location } = useSiteNavigation();
  return (
    <div data-active-edition={location.page}>
      <FlagshipProvider>
        <EditionContent />
      </FlagshipProvider>
    </div>
  );
}
