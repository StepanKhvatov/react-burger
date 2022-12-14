import { createAction } from "@reduxjs/toolkit";
import { TOwnerOrder } from "../../types";
import { fetchApi } from "../../utils/api";
import { AppDispatch } from "../store";

export const createOrderRequest = createAction("CREATE_ORDER_REQUEST");

export const createOrderError = createAction("CREATE_ORDER_ERROR");

export const createOrderSuccess = createAction<TOwnerOrder>(
  "CREATE_ORDER_SUCCESS"
);

export const clearOrderState = createAction("CLEAR_ORDER_STATE");

export const createOrder = (itemsIds: Array<string>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(createOrderRequest());

    return fetchApi<{ name: string; order: TOwnerOrder }>({
      endpoint: "orders",
      method: "POST",
      body: { ingredients: itemsIds },
      withAuth: true,
      onSuccess: (res) => {
        dispatch(createOrderSuccess(res.order));

        return res;
      },
      onError: () => dispatch(createOrderError()),
    });
  };
};
