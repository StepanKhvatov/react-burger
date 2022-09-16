import { createAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";

export const registerRequest = createAction("REGISTER_REQUEST");

export const registerError = createAction("REGISTER_ERROR");

export const registerSuccess = createAction("REGISTER_SUCCESS");

export const loginRequest = createAction("LOGIN_REQUEST");

export const loginError = createAction("LOGIN_ERROR");

export const loginSuccess = createAction("LOGIN_SUCCESS");

export const forgotPasswordRequest = createAction("FORGOT_PASSWORD_REQUEST");

export const forgotPasswordError = createAction("FORGOT_PASSWORD_ERROR");

export const forgotPasswordSuccess = createAction("FORGOT_PASSWORD_SUCCESS");

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

export const login = (form) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((res) => {
        if (res?.success) {
          return dispatch(loginSuccess(res));
        }

        return res;
      })
      .catch((error) => {
        console.error("Ошибка при логине:", error?.message || error);

        dispatch(loginError());
      });
  };
};

export const forgotPassword = (form) => {
  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    return fetch(`${process.env.REACT_APP_API_URL}/api/password-reset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((res) => {
        if (res?.success) {
          return dispatch(forgotPasswordSuccess(res));
        }

        return res;
      })
      .catch((error) => {
        console.error(
          "Ошибка при восстановлении пароля:",
          error?.message || error
        );

        dispatch(forgotPasswordError());
      });
  };
};
