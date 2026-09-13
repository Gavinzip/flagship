import { MetalBorder } from "./ui/MetalBorder";
import { useSiteNavigation } from "../routing/SiteNavigation";
import type { HomeCopy } from "./homeCopy";

/** Footer language access complements the first-screen language pill. */
export function BrandPreferences({
  copy,
}: {
  copy: HomeCopy;
}) {
  const { location, setLanguage } = useSiteNavigation();
  return (
    <div className="brand-preferences">
      <label className="brand-language ip-metal-control">
        <MetalBorder />
        <span>{copy.language}</span>
        <select
          value={location.language}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "en" || value === "ko" || value === "zh-TW")
              setLanguage(value);
          }}
        >
          <option value="en">EN</option>
          <option value="zh-TW">繁中</option>
          <option value="ko">한국어</option>
        </select>
      </label>
    </div>
  );
}
