import { userReducer, initialState } from "./user";
import * as actions from "../actions/user";
import {
  mockUser,
  mockAuthSuccessResponse,
  mockForgotPasswordSuccessResponse,
  mockResetPasswordSuccessResponse,
  mockFetchProfileSuccessResponse,
} from "../../utils/mock-data";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(
      userReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(userReducer(undefined, actions.registerRequest)).toEqual({
      ...initialState,
      REGISTER_REQUEST: true,
      REGISTER_ERROR: false,
    });
  });

  it("should handle REGISTER_ERROR", () => {
    expect(userReducer(undefined, actions.registerError)).toEqual({
      ...initialState,
      REGISTER_REQUEST: false,
      REGISTER_ERROR: true,
      REGISTER_SUCCESS: false,
    });
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      userReducer(undefined, actions.registerSuccess(mockAuthSuccessResponse))
    ).toEqual({
      ...initialState,
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
      data: mockUser,
    });
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(userReducer(undefined, actions.loginRequest)).toEqual({
      ...initialState,
      LOGIN_REQUEST: true,
      LOGIN_ERROR: false,
    });
  });

  it("should handle LOGIN_ERROR", () => {
    expect(userReducer(undefined, actions.loginError)).toEqual({
      ...initialState,
      LOGIN_REQUEST: false,
      LOGIN_ERROR: true,
      LOGIN_SUCCESS: false,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      userReducer(undefined, actions.loginSuccess(mockAuthSuccessResponse))
    ).toEqual({
      ...initialState,
      LOGIN_ERROR: false,
      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
      data: mockUser,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(userReducer(undefined, actions.forgotPasswordRequest)).toEqual({
      ...initialState,
      FORGOT_PASSWORD_ERROR: false,
      FORGOT_PASSWORD_REQUEST: true,
    });
  });

  it("should handle FORGOT_PASSWORD_ERROR", () => {
    expect(userReducer(undefined, actions.forgotPasswordError)).toEqual({
      ...initialState,
      FORGOT_PASSWORD_REQUEST: false,
      FORGOT_PASSWORD_ERROR: true,
      FORGOT_PASSWORD_SUCCESS: false,
    });
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      userReducer(
        undefined,
        actions.forgotPasswordSuccess(mockForgotPasswordSuccessResponse)
      )
    ).toEqual({
      ...initialState,
      FORGOT_PASSWORD_REQUEST: false,
      FORGOT_PASSWORD_SUCCESS: true,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(userReducer(undefined, actions.resetPasswordRequest)).toEqual({
      ...initialState,
      RESET_PASSWORD_ERROR: false,
      RESET_PASSWORD_REQUEST: true,
    });
  });

  it("should handle RESET_PASSWORD_ERROR", () => {
    expect(userReducer(undefined, actions.resetPasswordError)).toEqual({
      ...initialState,
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_ERROR: true,
      RESET_PASSWORD_SUCCESS: false,
    });
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      userReducer(
        undefined,
        actions.resetPasswordSuccess(mockResetPasswordSuccessResponse)
      )
    ).toEqual({
      ...initialState,
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_ERROR: false,
    });
  });

  it("should handle UPDATE_PROFILE_REQUEST", () => {
    expect(userReducer(undefined, actions.updateProfileRequest)).toEqual({
      ...initialState,
      UPDATE_PROFILE_REQUEST: true,
      UPDATE_PROFILE_ERROR: false,
    });
  });

  it("should handle UPDATE_PROFILE_ERROR", () => {
    expect(userReducer(undefined, actions.updateProfileError)).toEqual({
      ...initialState,
      UPDATE_PROFILE_REQUEST: false,
      UPDATE_PROFILE_ERROR: true,
      UPDATE_PROFILE_SUCCESS: false,
    });
  });

  it("should handle UPDATE_PROFILE_SUCCESS", () => {
    expect(
      userReducer(
        undefined,
        actions.updateProfileSuccess(mockFetchProfileSuccessResponse)
      )
    ).toEqual({
      ...initialState,
      UPDATE_PROFILE_REQUEST: false,
      UPDATE_PROFILE_SUCCESS: true,
      data: mockUser,
    });
  });

  it("should handle GET_USER_REQUEST", () => {
    expect(userReducer(undefined, actions.getUserRequest)).toEqual({
      ...initialState,
      GET_USER_REQUEST: true,
      GET_USER_ERROR: false,
    });
  });

  it("should handle GET_USER_ERROR", () => {
    expect(userReducer(undefined, actions.getUserError)).toEqual({
      ...initialState,
      GET_USER_REQUEST: false,
      GET_USER_ERROR: true,
      GET_USER_SUCCESS: false,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      userReducer(
        undefined,
        actions.getUserSuccess(mockFetchProfileSuccessResponse)
      )
    ).toEqual({
      ...initialState,
      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: true,
      data: mockUser,
    });
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(userReducer(undefined, actions.logoutRequest)).toEqual({
      ...initialState,
      LOGOUT_REQUEST: true,
      LOGOUT_ERROR: false,
    });
  });

  it("should handle LOGOUT_ERROR", () => {
    expect(userReducer(undefined, actions.logoutError)).toEqual({
      ...initialState,
      LOGOUT_REQUEST: false,
      LOGOUT_ERROR: true,
      LOGOUT_SUCCESS: false,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(userReducer(undefined, actions.logoutSuccess)).toEqual({
      ...initialState,
      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: true,
      data: undefined,
    });
  });
});
