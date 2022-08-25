import { createAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";

export const getIngredientsRequest = createAction("ingredients/request");

export const getIngredientsFailed = createAction("ingredients/failed");

export const getIngredientsSuccess = createAction("ingredients/success");

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());

    fetch(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          return dispatch(getIngredientsSuccess(res.data));
        }

        return res;
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      });
  };
}
