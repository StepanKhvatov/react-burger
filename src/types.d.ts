import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export type TIngredientType = "bun" | "sauce" | "main";

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredientType;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly __v: number;
};

export type TOrder<T = string> = {
  readonly ingredients: Array<T>;
  readonly _id: string;
  readonly status: "created" | "pending" | "done";
  readonly number: number;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type TIngredientWithKey = TIngredient & {
  readonly key: string;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TOwnerOrder = TOrder<TIngredient> & {
  owner: TUser;
  price: number
};

export type TAuthSuccessResponse = {
  readonly success: boolean;
  readonly user: TUser;
  readonly refreshToken: string;
  readonly accessToken: string;
};

export type TAuthErrorResponse = {
  readonly success: boolean;
  readonly message: string;
};

export type TForgotPasswordSuccessResponse = {
  readonly success: boolean;
  readonly message: "Reset email sent";
};

export type TResetPasswordSuccessResponse = {
  readonly success: boolean;
  readonly message: "Password successfully reset";
};

export type TRefreshTokenSuccessResponse = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: TUser;
};

export type TFetchProfileSuccessResponse = {
  readonly success: boolean;
  readonly user: TUser;
};

export type TLogoutSuccessResponse = {
  readonly success: boolean;
  readonly message: "Successful logout";
};

export type TFeedWsMessage = {
  orders: Array<TOrder>;
  success: boolean;
  total: number;
  totalToday: number;
};

export type TWsActions = {
  wsInit: ActionCreatorWithoutPayload;
  wsEndConnection: ActionCreatorWithoutPayload;
  wsSendMessage: ActionCreatorWithPayload<undefined>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<TFeedWsMessage>;
};
