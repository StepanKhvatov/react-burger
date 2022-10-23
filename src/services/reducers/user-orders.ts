import { createReducer } from "@reduxjs/toolkit";
import {
  userFeedWsConnectionEnd,
  userFeedWsConnectionSuccess,
  userFeedWsConnectionClosed,
  userFeedWsConnectionError,
  userFeedWsGetMessage,
} from "../actions/user-orders";
import { TFeedWsMessage } from "../../types";

type TFeedOrdersState = {
  wsConnected: boolean;
  messages: Array<TFeedWsMessage>;
};

const initialState: TFeedOrdersState = {
  wsConnected: false,
  messages: [],
};

export const userFeedOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userFeedWsConnectionSuccess, (state) => {
      state.wsConnected = true;
    })
    .addCase(userFeedWsConnectionError, (state) => {
      state.wsConnected = false;
    })
    .addCase(userFeedWsConnectionClosed, (state) => {
      state.wsConnected = false;
    })
    .addCase(userFeedWsGetMessage, (state, action) => {
      state.messages = [action.payload, ...state.messages];
    })
    .addCase(userFeedWsConnectionEnd, (state) => {
      state.wsConnected = false;
      state.messages = [];
    })
    .addDefaultCase((state) => state);
});
