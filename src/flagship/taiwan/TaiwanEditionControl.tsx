import { NavArrowDown } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { editionList, isEditionId } from "../data/editions";
import { SiteLink } from "../routing/SiteNavigation";

export function TaiwanEditionControl() {
  const { edition, content, selectEdition, language } = useFlagship();
  return (
    <div className="taiwan-chapter-navigation">
      <SiteLink className="taiwan-brand-home" page="home">{language === "zh-TW" ? "主站" : "Home"}<span aria-hidden="true">↗</span></SiteLink>
      <div className="taiwan-edition-control">
      <select
        aria-label={content.editionLabel}
        value={edition.id}
        onChange={(event) => {
          if (isEditionId(event.target.value))
            selectEdition(event.target.value);
        }}
      >
        {editionList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.country}
          </option>
        ))}
      </select>
      <NavArrowDown aria-hidden="true" />
      </div>
    </div>
  );
}
