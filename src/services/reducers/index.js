import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
  order: orderReducer,
});
