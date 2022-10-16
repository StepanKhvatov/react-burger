import { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import type { TIngredient } from "../../types";
import ingredientsRowStyles from "./ingredients-row.module.css";

type TIngredientsRowProps = {
  items: ReadonlyArray<TIngredient | undefined>;
};

const IngredientsRow: FC<TIngredientsRowProps> = ({ items }) => {
  return (
    <ul className={`${ingredientsRowStyles.container} flex`}>
      {items.map((item) => {
        if (item) {
          const { image, name } = item;

          return (
            <li
              key={nanoid()}
              className={ingredientsRowStyles["ingredient-container"]}
            >
              <img
                src={image}
                alt={`${name}-ingredient`}
                className={ingredientsRowStyles["ingredient-image"]}
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
