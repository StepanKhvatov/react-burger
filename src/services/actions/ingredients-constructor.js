import { createAction } from "@reduxjs/toolkit";

export const insertIngredient = createAction(
  "ingredients-constructor/insertIngredient",
  (item) => {
    return {
      payload: item,
    };
  }
);

export const removeIngredient = createAction(
  "ingredients-constructor/removeIngredient",
  (item, itemIndex) => {
    return {
      payload: { ingredient: item, itemIndex },
    };
  }
);
