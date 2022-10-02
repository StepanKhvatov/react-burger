import { createAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types";
import { fetchApi } from "../../utils/api";
import { AppDispatch } from "../store";

export const getIngredientsRequest = createAction("GET_INGREDIENTS_REQUEST");

export const getIngredientsError = createAction("GET_INGREDIENTS_ERROR");

export const getIngredientsSuccess = createAction<Array<TIngredient>>(
  "GET_INGREDIENTS_SUCCESS"
);

export const getIngredients = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());

    return fetchApi<{ success: boolean; data: Array<TIngredient> }>({
      method: "GET",
      endpoint: "ingredients",
      onSuccess: (res) => {
        dispatch(getIngredientsSuccess(res.data));
      },
      onError: () => {
        dispatch(getIngredientsError());
      },
    });
  };
};
