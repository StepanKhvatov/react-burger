import { FC, useMemo } from "react";
import IngredientBadge from "../ingredient-badge/ingredient-badge";
import type { TIngredient } from "../../types";
import ingredientsRowStyles from "./ingredients-row.module.css";

type TIngredientsRowProps = {
  items: ReadonlyArray<TIngredient | undefined>;
};

const IngredientsRow: FC<TIngredientsRowProps> = ({ items }) => {
  const itemsToShow = useMemo(() => {
    return items.slice(0, 6);
  }, [items]);

  return (
    <ul className={`${ingredientsRowStyles.container} flex`}>
      {itemsToShow.map((item, index) => {
        if (item) {
          return (
            <li
              style={{ zIndex: 100 - index * 2 }}
              key={`${item._id}-${index}`}
              className={ingredientsRowStyles["ingredient-container"]}
            >
              <IngredientBadge
                item={item}
                counter={index === 5 ? items.length - 6 : undefined}
              />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};

export default IngredientsRow;
