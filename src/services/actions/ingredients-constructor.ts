import { createAction } from "@reduxjs/toolkit";
import type { TIngredient, TIngredientWithKey } from "../../types";

export const insertIngredient = createAction(
  "INSERT_INGREDIENT",
  (item: TIngredient) => {
    return {
      payload: item,
    };
  }
);

export const removeIngredient = createAction(
  "REMOVE_INGREDIENT",
  (item: TIngredientWithKey, itemIndex: number) => {
    return {
      payload: { ingredient: item, itemIndex },
    };
  }
);

export const updateIngredientsSorting = createAction(
  "UPDATE_INGREDIENTS_SORTING",
  (
    draggedIngredient: {
      item: TIngredientWithKey;
      draggedItemIndex: number;
    },
    targetIngredientIndex: number
  ) => {
    return {
      payload: {
        draggedIngredient,
        targetIngredientIndex,
      },
    };
  }
);

export const removeAllIngredients = createAction("REMOVE_ALL_INGREDIENTS");
