import { createAction } from "@reduxjs/toolkit";
import type { TOrder } from "../../types";

export const setViewedOrder = createAction(
  "SET_VIEWED_ORDER",
  (item: TOrder) => {
    return {
      payload: item,
    };
  }
);

export const removeViewedOrder = createAction("REMOVE_VIEWED_ORDER");

export const setViewedOrderComponent = createAction(
  "SET_VIEWED_ORDER_COMPONENT",
  (item: "modal" | "page") => {
    return {
      payload: item,
    };
  }
);
