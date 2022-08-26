import { createReducer } from "@reduxjs/toolkit";
import {
  insertIngredient,
  removeIngredient,
} from "../actions/ingredients-constructor";

const initialState = {
  blockedItem: null,
  unblockedItems: [],
};

export const ingredientsConstructorReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(insertIngredient, (state, action) => {
        const { type } = action.payload;

        if (type === "bun") {
          state.blockedItem = action.payload;

          return;
        }

        state.unblockedItems = [...state.unblockedItems, action.payload];
      })
      .addCase(removeIngredient, (state, action) => {
        const { ingredient, itemIndex } = action.payload;

        const ingredientIndex = state.unblockedItems.findIndex(
          (item, index) => item._id === ingredient._id && index === itemIndex
        );

        state.unblockedItems = state.unblockedItems.filter(
          (_, index) => index !== ingredientIndex
        );
      })
      .addDefaultCase((state) => state);
  }
);
