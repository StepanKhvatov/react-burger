import { viewedIngredientReducer, initialState } from "./viewed-ingredient";
import {
  setViewedIngredient,
  removeViewedIngredient,
  setViewedIngredientComponent,
} from "../actions/viewed-ingredient";
import { mockIngredient } from "../../utils/mock-data";

describe("viewed ingredient reducer", () => {
  it("should return the initial state", () => {
    expect(
      viewedIngredientReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle SET_VIEWED_INGREDIENT", () => {
    expect(
      viewedIngredientReducer(undefined, setViewedIngredient(mockIngredient))
    ).toEqual({
      ...initialState,
      item: mockIngredient,
    });
  });

  it("should handle REMOVE_VIEWED_INGREDIENT", () => {
    expect(viewedIngredientReducer(undefined, removeViewedIngredient)).toEqual({
      ...initialState,
      item: null,
    });
  });

  it("should handle SET_VIEWED_INGREDIENT_COMPONENT", () => {
    expect(
      viewedIngredientReducer(undefined, setViewedIngredientComponent("page"))
    ).toEqual({
      ...initialState,
      component: "page",
    });
  });
});
