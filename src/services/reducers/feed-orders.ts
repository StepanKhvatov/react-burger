import { createReducer } from "@reduxjs/toolkit";
import {
  feedWsConnectionEnd,
  feedWsConnectionSuccess,
  feedWsConnectionClosed,
  feedWsConnectionError,
  feedWsGetMessage,
} from "../actions/feed-orders";
import { TFeedWsMessage } from "../../types";

type TFeedOrdersState = {
  wsConnected: boolean;
  messages: Array<TFeedWsMessage>;
};

const initialState: TFeedOrdersState = {
  wsConnected: false,
  messages: [],
};

export const feedOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(feedWsConnectionSuccess, (state) => {
      state.wsConnected = true;
    })
    .addCase(feedWsConnectionError, (state) => {
      state.wsConnected = false;
    })
    .addCase(feedWsConnectionClosed, (state) => {
      state.wsConnected = false;
    })
    .addCase(feedWsGetMessage, (state, action) => {
      state.messages = [action.payload, ...state.messages];
    })
    .addCase(feedWsConnectionEnd, (state) => {
      state.wsConnected = false;
      state.messages = [];
    })
    .addDefaultCase((state) => state);
});
