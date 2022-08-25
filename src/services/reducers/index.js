import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  viewedIngredient: viewedIngredientReducer,
});
