import { createReducer } from "@reduxjs/toolkit";
import { TIngredient } from "../../types";
import {
  getIngredientsRequest,
  getIngredientsError,
  getIngredientsSuccess,
} from "../actions/ingredients";

type TIngredientsState = {
  items: Array<TIngredient>;
  GET_INGREDIENTS_REQUEST: boolean;
  GET_INGREDIENTS__ERROR: boolean;
  GET_INGREDIENTS_SUCCESS: boolean;
};

export const initialState: TIngredientsState = {
  items: [],
  GET_INGREDIENTS_REQUEST: false,
  GET_INGREDIENTS__ERROR: false,
  GET_INGREDIENTS_SUCCESS: false,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredientsRequest, (state) => {
      state.GET_INGREDIENTS_REQUEST = true;
    })
    .addCase(getIngredientsError, () => {
      return { ...initialState, GET_INGREDIENTS__ERROR: true };
    })
    .addCase(getIngredientsSuccess, (state, action) => {
      state.GET_INGREDIENTS_REQUEST = false;
      state.GET_INGREDIENTS__ERROR = false;
      state.GET_INGREDIENTS_SUCCESS = true;
      state.items = action.payload;
    })
    .addDefaultCase((state) => state);
});
