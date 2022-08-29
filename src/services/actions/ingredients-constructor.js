import { createAction } from "@reduxjs/toolkit";

export const insertIngredient = createAction("INSERT_INGREDIENT", (item) => {
  return {
    payload: item,
  };
});

export const removeIngredient = createAction(
  "REMOVE_INGREDIENT",
  (item, itemIndex) => {
    return {
      payload: { ingredient: item, itemIndex },
    };
  }
);

export const updateIngredientsSorting = createAction(
  "UPDATE_INGREDIENTS_SORTING",
  (draggedIngredient, targetIngredientIndex) => {
    return {
      payload: {
        draggedIngredient,
        targetIngredientIndex,
      },
    };
  }
);
