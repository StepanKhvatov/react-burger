import { createAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../utils/api";

export const createOrderRequest = createAction("CREATE_ORDER_REQUEST");

export const createOrderError = createAction("CREATE_ORDER_ERROR");

export const createOrderSuccess = createAction("CREATE_ORDER_SUCCESS");

export const clearOrderState = createAction("CLEAR_ORDER_STATE");

export const createOrder = (itemsIds) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());

    return fetchApi({
      endpoint: "orders",
      method: "POST",
      body: { ingredients: itemsIds },
      withAuth: true,
      onSuccess: (res) => dispatch(createOrderSuccess(res.order)),
      onError: () => dispatch(createOrderError()),
    });
  };
};
