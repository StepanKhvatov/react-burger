import { createAction } from "@reduxjs/toolkit";
import type { TFeedWsMessage, TWsActions } from "../../types";

export const userFeedWsConnectionStart = createAction(
  "USER_FEED_WS_CONNECTION_START"
);

export const userFeedWsConnectionEnd = createAction(
  "USER_FEED_WS_CONNECTION_END"
);

export const userFeedWsConnectionSuccess = createAction(
  "USER_FEED_WS_CONNECTION_SUCCESS"
);

export const userFeedWsConnectionError = createAction(
  "USER_FEED_WS_CONNECTION_ERROR"
);

export const userFeedWsConnectionClosed = createAction(
  "USER_FEED_WS_CONNECTION_CLOSED"
);

export const userFeedWsGetMessage = createAction<TFeedWsMessage>(
  "USER_FEED_WS_GET_MESSAGE"
);

export const userFeedWsSendMessage = createAction<undefined>(
  "USER_FEED_WS_SEND_MESSAGE"
);

export const userFeedOrdersWsActions: TWsActions = {
  wsInit: userFeedWsConnectionStart,
  wsEndConnection: userFeedWsConnectionEnd,
  wsSendMessage: userFeedWsSendMessage,
  onOpen: userFeedWsConnectionSuccess,
  onClose: userFeedWsConnectionClosed,
  onError: userFeedWsConnectionError,
  onMessage: userFeedWsGetMessage,
};
