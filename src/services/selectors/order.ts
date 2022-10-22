import { TOrder } from "../../types";
import { RootState } from "../store";
import { selectIngredientsByIds } from "./ingredients";

export const selectOrder = (store: RootState) => store.order.item;

export const selectOrderById = (
  store: RootState,
  id: string,
  isUserOrders: boolean
) => {
  const messages = isUserOrders
    ? store.userOrders.messages
    : store.feedOrders.messages;

  if (messages.length) {
    const orders = messages[0].orders;

    return orders.find((item) => item._id === id);
  }
};

export const selectOrderTotal = (store: RootState, order: TOrder | null) => {
  if (!order) {
    return 0;
  }

  const { ingredients } = order;

  const storeIngredients = selectIngredientsByIds(store, ingredients);

  return storeIngredients.reduce((acc, item) => {
    if (item?.price) {
      return acc + item.price;
    }

    return acc;
  }, 0);
};
