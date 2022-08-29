import { createAction } from "@reduxjs/toolkit";

export const setViewedIngredient = createAction(
  "SET_VIEWED_INGREDIENT",
  (item) => {
    return {
      payload: item,
    };
  }
);

export const removeViewedIngredient = createAction("REMOVE_VIEWED_INGREDIENT");
