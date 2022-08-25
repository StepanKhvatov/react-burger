import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";

export const rootReducer = combineReducers({ ingredients: ingredientsReducer });
