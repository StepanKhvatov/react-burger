import {
  ingredientsReducer,
  initialState,
} from "../../../services/reducers/ingredients";
import {
  getIngredientsRequest,
  getIngredientsError,
  getIngredientsSuccess,
} from "../../../services/actions/ingredients";
import { mockIngredients } from "../../../utils/mock-data";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(
      ingredientsReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(ingredientsReducer(undefined, getIngredientsRequest)).toEqual({
      ...initialState,
      GET_INGREDIENTS_REQUEST: true,
    });
  });

  it("should handle GET_INGREDIENTS_ERROR", () => {
    expect(ingredientsReducer(undefined, getIngredientsError)).toEqual({
      ...initialState,
      GET_INGREDIENTS__ERROR: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredientsReducer(undefined, getIngredientsSuccess(mockIngredients))
    ).toEqual({
      GET_INGREDIENTS_REQUEST: false,
      GET_INGREDIENTS__ERROR: false,
      GET_INGREDIENTS_SUCCESS: true,
      items: mockIngredients,
    });
  });
});
