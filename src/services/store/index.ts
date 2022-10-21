import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userFeedOrdersWsActions } from "../actions/user-orders";
import { feedOrdersWsActions } from "../actions/feed-orders";
import { socketMiddleware } from "../middlewares/socket-middleware";
import { rootReducer } from "../reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      socketMiddleware(
        `${process.env.REACT_APP_WS_URL}/orders/all`,
        feedOrdersWsActions
      ),
      socketMiddleware(
        `${process.env.REACT_APP_WS_URL}/orders`,
        userFeedOrdersWsActions
      ),
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
