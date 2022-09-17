import { createAction } from "@reduxjs/toolkit";
import { fetchApi, setCookie } from "../../utils/api";

export const registerRequest = createAction("REGISTER_REQUEST");

export const registerError = createAction("REGISTER_ERROR");

export const registerSuccess = createAction("REGISTER_SUCCESS");

export const loginRequest = createAction("LOGIN_REQUEST");

export const loginError = createAction("LOGIN_ERROR");

export const loginSuccess = createAction("LOGIN_SUCCESS");

export const forgotPasswordRequest = createAction("FORGOT_PASSWORD_REQUEST");

export const forgotPasswordError = createAction("FORGOT_PASSWORD_ERROR");

export const forgotPasswordSuccess = createAction("FORGOT_PASSWORD_SUCCESS");

export const resetPasswordRequest = createAction("RESET_PASSWORD_REQUEST");

export const resetPasswordError = createAction("RESET_PASSWORD_ERROR");

export const resetPasswordSuccess = createAction("RESET_PASSWORD_SUCCESS");

export const updateProfileRequest = createAction("UPDATE_PROFILE_REQUEST");

export const updateProfileError = createAction("UPDATE_PROFILE_ERROR");

export const updateProfileSuccess = createAction("UPDATE_PROFILE_SUCCESS");

export const register = (form) => {
  return async (dispatch) => {
    dispatch(registerRequest());

    return fetchApi({
      method: "POST",
      endpoint: "auth/register",
      body: form,
      onSuccess: (res) => {
        setCookie("refresh_token", res.refreshToken);

        dispatch(registerSuccess(res));
      },
      onError: () => dispatch(registerError()),
    });
  };
};

export const login = (form) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    return fetchApi({
      method: "POST",
      endpoint: "auth/login",
      body: form,
      onSuccess: (res) => {
        setCookie("refresh_token", res.refreshToken);

        dispatch(loginSuccess(res));
      },
      onError: () => dispatch(loginError()),
    });
  };
};

export const forgotPassword = (form) => {
  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    return fetchApi({
      method: "POST",
      endpoint: "password-reset",
      body: form,
      onSuccess: (res) => dispatch(forgotPasswordSuccess(res)),
      onError: () => dispatch(forgotPasswordError()),
    });
  };
};

export const resetPassword = (form) => {
  return async (dispatch) => {
    dispatch(resetPasswordRequest());

    return fetchApi({
      method: "POST",
      endpoint: "password-reset/reset",
      body: form,
      onSuccess: (res) => dispatch(resetPasswordSuccess(res)),
      onError: () => dispatch(resetPasswordError()),
    });
  };
};

export const updateProfile = (form) => {
  return async (dispatch) => {
    dispatch(updateProfileRequest());

    return fetchApi({
      method: "PATCH",
      endpoint: "auth/user",
      body: form,
      onSuccess: (res) => dispatch(updateProfileSuccess(res)),
      onError: () => dispatch(updateProfileError()),
    });
  };
};
