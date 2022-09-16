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
} from "../actions/user";

const initialState = {
  data: {},
  accessToken: null,
  REGISTER_REQUEST: false,
  REGISTER__ERROR: false,
  REGISTER_SUCCESS: false,
  LOGIN_REQUEST: false,
  LOGIN__ERROR: false,
  LOGIN_SUCCESS: false,
  FORGOT_PASSWORD_REQUEST: false,
  FORGOT_PASSWORD__ERROR: false,
  FORGOT_PASSWORD_SUCCESS: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerRequest, (state) => {
      state.REGISTER_REQUEST = true;
      state.REGISTER__ERROR = false;
    })
    .addCase(registerError, (state) => {
      state.REGISTER_REQUEST = false;
      state.REGISTER__ERROR = true;
      state.REGISTER_SUCCESS = false;
    })
    .addCase(registerSuccess, (state, action) => {
      const { accessToken, user } = action.payload;

      state.REGISTER_REQUEST = false;
      state.REGISTER_SUCCESS = true;

      state.accessToken = accessToken;
      state.data = user;
    })
    .addCase(loginRequest, (state) => {
      state.LOGIN_REQUEST = true;
      state.LOGIN__ERROR = false;
    })
    .addCase(loginError, (state) => {
      state.LOGIN_REQUEST = false;
      state.LOGIN__ERROR = true;
      state.LOGIN_SUCCESS = false;
    })
    .addCase(loginSuccess, (state, action) => {
      const { accessToken, user } = action.payload;

      state.LOGIN_REQUEST = false;
      state.LOGIN_SUCCESS = true;

      state.accessToken = accessToken;
      state.data = user;
    })
    .addCase(forgotPasswordRequest, (state) => {
      state.FORGOT_PASSWORD_REQUEST = true;
      state.FORGOT_PASSWORD__ERROR = false;
    })
    .addCase(forgotPasswordError, (state) => {
      state.FORGOT_PASSWORD_REQUEST = false;
      state.FORGOT_PASSWORD__ERROR = true;
      state.FORGOT_PASSWORD_SUCCESS = false;
    })
    .addCase(forgotPasswordSuccess, (state) => {
      state.FORGOT_PASSWORD_REQUEST = false;
      state.FORGOT_PASSWORD_SUCCESS = true;
    })
    .addDefaultCase((state) => state);
});
