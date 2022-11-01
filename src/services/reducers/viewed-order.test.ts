import { viewedOrderReducer, initialState } from "./viewed-order";
import {
  setViewedOrder,
  removeViewedOrder,
  setViewedOrderComponent,
} from "../actions/viewed-order";
import { mockOrder } from "../../utils/mock-data";

describe("viewed order reducer", () => {
  it("should return the initial state", () => {
    expect(
      viewedOrderReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle SET_VIEWED_ORDER", () => {
    expect(viewedOrderReducer(undefined, setViewedOrder(mockOrder))).toEqual({
      ...initialState,
      item: mockOrder,
    });
  });

  it("should handle REMOVE_VIEWED_ORDER", () => {
    expect(viewedOrderReducer(undefined, removeViewedOrder)).toEqual({
      ...initialState,
      item: null,
    });
  });

  it("should handle SET_VIEWED_ORDER_COMPONENT", () => {
    expect(
      viewedOrderReducer(undefined, setViewedOrderComponent("page"))
    ).toEqual({
      ...initialState,
      component: "page",
    });
  });
});
