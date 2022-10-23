import { RootState } from "../store";

export const selectViewedIngredient = (store: RootState) =>
  store.viewedIngredient.item;

export const selectViewedIngredientComponent = (store: RootState) =>
  store.viewedIngredient.component;
