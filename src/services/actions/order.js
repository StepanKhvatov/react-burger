import { createAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";

export const createOrderRequest = createAction("CREATE_ORDER_REQUEST");

export const createOrderError = createAction("CREATE_ORDER_ERROR");

export const createOrderSuccess = createAction("CREATE_ORDER_SUCCESS");

export const clearOrderState = createAction("CLEAR_ORDER_STATE");

export const createOrder = (itemsIds) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());

    return fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ingredients: itemsIds }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res?.success) {
          return dispatch(createOrderSuccess(res.order));
        }

        return res;
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error?.message || error);

        dispatch(createOrderError());
      });
  };
};
