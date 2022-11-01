import { createReducer, nanoid } from "@reduxjs/toolkit";
import { TIngredientWithKey, TIngredient } from "../../types";
import {
  insertIngredient,
  removeIngredient,
  updateIngredientsSorting,
  removeAllIngredients,
} from "../actions/ingredients-constructor";

type TIngredientsConstructorState = {
  blockedItem: TIngredient | null;
  unblockedItems: Array<TIngredientWithKey>;
};

export const initialState: TIngredientsConstructorState = {
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

        state.unblockedItems = [
          ...state.unblockedItems,
          { ...action.payload, key: nanoid() },
        ];
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
      .addCase(updateIngredientsSorting, (state, action) => {
        const { unblockedItems } = state;
        const { draggedIngredient, targetIngredientIndex } = action.payload;

        const { item: draggedItem, draggedItemIndex } = draggedIngredient;

        state.unblockedItems = unblockedItems.map((ingredient, index) => {
          if (
            ingredient._id === draggedItem._id &&
            index === draggedItemIndex
          ) {
            return unblockedItems[targetIngredientIndex];
          }

          if (targetIngredientIndex === index) {
            return draggedItem;
          }

          return ingredient;
        });
      })
      .addCase(removeAllIngredients, (state) => {
        state = initialState;

        return state;
      })
      .addDefaultCase((state) => state);
  }
);
