import { nanoid } from "@reduxjs/toolkit";
import {
  ingredientsConstructorReducer,
  initialState,
} from "./ingredients-constructor";
import {
  insertIngredient,
  removeIngredient,
  updateIngredientsSorting,
  removeAllIngredients,
} from "../actions/ingredients-constructor";
import { mockIngredient, mockSauceIngredient } from "../../utils/mock-data";

describe("ingredients-constructor reducer", () => {
  it("should return the initial state", () => {
    expect(
      ingredientsConstructorReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle INSERT_INGREDIENT (Bun ingredient)", () => {
    expect(
      ingredientsConstructorReducer(undefined, insertIngredient(mockIngredient))
    ).toEqual({
      ...initialState,
      blockedItem: mockIngredient,
    });
  });

  it("should handle INSERT_INGREDIENT (Sauce ingredient)", () => {
    expect(
      ingredientsConstructorReducer(
        undefined,
        insertIngredient(mockSauceIngredient)
      )
    ).toEqual({
      ...initialState,
      unblockedItems: [
        ...initialState.unblockedItems,
        { ...mockSauceIngredient, key: expect.any(String) },
      ],
    });
  });

  it("should handle REMOVE_INGREDIENT", () => {
    const mockIngredientWithKey = { ...mockSauceIngredient, key: nanoid() };

    expect(
      ingredientsConstructorReducer(
        { blockedItem: null, unblockedItems: [mockIngredientWithKey] },
        removeIngredient(mockIngredientWithKey, 0)
      )
    ).toEqual({
      blockedItem: null,
      unblockedItems: [],
    });
  });

  it("should handle UPDATE_INGREDIENTS_SORTING", () => {
    const firstIngredientWithKey = { ...mockSauceIngredient, key: nanoid() };
    const secondIngredientWithKey = { ...mockSauceIngredient, key: nanoid() };

    expect(
      ingredientsConstructorReducer(
        {
          blockedItem: null,
          unblockedItems: [firstIngredientWithKey, secondIngredientWithKey],
        },
        updateIngredientsSorting(
          { item: secondIngredientWithKey, draggedItemIndex: 1 },
          0
        )
      )
    ).toEqual({
      blockedItem: null,
      unblockedItems: [secondIngredientWithKey, firstIngredientWithKey],
    });
  });

  it("should handle REMOVE_ALL_INGREDIENTS", () => {
    expect(
      ingredientsConstructorReducer(undefined, removeAllIngredients)
    ).toEqual(initialState);
  });
});
