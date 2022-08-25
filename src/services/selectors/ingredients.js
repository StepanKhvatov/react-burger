export const selectIngredients = (store) => store.ingredients.items;

export const selectIngredientsByType = (store) => {
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