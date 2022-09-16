import { createReducer } from "@reduxjs/toolkit";
import {
  registerRequest,
  registerError,
  registerSuccess,
  loginRequest,
  loginError,
  loginSuccess,
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
    .addDefaultCase((state) => state);
});
