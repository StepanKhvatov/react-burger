import { orderReducer, initialState } from "./order";
import {
  createOrderRequest,
  createOrderError,
  createOrderSuccess,
  clearOrderState,
} from "../actions/order";
import { mockOwnerOrder } from "../../utils/mock-data";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(
      orderReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle CREATE_ORDER_REQUEST", () => {
    expect(orderReducer(undefined, createOrderRequest)).toEqual({
      ...initialState,
      CREATE_ORDER_REQUEST: true,
    });
  });

  it("should handle CREATE_ORDER_ERROR", () => {
    expect(orderReducer(undefined, createOrderError)).toEqual({
      ...initialState,
      CREATE_ORDER_ERROR: true,
    });
  });

  it("should handle CREATE_ORDER_SUCCESS", () => {
    expect(orderReducer(undefined, createOrderSuccess(mockOwnerOrder))).toEqual(
      {
        ...initialState,
        item: mockOwnerOrder,
        CREATE_ORDER_SUCCESS: true,
      }
    );
  });

  it("should handle CLEAR_ORDER_STATE", () => {
    expect(
      orderReducer(
        {
          item: mockOwnerOrder,
          CREATE_ORDER_ERROR: true,
          CREATE_ORDER_REQUEST: true,
          CREATE_ORDER_SUCCESS: true,
        },
        clearOrderState
      )
    ).toEqual(initialState);
  });
});
