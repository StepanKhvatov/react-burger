import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";
import type { TWsActions } from "../../types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    const token = localStorage.getItem("token");

    return (next) => (action) => {
      const { dispatch } = store;

      const { type, payload } = action;

      const {
        wsInit,
        wsEndConnection,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsInit().type) {
        socket = new WebSocket(
          `${wsUrl}${
            token ? `?token=${token.replace("Bearer", "").trim()}` : ""
          }`
        );
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;

          const parsedData = JSON.parse(data);

          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (type === wsSendMessage) {
          const message = payload;

          socket.send(JSON.stringify(message));
        }

        if (type === wsEndConnection().type) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
