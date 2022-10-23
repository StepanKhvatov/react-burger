import { createAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../utils/api";
import { AppDispatch } from "../store";
import type {
  TUser,
  TAuthSuccessResponse,
  TAuthErrorResponse,
  TForgotPasswordSuccessResponse,
  TResetPasswordSuccessResponse,
  TRefreshTokenSuccessResponse,
  TFetchProfileSuccessResponse,
  TLogoutSuccessResponse,
} from "../../types";

export const registerRequest = createAction("REGISTER_REQUEST");

export const registerError = createAction("REGISTER_ERROR");

export const registerSuccess =
  createAction<TAuthSuccessResponse>("REGISTER_SUCCESS");

export const loginRequest = createAction("LOGIN_REQUEST");

export const loginError = createAction("LOGIN_ERROR");

export const loginSuccess = createAction<TAuthSuccessResponse>("LOGIN_SUCCESS");

export const forgotPasswordRequest = createAction("FORGOT_PASSWORD_REQUEST");

export const forgotPasswordError = createAction("FORGOT_PASSWORD_ERROR");

export const forgotPasswordSuccess =
  createAction<TForgotPasswordSuccessResponse>("FORGOT_PASSWORD_SUCCESS");

export const resetPasswordRequest = createAction("RESET_PASSWORD_REQUEST");

export const resetPasswordError = createAction("RESET_PASSWORD_ERROR");

export const resetPasswordSuccess = createAction<TResetPasswordSuccessResponse>(
  "RESET_PASSWORD_SUCCESS"
);

export const refreshTokenRequest = createAction("REFRESH_TOKEN_REQUEST");

export const refreshTokenError = createAction("REFRESH_TOKEN_ERROR");

export const refreshTokenSuccess = createAction<TRefreshTokenSuccessResponse>(
  "REFRESH_TOKEN_SUCCESS"
);

export const updateProfileRequest = createAction("UPDATE_PROFILE_REQUEST");

export const updateProfileError = createAction("UPDATE_PROFILE_ERROR");

export const updateProfileSuccess = createAction<TFetchProfileSuccessResponse>(
  "UPDATE_PROFILE_SUCCESS"
);

export const getUserRequest = createAction("GET_USER_REQUEST");

export const getUserError = createAction("GET_USER_ERROR");

export const getUserSuccess =
  createAction<TFetchProfileSuccessResponse>("GET_USER_SUCCESS");

export const logoutRequest = createAction("LOGOUT_REQUEST");

export const logoutError = createAction("LOGOUT_ERROR");

export const logoutSuccess =
  createAction<TLogoutSuccessResponse>("LOGOUT_SUCCESS");

export const register = (form: TUser & { password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(registerRequest());

    return fetchApi<TAuthSuccessResponse>({
      method: "POST",
      endpoint: "auth/register",
      body: form,
      onSuccess: (res) => {
        localStorage.setItem("refresh_token", res.refreshToken);

        return dispatch(registerSuccess(res));
      },
      onError: () => dispatch(registerError()),
    });
  };
};

export const login = (form: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());

    return fetchApi<TAuthSuccessResponse, { message: string } | string>({
      method: "POST",
      endpoint: "auth/login",
      body: form,
      onSuccess: (res) => {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refresh_token", res.refreshToken);

        return dispatch(loginSuccess(res));
      },
      onError: (error) => {
        dispatch(loginError());

        if (typeof error === "object") {
          throw new Error(error.message);
        }

        throw new Error(error);
      },
    });
  };
};

export const forgotPassword = (form: { email: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest());

    return fetchApi<TForgotPasswordSuccessResponse>({
      method: "POST",
      endpoint: "password-reset",
      body: form,
      onSuccess: (res) => dispatch(forgotPasswordSuccess(res)),
      onError: () => dispatch(forgotPasswordError()),
    });
  };
};

export const resetPassword = (form: { password: string; token: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());

    return fetchApi<TResetPasswordSuccessResponse>({
      method: "POST",
      endpoint: "password-reset/reset",
      body: form,
      onSuccess: (res) => dispatch(resetPasswordSuccess(res)),
      onError: () => dispatch(resetPasswordError()),
    });
  };
};

export const refreshToken = (callback: unknown) => {
  return async (dispatch: AppDispatch) => {
    dispatch(refreshTokenRequest());

    return fetchApi<TRefreshTokenSuccessResponse>({
      method: "POST",
      endpoint: "auth/token",
      body: {
        token: localStorage.getItem("refresh_token"),
      },
      onSuccess: (res) => {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refresh_token", res.refreshToken);

        if (typeof callback === "function") {
          dispatch(callback());
        }

        dispatch(refreshTokenSuccess(res));
      },
      onError: () => dispatch(refreshTokenError()),
    });
  };
};

export const updateProfile = (form: TUser & { password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateProfileRequest());

    return fetchApi<TFetchProfileSuccessResponse, TAuthErrorResponse | string>({
      method: "PATCH",
      endpoint: "auth/user",
      withAuth: true,
      body: form,
      onSuccess: (res) => dispatch(updateProfileSuccess(res)),
      onError: (error) => {
        if (typeof error === "object" && error.message === "jwt expired") {
          return dispatch(refreshToken(updateProfile));
        }

        dispatch(updateProfileError());
      },
    });
  };
};

export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getUserRequest());

    return fetchApi<TFetchProfileSuccessResponse, TAuthErrorResponse | string>({
      method: "GET",
      endpoint: "auth/user",
      withAuth: true,
      onSuccess: (res) => {
        dispatch(getUserSuccess(res));
      },
      onError: (error) => {
        if (typeof error === "object" && error.message === "jwt expired") {
          return dispatch(refreshToken(getUser));
        }

        dispatch(getUserError());
      },
    });
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(logoutRequest());

    return fetchApi<TLogoutSuccessResponse>({
      method: "POST",
      endpoint: "auth/logout",
      body: {
        token: localStorage.getItem("refresh_token"),
      },
      onSuccess: (res) => {
        localStorage.setItem("token", "");
        localStorage.setItem("refresh_token", "");

        dispatch(logoutSuccess(res));
      },
      onError: () => dispatch(logoutError()),
    });
  };
};
