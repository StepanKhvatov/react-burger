import { createReducer } from "@reduxjs/toolkit";
import { TOrder } from "../../types";
import {
  setViewedOrder,
  removeViewedOrder,
  setViewedOrderComponent,
} from "../actions/viewed-order";

type TViewedOrderState = {
  item: TOrder | null;
  component: "page" | "modal";
};

export const initialState: TViewedOrderState = {
  item: null,
  component: "page",
};

export const viewedOrderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setViewedOrder, (state, action) => {
      state.item = action.payload;
    })
    .addCase(removeViewedOrder, (state) => {
      state.item = null;
    })
    .addCase(setViewedOrderComponent, (state, action) => {
      state.component = action.payload;
    })
    .addDefaultCase((state) => state);
});
