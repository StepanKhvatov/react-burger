import { createReducer } from "@reduxjs/toolkit";
import { TIngredient } from "../../types";
import {
  setViewedIngredient,
  removeViewedIngredient,
  setViewedIngredientComponent,
} from "../actions/viewed-ingredient";

type TViewedIngredientState = {
  item: TIngredient | null;
  component: "page" | "modal";
};

export const initialState: TViewedIngredientState = {
  item: null,
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
        state.item = null;
      })
      .addCase(setViewedIngredientComponent, (state, action) => {
        state.component = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);
