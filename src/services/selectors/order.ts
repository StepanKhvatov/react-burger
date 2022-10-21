import { RootState } from "../store";

export const selectOrder = (store: RootState) => store.order.item;
