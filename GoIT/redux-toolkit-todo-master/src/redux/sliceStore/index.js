// import { combineReducers } from "redux";
import { numbersReducer } from "./numberReducer";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   number: numbers.reducers,
// });

export const store = configureStore({
  reducer: { number: numbersReducer },
});
