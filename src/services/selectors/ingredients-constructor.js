export const selectConstructorIngredients = (store) =>
  store.ingredientsConstructor;

export const selectIngredientQuantity = (store, ingredient) => {
  const { _id, type } = ingredient;

  const { unblockedItems, blockedItem } = selectConstructorIngredients(store);

  if (type === "bun") {
    return Number(Boolean(blockedItem && blockedItem._id === _id));
  }

  const neededIngredients = unblockedItems.filter((item) => item._id === _id);

  return neededIngredients.length;
};

export const selectIngredientsTotal = (store) => {
  const { unblockedItems, blockedItem } = selectConstructorIngredients(store);

  const initialValue = blockedItem ? blockedItem.price * 2 : 0;

  return unblockedItems.reduce((acc, item) => {
    return acc + item.price;
  }, initialValue);
};

export const selectOrderIngredientsIds = (store) => {
  const { unblockedItems, blockedItem } = selectConstructorIngredients(store);

  const ingredientsIds = unblockedItems.map((item) => item._id);

  if (blockedItem) {
    const blockedItemId = blockedItem._id;

    ingredientsIds.push(blockedItemId, blockedItemId);
  }

  return ingredientsIds;
};
