import { RootState } from "../store";

export const selectUser = (store: RootState) => store.user.data;

export const selectForgotPasswordRequest = (store: RootState) => {
  return store.user.FORGOT_PASSWORD_SUCCESS;
};
