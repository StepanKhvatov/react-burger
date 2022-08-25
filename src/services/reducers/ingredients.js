import { createReducer } from "@reduxjs/toolkit";
import {
  getIngredientsRequest,
  getIngredientsFailed,
  getIngredientsSuccess,
} from "../actions/ingredients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredientsRequest, (state) => {
      state.itemsRequest = true;
    })
    .addCase(getIngredientsFailed, (state) => {
      state.itemsFailed = true;
      state.itemsRequest = false;
    })
    .addCase(getIngredientsSuccess, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    })
    .addDefaultCase((state) => state);
});
