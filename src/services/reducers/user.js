import { createReducer } from "@reduxjs/toolkit";
import {
  registerRequest,
  registerError,
  registerSuccess,
} from "../actions/user";

const initialState = {
  data: {},
  accessToken: null,
  isLoading: false,
  REGISTER_REQUEST: false,
  REGISTER__ERROR: false,
  REGISTER_SUCCESS: false,
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
    })
    .addCase(registerSuccess, (state, action) => {
      const { accessToken, user } = action.payload;

      state.REGISTER_REQUEST = false;

      state.accessToken = accessToken;
      state.data = user;
    })
    .addDefaultCase((state) => state);
});
