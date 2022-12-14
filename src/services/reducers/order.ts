import { createReducer } from "@reduxjs/toolkit";
import { TOwnerOrder } from "../../types";
import {
  createOrderRequest,
  createOrderError,
  createOrderSuccess,
  clearOrderState,
} from "../actions/order";

type TOrderState = {
  item: TOwnerOrder | null;
  CREATE_ORDER_REQUEST: boolean;
  CREATE_ORDER_ERROR: boolean;
  CREATE_ORDER_SUCCESS: boolean;
};

export const initialState: TOrderState = {
  item: null,
  CREATE_ORDER_REQUEST: false,
  CREATE_ORDER_ERROR: false,
  CREATE_ORDER_SUCCESS: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOrderRequest, (state) => {
      state.CREATE_ORDER_REQUEST = true;
    })
    .addCase(createOrderError, () => {
      return { ...initialState, CREATE_ORDER_ERROR: true };
    })
    .addCase(createOrderSuccess, (state, action) => {
      state.CREATE_ORDER_REQUEST = false;
      state.CREATE_ORDER_ERROR = false;
      state.CREATE_ORDER_SUCCESS = true;
      state.item = action.payload;
    })
    .addCase(clearOrderState, () => initialState)
    .addDefaultCase((state) => state);
});
