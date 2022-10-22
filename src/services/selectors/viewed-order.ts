import { RootState } from "../store";

export const selectViewedOrder = (store: RootState) => store.viewedOrder.item;

export const selectViewedOrderComponent = (store: RootState) =>
  store.viewedOrder.component;
