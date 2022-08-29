import { createReducer } from "@reduxjs/toolkit";
import {
  setViewedIngredient,
  removeViewedIngredient,
} from "../actions/viewed-ingredient";

const initialState = {
  item: {},
};

export const viewedIngredientReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setViewedIngredient, (state, action) => {
        state.item = action.payload;
      })
      .addCase(removeViewedIngredient, (state) => {
        state.item = {};
      })
      .addDefaultCase((state) => state);
  }
);
