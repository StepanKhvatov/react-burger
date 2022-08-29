import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderReducer } from "./order";
import { ingredientsConstructorReducer } from "./ingredients-constructor";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
  order: orderReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
});
