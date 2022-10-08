import { createAction } from "@reduxjs/toolkit";
import type { TIngredient } from "../../types";

export const setViewedIngredient = createAction(
  "SET_VIEWED_INGREDIENT",
  (item: TIngredient) => {
    return {
      payload: item,
    };
  }
);

export const removeViewedIngredient = createAction("REMOVE_VIEWED_INGREDIENT");

export const setViewedIngredientComponent = createAction(
  "SET_VIEWED_INGREDIENT_COMPONENT",
  (item: "modal" | "page") => {
    return {
      payload: item,
    };
  }
);
