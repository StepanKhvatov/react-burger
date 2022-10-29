import {
  userFeedOrdersReducer,
  initialState,
} from "../../../services/reducers/user-orders";
import {
  userFeedWsConnectionEnd,
  userFeedWsConnectionSuccess,
  userFeedWsConnectionClosed,
  userFeedWsConnectionError,
  userFeedWsGetMessage,
} from "../../../services/actions/user-orders";
import { mockFeedWsMessage } from "../../../utils/mock-data";

describe("feed orders reducer", () => {
  it("should return the initial state", () => {
    expect(
      userFeedOrdersReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle USER_FEED_WS_CONNECTION_SUCCESS", () => {
    expect(
      userFeedOrdersReducer(undefined, userFeedWsConnectionSuccess)
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle USER_FEED_WS_CONNECTION_ERROR", () => {
    expect(userFeedOrdersReducer(undefined, userFeedWsConnectionError)).toEqual(
      {
        ...initialState,
        wsConnected: false,
      }
    );
  });

  it("should handle USER_FEED_WS_CONNECTION_CLOSED", () => {
    expect(
      userFeedOrdersReducer(undefined, userFeedWsConnectionClosed)
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle USER_FEED_WS_CONNECTION_END", () => {
    expect(userFeedOrdersReducer(undefined, userFeedWsConnectionEnd)).toEqual({
      ...initialState,
      wsConnected: false,
      messages: [],
    });
  });

  it("should handle USER_FEED_WS_GET_MESSAGE", () => {
    expect(
      userFeedOrdersReducer(undefined, userFeedWsGetMessage(mockFeedWsMessage))
    ).toEqual({
      ...initialState,
      wsConnected: false,
      messages: [mockFeedWsMessage, ...initialState.messages],
    });
  });
});
