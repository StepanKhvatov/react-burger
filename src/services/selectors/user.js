export const selectUser = (store) => store.user.data;

export const selectForgotPasswordRequest = (store) => {
  return store.user.FORGOT_PASSWORD_SUCCESS;
};
