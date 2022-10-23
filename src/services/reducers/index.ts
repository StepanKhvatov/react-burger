import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderReducer } from "./order";
import { ingredientsConstructorReducer } from "./ingredients-constructor";
import { userReducer } from "./user";
import { feedOrdersReducer } from "./feed-orders";
import { userFeedOrdersReducer } from "./user-orders";
import { viewedOrderReducer } from "./viewed-order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
  order: orderReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  user: userReducer,
  feedOrders: feedOrdersReducer,
  userOrders: userFeedOrdersReducer,
  viewedOrder: viewedOrderReducer,
});
