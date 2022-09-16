import { createAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";

export const registerRequest = createAction("REGISTER_REQUEST");

export const registerError = createAction("REGISTER_ERROR");

export const registerSuccess = createAction("REGISTER_SUCCESS");

export const register = (form) => {
  return async (dispatch) => {
    dispatch(registerRequest());

    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((res) => {
        if (res?.success) {
          return dispatch(registerSuccess(res));
        }

        return res;
      })
      .catch((error) => {
        console.error("Ошибка при регистрации:", error?.message || error);

        dispatch(registerError());
      });
  };
};
