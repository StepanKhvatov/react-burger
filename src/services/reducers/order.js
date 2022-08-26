import { createReducer } from "@reduxjs/toolkit";
import {
  createOrderRequest,
  createOrderFailed,
  createOrderSuccess,
} from "../actions/order";

const initialState = {
  item: {},
  itemRequest: false,
  itemFailed: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOrderRequest, (state) => {
      state.itemRequest = true;
    })
    .addCase(createOrderFailed, (state) => {
      state.itemFailed = true;
      state.itemRequest = false;
    })
    .addCase(createOrderSuccess, (state, action) => {
      state.itemRequest = false;
      state.itemFailed = false;
      state.item = action.payload;
    })
    .addDefaultCase((state) => state);
});
