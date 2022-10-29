import {
  feedOrdersReducer,
  initialState,
} from "../../../services/reducers/feed-orders";
import {
  feedWsConnectionEnd,
  feedWsConnectionSuccess,
  feedWsConnectionClosed,
  feedWsConnectionError,
  feedWsGetMessage,
} from "../../../services/actions/feed-orders";
import { mockFeedWsMessage } from "../../../utils/mock-data";

describe("feed orders reducer", () => {
  it("should return the initial state", () => {
    expect(
      feedOrdersReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);
  });

  it("should handle FEED_WS_CONNECTION_SUCCESS", () => {
    expect(feedOrdersReducer(undefined, feedWsConnectionSuccess)).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle FEED_WS_CONNECTION_ERROR", () => {
    expect(feedOrdersReducer(undefined, feedWsConnectionError)).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle FEED_WS_CONNECTION_CLOSED", () => {
    expect(feedOrdersReducer(undefined, feedWsConnectionClosed)).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle FEED_WS_CONNECTION_END", () => {
    expect(feedOrdersReducer(undefined, feedWsConnectionEnd)).toEqual({
      ...initialState,
      wsConnected: false,
      messages: [],
    });
  });

  it("should handle FEED_WS_GET_MESSAGE", () => {
    expect(
      feedOrdersReducer(undefined, feedWsGetMessage(mockFeedWsMessage))
    ).toEqual({
      ...initialState,
      wsConnected: false,
      messages: [mockFeedWsMessage, ...initialState.messages],
    });
  });
});
