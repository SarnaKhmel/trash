import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";
import numberReducer from "./numberReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  reducerNumber: numberReducer,
  reducerUsers: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
