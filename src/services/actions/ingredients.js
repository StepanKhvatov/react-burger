import { createAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";

export const getIngredientsRequest = createAction("GET_INGREDIENTS_REQUEST");

export const getIngredientsError = createAction("GET_INGREDIENTS_ERROR");

export const getIngredientsSuccess = createAction("GET_INGREDIENTS_SUCCESS");

export const getIngredients = () => {
  return async (dispatch) => {
    dispatch(getIngredientsRequest());

    return fetch(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res?.success) {
          return dispatch(getIngredientsSuccess(res.data));
        }

        return res;
      })
      .catch((error) => {
        console.error(
          "Ошибка при получении индередиентов:",
          error?.message || error
        );

        dispatch(getIngredientsError());
      });
  };
};
