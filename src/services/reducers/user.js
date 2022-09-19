import { createReducer } from "@reduxjs/toolkit";
import {
  registerRequest,
  registerError,
  registerSuccess,
  loginRequest,
  loginError,
  loginSuccess,
  forgotPasswordRequest,
  forgotPasswordError,
  forgotPasswordSuccess,
  resetPasswordRequest,
  resetPasswordError,
  resetPasswordSuccess,
  updateProfileRequest,
  updateProfileError,
  updateProfileSuccess,
  getUserRequest,
  getUserError,
  getUserSuccess,
  logoutRequest,
  logoutError,
  logoutSuccess,
} from "../actions/user";

const initialState = {
  data: undefined,
  accessToken: null,
  REGISTER_REQUEST: false,
  REGISTER_ERROR: false,
  REGISTER_SUCCESS: false,
  LOGIN_REQUEST: false,
  LOGIN_ERROR: false,
  LOGIN_SUCCESS: false,
  FORGOT_PASSWORD_REQUEST: false,
  FORGOT_PASSWORD_ERROR: false,
  FORGOT_PASSWORD_SUCCESS: false,
  RESET_PASSWORD_REQUEST: false,
  RESET_PASSWORD_ERROR: false,
  RESET_PASSWORD_SUCCESS: false,
  UPDATE_PROFILE_REQUEST: false,
  UPDATE_PROFILE_ERROR: false,
  UPDATE_PROFILE_SUCCESS: false,
  GET_USER_REQUEST: false,
  GET_USER_ERROR: false,
  GET_USER_SUCCESS: false,
  LOGOUT_REQUEST: false,
  LOGOUT_ERROR: false,
  LOGOUT_SUCCESS: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerRequest, (state) => {
      state.REGISTER_REQUEST = true;
      state.REGISTER_ERROR = false;
    })
    .addCase(registerError, (state) => {
      state.REGISTER_REQUEST = false;
      state.REGISTER_ERROR = true;
      state.REGISTER_SUCCESS = false;
    })
    .addCase(registerSuccess, (state, action) => {
      const { user } = action.payload;

      state.REGISTER_REQUEST = false;
      state.REGISTER_SUCCESS = true;

      state.data = user;
    })
    .addCase(loginRequest, (state) => {
      state.LOGIN_REQUEST = true;
      state.LOGIN_ERROR = false;
    })
    .addCase(loginError, (state) => {
      state.LOGIN_REQUEST = false;
      state.LOGIN_ERROR = true;
      state.LOGIN_SUCCESS = false;
    })
    .addCase(loginSuccess, (state, action) => {
      const { user } = action.payload;

      state.LOGIN_REQUEST = false;
      state.LOGIN_SUCCESS = true;

      state.data = user;
    })
    .addCase(forgotPasswordRequest, (state) => {
      state.FORGOT_PASSWORD_REQUEST = true;
      state.FORGOT_PASSWORD_ERROR = false;
    })
    .addCase(forgotPasswordError, (state) => {
      state.FORGOT_PASSWORD_REQUEST = false;
      state.FORGOT_PASSWORD_ERROR = true;
      state.FORGOT_PASSWORD_SUCCESS = false;
    })
    .addCase(forgotPasswordSuccess, (state) => {
      state.FORGOT_PASSWORD_REQUEST = false;
      state.FORGOT_PASSWORD_SUCCESS = true;
    })
    .addCase(resetPasswordRequest, (state) => {
      state.RESET_PASSWORD_REQUEST = true;
      state.RESET_PASSWORD_ERROR = false;
    })
    .addCase(resetPasswordError, (state) => {
      state.RESET_PASSWORD_REQUEST = false;
      state.RESET_PASSWORD_ERROR = true;
      state.RESET_PASSWORD_SUCCESS = false;
    })
    .addCase(resetPasswordSuccess, (state) => {
      state.RESET_PASSWORD_REQUEST = false;
      state.RESET_PASSWORD_SUCCESS = true;
    })
    .addCase(updateProfileRequest, (state) => {
      state.UPDATE_PROFILE_REQUEST = true;
      state.UPDATE_PROFILE_ERROR = false;
    })
    .addCase(updateProfileError, (state) => {
      state.UPDATE_PROFILE_REQUEST = false;
      state.UPDATE_PROFILE_ERROR = true;
      state.UPDATE_PROFILE_SUCCESS = false;
    })
    .addCase(updateProfileSuccess, (state, action) => {
      const { user } = action.payload;

      state.UPDATE_PROFILE_REQUEST = false;
      state.UPDATE_PROFILE_SUCCESS = true;

      state.data = user;
    })
    .addCase(getUserRequest, (state) => {
      state.GET_USER_REQUEST = true;
      state.GET_USER_ERROR = false;
    })
    .addCase(getUserError, (state) => {
      state.GET_USER_REQUEST = false;
      state.GET_USER_ERROR = true;
      state.GET_USER_SUCCESS = false;
    })
    .addCase(getUserSuccess, (state, action) => {
      const { user } = action.payload;

      state.GET_USER_REQUEST = false;
      state.GET_USER_SUCCESS = true;

      state.data = user;
    })
    .addCase(logoutRequest, (state) => {
      state.LOGOUT_REQUEST = true;
      state.LOGOUT_ERROR = false;
    })
    .addCase(logoutError, (state) => {
      state.LOGOUT_REQUEST = false;
      state.LOGOUT_ERROR = true;
      state.LOGOUT_SUCCESS = false;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.LOGOUT_REQUEST = false;
      state.LOGOUT_SUCCESS = true;

      state.data = undefined;
    })
    .addDefaultCase((state) => state);
});
