import { createAction } from "@reduxjs/toolkit";

export const setViewedIngredient = createAction(
  "viewed-ingredient/setViewedIngredient",
  (item) => {
    return {
      payload: item,
    };
  }
);

export const removeViewedIngredient = createAction(
  "viewed-ingredient/removeViewedIngredient"
);
