import { RootState } from "../store";
import type { TIngredient, TIngredientType } from "../../types";

export const selectIngredients = (store: RootState): Array<TIngredient> =>
  store.ingredients.items;

export const selectIngredientsByType = (
  store: RootState
): { [key in TIngredientType]: Array<TIngredient> } => {
  const ingredients = selectIngredients(store);

  return ingredients.reduce(
    (acc, item) => {
      const type = item.type;

      return {
        ...acc,
        [type]: [...acc[type], item],
      };
    },
    { bun: [], main: [], sauce: [] }
  );
};

export const selectIngredientById = (
  store: RootState,
  id: string
): TIngredient | undefined => {
  const ingredients = selectIngredients(store);

  return ingredients.find((item) => item._id === id);
};

export const selectIngredientsByIds = (
  store: RootState,
  ids: ReadonlyArray<string>
): Array<TIngredient | undefined> => {
  return ids.map((item) => {
    return selectIngredientById(store, item);
  });
};
