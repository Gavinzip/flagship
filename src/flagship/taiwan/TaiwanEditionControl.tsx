import { NavArrowDown } from "iconoir-react";
import { useFlagship } from "../FlagshipContext";
import { editionList, isEditionId } from "../data/editions";

export function TaiwanEditionControl() {
  const { edition, content, selectEdition } = useFlagship();
  return (
    <div className="taiwan-chapter-navigation">
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
