import { createAction } from "@reduxjs/toolkit";
import type { TFeedWsMessage, TWsActions } from "../../types";

export const feedWsConnectionStart = createAction("FEED_WS_CONNECTION_START");

export const feedWsConnectionEnd = createAction("FEED_WS_CONNECTION_END");

export const feedWsConnectionSuccess = createAction(
  "FEED_WS_CONNECTION_SUCCESS"
);

export const feedWsConnectionError = createAction("FEED_WS_CONNECTION_ERROR");

export const feedWsConnectionClosed = createAction("FEED_WS_CONNECTION_CLOSED");

export const feedWsGetMessage = createAction<TFeedWsMessage>(
  "FEED_WS_GET_MESSAGE"
);

export const feedWsSendMessage = createAction<undefined>(
  "FEED_WS_SEND_MESSAGE"
);

export const feedOrdersWsActions: TWsActions = {
  wsInit: feedWsConnectionStart,
  wsEndConnection: feedWsConnectionEnd,
  wsSendMessage: feedWsSendMessage,
  onOpen: feedWsConnectionSuccess,
  onClose: feedWsConnectionClosed,
  onError: feedWsConnectionError,
  onMessage: feedWsGetMessage,
};
