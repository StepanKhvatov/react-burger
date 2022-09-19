import { createReducer } from "@reduxjs/toolkit";
import {
  setViewedIngredient,
  removeViewedIngredient,
  setViewedIngredientComponent,
} from "../actions/viewed-ingredient";

const initialState = {
  item: {},
  component: "page",
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
      .addCase(setViewedIngredientComponent, (state, action) => {
        state.component = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);
